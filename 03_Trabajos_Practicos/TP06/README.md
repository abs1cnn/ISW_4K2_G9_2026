# TP06 - TDD: Comprar entradas (EcoHarmony Park)

- `Backend/`: FastAPI + SQLite + pytest
- `Frontend/`: React (Vite) + Vitest

## Backend

```bash
cd Backend
python -m venv .venv
.venv\Scripts\activate          # Windows (en Linux/Mac: source .venv/bin/activate)
pip install -r requirements.txt

uvicorn app.main:app --reload --port 8000   # levanta la API
pytest -v                                   # corre todos los tests
pytest tests/unit -v                        # solo unitarios
pytest tests/integration -v                 # solo integración
```

Tests:
- `tests/unit/`: lógica de compra aislada (repositorio falso en memoria, fecha fija). Sin base, sin HTTP.
- `tests/integration/`: API completa (TestClient de FastAPI) + base SQLite temporal.
- `tests/conftest.py`: datos de prueba compartidos (fechas, `pedido_valido`).

- Panel: http://localhost:8000 → botones **Comprar entradas (test)** (ejecuta pytest) y **Comprar entradas** (abre el front).
- Documentación de la API: http://localhost:8000/docs
- Base de datos: `Backend/ecoharmony.db` (SQLite, se crea sola). Se puede abrir con DBeaver o con una extensión de SQLite en VS Code.
  Tablas: `compras`, `visitantes`, `mails_enviados`.

## Frontend

```bash
cd Frontend
npm install
npm run dev     # http://localhost:5173 (las llamadas a /api van al backend en el puerto 8000)
npm test        # corre los tests de validación del cliente
```

## Supuestos

- Pago solo en efectivo (en boletería); la compra queda en estado `PENDIENTE_PAGO_BOLETERIA`.
- No hay login: la compra se asocia a un mail.
- El parque cierra los lunes. Precios: Regular $5000, VIP $10000. Edad válida: 0 a 120.
- El mail de confirmación es simulado: se guarda en la tabla `mails_enviados`.
