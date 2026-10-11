from datetime import date
from pathlib import Path
from typing import Any, Optional

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel

from app.compra_service import (
    DIAS_ABIERTO,
    FORMA_PAGO_TARJETA,
    EDAD_MAXIMA,
    FORMAS_PAGO,
    MAX_ENTRADAS,
    PRECIOS,
    CompraInvalidaError,
    Pedido,
    comprar_entradas,
)
from app.database import Repositorio, get_repositorio
from app.mercado_pago import MercadoPagoSimulado, url_checkout
from app.test_runner import ejecutar_tests
from app.usuarios import validar_registro

app = FastAPI(title="EcoHarmony Park - API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

PANEL_HTML = Path(__file__).resolve().parent / "panel.html"


# Campos sueltos a propósito: la validación la hace el dominio (compra_service)
class PedidoRequest(BaseModel):
    email: Optional[str] = None
    fecha: Optional[str] = None
    cantidad: Any = None
    edades: Any = None
    tipo_pase: Optional[str] = None
    forma_pago: Optional[str] = None


class UsuarioRequest(BaseModel):
    email: Any = None
    password: Any = None


def get_hoy() -> date:
    return date.today()


def get_pasarela() -> MercadoPagoSimulado:
    return MercadoPagoSimulado()


@app.get("/", include_in_schema=False)
def panel():
    return FileResponse(PANEL_HTML)


@app.get("/api/configuracion")
def configuracion():
    return {
        "max_entradas": MAX_ENTRADAS,
        "edad_maxima": EDAD_MAXIMA,
        "precios": PRECIOS,
        "formas_pago": list(FORMAS_PAGO),
        "dias_abierto": list(DIAS_ABIERTO),
    }


@app.post("/api/compras", status_code=201)
def crear_compra(
    datos: PedidoRequest,
    repo: Repositorio = Depends(get_repositorio),
    hoy: date = Depends(get_hoy),
    pasarela: MercadoPagoSimulado = Depends(get_pasarela),
):
    try:
        compra = comprar_entradas(
            Pedido(**datos.model_dump()),
            hoy=hoy,
            guardar_compra=repo.guardar_compra,
            enviar_mail=repo.guardar_mail,
            cobrar=pasarela.cobrar,
            usuario_registrado=repo.usuario_registrado,
        )
    except CompraInvalidaError as error:
        return JSONResponse(status_code=422, content={"errores": error.errores})

    return {
        "id": compra.id,
        "email": compra.email,
        "fecha": compra.fecha.isoformat(),
        "cantidad": compra.cantidad,
        "tipo_pase": compra.tipo_pase,
        "forma_pago": compra.forma_pago,
        "total": compra.total,
        "estado": compra.estado,
        "mensaje": compra.mensaje,
        "url_mercado_pago": url_checkout(compra.id) if compra.forma_pago == FORMA_PAGO_TARJETA else None,
    }


@app.post("/api/usuarios", status_code=201)
def registrar_usuario(datos: UsuarioRequest, repo: Repositorio = Depends(get_repositorio)):
    errores = validar_registro(datos.email, datos.password)
    if errores:
        return JSONResponse(status_code=422, content={"errores": errores})
    if not repo.registrar_usuario(datos.email, datos.password):
        return JSONResponse(status_code=409, content={"errores": ["Ese mail ya está registrado"]})
    return {"email": datos.email.strip().lower()}


@app.get("/api/compras")
def listar_compras(repo: Repositorio = Depends(get_repositorio)):
    return repo.listar_compras()


@app.get("/api/mails")
def listar_mails(repo: Repositorio = Depends(get_repositorio)):
    return repo.listar_mails()


@app.post("/api/tests/ejecutar")
def correr_tests():
    return ejecutar_tests()
