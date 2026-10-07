import pytest


class RepositorioFalso:
    """Doble de prueba: guarda en memoria lo que se compra y los mails enviados."""

    def __init__(self):
        self.compras = []
        self.mails = []

    def guardar_compra(self, compra):
        self.compras.append(compra)
        return len(self.compras)

    def enviar_mail(self, destinatario, mensaje):
        self.mails.append((destinatario, mensaje))


@pytest.fixture
def repo_falso():
    return RepositorioFalso()
