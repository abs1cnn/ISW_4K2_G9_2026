import { useState } from 'react';
import ResumenCompra from './ResumenCompra';
import {
  MAX_ENTRADAS,
  EDAD_MAXIMA,
  TIPOS_PASE,
  PRECIOS,
  FORMAS_PAGO,
  validarPedido,
  parqueAbierto,
  parsearFecha,
  limiteCompra,
  ahoraParque,
} from '../services/compraService';


function hoyComoTexto() {
  const hoy = ahoraParque();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `${hoy.getFullYear()}-${mes}-${dia}`;
}

export default function CompraEntradas({ onCompra }) {
  const email = 'visitante@ecoharmony.com';
  const [fecha, setFecha] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [edades, setEdades] = useState(['']);
  const [tipoPase, setTipoPase] = useState(TIPOS_PASE.REGULAR);
  const [formaPago, setFormaPago] = useState('');
  const [errores, setErrores] = useState([]);
  const [enviando, setEnviando] = useState(false);

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
    if (enviando) return;
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

    setEnviando(true);
    // La confirmación requiere que el servidor registre la compra.
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
          edades: pedido.edades,
        });
        setErrores([]);
        return;
      }

      if (respuesta.status === 422) {
        const errorData = await respuesta.json();
        setErrores(errorData.errores || ['Error al procesar la compra']);
        return;
      }
      setErrores(['No se pudo registrar la compra. Intentá nuevamente.']);
    } catch {
      setErrores(['No se pudo conectar con el servidor. Verificá tus compras antes de reintentar.']);
    } finally {
      setEnviando(false);
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
          readOnly
          autoFocus
        />
        <small>Sesión simulada: la compra se asocia a este usuario.</small>
      </label>

      <label>
        Fecha de visita
        <input type="date" min={hoyComoTexto()} max={(() => { const f = limiteCompra(); return `${f.getFullYear()}-${String(f.getMonth()+1).padStart(2, '0')}-${String(f.getDate()).padStart(2, '0')}`; })()} value={fecha} onChange={(e) => {
          const valor = e.target.value;
          if (valor && (!parsearFecha(valor) || !parqueAbierto(parsearFecha(valor)))) {
            setFecha('');
            setErrores(['El parque está cerrado ese día o la fecha no es válida. Elegí otra fecha.']);
          } else { setFecha(valor); setErrores([]); }
        }} />
        <small>Abierto de 8:30 a 19, excepto lunes, 25/12 y 1/1. Anticipación máxima: un mes. Para hoy, comprá hasta las 17:30.</small>
      </label>

      <label>
        Cantidad de entradas (máx. {MAX_ENTRADAS} por usuario y fecha)
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
        <small>Hasta 3 años: gratis. De 4 a 15 y desde 60 años: 50% de descuento.</small>
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
      </fieldset>

      <ResumenCompra edades={edades} tipoPase={tipoPase} />

      {errores.length > 0 && (
        <ul className="error">
          {errores.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <button type="submit" disabled={enviando}>{enviando ? "Registrando…" : "Confirmar compra"}</button>
    </form>
  );
}
