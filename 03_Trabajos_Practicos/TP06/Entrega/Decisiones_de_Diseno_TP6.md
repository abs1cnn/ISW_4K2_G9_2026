# Justificación de las decisiones de diseño

**Trabajo práctico:** TP06 — EcoHarmony Park  
**Historia de usuario:** Comprar entradas  
**Equipo:** Grupo 9  
**Fecha:** 19/10/2026

## 1. Objetivo y alcance

El sistema permite registrar una compra de entradas indicando fecha de visita,
cantidad, edades y tipo de pase. Calcula los descuentos, conserva la compra y
genera una confirmación. El pago se realiza en efectivo en boletería.

Este documento describe y justifica el diseño implementado. Las reglas del PO
se distinguen de las decisiones técnicas y de las simplificaciones adoptadas
para el trabajo práctico. No se incluyen las inscripciones a actividades.

## 2. Separación entre interfaz, API, dominio y persistencia

Se organizó el sistema en un frontend React y un backend Python. En el backend,
`main.py` recibe las solicitudes HTTP, `compra_service.py` contiene las reglas
de compra y `database.py` administra la persistencia.

Esta separación permite probar las reglas sin iniciar un servidor ni acceder
a una base de datos. También evita que un cambio visual obligue a modificar
la lógica de negocio. Se eligió esta organización frente a concentrar el
procesamiento en los endpoints o en los componentes de la interfaz.

El costo es mantener contratos consistentes entre JavaScript y Python y ejecutar
dos procesos durante el desarrollo.

## 3. Tecnologías elegidas

| Tecnología | Justificación en este proyecto | Consecuencia o límite |
|---|---|---|
| React y Vite | Permiten dividir el formulario, la confirmación y el resumen en componentes y actualizar la vista al cambiar edades o pase. | Requieren una aplicación frontend y su proceso de compilación. |
| FastAPI | Permite exponer la compra mediante HTTP y sustituir dependencias en las pruebas de integración. | La API debe estar disponible para confirmar la compra. |
| SQLite | Conserva los datos en un archivo y evita configurar un servidor de base de datos para el TP. | Las escrituras se serializan; la elección responde al alcance local del proyecto. |
| SQL directo | Hace explícitas las consultas y transacciones de un modelo de tres tablas. | Los cambios de esquema deben gestionarse explícitamente; no hay un sistema de migraciones implementado. |
| pytest y Vitest | Permiten verificar las reglas en backend y frontend con datos controlados. | Las pruebas de servicios no reemplazan pruebas visuales o de navegación completas. |

## 4. Validación en dos niveles

El frontend valida los datos para dar una respuesta inmediata. El backend
repite las validaciones y calcula el total antes de guardar, ya que una
solicitud puede enviarse sin pasar por el formulario.

La decisión evita depender del navegador para asegurar las reglas. El cliente
no envía un total que el servidor deba aceptar como correcto. Las validaciones
de negocio se concentran en el servicio de dominio y los errores se devuelven
desde la API con estado HTTP 422. Pydantic también puede rechazar solicitudes
incompatibles con los tipos declarados.

Como contrapartida, existen reglas y constantes duplicadas entre frontend y
backend. Las pruebas de ambos lados ayudan a detectar diferencias, pero no
eliminan la necesidad de actualizarlos juntos.

## 5. Modelado de la compra y persistencia

Se utilizan los objetos `Pedido` y `Compra` para separar los datos recibidos
del resultado validado. La base contiene tres tablas:

- `compras`: titular, fecha, cantidad, pase, forma de pago, total y estado.
- `visitantes`: edades asociadas a cada compra.
- `mails_enviados`: destinatario y texto de la confirmación simulada.

Separar las edades en una tabla permite representar una cantidad variable de
visitantes sin crear columnas como `edad1`, `edad2`, etc. Se guarda el total
calculado para conservar el importe de la operación, aunque en el futuro
cambien los precios. No se almacena un desglose histórico de cada descuento.

La compra y sus visitantes se insertan en una misma transacción. Las consultas
usan parámetros para mantener los valores separados del código SQL.

## 6. Límite acumulado por usuario y fecha

