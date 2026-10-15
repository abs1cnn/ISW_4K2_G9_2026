// Cliente del backend FastAPI (Vite redirige /api a http://localhost:8000)

export class CompraRechazadaError extends Error {
  constructor(errores) {
    super(errores.join('. '));
    this.name = 'CompraRechazadaError';
    this.errores = errores;
  }
}

export async function registrarCompra(pedido) {
  let respuesta;
  try {
    respuesta = await fetch('/api/compras', {
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
  } catch {
    throw new CompraRechazadaError(['No se pudo conectar con el servidor. ¿Está corriendo el backend?']);
  }

  const cuerpo = await respuesta.json();
  if (!respuesta.ok) {
    throw new CompraRechazadaError(cuerpo.errores ?? ['Error inesperado al registrar la compra']);
  }

  return {
    id: cuerpo.id,
    email: cuerpo.email,
    fecha: cuerpo.fecha,
    cantidad: cuerpo.cantidad,
    tipoPase: cuerpo.tipo_pase,
    formaPago: cuerpo.forma_pago,
    total: cuerpo.total,
    estado: cuerpo.estado,
  };
}
