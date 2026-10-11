"""Tests unitarios de la US "Comprar entradas"."""

import pytest

from app.compra_service import (
    ESTADO_PAGADA,
    ESTADO_PENDIENTE_PAGO,
    PRECIOS,
    CompraInvalidaError,
    calcular_total,
    comprar_entradas,
)
from tests.unit.conftest import MercadoPagoFalso
from tests.conftest import FECHA_ABIERTO, FECHA_CERRADO, FECHA_PASADA, HOY, pedido_valido


def comprar(pedido, repo, mp=None):
    mp = mp or MercadoPagoFalso()
    return comprar_entradas(
        pedido,
        hoy=HOY,
        guardar_compra=repo.guardar_compra,
        enviar_mail=repo.enviar_mail,
        cobrar=mp.cobrar,
        usuario_registrado=repo.usuario_registrado,
    )


def esperar_error(pedido, repo, texto_error, mp=None):
    mp = mp or MercadoPagoFalso()
    with pytest.raises(CompraInvalidaError, match=texto_error):
        comprar(pedido, repo, mp)
    assert repo.compras == []
    assert repo.mails == []
    return mp


# ---------------------------------------------------------------- casos que pasan

def test_comprar_entradas(repo_falso):
    pedido = pedido_valido(cantidad=3, edades=[40, 35, 10], tipo_pase="VIP")

    compra = comprar(pedido, repo_falso)

    assert compra.id == 1
    assert compra.cantidad == 3
    assert compra.fecha.isoformat() == FECHA_ABIERTO
    assert compra.total == 3 * PRECIOS["VIP"]
    assert compra.estado == ESTADO_PENDIENTE_PAGO
    assert len(repo_falso.compras) == 1


def test_comprar_entradas_con_tarjeta_cobra_por_mercado_pago_y_queda_pagada(repo_falso, mp_falso):
    pedido = pedido_valido(cantidad=3, edades=[40, 35, 10], tipo_pase="VIP", forma_pago="TARJETA")

    compra = comprar(pedido, repo_falso, mp_falso)

    assert len(mp_falso.cobros) == 1
    assert mp_falso.cobros[0].total == 3 * PRECIOS["VIP"]
    assert compra.estado == ESTADO_PAGADA
    assert len(repo_falso.compras) == 1
    assert len(repo_falso.mails) == 1
    assert repo_falso.mails[0][0] == "visitante@ecoharmony.com"
    assert "3 entradas" in repo_falso.mails[0][1]


def test_comprar_entradas_en_efectivo_no_pasa_por_mercado_pago(repo_falso, mp_falso):
    compra = comprar(pedido_valido(forma_pago="EFECTIVO"), repo_falso, mp_falso)

    assert mp_falso.cobros == []
    assert compra.estado == ESTADO_PENDIENTE_PAGO
    assert len(repo_falso.mails) == 1


def test_comprar_entradas_envia_mail_con_cantidad_fecha_y_boleteria(repo_falso):
    comprar(pedido_valido(), repo_falso)

    assert len(repo_falso.mails) == 1
    destinatario, mensaje = repo_falso.mails[0]
    assert destinatario == "visitante@ecoharmony.com"
    assert "2 entradas" in mensaje
    assert "10/10/2026" in mensaje
    assert "boletería" in mensaje


def test_comprar_entradas_para_el_dia_actual(repo_falso):
    assert comprar(pedido_valido(fecha=HOY.isoformat()), repo_falso).cantidad == 2


def test_comprar_10_entradas_limite_superior(repo_falso):
    assert comprar(pedido_valido(cantidad=10, edades=[20] * 10), repo_falso).cantidad == 10


def test_comprar_1_entrada_limite_inferior(repo_falso):
    assert comprar(pedido_valido(cantidad=1, edades=[25]), repo_falso).cantidad == 1


@pytest.mark.parametrize("tipo_pase", ["VIP", "REGULAR"])
def test_comprar_entradas_con_tipo_de_pase_valido(repo_falso, tipo_pase):
    assert comprar(pedido_valido(tipo_pase=tipo_pase), repo_falso).tipo_pase == tipo_pase