El PO establece un máximo de diez entradas para una fecha específica, incluso
si se adquieren en varias transacciones. Por eso, verificar únicamente la
cantidad del formulario sería insuficiente.

El repositorio consulta la suma de compras anteriores para el mismo correo y
fecha dentro de una transacción iniciada con `BEGIN IMMEDIATE`. Luego verifica
el límite e inserta la compra. Así, otra escritura no puede intercalarse entre
la consulta y el registro y utilizar el mismo saldo disponible.

Se incluyen las entradas gratuitas porque el límite se refiere a entradas,
no al importe. No se agrega un cupo global diario, ya que el PO indicó que no
existe. La identidad actual es el correo de la sesión simulada; una versión
con autenticación debería utilizar el identificador persistente del usuario.

## 7. Precios, edades y descuentos

Los precios base se definen en constantes: regular $10.000 y VIP $20.000.
El tipo de pase se elige para toda la compra y la edad se informa por visitante.
El total se obtiene sumando el precio correspondiente a cada edad:

| Edad | Regla del PO | Regular | VIP |
|---|---|---:|---:|
| 0 a 3 inclusive | Gratuidad | $0 | $0 |
| 4 a 15 inclusive | 50% de descuento | $5.000 | $10.000 |
| 16 a 59 inclusive | Precio completo | $10.000 | $20.000 |
| Desde 60 inclusive | 50% de descuento | $5.000 | $10.000 |

Se usan importes enteros en pesos porque los precios y descuentos actuales
producen valores enteros. Esto evita cálculos monetarios con aproximaciones
decimales innecesarias. Si se incorporaran centavos o porcentajes diferentes,
sería necesario definir una representación y una política de redondeo.

El rango de edad de 0 a 120 es un supuesto de validación del TP. Los límites
de gratuidad y descuento, en cambio, provienen del PO.

## 8. Fechas y horario de compra

Se exige el formato `AAAA-MM-DD` y se comprueba que la fecha exista. El backend
rechaza también formatos alternativos que Python podría interpretar, como
`20261010` o `2026-W41-6`. Esto mantiene un contrato consistente con el cliente.

Se permiten fechas desde el día actual hasta un mes calendario después.
Cuando el día no existe en el mes siguiente, se utiliza su último día: por
ejemplo, desde el 31 de enero de 2027 el límite es el 28 de febrero. Esta es
la interpretación adoptada para la anticipación de un mes indicada por el PO.

Se excluyen los lunes, el 25 de diciembre y el 1 de enero. El formulario
rechaza la selección de esos días y la API vuelve a validar la condición.
Para el día actual se admite comprar hasta las 17:30 inclusive, aunque el
parque cierre a las 19:00.

El backend obtiene la hora con un desplazamiento UTC−3 y el frontend utiliza
la zona de Buenos Aires. La fecha y hora se reciben como dependencia en el
backend para que las pruebas no dependan del reloj real. El desplazamiento
fijo del servidor requeriría revisión si cambiara la política horaria local.

## 9. Pago en efectivo y sesión simulada

Por el alcance acordado, solo se admite `EFECTIVO`. La compra queda en estado
`PENDIENTE_PAGO_BOLETERIA`: confirmar el registro no significa que el dinero
ya haya sido cobrado. No se integra una pasarela ni se simula un pago con tarjeta.
Esto permite concentrar el TP en las reglas de compra sin depender de servicios
externos de cobro. El registro posterior del pago en boletería no está implementado.

El PO permite comenzar con el usuario y la sesión mockeados. Se utiliza el
usuario fijo `visitante@ecoharmony.com`, determinado por el servidor. Cambiar
el correo enviado en una solicitud no permite seleccionar otro titular ni
evadir el límite acumulado. Es una simplificación para demostración, no un
mecanismo real de autenticación ni una solución multiusuario completa.

## 10. Confirmación y manejo de fallos

El correo se simula guardando destinatario y mensaje en SQLite. Esto permite
comprobar la confirmación sin credenciales ni acceso a un proveedor de correo.
El texto informa cantidad, fecha, total pendiente y número de compra.

Las operaciones de guardar y enviar confirmación se pasan al servicio como
funciones. En los tests unitarios se reemplazan por un repositorio en memoria,
lo que permite verificar que un pedido inválido no produzca efectos laterales.

