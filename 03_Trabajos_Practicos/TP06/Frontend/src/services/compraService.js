export const MAX_ENTRADAS = 10;
export const EDAD_MAXIMA = 120;

export const TIPOS_PASE = {
  REGULAR: 'REGULAR',
  VIP: 'VIP',
};

export const PRECIOS = {
  [TIPOS_PASE.REGULAR]: 5000,
  [TIPOS_PASE.VIP]: 10000,
};

// Por ahora solo se admite pago en efectivo (en boletería)
export const FORMAS_PAGO = {
  EFECTIVO: 'EFECTIVO',
};

// 0 = domingo ... 6 = sábado. El parque cierra los lunes.
export const DIAS_ABIERTO = [0, 2, 3, 4, 5, 6];

const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Convierte 'YYYY-MM-DD' a Date local (evita corrimientos por zona horaria)
export function parsearFecha(texto) {
  if (!texto) return null;
  const [anio, mes, dia] = texto.split('-').map(Number);
  if (!anio || !mes || !dia) return null;
  return new Date(anio, mes - 1, dia);
}

export function formatearFecha(texto) {
  const fecha = parsearFecha(texto);
  return fecha ? fecha.toLocaleDateString('es-AR') : '';
}

function inicioDelDia(fecha) {
  return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
}

export function parqueAbierto(fecha) {
  return DIAS_ABIERTO.includes(fecha.getDay());
}

export function calcularTotal(cantidad, tipoPase) {
  const precio = PRECIOS[tipoPase];
  if (!precio || !Number.isInteger(cantidad) || cantidad < 1) return 0;
  return cantidad * precio;
}

export function validarPedido(pedido, hoy = new Date()) {
  const errores = [];
  const { email, fecha, cantidad, edades, tipoPase, formaPago } = pedido;

  if (!email || !email.trim()) {
    errores.push('Debe indicar un mail para la compra');
  } else if (!FORMATO_EMAIL.test(email.trim())) {
    errores.push('El mail ingresado no es válido');
  }

  const fechaVisita = parsearFecha(fecha);
  if (!fechaVisita) {
    errores.push('Debe indicar la fecha de visita');
  } else if (fechaVisita < inicioDelDia(hoy)) {
    errores.push('La fecha de visita debe ser hoy o una fecha futura');
  } else if (!parqueAbierto(fechaVisita)) {
    errores.push('El parque está cerrado ese día (cierra los lunes)');
  }

  if (!Number.isInteger(cantidad) || cantidad < 1) {
    errores.push('La cantidad de entradas debe ser al menos 1');
  } else if (cantidad > MAX_ENTRADAS) {
    errores.push(`No se pueden comprar más de ${MAX_ENTRADAS} entradas`);
  }

  if (!Array.isArray(edades) || edades.length !== cantidad) {
    errores.push('Debe indicar la edad de cada visitante');
  } else if (
    edades.some((edad) => !Number.isInteger(edad) || edad < 0 || edad > EDAD_MAXIMA)
  ) {
    errores.push(`Las edades deben ser números enteros entre 0 y ${EDAD_MAXIMA}`);
  }

  if (!Object.values(TIPOS_PASE).includes(tipoPase)) {
    errores.push('Debe seleccionar un tipo de pase (VIP o regular)');
  }

  if (!formaPago) {
    errores.push('Debe seleccionar una forma de pago');
  } else if (!Object.values(FORMAS_PAGO).includes(formaPago)) {
    errores.push('Forma de pago no admitida');
  }

  return errores;
}

export class CompraInvalidaError extends Error {
  constructor(errores) {
    super(errores.join('. '));
    this.name = 'CompraInvalidaError';
    this.errores = errores;
  }
}

export function comprarEntradas(pedido, { hoy = new Date(), enviarMail } = {}) {
  const errores = validarPedido(pedido, hoy);
  if (errores.length > 0) {
    throw new CompraInvalidaError(errores);
  }

  const resultado = {
    email: pedido.email.trim(),
    cantidad: pedido.cantidad,
    fecha: pedido.fecha,
    tipoPase: pedido.tipoPase,
    formaPago: pedido.formaPago,
    total: calcularTotal(pedido.cantidad, pedido.tipoPase),
  };

  if (enviarMail) {
    enviarMail(
      resultado.email,
      `Compraste ${resultado.cantidad} entradas para el ${formatearFecha(resultado.fecha)}. ` +
        `Total a pagar en boletería: $${resultado.total}`
    );
  }

  return resultado;
}
