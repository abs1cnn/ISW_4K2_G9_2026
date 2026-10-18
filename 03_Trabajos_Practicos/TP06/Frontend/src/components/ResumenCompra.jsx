import { calcularTotal, EDAD_MAXIMA, PRECIOS } from '../services/compraService';

const moneda = (importe) => `$${importe.toLocaleString('es-AR')}`;

export default function ResumenCompra({ edades, tipoPase, totalConfirmado }) {
  const precio = PRECIOS[tipoPase];
  const filas = edades.map((valor) => {
    const edad = valor === '' ? NaN : Number(valor);
    const valida = Number.isInteger(edad) && edad >= 0 && edad <= EDAD_MAXIMA;
    const total = valida ? calcularTotal(1, tipoPase, [edad]) : null;
    return { edad, total, descuento: valida ? precio - total : 0 };
  });
  const completo = filas.every(fila => fila.total !== null);
  const subtotal = precio * edades.length;
  const descuento = filas.reduce((suma, fila) => suma + fila.descuento, 0);

  return (
    <section className="resumen-compra" aria-label="Resumen de precios" aria-live="polite">
      <h3>Resumen de tu compra</h3>
      <div className="resumen-fila"><span>Total sin descuentos</span><span>{moneda(subtotal)}</span></div>
      {filas.filter(fila => fila.descuento > 0).map((fila, indice) => (
        <div className="resumen-fila descuento-aplicado" key={indice}>
          <span>Descuento {fila.total === 0 ? '100' : '50'}% ({fila.edad <= 3 ? 'hasta 3 años' : fila.edad <= 15 ? '4 a 15 años' : 'desde 60 años'})</span>
          <span>−{moneda(fila.descuento)}</span>
        </div>
      ))}
      <div className="resumen-fila total">
        <span>Total a pagar en efectivo</span>
        <strong>{completo ? moneda(totalConfirmado ?? subtotal - descuento) : 'Pendiente'}</strong>
      </div>
      {!completo && <small>Completá las edades para ver el total final.</small>}
    </section>
  );
}
