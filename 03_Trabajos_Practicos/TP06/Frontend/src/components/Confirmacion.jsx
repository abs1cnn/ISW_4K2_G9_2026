import { formatearFecha } from '../services/compraService';
import ResumenCompra from './ResumenCompra';

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
      {compra.edades && <ResumenCompra edades={compra.edades} tipoPase={compra.tipoPase} totalConfirmado={compra.total} />}
      <p>
        Pago pendiente en efectivo en boletería: <strong>${compra.total}</strong>
      </p>
      <p className="ayuda">Confirmación por mail simulada y registrada para {compra.email}.</p>
      <button onClick={onNuevaCompra}>Nueva compra</button>
    </div>
  );
}
