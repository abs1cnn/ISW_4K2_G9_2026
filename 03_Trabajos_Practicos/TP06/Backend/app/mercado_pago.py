"""Pasarela de pago simulada: respeta la interfaz de Mercado Pago sin llamar al servicio real."""

from app.compra_service import Compra

URL_CHECKOUT = "https://www.mercadopago.com.ar/checkout/simulado"


class MercadoPagoSimulado:
    def cobrar(self, compra: Compra) -> bool:
        # En producción acá se crea la preferencia de pago y se espera su resultado
        return compra.total > 0


def url_checkout(compra_id: int) -> str:
    return f"{URL_CHECKOUT}?compra={compra_id}"
