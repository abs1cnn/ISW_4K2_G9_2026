
# Actualización del Plan de Gestión de Configuración

**Proyecto:** ISW_4K2_G9_2026
**Referencia:** Plan de Gestión de Configuración — TP04
**Fecha:** 21/11/2026
**Estado:** Propuesta de actualización, sujeta a revisión e integración mediante Pull Request.

## 1. Motivo de la actualización

El Plan de Gestión de Configuración elaborado durante el TP04 estableció las convenciones iniciales para organizar e identificar los elementos de configuración.

Durante el desarrollo posterior se incorporaron implementaciones de software, documentación técnica y evidencias de pruebas que requieren ampliar algunas convenciones originales.

Esta actualización complementa el plan inicial sin modificar las entregas académicas ni las líneas base históricas.

## 2. Cambios en las convenciones

### 2.1. Documentación de desarrollo

Se incorpora la extensión `.md` entre los formatos admitidos en `03_Trabajos_Practicos/TP[numero]/Desarrollo/`.

Se mantienen nombres descriptivos vinculados al contenido del documento.

Como aplicación de este criterio, los documentos `Decisiones_de_Diseno_TP6.md` y `Reglas_de_Estilo_TP6.md` se clasifican dentro de `TP06/Desarrollo/`.

### 2.2. Entregas formales

Se conserva la convención original `Entrega_TP[numero].[extensión]`, con formatos `.pdf` o `.zip`.

La carpeta `Entrega/` queda reservada para los archivos correspondientes a entregas formales. No es obligatorio que todos los trabajos prácticos tengan archivos en esta categoría.

Los documentos del TP09 se clasifican dentro de `Desarrollo/`, dado que corresponden a resoluciones del ejercicio y no a una entrega formal.

### 2.3. Implementaciones de software

Se incorporan las categorías `Backend/`, `Frontend/` y `UserStories/` para los trabajos prácticos que las requieran.

En `Backend/` y `Frontend/` se admiten los archivos fuente, pruebas, dependencias y configuración necesarios para las tecnologías utilizadas.

Los archivos técnicos conservan los nombres requeridos por sus herramientas, por ejemplo `main.py`, `requirements.txt`, `package.json`, `pytest.ini` y `vite.config.js`.

### 2.4. Evidencia de pruebas

Se admiten directorios específicos para evidencias de pruebas cuando el trabajo práctico lo requiera.

En el TP06, `EvidenciaTDD/` conserva los registros correspondientes al ciclo Red, Green y Refactor. Su existencia no establece una carpeta obligatoria para todos los trabajos prácticos.

## 3. Documentación vigente

El `README.md` principal centraliza las convenciones operativas de nombrado y ubicación del repositorio.

Las modificaciones de estas convenciones deben quedar registradas mediante Git y someterse al procedimiento de revisión correspondiente.

## 4. Control de cambios

La actualización se propone mediante un Pull Request hacia `main`, permitiendo revisar los archivos afectados y conservar la trazabilidad de los cambios.

Su incorporación a la documentación vigente queda sujeta a la revisión e integración del Pull Request.

El Plan SCM del TP04 y las líneas base `Release_v1` y `Release_v2` se conservan sin modificaciones retroactivas.
