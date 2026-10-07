import { useState } from 'react';
import {
  MAX_ENTRADAS,
  EDAD_MAXIMA,
  TIPOS_PASE,
  PRECIOS,
  FORMAS_PAGO,
  calcularTotal,
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

export default function CompraEntradas({ onCompra }) {
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [edades, setEdades] = useState(['']);
  const [tipoPase, setTipoPase] = useState(TIPOS_PASE.REGULAR);
  const [formaPago, setFormaPago] = useState('');
  const [errores, setErrores] = useState([]);

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

  function handleSubmit(e) {
    e.preventDefault();
    const pedido = {
      email,
      fecha,
      cantidad,
      edades: edades.map((edad) => (edad === '' ? NaN : Number(edad))),
      tipoPase,
      formaPago,
    };
    try {
      onCompra(comprarEntradas(pedido, { enviarMail }));
    } catch (err) {
      if (err instanceof CompraInvalidaError) setErrores(err.errores);
      else throw err;
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
    </form>
  );
}