def test_comprar_entradas_recorta_espacios_del_mail(repo_falso):
    assert comprar(pedido_valido(email="  visitante@ecoharmony.com "), repo_falso).email == "visitante@ecoharmony.com"


# ---------------------------------------------------------------- casos que fallan

@pytest.mark.parametrize("email", [None, "", "   "])
def test_comprar_entradas_sin_mail_falla(repo_falso, email):
    esperar_error(pedido_valido(email=email), repo_falso, "Debe indicar un mail")


@pytest.mark.parametrize("email", ["visitante", "visitante@", "visitante@mail", "a b@mail.com"])
def test_comprar_entradas_mail_invalido_falla(repo_falso, email):
    esperar_error(pedido_valido(email=email), repo_falso, "no es válido")


def test_comprar_entradas_sin_forma_de_pago_falla(repo_falso):
    esperar_error(pedido_valido(forma_pago=None), repo_falso, "forma de pago")


def test_comprar_entradas_forma_de_pago_invalida_falla(repo_falso):
    esperar_error(pedido_valido(forma_pago="CRIPTO"), repo_falso, "Forma de pago no admitida")


def test_comprar_entradas_pago_rechazado_por_mercado_pago_falla(repo_falso):
    mp = MercadoPagoFalso(aprueba=False)

    esperar_error(pedido_valido(forma_pago="TARJETA"), repo_falso, "rechazado", mp)

    assert len(mp.cobros) == 1


def test_comprar_entradas_usuario_no_registrado_falla(repo_falso, mp_falso):
    mp = esperar_error(pedido_valido(email="anonimo@mail.com", forma_pago="TARJETA"), repo_falso, "registrad", mp_falso)

    assert mp.cobros == []


def test_comprar_entradas_parque_cerrado_falla(repo_falso):
    esperar_error(pedido_valido(fecha=FECHA_CERRADO), repo_falso, "cerrado")


def test_comprar_entradas_fecha_pasada_falla(repo_falso):
    esperar_error(pedido_valido(fecha=FECHA_PASADA), repo_falso, "hoy o una fecha futura")


@pytest.mark.parametrize("fecha", [None, "", "10/10/2026", "no-es-fecha"])
def test_comprar_entradas_sin_fecha_o_fecha_mal_formada_falla(repo_falso, fecha):
    esperar_error(pedido_valido(fecha=fecha), repo_falso, "fecha de visita")


@pytest.mark.parametrize("cantidad", [0, -1, -5, None, "3", 2.5])
def test_comprar_entradas_cantidad_invalida_o_negativa_falla(repo_falso, cantidad):
    esperar_error(pedido_valido(cantidad=cantidad, edades=[]), repo_falso, "al menos 1")


def test_comprar_11_entradas_falla(repo_falso):
    esperar_error(pedido_valido(cantidad=11, edades=[20] * 11), repo_falso, "más de 10")


def test_comprar_entradas_edades_no_coinciden_con_cantidad_falla(repo_falso):
    esperar_error(pedido_valido(cantidad=3, edades=[30, 8]), repo_falso, "edad de cada visitante")


@pytest.mark.parametrize("edades", [[30, None], [30, -5], [30, 2.5], [30, "abc"], [30, 121]])
def test_comprar_entradas_edad_invalida_falla(repo_falso, edades):
    esperar_error(pedido_valido(edades=edades), repo_falso, "Las edades")


@pytest.mark.parametrize("tipo_pase", [None, "PREMIUM"])
def test_comprar_entradas_tipo_pase_invalido_falla(repo_falso, tipo_pase):
    esperar_error(pedido_valido(tipo_pase=tipo_pase), repo_falso, "tipo de pase")


# ---------------------------------------------------------------- calcular_total

def test_calcular_total_multiplica_cantidad_por_precio():
    assert calcular_total(2, "REGULAR") == 2 * PRECIOS["REGULAR"]


@pytest.mark.parametrize("cantidad", [-3, 0])
def test_calcular_total_devuelve_cero_para_cantidades_no_positivas(cantidad):
    assert calcular_total(cantidad, "VIP") == 0
