import { useState } from 'react';
import {
  MAX_ENTRADAS,
  EDAD_MAXIMA,
  TIPOS_PASE,
  PRECIOS,
  FORMAS_PAGO,
  FESTIVOS,
  fechaMaximaCompra,
  calcularTotal,
  validarPedido,
  parqueAbierto,
  parsearFecha,
  comprarEntradas,
  CompraInvalidaError,
} from '../services/compraService';
import { enviarMail } from '../services/mailService';

function hoyComoTexto() {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `${hoy.getFullYear()}-${mes}-${dia}`;
}

function maxFechaComoTexto() {
  const max = fechaMaximaCompra();
  const mes = String(max.getMonth() + 1).padStart(2, '0');
  const dia = String(max.getDate()).padStart(2, '0');
  return `${max.getFullYear()}-${mes}-${dia}`;
}

/** Devuelve true si la fecha (objeto Date) corresponde a un día en que el parque está cerrado */
function esFechaDeshabilitada(fecha) {
  return !parqueAbierto(fecha);
}

/** Genera el aviso que se muestra bajo el campo de fecha cuando el día está cerrado */
function motivoCierre(fecha) {
  if (!fecha) return null;
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  if (FESTIVOS.includes(`${mes}-${dia}`)) {
    return `El parque está cerrado ese día festivo (${dia}/${mes}).`;
  }
  if (fecha.getDay() === 1) {
    return 'El parque está cerrado los lunes.';
  }
  return null;
}

