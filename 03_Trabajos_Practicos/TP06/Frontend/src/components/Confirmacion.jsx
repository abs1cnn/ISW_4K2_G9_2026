import { formatearFecha } from '../services/compraService';

export default function Confirmacion({ compra, onNuevaCompra }) {
  const plural = compra.cantidad > 1;

  return (
    <div className="tarjeta">
      <h2>¡Compra confirmada!</h2>
      {compra.id && (
        <p className="ayuda" style={{ fontWeight: 'bold', color: 'var(--verde)' }}>
          N° de compra: #{compra.id}
        </p>
      )}
      <p>
        Compraste <strong>{compra.cantidad}</strong> {plural ? 'entradas' : 'entrada'}{' '}
        <strong>{compra.tipoPase === 'VIP' ? 'VIP' : plural ? 'regulares' : 'regular'}</strong> para el{' '}
        <strong>{formatearFecha(compra.fecha)}</strong>.
      </p>
      <p>
        Total a pagar en boletería: <strong>${compra.total}</strong>
      </p>
      <p className="ayuda">Te enviamos un mail de confirmación a {compra.email}.</p>
      <button onClick={onNuevaCompra}>Nueva compra</button>
    </div>
  );
}
