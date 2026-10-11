import pytest

from tests.conftest import EMAIL_REGISTRADO


class RepositorioFalso:
    """Doble de prueba: guarda en memoria lo que se compra y los mails enviados."""

    def __init__(self):
        self.compras = []
        self.mails = []
        self.usuarios = {EMAIL_REGISTRADO}

    def guardar_compra(self, compra):
        self.compras.append(compra)
        return len(self.compras)

    def enviar_mail(self, destinatario, mensaje):
        self.mails.append((destinatario, mensaje))

    def usuario_registrado(self, email):
        return email in self.usuarios


class MercadoPagoFalso:
    """Doble de Mercado Pago: registra los cobros y aprueba o rechaza según se configure."""

    def __init__(self, aprueba=True):
        self.aprueba = aprueba
        self.cobros = []

    def cobrar(self, compra):
        self.cobros.append(compra)
        return self.aprueba


@pytest.fixture
def repo_falso():
    return RepositorioFalso()


@pytest.fixture
def mp_falso():
    return MercadoPagoFalso()
