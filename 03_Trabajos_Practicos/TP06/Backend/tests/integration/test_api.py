"""Tests de integración de la API: endpoint + base SQLite temporal."""

from tests.conftest import FECHA_ABIERTO, FECHA_CERRADO

PEDIDO = {
    "email": "visitante@ecoharmony.com",
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
    assert cuerpo["total"] == 15000
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
    assert configuracion["formas_pago"] == ["EFECTIVO"]


def test_limite_acumulado_por_usuario_y_fecha(cliente, repo_sqlite):
    pedido = {**PEDIDO, "cantidad": 5, "edades": [3] * 5}
    assert cliente.post("/api/compras", json=pedido).status_code == 201
    assert cliente.post("/api/compras", json=pedido).status_code == 201
    respuesta = cliente.post("/api/compras", json={**PEDIDO, "email": "otro@mail.com"})
    assert respuesta.status_code == 422
    assert len(repo_sqlite.listar_compras()) == 2
    assert len(repo_sqlite.listar_mails()) == 2
    assert cliente.post("/api/compras", json={**PEDIDO, "fecha": "2026-10-11"}).status_code == 201


def test_sesion_mock_no_admite_suplantacion_por_mail(cliente):
    sesion = cliente.get("/api/sesion").json()
    respuesta = cliente.post("/api/compras", json={**PEDIDO, "email": "otro@mail.com"})
    assert respuesta.json()["email"] == sesion["email"]
