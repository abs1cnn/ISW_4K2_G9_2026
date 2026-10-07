import { describe, it, expect, vi } from 'vitest';
import {
  comprarEntradas,
  calcularTotal,
  CompraInvalidaError,
  PRECIOS,
} from './compraService';

const HOY = new Date(2026, 9, 7); // miércoles 07/10/2026
const FECHA_ABIERTO = '2026-10-10'; // sábado
const FECHA_CERRADO = '2026-10-12'; // lunes
const FECHA_PASADA = '2026-10-06';

function pedidoValido(cambios = {}) {
  return {
    email: 'visitante@ecoharmony.com',
    fecha: FECHA_ABIERTO,
    cantidad: 2,
    edades: [30, 8],
    tipoPase: 'REGULAR',
    formaPago: 'EFECTIVO',
    ...cambios,
  };
}

function comprar(pedido, enviarMail = vi.fn()) {
  return comprarEntradas(pedido, { hoy: HOY, enviarMail });
}

function esperarError(pedido, textoError) {
  const enviarMail = vi.fn();
  expect(() => comprar(pedido, enviarMail)).toThrow(CompraInvalidaError);
  expect(() => comprar(pedido, enviarMail)).toThrow(textoError);
  expect(enviarMail).not.toHaveBeenCalled();
}

describe('comprarEntradas - casos que pasan', () => {
  it('compra entradas en efectivo, informa cantidad y fecha y envía mail', () => {
    const enviarMail = vi.fn();

    const resultado = comprar(
      pedidoValido({ cantidad: 3, edades: [40, 35, 10], tipoPase: 'VIP' }),
      enviarMail
    );

    expect(resultado.cantidad).toBe(3);
    expect(resultado.fecha).toBe(FECHA_ABIERTO);
    expect(resultado.total).toBe(3 * PRECIOS.VIP);
    expect(enviarMail).toHaveBeenCalledTimes(1);
    expect(enviarMail).toHaveBeenCalledWith('visitante@ecoharmony.com', expect.stringContaining('3 entradas'));
  });

  it('permite comprar para el día actual', () => {
    expect(comprar(pedidoValido({ fecha: '2026-10-07' })).cantidad).toBe(2);
  });

  it('permite comprar exactamente 10 entradas', () => {
    expect(comprar(pedidoValido({ cantidad: 10, edades: Array(10).fill(20) })).cantidad).toBe(10);
  });

  it('permite comprar exactamente 1 entrada', () => {
    expect(comprar(pedidoValido({ cantidad: 1, edades: [25] })).cantidad).toBe(1);
  });

  it.each(['VIP', 'REGULAR'])('acepta el tipo de pase %s', (tipoPase) => {
    expect(comprar(pedidoValido({ tipoPase })).tipoPase).toBe(tipoPase);
  });
});

describe('comprarEntradas - casos que fallan', () => {
  it.each([null, '', '   '])('falla sin mail (%j)', (email) => {
    esperarError(pedidoValido({ email }), 'Debe indicar un mail');
  });

  it.each(['visitante', 'visitante@', 'visitante@mail', 'a b@mail.com'])(
    'falla con mail inválido %s',
    (email) => {
      esperarError(pedidoValido({ email }), 'no es válido');
    }
  );

  it('falla sin forma de pago', () => {
    esperarError(pedidoValido({ formaPago: null }), 'forma de pago');
  });

  it('falla con forma de pago distinta de efectivo', () => {
    esperarError(pedidoValido({ formaPago: 'TARJETA' }), 'Forma de pago no admitida');
  });

  it('falla si el parque está cerrado', () => {
    esperarError(pedidoValido({ fecha: FECHA_CERRADO }), 'cerrado');
  });

  it('falla con fecha pasada', () => {
    esperarError(pedidoValido({ fecha: FECHA_PASADA }), 'hoy o una fecha futura');
  });

  it('falla sin fecha', () => {
    esperarError(pedidoValido({ fecha: '' }), 'fecha de visita');
  });

  it.each([0, -1, -5])('falla con cantidad %i (no se permiten negativas ni cero)', (cantidad) => {
    esperarError(pedidoValido({ cantidad, edades: [] }), 'al menos 1');
  });

  it('falla con 11 entradas', () => {
    esperarError(pedidoValido({ cantidad: 11, edades: Array(11).fill(20) }), 'más de 10');
  });

  it('falla si las edades no coinciden con la cantidad', () => {
    esperarError(pedidoValido({ cantidad: 3, edades: [30, 8] }), 'edad de cada visitante');
  });

  it.each([[[30, -5]], [[30, NaN]], [[30, 2.5]]])('falla con edades inválidas %j', (edades) => {
    esperarError(pedidoValido({ edades }), 'Las edades');
  });

  it.each([null, 'PREMIUM'])('falla con tipo de pase %s', (tipoPase) => {
    esperarError(pedidoValido({ tipoPase }), 'tipo de pase');
  });
});

describe('calcularTotal', () => {
  it('multiplica cantidad por precio del pase', () => {
    expect(calcularTotal(2, 'REGULAR')).toBe(2 * PRECIOS.REGULAR);
  });

  it('devuelve 0 para cantidades negativas', () => {
    expect(calcularTotal(-3, 'VIP')).toBe(0);
  });
});
