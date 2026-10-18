export const MAX_ENTRADAS = 10;
export const EDAD_MAXIMA = 120;

export const TIPOS_PASE = {
  REGULAR: 'REGULAR',
  VIP: 'VIP',
};

export const PRECIOS = {
  [TIPOS_PASE.REGULAR]: 10000,
  [TIPOS_PASE.VIP]: 20000,
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
  if (typeof texto !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(texto)) return null;
  const [anio, mes, dia] = texto.split('-').map(Number);
  if (!anio || !mes || !dia) return null;
  const fecha = new Date(anio, mes - 1, dia);
  return fecha.getFullYear() === anio && fecha.getMonth() === mes - 1 && fecha.getDate() === dia ? fecha : null;
}

export function formatearFecha(texto) {
  const fecha = parsearFecha(texto);
  return fecha ? fecha.toLocaleDateString('es-AR') : '';
}

function inicioDelDia(fecha) {
  return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
}

export function parqueAbierto(fecha) {
  return DIAS_ABIERTO.includes(fecha.getDay()) && !((fecha.getMonth() === 11 && fecha.getDate() === 25) || (fecha.getMonth() === 0 && fecha.getDate() === 1));
}

export function calcularTotal(cantidad, tipoPase, edades) {
  const precio = PRECIOS[tipoPase];
  if (!precio || !Number.isInteger(cantidad) || cantidad < 1) return 0;
  return edades ? edades.reduce((total, edad) => total + (Number.isInteger(edad) && edad >= 0 && edad <= EDAD_MAXIMA ? (edad <= 3 ? 0 : edad <= 15 || edad >= 60 ? precio / 2 : precio) : 0), 0) : cantidad * precio;
}

export function validarPedido(pedido, hoy = ahoraParque()) {
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
  } else if (fechaVisita > limiteCompra(hoy)) {
    errores.push("La anticipación máxima es de un mes");
  } else if (+fechaVisita === +inicioDelDia(hoy) && (hoy.getHours() * 3600 + hoy.getMinutes() * 60 + hoy.getSeconds()) > 63000) {
    errores.push("Las compras para hoy cierran a las 17:30");
  } else if (!parqueAbierto(fechaVisita)) {
    errores.push('El parque está cerrado ese día (lunes, 25 de diciembre y 1 de enero)');
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

export function comprarEntradas(pedido, { hoy = ahoraParque(), enviarMail } = {}) {
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
    total: calcularTotal(pedido.cantidad, pedido.tipoPase, pedido.edades),
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

export function limiteCompra(hoy = ahoraParque()) {
  const fin = new Date(hoy.getFullYear(), hoy.getMonth() + 2, 0);
  return new Date(fin.getFullYear(), fin.getMonth(), Math.min(hoy.getDate(), fin.getDate()));
}

export function ahoraParque() {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' }));
}
