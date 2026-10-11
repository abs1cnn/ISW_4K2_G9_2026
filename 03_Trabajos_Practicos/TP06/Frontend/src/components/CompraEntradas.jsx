import { useState } from 'react';
import {
  MAX_ENTRADAS,
  EDAD_MAXIMA,
  TIPOS_PASE,
  PRECIOS,
  FORMAS_PAGO,
  calcularTotal,
  validarPedido,
} from '../services/compraService';
import Registro from './Registro';

function hoyComoTexto() {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `${hoy.getFullYear()}-${mes}-${dia}`;
}

export default function CompraEntradas({ onCompra }) {
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [edades, setEdades] = useState(['']);
  const [tipoPase, setTipoPase] = useState(TIPOS_PASE.REGULAR);
  const [formaPago, setFormaPago] = useState('');
  const [errores, setErrores] = useState([]);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  function cambiarCantidad(valor) {
    // No se permiten negativos ni cero: se fuerza el rango 1..MAX_ENTRADAS
    const numero = Math.min(Math.max(parseInt(valor, 10) || 1, 1), MAX_ENTRADAS);
    setCantidad(numero);
    setEdades((anteriores) => Array.from({ length: numero }, (_, i) => anteriores[i] ?? ''));
  }

  function cambiarEdad(indice, valor) {
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

    // Validamos primero localmente con las reglas de negocio
    const erroresLocales = validarPedido(pedido);
    if (erroresLocales.length > 0) {
      setErrores(erroresLocales);
      return;
    }

    // El backend es la fuente de verdad: valida usuario registrado, cobra y envía el mail
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
          urlMercadoPago: datos.url_mercado_pago,
        });
        setErrores([]);
        return;
      }

      if (respuesta.status === 422) {
        const errorData = await respuesta.json();
        setErrores(errorData.errores || ['Error al procesar la compra']);
        return;
      }
      setErrores(['No se pudo procesar la compra, intentá de nuevo']);
    } catch {
      setErrores(['No hay conexión con el servidor, intentá de nuevo']);
    }
  }

  return (
    <form className="tarjeta" onSubmit={handleSubmit} noValidate>
      <h2>Comprar entradas</h2>

      <label>
        Mail
        <input
          type="email"
          placeholder="tu@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <small>Te enviaremos la confirmación de la compra a este mail.</small>
      </label>

      <label>
        Fecha de visita
        <input type="date" min={hoyComoTexto()} value={fecha} onChange={(e) => setFecha(e.target.value)} />
        <small>El parque abre de martes a domingo.</small>
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
            {tipo === TIPOS_PASE.VIP ? 'VIP' : 'Regular'} (${PRECIOS[tipo]} c/u)
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
        <label className="opcion">
          <input
            type="radio"
            name="formaPago"
            value={FORMAS_PAGO.TARJETA}
            checked={formaPago === FORMAS_PAGO.TARJETA}
            onChange={() => setFormaPago(FORMAS_PAGO.TARJETA)}
          />
          Tarjeta de crédito (se redirige a Mercado Pago)
        </label>
      </fieldset>

      <p className="total">Total: ${calcularTotal(cantidad, tipoPase)}</p>

      {errores.length > 0 && (
        <ul className="error">
          {errores.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <button type="submit">Confirmar compra</button>

      <button type="button" onClick={() => setMostrarRegistro((visible) => !visible)}>
        ¿No tenés cuenta? Registrate
      </button>
      {mostrarRegistro && <Registro emailInicial={email} onRegistrado={() => setMostrarRegistro(false)} />}
    </form>
  );
}
