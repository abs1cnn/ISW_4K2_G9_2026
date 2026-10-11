# Reglas de estilo de código adoptadas – TP6 (Comprar entradas)

> **Aclaración sobre el origen de estas reglas.**
> La consigna del Práctico 6 (TDD), en el apartado *Entradas*, indica: *"Reglas de estilo de código seleccionadas por el grupo para el Trabajo Práctico 2"*
> (ver `Consigna/TP04.pdf` y la guía `ISW_guía_trabajos_prácticos_evaluables.pdf`, página 11).
> El enunciado del Práctico 2 (*Requerimientos Ágiles – User Stories y Estimaciones*, misma guía, páginas 4 a 5) no pide definir reglas de estilo, y el repositorio no contiene ningún documento de reglas de estilo del TP2 (`03_Trabajos_Practicos/TP02/` está vacío).
> Por eso, **este documento reconstruye las reglas a partir de las convenciones que efectivamente se observan en el código del proyecto**, y no proviene de un documento previo del TP2. Si el grupo o la cátedra dispone del documento original, debe considerarse el documento de referencia y este se ajustaría a él.

Lenguajes: Python 3.12 (backend) y JavaScript/JSX (frontend).

## 1. Nombres

| Elemento | Regla | Ejemplos del código |
|---|---|---|
| Idioma | Dominio en español; términos técnicos del framework en inglés | `comprar_entradas`, `parque_abierto`, `Repositorio` |
| Funciones y variables Python | `snake_case`, verbo + objeto | `validar_pedido`, `calcular_total`, `parsear_fecha` |
| Funciones y variables JS | `camelCase` | `comprarEntradas`, `formatearFecha`, `urlMercadoPago` |
| Clases y componentes | `PascalCase` | `CompraInvalidaError`, `Pedido`, `CompraEntradas` |
| Constantes | `MAYUSCULAS_CON_GUION_BAJO`, definidas arriba del módulo | `MAX_ENTRADAS`, `DIAS_ABIERTO`, `FORMAS_PAGO` |
| Funciones privadas Python | Prefijo `_` | `_armar_mensaje`, `_conectar` |
| Booleanos | Nombre en forma de pregunta o estado | `parque_abierto`, `usuario_registrado`, `es_entero` |
| Errores | Sufijo `Error` | `CompraInvalidaError` |

## 2. Formato

- Indentación con **4 espacios** en Python y **2 espacios** en JS/JSX. No se usan tabs.
- Largo de línea: hasta **120 caracteres** en Python. En JSX puede superarse levemente cuando cortar la línea empeora la lectura.
- Comillas: dobles en Python, simples en JS/JSX.
- Dos líneas en blanco entre funciones y clases de nivel superior en Python; una línea en blanco entre bloques lógicos dentro de una función.
- Imports ordenados en tres grupos separados por una línea en blanco: librería estándar, librerías de terceros y módulos del proyecto.

## 3. Diseño del código

- **Una responsabilidad por función.** Las funciones de validación devuelven datos y no tienen efectos secundarios.
- **Sin números ni textos "mágicos":** los límites, precios y estados viven en constantes con nombre (`MAX_ENTRADAS = 10`).
- **Dominio separado de la infraestructura.** `compra_service.py` no importa FastAPI ni SQLite; las dependencias externas (base, mail, Mercado Pago, fecha actual) se reciben por parámetro.
- **Tipos explícitos** en las firmas de Python (`-> bool`, `list[str]`, `Callable[...]`).
- **Errores de negocio** mediante una excepción propia que acumula todos los mensajes (`CompraInvalidaError`), no con códigos de retorno.
- **Mensajes al usuario** en español, claros y en voz activa ("Debe indicar la fecha de visita").

## 4. Comentarios y documentación

- Cada módulo de Python comienza con un docstring de una línea que indica su propósito.
- Se comenta el **porqué** de una decisión, no el qué hace la línea (ej.: `# El parque cierra los lunes`).
- Sin código comentado ni `TODO` sin explicar.

## 5. Tests

- Nombre: `test_<acción>_<resultado esperado>`, por ejemplo `test_comprar_entradas_parque_cerrado_falla`.
- Estructura **Arrange / Act / Assert**; un concepto por test.
- Los casos con varios valores usan parametrización (`pytest.mark.parametrize`, `it.each`) en lugar de duplicar tests.
- Los servicios externos se reemplazan por dobles de prueba; los tests no dependen de la hora real, de la red ni de `ecoharmony.db`.
- Los tests de fallo verifican además que **no** hubo efectos secundarios (sin compra guardada, sin mail enviado, sin cobro).
- Datos de prueba compartidos en `conftest.py`; cada test modifica solo lo que quiere probar (`pedido_valido(**cambios)`).

## 6. Estructura del proyecto

```
Backend/app/     dominio (compra_service, usuarios), API (main), persistencia (database), pasarela (mercado_pago)
Backend/tests/   unit/ (dobles en memoria) e integration/ (API + SQLite temporal)
Frontend/src/    components/ (interfaz) y services/ (reglas de negocio y sus tests)
```
