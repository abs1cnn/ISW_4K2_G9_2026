"""Tests de integración de la API: endpoint + base SQLite temporal."""

from tests.conftest import EMAIL_REGISTRADO, FECHA_ABIERTO, FECHA_CERRADO

PEDIDO = {
    "email": EMAIL_REGISTRADO,
    "fecha": FECHA_ABIERTO,
    "cantidad": 2,
    "edades": [30, 8],
    "tipo_pase": "REGULAR",
    "forma_pago": "EFECTIVO",
}


def test_api_comprar_entradas_registra_compra_y_mail(cliente, repo_sqlite):
    respuesta = cliente.post("/api/compras", json=PEDIDO)

    assert respuesta.status_code == 201
    cuerpo = respuesta.json()
    assert cuerpo["cantidad"] == 2
    assert cuerpo["fecha"] == FECHA_ABIERTO
    assert cuerpo["total"] == 10000
    assert cuerpo["estado"] == "PENDIENTE_PAGO_BOLETERIA"

    assert len(repo_sqlite.listar_compras()) == 1
    assert len(repo_sqlite.listar_mails()) == 1


def test_api_comprar_entradas_invalida_devuelve_422_y_no_guarda(cliente, repo_sqlite):
    respuesta = cliente.post("/api/compras", json={**PEDIDO, "fecha": FECHA_CERRADO, "cantidad": -1})

    assert respuesta.status_code == 422
    errores = respuesta.json()["errores"]
    assert any("cerrado" in e for e in errores)
    assert any("al menos 1" in e for e in errores)
    assert repo_sqlite.listar_compras() == []
    assert repo_sqlite.listar_mails() == []


def test_api_listar_compras(cliente):
    cliente.post("/api/compras", json=PEDIDO)
    cliente.post("/api/compras", json={**PEDIDO, "tipo_pase": "VIP"})

    compras = cliente.get("/api/compras").json()

    assert [c["tipo_pase"] for c in compras] == ["VIP", "REGULAR"]


def test_api_configuracion(cliente):
    configuracion = cliente.get("/api/configuracion").json()
    assert configuracion["max_entradas"] == 10
    assert configuracion["formas_pago"] == ["EFECTIVO", "TARJETA"]


def test_api_comprar_con_tarjeta_redirige_a_mercado_pago(cliente, repo_sqlite, mp_falso):
    respuesta = cliente.post("/api/compras", json={**PEDIDO, "forma_pago": "TARJETA"})

    assert respuesta.status_code == 201
    cuerpo = respuesta.json()
    assert cuerpo["estado"] == "PAGADA"
    assert "mercadopago" in cuerpo["url_mercado_pago"]
    assert len(mp_falso.cobros) == 1
    assert len(repo_sqlite.listar_mails()) == 1


def test_api_comprar_en_efectivo_no_redirige_a_mercado_pago(cliente, mp_falso):
    cuerpo = cliente.post("/api/compras", json=PEDIDO).json()

    assert cuerpo["url_mercado_pago"] is None
    assert mp_falso.cobros == []


def test_api_pago_rechazado_devuelve_422_y_no_guarda(cliente, repo_sqlite, mp_falso):
    mp_falso.aprueba = False

    respuesta = cliente.post("/api/compras", json={**PEDIDO, "forma_pago": "TARJETA"})

    assert respuesta.status_code == 422
    assert any("rechazado" in e for e in respuesta.json()["errores"])
    assert repo_sqlite.listar_compras() == []
    assert repo_sqlite.listar_mails() == []


def test_api_usuario_no_registrado_no_puede_comprar(cliente, repo_sqlite):
    respuesta = cliente.post("/api/compras", json={**PEDIDO, "email": "anonimo@mail.com"})

    assert respuesta.status_code == 422
    assert any("registrados" in e for e in respuesta.json()["errores"])
    assert repo_sqlite.listar_compras() == []


def test_api_registrar_usuario_permite_comprar(cliente):
    registro = cliente.post("/api/usuarios", json={"email": "nuevo@mail.com", "password": "clave-segura-2"})
    assert registro.status_code == 201

    respuesta = cliente.post("/api/compras", json={**PEDIDO, "email": "nuevo@mail.com"})
    assert respuesta.status_code == 201


def test_api_registrar_usuario_repetido_devuelve_409(cliente):
    respuesta = cliente.post("/api/usuarios", json={"email": EMAIL_REGISTRADO, "password": "clave-segura-1"})

    assert respuesta.status_code == 409


def test_api_registrar_usuario_invalido_devuelve_422(cliente):
    sin_arroba = cliente.post("/api/usuarios", json={"email": "nuevo", "password": "clave-segura-2"})
    clave_corta = cliente.post("/api/usuarios", json={"email": "nuevo@mail.com", "password": "123"})

    assert sin_arroba.status_code == 422
    assert clave_corta.status_code == 422