export default function CompraEntradas({ onCompra }) {
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [fechaInvalida, setFechaInvalida] = useState(null); // motivo de cierre o null
  const [cantidad, setCantidad] = useState(1);
  const [edades, setEdades] = useState(['']);
  const [tipoPase, setTipoPase] = useState(TIPOS_PASE.REGULAR);
  const [formaPago, setFormaPago] = useState('');
  const [tocado, setTocado] = useState(false);       // true tras el primer cambio en cualquier campo
  const [erroresBackend, setErroresBackend] = useState([]); // solo errores que vienen del servidor

  function cambiarFecha(valor) {
    setTocado(true);
    setFecha(valor);
    const fechaObj = parsearFecha(valor);
    if (fechaObj && esFechaDeshabilitada(fechaObj)) {
      setFechaInvalida(motivoCierre(fechaObj));
    } else {
      setFechaInvalida(null);
    }
  }

  function cambiarCantidad(valor) {
    setTocado(true);
    // No se permiten negativos ni cero: se fuerza el rango 1..MAX_ENTRADAS
    const numero = Math.min(Math.max(parseInt(valor, 10) || 1, 1), MAX_ENTRADAS);
    setCantidad(numero);
    setEdades((anteriores) => Array.from({ length: numero }, (_, i) => anteriores[i] ?? ''));
  }

  function cambiarEdad(indice, valor) {
    setTocado(true);
    setEdades((anteriores) => anteriores.map((edad, i) => (i === indice ? valor : edad)));
  }

  function bloquearSignos(e) {
    if (['-', '+', 'e', 'E', '.', ','].includes(e.key)) e.preventDefault();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const pedido = {
      email,
      fecha,
      cantidad,
      edades: edades.map((edad) => (edad === '' ? NaN : Number(edad))),
      tipoPase,
      formaPago,
    };

    // Intentamos persistir en el backend si está activo
    try {
      const respuesta = await fetch('/api/compras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: pedido.email,
          fecha: pedido.fecha,
          cantidad: pedido.cantidad,
          edades: pedido.edades,
          tipo_pase: pedido.tipoPase,
          forma_pago: pedido.formaPago,
        }),
      });

      if (respuesta.ok) {
        const datos = await respuesta.json();
        onCompra({
          id: datos.id,
          email: datos.email,
          fecha: datos.fecha,
          cantidad: datos.cantidad,
          tipoPase: datos.tipo_pase,
          formaPago: datos.forma_pago,
          total: datos.total,
        });
        setErroresBackend([]);
        return;
      }

      if (respuesta.status === 422) {
        const errorData = await respuesta.json();
        setErroresBackend(errorData.errores || ['Error al procesar la compra']);
        return;
      }
    } catch {
      // Backend no disponible: fallback al servicio local
    }

    try {
      onCompra(comprarEntradas(pedido, { enviarMail }));
      setErroresBackend([]);
    } catch (err) {
      if (err instanceof CompraInvalidaError) setErroresBackend(err.errores);
      else throw err;
    }
  }

  // Derivado: el formulario es válido cuando validarPedido no encuentra errores
  // con los valores actuales. Se recalcula en cada render sin estado extra.
  // Derivados: calculados en cada render a partir del estado actual
  const pedidoActual = {
    email,
    fecha,
    cantidad,
    edades: edades.map((e) => (e === '' ? NaN : Number(e))),
    tipoPase,
    formaPago,
  };
  const erroresLocales = validarPedido(pedidoActual);
  const formularioValido = erroresLocales.length === 0;
  // Mostramos errores locales solo después de que el usuario haya tocado el formulario
  const erroresVisibles = tocado ? erroresLocales : erroresBackend;

  return (
    <form className="tarjeta" onSubmit={handleSubmit} noValidate>
      <h2>Comprar entradas</h2>

      <label>
        Mail
        <input
          type="email"
          placeholder="tu@mail.com"
          value={email}
          onChange={(e) => { setTocado(true); setEmail(e.target.value); }}
          autoFocus
        />
        <small>Te enviaremos la confirmación de la compra a este mail.</small>
      </label>

      <label>
        Fecha de visita
        <input
          type="date"
          min={hoyComoTexto()}
          max={maxFechaComoTexto()}
          value={fecha}
          className={fechaInvalida ? 'fecha-invalida' : ''}
          onChange={(e) => cambiarFecha(e.target.value)}
        />
        {fechaInvalida ? (
          <span className="aviso-fecha-cerrada">⚠ {fechaInvalida}</span>
        ) : (
          <small>
            El parque abre de martes a domingo, excepto el 25/12 y el 1/1.
            Solo podés comprar entradas con hasta 1 mes de anticipación.
          </small>
        )}
      </label>

      <label>
        Cantidad de entradas (máx. {MAX_ENTRADAS})
        <input
          type="number"
          min={1}
          max={MAX_ENTRADAS}
          value={cantidad}
          onKeyDown={bloquearSignos}
          onChange={(e) => cambiarCantidad(e.target.value)}
        />
      </label>

      <fieldset>
        <legend>Edad de cada visitante</legend>
        <div className="edades">
          {edades.map((edad, i) => (
            <label key={i}>
              Visitante {i + 1}
              <input
                type="number"
                min={0}
                max={EDAD_MAXIMA}
                value={edad}
                onKeyDown={bloquearSignos}
                onChange={(e) => cambiarEdad(i, e.target.value)}
              />
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>Tipo de pase</legend>
        {Object.values(TIPOS_PASE).map((tipo) => (
          <label key={tipo} className="opcion">
            <input
              type="radio"
              name="tipoPase"
              value={tipo}
              checked={tipoPase === tipo}
              onChange={() => setTipoPase(tipo)}
            />
            {tipo === TIPOS_PASE.VIP ? 'VIP' : 'Regular'} (${PRECIOS[tipo].toLocaleString('es-AR')} c/u)
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Forma de pago</legend>
        <label className="opcion">
          <input
            type="radio"
            name="formaPago"
            value={FORMAS_PAGO.EFECTIVO}
            checked={formaPago === FORMAS_PAGO.EFECTIVO}
            onChange={() => setFormaPago(FORMAS_PAGO.EFECTIVO)}
          />
          Efectivo (pago en boletería)
        </label>
      </fieldset>

      <p className="total">Total: ${calcularTotal(cantidad, tipoPase).toLocaleString('es-AR')}</p>

      {erroresVisibles.length > 0 && (
        <ul className="error">
          {erroresVisibles.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <button type="submit" disabled={!formularioValido}>Confirmar compra</button>
    </form>
  );
}