La interfaz confirma solo después de recibir una respuesta exitosa del servidor.
Se eliminó la confirmación local ante fallos de conexión porque podía presentar
como exitosa una operación que no se había guardado. También se deshabilita el
botón durante el envío para reducir dobles clics.

La compra y el mail se guardan en transacciones separadas. Si falla el registro
del mail, la compra puede haber quedado guardada. Tampoco existe una clave de
idempotencia para reintentos tras una respuesta perdida. Estas son limitaciones
actuales; deshabilitar el botón no resuelve por sí solo todos los duplicados.

## 11. Presentación y resumen de descuentos

Se utiliza la paleta indicada por el PO (`#386641`, `#6A994E`, `#A7C957`,
`#F2E8CF`, `#BC4749`) y la fuente Lato. Los componentes se distribuyen en una
columna de ancho adaptable para facilitar el uso desde celulares. Lato se carga
desde Google Fonts y dispone de una alternativa sans-serif si no está disponible.

El resumen se comparte entre el formulario y la confirmación. Presenta el total
sin descuentos, una línea por cada descuento aplicado y el total a pagar,
sin secciones individuales por visitante. Esta decisión responde al formato
de carrito solicitado y permite reconocer por qué se reduce el importe.

Mientras falten edades válidas, el total final aparece como pendiente para
evitar interpretar datos incompletos como entradas gratuitas. En la confirmación
se utiliza el total devuelto por el backend; el desglose se calcula en el cliente
con las edades enviadas y los precios locales. Ese desglose no es un registro
contable histórico del servidor.

## 12. Estrategia de pruebas y evidencia TDD

Las pruebas unitarias usan fecha fija y dobles en memoria. Las de integración
ejercitan la API con una base SQLite temporal. Las del frontend verifican las
validaciones y cálculos en JavaScript. Esta separación facilita identificar
si un error corresponde a una regla o a su integración con HTTP y persistencia.

Se documentó un ciclo TDD real para la validación estricta del formato de fecha:

1. **Red:** se escribieron primero dos casos que debían rechazar formatos
   alternativos. Resultado: 2 fallos y 84 pruebas unitarias aprobadas.
2. **Green:** se agregó la comprobación mínima del formato. Resultado:
   86 pruebas unitarias aprobadas.
3. **Refactor:** se extrajo el patrón a `FORMATO_FECHA` y se documentó el
   contrato. Resultado: 92 pruebas de backend aprobadas, incluyendo integración.

Las salidas y copias del código de cada etapa se encuentran en
[EvidenciaTDD](../EvidenciaTDD/README.md). Los números son resultados registrados
de esas ejecuciones. La evidencia corresponde a esa mejora y no permite afirmar
que todo el código anterior se desarrolló siguiendo TDD.

## 13. Límites del alcance académico

El sistema está orientado a ejecución local y demostración. El panel para correr
pruebas y los endpoints de listado de compras y mails no tienen control de acceso.
Antes de un despliegue público se necesitarían autenticación, autorización y
una definición del acceso a esos datos y herramientas.

No forman parte de esta entrega la pasarela de pago, el envío real de correo,
la gestión completa de usuarios ni la inscripción a actividades. El diseño del
logo requiere validación del PO y no se considera aprobado por este documento.

## 14. Referencias del proyecto

- Aclaraciones de dominio: `Consigna/requerimientos_PO.pdf`.
- Historia de usuario: `UserStories/US_Comprar_Entradas.txt`.
- Reglas y objetos de dominio: `Backend/app/compra_service.py`.
- Endpoints y dependencias: `Backend/app/main.py`.
- Persistencia y límite acumulado: `Backend/app/database.py`.
- Formulario y resumen: `Frontend/src/components/CompraEntradas.jsx` y `ResumenCompra.jsx`.
- Cálculos del cliente: `Frontend/src/services/compraService.js`.
- Pruebas: `Backend/tests/` y `Frontend/src/services/compraService.test.js`.
- Ejecución del proyecto: [README](../README.md).

## 15. Documento complementario

Las convenciones de nombres, formato y pruebas se documentan en
[Reglas de estilo](Reglas_de_Estilo_TP6.md).
