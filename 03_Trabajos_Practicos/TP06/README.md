# TP06 - TDD: Comprar entradas (EcoHarmony Park)

Documento de entrega: [Justificación de las decisiones de diseño](Entrega/Decisiones_de_Diseno_TP6.md).
Documento complementario: [Reglas de estilo de código](Entrega/Reglas_de_Estilo_TP6.md).

Evidencia de un ciclo Red → Green → Refactor ejecutado para validar el formato
de fecha de compra: [registro y resultados](EvidenciaTDD/README.md).

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
- Sesión simulada del usuario `visitante@ecoharmony.com`, autorizada por el PO. El servidor determina el comprador; cambiar el mail del pedido no permite evadir el límite.
- El parque abre de 8:30 a 19, excepto lunes, 25 de diciembre y 1 de enero. El formulario rechaza seleccionar días cerrados.
- Precios: Regular $10.000, VIP $20.000. Hasta 3 años inclusive: gratis; de 4 a 15 y desde 60: 50% de descuento. Edad válida: 0 a 120.
- Anticipación máxima de un mes calendario, ajustando al último día del mes siguiente si corresponde. Compra para el día actual hasta las 17:30 inclusive (hora argentina).
- Máximo de 10 entradas por usuario y fecha de visita, acumuladas entre transacciones, incluidas las gratuitas. SQLite verifica el límite dentro de una transacción de escritura. No hay cupo global diario.
- El mail de confirmación es simulado: se guarda en la tabla `mails_enviados`.
- Paleta del PO y fuente Lato; la fuente se carga desde Google Fonts y necesita conexión.
- El servidor debe estar disponible para confirmar una compra. No se simula una compra exitosa ante errores de red.

Las aclaraciones de `Consigna/requerimientos_PO.pdf` se aplican a compra de entradas. Cupos, turnos, vestimenta, DNI y QR de actividades corresponden a otra historia. Se mantiene pago exclusivamente en efectivo por el alcance acordado. El logo requiere diseño y validación del PO; no se considera aprobado.
