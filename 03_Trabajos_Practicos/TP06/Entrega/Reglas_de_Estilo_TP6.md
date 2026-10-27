# Reglas de estilo de código adoptadas – TP6 (Comprar entradas)

Documento actualizado el 19/10/2026 para Python y JavaScript/JSX.

Estas convenciones se basan en el codigo actual y en criterios de mantenimiento.
No se acredita que provengan de un documento del TP2. Las recomendaciones de
formato no se cumplen uniformemente ni se verifican con un linter configurado.
Complementa [Decisiones de diseno](Decisiones_de_Diseno_TP6.md).

## 1. Nombres

| Elemento | Regla | Ejemplos del código |
|---|---|---|
| Idioma | Dominio en español; términos técnicos del framework en inglés | `comprar_entradas`, `parque_abierto`, `Repositorio` |
| Funciones y variables Python | `snake_case`, verbo + objeto | `validar_pedido`, `calcular_total`, `parsear_fecha` |
| Funciones y variables JS | `camelCase` | `comprarEntradas`, `formatearFecha`, `totalConfirmado` |
| Clases y componentes | `PascalCase` | `CompraInvalidaError`, `Pedido`, `CompraEntradas` |
| Constantes | `MAYUSCULAS_CON_GUION_BAJO`, definidas arriba del módulo | `MAX_ENTRADAS`, `DIAS_ABIERTO`, `FORMAS_PAGO` |
| Funciones privadas Python | Prefijo `_` | `_conectar` |
| Booleanos | Nombre en forma de pregunta o estado | `parque_abierto`, `es_entero` |
| Errores | Sufijo `Error` | `CompraInvalidaError` |

## 2. Formato

- Indentación con **4 espacios** en Python y **2 espacios** en JS/JSX. No se usan tabs.
- Largo de línea recomendado: hasta **120 caracteres** en Python. En JSX puede superarse levemente cuando cortar la línea empeora la lectura.
- Comillas preferidas: dobles en Python, simples en JS/JSX.
- Dos líneas en blanco entre funciones y clases de nivel superior en Python; una línea en blanco entre bloques lógicos dentro de una función.
- Imports ordenados en tres grupos separados por una línea en blanco: librería estándar, librerías de terceros y módulos del proyecto.

## 3. Diseño del código

- **Una responsabilidad por función.** Las funciones de validación devuelven datos y no tienen efectos secundarios.
- **Preferir constantes a números o textos "mágicos":** los límites, precios y estados viven en constantes con nombre (`MAX_ENTRADAS = 10`).
- **Dominio separado de la infraestructura.** `compra_service.py` no importa FastAPI ni SQLite; las dependencias externas (base, mail y fecha actual) se reciben por parámetro.
- **Tipos explícitos** en las firmas de Python (`-> bool`, `list[str]`, `Callable[...]`).
- **Errores de negocio** mediante una excepción propia que acumula todos los mensajes (`CompraInvalidaError`), no con códigos de retorno.
- **Mensajes al usuario** en español, claros y en voz activa ("Debe indicar la fecha de visita").

## 4. Comentarios y documentación

- Se recomienda que cada módulo de Python comience con un docstring de una línea que indica su propósito.
- Se comenta el **porqué** de una decisión, no el qué hace la línea (ej.: `# El parque cierra los lunes`).
- Sin código comentado ni `TODO` sin explicar.

## 5. Tests

- Nombre: `test_<acción>_<resultado esperado>`, por ejemplo `test_comprar_entradas_parque_cerrado_falla`.
- Estructura **Arrange / Act / Assert**; un concepto por test.
- Los casos con varios valores usan parametrización (`pytest.mark.parametrize`, `it.each`) en lugar de duplicar tests.
- Los servicios externos se reemplazan por dobles de prueba; los tests no dependen de la hora real, de la red ni de `ecoharmony.db`.
- Los tests de fallo verifican además que **no** hubo efectos secundarios (sin compra guardada, sin mail enviado).
- Datos de prueba compartidos en `conftest.py`; cada test modifica solo lo que quiere probar (`pedido_valido(**cambios)`).

## 6. Estructura del proyecto

```
Backend/app/     dominio (compra_service), API (main), persistencia (database), panel (test_runner)
Backend/tests/   unit/ (dobles en memoria) e integration/ (API + SQLite temporal)
Frontend/src/    components/ (interfaz) y services/ (reglas de negocio y sus tests)
```

## 7. Estado de cumplimiento y alcance

- Existen lineas que superan los 120 caracteres, variantes de comillas en JS,
  imports sin agrupar y firmas sin todas las anotaciones. Las reglas anteriores
  orientan el mantenimiento; no certifican cumplimiento uniforme.
- Los precios y limites principales tienen constantes, pero algunas edades y
  horarios siguen expresados como literales. Su extraccion debe preservar tests.
- No hay configuracion de Black, Ruff, ESLint o Prettier en los archivos revisados.
- La unica forma de pago implementada es efectivo. No existe un modulo de
  Mercado Pago ni un servicio real de registro de usuarios en esta version.
- La sesion es simulada y el correo se registra en SQLite sin envio real.
- La interfaz utiliza un resumen general con total original, cada descuento
  aplicado y total final; no separa el resumen por visitante.
- El ciclo TDD verificable corresponde al formato estricto AAAA-MM-DD.
  Ver [evidencia Red, Green y Refactor](../EvidenciaTDD/README.md).
  No se afirma que todo el desarrollo anterior siguiera ese ciclo.
- Las pruebas del frontend verifican servicios; no existe cobertura visual
  automatizada del resumen de compra.
- Las copias .py.txt de EvidenciaTDD son evidencia historica y no codigo activo.
- Los entornos, dependencias, bases locales y temporales se excluyen con .gitignore.
