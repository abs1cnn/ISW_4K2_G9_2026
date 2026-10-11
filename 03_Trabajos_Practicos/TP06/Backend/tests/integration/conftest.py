import pytest
from fastapi.testclient import TestClient

from app.database import Repositorio, get_repositorio
from app.main import app, get_hoy, get_pasarela
from tests.conftest import EMAIL_REGISTRADO, HOY
from tests.unit.conftest import MercadoPagoFalso


@pytest.fixture
def repo_sqlite(tmp_path):
    # Base SQLite temporal: no toca ecoharmony.db
    repo = Repositorio(tmp_path / "test.db")
    repo.registrar_usuario(EMAIL_REGISTRADO, "clave-segura-1")
    return repo


@pytest.fixture
def mp_falso():
    return MercadoPagoFalso()


@pytest.fixture
def cliente(repo_sqlite, mp_falso):
    app.dependency_overrides[get_repositorio] = lambda: repo_sqlite
    app.dependency_overrides[get_hoy] = lambda: HOY
    app.dependency_overrides[get_pasarela] = lambda: mp_falso
    with TestClient(app) as cliente:
        yield cliente
    app.dependency_overrides.clear()
