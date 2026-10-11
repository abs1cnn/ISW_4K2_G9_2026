# TP6 – TDD: US "Comprar entradas" (EcoHarmony Park)

Grupo 9 (impar → "Comprar entradas"). Lenguaje: Python 3.12 (backend, pytest) y JavaScript (frontend, vitest).

Las reglas de estilo de código adoptadas están en `Reglas_de_Estilo_TP6.md` (documento complementario).

## 1. Cómo se aplicó Red-Green-Refactor

Los casos de prueba salen de las pruebas de usuario de la US (4 originales + 20 agregadas, ver `Desarrollo/US_Comprar_Entradas.txt`) y del pseudocódigo (`Desarrollo/Pseudocodigo_Test_Comprar_Entradas.txt`). Orden seguido:

1. Camino feliz mínimo → usuario no registrado → cantidad (0, -1, 1, 10, 11) → fecha (pasada, vacía, parque cerrado, hoy) → edades y tipo de pase → forma de pago → Mercado Pago (aprobado/rechazado) → mail.
2. Cada paso: **Red** (test que falla), **Green** (código mínimo), **Refactor** (extraer validaciones y constantes sin romper tests).
3. Última iteración (cierre de brechas contra la consigna): se escribieron primero los tests de tarjeta/Mercado Pago, pago rechazado y usuario no registrado; se verificó que fallaban (`ImportError`, `AssertionError`) y recién después se implementó.

## 2. Decisiones de diseño

| Decisión | Justificación |
|---|---|
| **Dominio puro** en `app/compra_service.py`, sin FastAPI ni SQLite | Se testea en milisegundos y sin infraestructura; las reglas de negocio no dependen del framework. |
| **Dependencias inyectadas como funciones** (`guardar_compra`, `enviar_mail`, `cobrar`, `usuario_registrado`) | Permite reemplazar mail, Mercado Pago y base por dobles de prueba (equivale a los `Mock` del pseudocódigo) y verificar si fueron llamados. |
| **`hoy` inyectado** (equivale al `RelojFijo` del pseudocódigo) | Los tests de "día actual", "fecha pasada" y "parque cerrado" son deterministas. |
| **Validación acumulativa** (`validar_pedido` devuelve lista de errores) | El usuario ve todos los problemas de una vez; `CompraInvalidaError` los transporta. |
| **Constantes con nombre** (`MAX_ENTRADAS = 10`, `TIPOS_PASE`, `FORMAS_PAGO`, `DIAS_ABIERTO`, `PRECIOS`) | Sin números mágicos; el límite de 10 vive en un solo lugar y se expone al frontend por `/api/configuracion`. |
| **Orden: validar → registrado → cobrar → guardar → mail** | Si Mercado Pago rechaza, no se guarda la compra ni se envía el mail (prueba 24). Un fallo nunca deja datos a medias. |
| **Efectivo no pasa por Mercado Pago**; queda `PENDIENTE_PAGO_BOLETERIA`. Tarjeta aprobada queda `PAGADA` | Cumple "redirigir a Mercado Pago solo si el pago es con tarjeta". |
| **Pasarela simulada** (`app/mercado_pago.py`) con la misma interfaz (`cobrar(compra) -> bool`) | No hay credenciales reales; reemplazarla por el SDK real no toca el dominio. La respuesta devuelve `url_mercado_pago` solo si el pago es con tarjeta. |
| **Registro con mail + contraseña** (`/api/usuarios`, hash PBKDF2 con sal) | La entrevista del dominio pide "registrarse con mail y contraseña"; la compra se rechaza si el mail no está registrado. |
| **Mail simulado**: se guarda en la tabla `mails_enviados` | Evidencia verificable del envío sin servidor SMTP. |
| **Backend como fuente de verdad**; el frontend pre-valida con las mismas reglas | Evita duplicar decisiones críticas (usuario registrado, cobro); el frontend solo mejora la experiencia. |
| **Tests en dos niveles**: unitarios (dobles en memoria) e integración (API + SQLite temporal) | Los unitarios guían el diseño; los de integración confirman el cableado real sin tocar `ecoharmony.db`. |
| **Entorno aislado**: `Backend/.venv` y `Frontend/node_modules` | Las dependencias son solo del proyecto. |

## 3. Cobertura de la US

| Criterio de aceptación | Test(s) |
|---|---|
| Fecha, cantidad, edad de cada visitante, tipo de pase | `test_comprar_entradas`, edades/tipo de pase inválidos |
| Fecha hoy o futura | `..._para_el_dia_actual`, `..._fecha_pasada_falla`, `..._sin_fecha...` |
| Parque abierto (cierra los lunes) | `..._parque_cerrado_falla` |
| Mail de confirmación | `..._envia_mail_con_cantidad_fecha_y_boleteria`, `..._con_tarjeta_cobra_por_mercado_pago...` |
| Redirección a Mercado Pago con tarjeta | `..._con_tarjeta_cobra...`, `test_api_comprar_con_tarjeta_redirige_a_mercado_pago`, `..._en_efectivo_no_pasa_por_mercado_pago` |
| Forma de pago obligatoria y válida | `..._sin_forma_de_pago_falla`, `..._forma_de_pago_invalida_falla` |
| Pago rechazado: no se registra ni se envía mail | `..._pago_rechazado_por_mercado_pago_falla`, `test_api_pago_rechazado...` |
| Máximo 10 entradas (límites 0, 1, 10, 11, negativos) | `test_comprar_1/10_entradas...`, `test_comprar_11_entradas_falla`, `..._cantidad_invalida...` |
| Informar cantidad y fecha al finalizar | `..._envia_mail_con_cantidad_fecha...`, `Confirmacion.jsx` |
| Solo usuarios registrados | `..._usuario_no_registrado_falla`, `test_api_usuario_no_registrado...`, `test_api_registrar_usuario...` |

## 4. Cómo ejecutar

```
cd Backend
python -m venv .venv
.venv\Scripts\python -m pip install -r requirements.txt
.venv\Scripts\python -m pytest            # 56 tests
.venv\Scripts\python -m uvicorn app.main:app --reload

cd Frontend
npm install
npm test                                   # 31 tests
npm run dev
```

## 5. Limitaciones conocidas

- Mercado Pago y el envío de mail están **simulados**; la integración real requiere credenciales y SMTP.
- No hay inicio de sesión: "usuario registrado" se verifica por el mail de la compra (no hay token ni verificación de contraseña al comprar).
- El horario/calendario del parque (cierra los lunes) es una suposición del grupo; la consigna solo dice "días en que el parque está abierto".
