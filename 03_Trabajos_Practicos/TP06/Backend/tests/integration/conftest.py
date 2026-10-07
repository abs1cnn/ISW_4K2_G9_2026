import pytest
from fastapi.testclient import TestClient

from app.database import Repositorio, get_repositorio
from app.main import app, get_hoy
from tests.conftest import HOY


@pytest.fixture
def repo_sqlite(tmp_path):
    # Base SQLite temporal: no toca ecoharmony.db
    return Repositorio(tmp_path / "test.db")


@pytest.fixture
def cliente(repo_sqlite):
    app.dependency_overrides[get_repositorio] = lambda: repo_sqlite
    app.dependency_overrides[get_hoy] = lambda: HOY
    with TestClient(app) as cliente:
        yield cliente
    app.dependency_overrides.clear()
