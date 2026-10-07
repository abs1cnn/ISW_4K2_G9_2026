"""Lógica de dominio de la US "Comprar entradas" (sin dependencias de FastAPI ni de la base)."""

import re
from dataclasses import dataclass, field
from datetime import date
from typing import Any, Callable, Optional

MAX_ENTRADAS = 10
EDAD_MAXIMA = 120

TIPO_PASE_REGULAR = "REGULAR"
TIPO_PASE_VIP = "VIP"
TIPOS_PASE = (TIPO_PASE_REGULAR, TIPO_PASE_VIP)

PRECIOS = {
    TIPO_PASE_REGULAR: 5000,
    TIPO_PASE_VIP: 10000,
}

# Por ahora solo se admite pago en efectivo (en boletería)
FORMA_PAGO_EFECTIVO = "EFECTIVO"
FORMAS_PAGO = (FORMA_PAGO_EFECTIVO,)

ESTADO_PENDIENTE_PAGO = "PENDIENTE_PAGO_BOLETERIA"

# date.weekday(): 0 = lunes ... 6 = domingo. El parque cierra los lunes.
DIAS_ABIERTO = (1, 2, 3, 4, 5, 6)

FORMATO_EMAIL = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


class CompraInvalidaError(Exception):
    def __init__(self, errores: list[str]):
        super().__init__(". ".join(errores))
        self.errores = errores


@dataclass
class Pedido:
    email: Optional[str] = None
    fecha: Optional[str] = None
    cantidad: Any = None
    edades: Any = None
    tipo_pase: Optional[str] = None
    forma_pago: Optional[str] = None


@dataclass
class Compra:
    email: str
    fecha: date
    cantidad: int
    edades: list[int]
    tipo_pase: str
    forma_pago: str
    total: int
    estado: str = ESTADO_PENDIENTE_PAGO
    id: Optional[int] = None
    mensaje: str = field(default="")


def es_entero(valor: Any) -> bool:
    return isinstance(valor, int) and not isinstance(valor, bool)


def parsear_fecha(texto: Optional[str]) -> Optional[date]:
    if not texto:
        return None
    try:
        return date.fromisoformat(texto)
    except (TypeError, ValueError):
        return None


def parque_abierto(fecha: date) -> bool:
    return fecha.weekday() in DIAS_ABIERTO


def calcular_total(cantidad: Any, tipo_pase: Optional[str]) -> int:
    precio = PRECIOS.get(tipo_pase)
    if precio is None or not es_entero(cantidad) or cantidad < 1:
        return 0
    return cantidad * precio


def validar_pedido(pedido: Pedido, hoy: date) -> list[str]:
    errores = []

    email = (pedido.email or "").strip()
    if not email:
        errores.append("Debe indicar un mail para la compra")
    elif not FORMATO_EMAIL.match(email):
        errores.append("El mail ingresado no es válido")

    fecha = parsear_fecha(pedido.fecha)
    if fecha is None:
        errores.append("Debe indicar la fecha de visita")
    elif fecha < hoy:
        errores.append("La fecha de visita debe ser hoy o una fecha futura")
    elif not parque_abierto(fecha):
        errores.append("El parque está cerrado ese día (cierra los lunes)")

    cantidad = pedido.cantidad
    if not es_entero(cantidad) or cantidad < 1:
        errores.append("La cantidad de entradas debe ser al menos 1")
    elif cantidad > MAX_ENTRADAS:
        errores.append(f"No se pueden comprar más de {MAX_ENTRADAS} entradas")

    edades = pedido.edades
    if not isinstance(edades, list) or len(edades) != cantidad:
        errores.append("Debe indicar la edad de cada visitante")
    elif any(not es_entero(edad) or edad < 0 or edad > EDAD_MAXIMA for edad in edades):
        errores.append(f"Las edades deben ser números enteros entre 0 y {EDAD_MAXIMA}")

    if pedido.tipo_pase not in TIPOS_PASE:
        errores.append("Debe seleccionar un tipo de pase (VIP o regular)")

    if not pedido.forma_pago:
        errores.append("Debe seleccionar una forma de pago")
    elif pedido.forma_pago not in FORMAS_PAGO:
        errores.append("Forma de pago no admitida")

    return errores


def comprar_entradas(
    pedido: Pedido,
    hoy: date,
    guardar_compra: Callable[[Compra], int],
    enviar_mail: Callable[[str, str], None],
) -> Compra:
    errores = validar_pedido(pedido, hoy)
    if errores:
        raise CompraInvalidaError(errores)

    compra = Compra(
        email=pedido.email.strip(),
        fecha=parsear_fecha(pedido.fecha),
        cantidad=pedido.cantidad,
        edades=list(pedido.edades),
        tipo_pase=pedido.tipo_pase,
        forma_pago=pedido.forma_pago,
        total=calcular_total(pedido.cantidad, pedido.tipo_pase),
    )
    compra.id = guardar_compra(compra)
    compra.mensaje = (
        f"Compraste {compra.cantidad} entradas para el {compra.fecha.strftime('%d/%m/%Y')}. "
        f"Acercate a boletería a pagar ${compra.total} en efectivo. N° de compra: {compra.id}"
    )
    enviar_mail(compra.email, compra.mensaje)
    return compra
