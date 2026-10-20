# Ciclo TDD: formato de fecha de compra

Fecha: 18/10/2026.

Este ciclo se realizó sobre una mejora de la US Comprar entradas: exigir el
formato AAAA-MM-DD en el backend, consistente con el formulario. No demuestra
que todo el desarrollo anterior se haya realizado mediante TDD.

## Red

Primero se agregó el test parametrizado
`test_compra_rechaza_fecha_fuera_del_formato_aaaa_mm_dd` con las entradas
`20261010` y `2026-W41-6`. Ambas representan el 10/10/2026, un día válido
para visitar el parque, pero tienen un formato no admitido por el contrato.
La prueba exige un error de dominio y que no se guarde compra ni mail.

Se ejecutaron las pruebas antes de modificar producción: **2 failed, 84 passed**.
El motivo fue `DID NOT RAISE`: `date.fromisoformat` aceptaba ambos formatos.

- Salida real: `01_red.txt`.
- Código anterior al cambio: `01_red_compra_service.py.txt`.
- Pruebas utilizadas, iguales en las tres etapas: `pruebas.py.txt`.

## Green

Se agregó una comprobación de formato mediante `re.fullmatch` antes de
convertir la fecha. La conversión existente sigue rechazando fechas imposibles.
Se ejecutó la misma suite unitaria: **86 passed**.

- Salida real: `02_green.txt`.
- Implementación mínima: `02_green_compra_service.py.txt`.

## Refactor

Se extrajo la expresión regular a la constante compilada `FORMATO_FECHA`,
junto a `FORMATO_EMAIL`, y se documentó el contrato de `parsear_fecha`.
Se mantuvo el comportamiento y no se modificaron las pruebas.
Se amplió la verificación a todo el backend: **92 passed**.

- Salida real: `03_refactor.txt`.
- Código final: `03_refactor_compra_service.py.txt`.

## Comandos ejecutados desde TP06

Red y Green:

```powershell
Backend/.venv/Scripts/python.exe -m pytest Backend/tests/unit -q -p no:cacheprovider --tb=short
```

Refactor:

```powershell
Backend/.venv/Scripts/python.exe -m pytest Backend/tests -q -p no:cacheprovider --basetemp=Backend/.test-tmp-tdd-fechas --tb=short
```

Las copias `.py.txt` conservan el código de cada etapa para comparar o reproducir
en una copia aislada del proyecto; pytest no las recolecta. Ejecutar los tests
sobre el código actual reproduce el estado final aprobado, no la etapa Red.
Las etapas se registraron como archivos de evidencia; no se crearon commits
intermedios ni se modificó el historial Git.
