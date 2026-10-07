"""Datos de prueba compartidos por los tests unitarios y de integración."""

from datetime import date

from app.compra_service import Pedido

HOY = date(2026, 10, 7)          # miércoles
FECHA_ABIERTO = "2026-10-10"     # sábado
FECHA_CERRADO = "2026-10-12"     # lunes
FECHA_PASADA = "2026-10-06"


def pedido_valido(**cambios) -> Pedido:
    datos = {
        "email": "visitante@ecoharmony.com",
        "fecha": FECHA_ABIERTO,
        "cantidad": 11,
        "edades": [30, 8],
        "tipo_pase": "REGULAR",
        "forma_pago": "EFECTIVO",
    }
    datos.update(cambios)
    return Pedido(**datos)
