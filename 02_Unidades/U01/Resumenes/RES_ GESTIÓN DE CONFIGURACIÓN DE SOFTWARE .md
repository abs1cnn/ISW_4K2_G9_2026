# UNIDAD DE GESTIÓN DE CONFIGURACIÓN DE SOFTWARE (SCM)
## GUÍA DE ESTUDIO UNIFICADA Y EXHAUSTIVA (UTN-FRC)
**Cátedra de Ingeniería y Calidad de Software**  
**Docentes:** Judith Meles y Laura Covaro [1]  
*Generado por Gemini Notebook para uso académico unificado*

---

## 1. El Software en Contexto e Introducción a la Ingeniería de Software

### El Software como Conocimiento e Información
El **software** no se limita únicamente a las líneas de código ejecutable. Académicamente, se define como un conjunto integrado de:
*   **Programas:** Instrucciones lógicas destinadas a ser procesadas por una computadora [1].
*   **Procedimientos:** Pautas operativas y flujos de trabajo asociados al uso del sistema [1].
*   **Reglas:** Restricciones de negocio, validaciones y especificaciones de comportamiento [1].
*   **Documentación:** Manuales, diagramas, especificaciones de requerimientos y registros de diseño [1].
*   **Datos:** Tablas, bases de datos, archivos de configuración y datos iniciales requeridos para la operación [1].

Desde la perspectiva pedagógica de la cátedra, el **software** es conceptualizado como **conocimiento o información estructurada** con propiedades lógicas y funcionales [1, 135]. Este conocimiento se crea y mantiene en múltiples formas y representaciones, refinándose progresivamente a lo largo del proceso de desarrollo [1, 135]. Comienza como una idea o necesidad general y abstracta en la mente del cliente, y a través de sucesivos **niveles de abstracción**, se va detallando en diversos artefactos hasta transformarse finalmente en la única representación que las computadoras comprenden en su nivel más bajo: los ceros y unos [135].

---

### Actividades del Proceso de Desarrollo bajo el Ciclo de Vida
Independientemente de la metodología o el proceso adoptado (por ejemplo, el Proceso Unificado de Desarrollo - PUD), el ciclo de vida del software involucra actividades y disciplinas fundamentales que se repiten de manera sistemática [135, 136]:
*   **Requerimientos:** Proceso complejo que abarca sub-actividades como la licitación (descubrimiento de necesidades), la especificación formal y la validación de requerimientos con el usuario [136].
*   **Análisis:** Modelado de los requerimientos desde la perspectiva del sistema para comprender la estructura del dominio del problema [136].
*   **Diseño:** Definición técnica de cómo se solucionará el problema, incluyendo la arquitectura, diseño de interfaces de usuario (IHM) y diseño de la base de datos [136, 137].
*   **Implementación:** Traducción del diseño en código fuente y compilación en código objeto/ejecutable [136].
*   **Prueba (Testing):** Verificación y validación para identificar fallas y asegurar que el producto cumple con lo especificado [136].
*   **Despliegue (Deployment):** Actividades destinadas a transferir y poner a disposición el producto de software en el ambiente de producción del usuario final [136, 148].

La complejidad inherente a estos flujos de trabajo es alta, ya que cada actividad genera una multitud de **productos de trabajo** o **artefactos** (por ejemplo, casos de uso, modelos de dominio, prototipos de interfaz, código fuente, casos de prueba, etc.) [136, 137]. La acumulación, evolución y relación entre estos artefactos requiere un control riguroso para evitar que el proceso se desmorone bajo el peso de sus propios entregables [136, 182].

---

### La Complejidad y Maleabilidad del Software: La Teoría de Frederick Brooks
Para comprender el software y sus desafíos, la cátedra recomienda estudiar el paper clásico de Frederick Brooks, **"No Silver Bullet" ("No existen balas de plata")** [180]. Brooks argumenta que el desarrollo de software es intrínsecamente difícil y divide sus dificultades en dos categorías [180]:
1.  **Dificultades Esenciales:** Aquellas inherentes a la naturaleza misma del software, las cuales no pueden ser eliminadas por ninguna tecnología o herramienta [180]. Estas propiedades esenciales son:
    *   **Complejidad:** El software tiene más estados y partes interactuando de manera no lineal que cualquier máquina humana física.
    *   **Conformidad:** El software debe conformarse a interfaces, leyes y sistemas preexistentes diseñados por humanos, sin la regularidad de las leyes de la física.
    *   **Mabilidad (Changeability):** El software es un "blanco móvil"; por su naturaleza intangible, existe una constante presión y facilidad percibida para modificarlo.
    *   **Invisibilidad:** El software no tiene una representación espacial o geométrica simple que pueda ser visualizada completamente de forma directa.
2.  **Dificultades Accidentales:** Aquellas que surgen del estado del arte de las tecnologías de soporte de una época (como la velocidad de los compiladores, la sintaxis engorrosa de los lenguajes de programación antiguos, o la falta de editores visuales) [180]. Brooks señala que las balas de plata del pasado solo han resuelto la complejidad accidental, pero que la complejidad esencial permanece intacta [180].

#### Origen de los Cambios en el Software
Debido a la maleabilidad intrínseca del software, los cambios son inevitables y tienen múltiples orígenes [3]:
*   **Cambios del negocio y nuevos requerimientos:** Evolución de las necesidades operativas de la organización [3].
*   **Soporte de cambios de productos asociados:** Actualizaciones en sistemas operativos, hardware, APIs de terceros o plataformas de ejecución [3].
*   **Reorganización de prioridades por crecimiento:** Ajustes internos en la estrategia de la empresa [3].
*   **Cambios presupuestarios:** Limitaciones o expansiones en los recursos financieros asignados [3].
*   **Defectos encontrados a corregir:** Necesidad de subsanar fallas detectadas en ambientes de testing o producción [3].
*   **Oportunidades de mejora:** Refactorizaciones para mejorar la mantenibilidad, escalabilidad o performance del código [3].

---

### Dimensiones del Software (Las 4P + Herramientas)
La Ingeniería de Software aborda el desarrollo de sistemas de manera holística a través de cuatro dimensiones fundamentales, conocidas como las **4P**, complementadas por las **Herramientas** [140]:
1.  **Personal:** Es la dimensión más importante, ya que el desarrollo de software es una **actividad humano-intensiva** [140]. La materia prima clave son las capacidades, competencias, motivación y organización de las personas del equipo [140].
2.  **Proceso:** El marco referencial, políticas y disciplinas que guían el orden de las actividades [139, 140]. Sirve como una "guía teórica" o libro que define *cómo* deben hacerse las cosas [169].
3.  **Proyecto:** La unidad de gestión del trabajo de las personas y de la organización de los recursos [146]. Se caracteriza por tener un inicio y un fin, objetivos claros, involucrados definidos, y la generación de **resultados únicos** mediante una elaboración gradual [144, 145]. El proyecto materializa el proceso en la realidad [143].
4.  **Producto:** El entregable tecnológico final que proporciona valor al cliente y satisface sus necesidades [140, 144, 145]. Cada proyecto que se ejecuta obtiene como resultado una **versión diferente** de un producto [146].

#### El Rol de las Herramientas y de la Inteligencia Artificial (IA)
Las **herramientas** permiten la automatización del proceso para aumentar la productividad y reducir el error humano [140, 148]. La **Inteligencia Artificial** debe ser entendida estrictamente como una herramienta de automatización que asiste al equipo de desarrollo, pero bajo ninguna circunstancia reemplaza al criterio humano [140]. El docente de la cátedra enfatiza que la IA "se debe usar pero con supervisión, como si fueran niños" [140].

---

### Clasificación de las Disciplinas de la Ingeniería de Software
El cuerpo de conocimiento de la Ingeniería de Software (basado en estándares de la IEEE, ACM y compilado en el SWEBOK) se clasifica en tres grandes grupos de disciplinas [139]:

```
                     ┌───────────────────────────────────────┐
                     │   INGENIERÍA DE SOFTWARE (SWEBOK)     │
                     └───────────────────┬───────────────────┘
                                         │
         ┌───────────────────────────────┼───────────────────────────────┐
         ▼                               ▼                               ▼
┌──────────────────┐           ┌──────────────────┐            ┌──────────────────┐
│    TÉCNICAS      │           │    DE GESTIÓN    │            │   DE SOPORTE     │
│ (Construcción)   │           │ (Administración) │            │  (Protectoras)   │
└────────┬─────────┘           └────────┬─────────┘            └────────┬─────────┘
         │                              │                               │
         ├─ Requerimientos              ├─ Planificación                ├─ SCM (Gestión de
         ├─ Análisis                    └─ Monitoreo y Control             Configuración)
         ├─ Diseño                                                      └─ SQA (Asegura-
         ├─ Implementación                                                 miento Calidad)
         ├─ Prueba (Testing)
         └─ Despliegue
```

1.  **Disciplinas Técnicas:** Orientadas de forma directa a la construcción técnica del producto de software [139, 142]. Incluyen requerimientos, análisis, diseño, implementación, prueba y despliegue [139]. La cátedra de ISW asume de manera directa la profundización de las actividades finales: **Prueba (Testing)** y **Despliegue** [139, 148].
2.  **Disciplinas de Gestión:** Orientadas a la administración, dirección y coordinación de los recursos, cronogramas y personal en el contexto del proyecto [139, 154]. Se compone de la **Planificación** y el **Monitoreo y Control** [154]. En esta cátedra se abordan bajo enfoques tradicionales (superficialmente) y ágiles/Lean (marcos como Scrum) [154, 157].
3.  **Disciplinas de Soporte (o "Protectoras"):** Son disciplinas **transversales** que acompañan al producto y al proyecto durante todo su ciclo de vida [3, 162]. No se limitan a una fase específica del cronograma; se ejecutan de manera continua desde el día cero [163]. Sus dos pilares son:
    *   **Gestión de Configuración de Software (SCM):** Responsable de mantener la integridad y trazabilidad del producto frente al cambio continuo [163, 164].
    *   **Aseguramiento de Calidad de Software (SQA):** Responsable de evaluar procesos y productos mediante auditorías y revisiones sistemáticas para asegurar la satisfacción de expectativas y necesidades [164, 169].

#### Relación entre Calidad del Producto y Calidad de las Personas: La Calidad Subjetiva
La **calidad** es intrínsecamente **subjetiva** y se define como el nivel de satisfacción de las necesidades y expectativas del usuario [166].
*   **Necesidades:** Requerimientos explícitamente manifestados y documentados por el usuario [167, 168].
*   **Expectativas:** Deseos implícitos que el usuario asume como "obvios" y no expresa verbalmente [167, 168]. El analista debe esforzarse por transformar las expectativas en necesidades explícitas para evitar fallas graves de calidad en la aceptación [168].

El aseguramiento de calidad (SQA) acompaña la construcción del producto para detectar desviaciones de manera temprana [169]. Para garantizar su objetividad, las organizaciones establecen métricas [169].

#### Política de Métricas de la Cátedra: Las Métricas y el Factor Humano
Las **métricas** son valoraciones cuantitativas objetivas (números) que eliminan la subjetividad de respuestas vagas como "vamos bien" o "falta poco" [169]. Sin embargo, la cátedra establece una regla ética inquebrantable: **jamás se deben utilizar las métricas para evaluar o tomar acciones correctivas sobre las personas de forma directa** [169, 172]. El software siempre tendrá errores [172]. Si se penaliza o premia económicamente a los ingenieros en base a los defectos detectados (por ejemplo, el caso verídico comentado en clase donde un gerente ofreció pagar dinero a los testers por error encontrado y descontar a los desarrolladores, lo cual llevó a conflictos destructivos y apuestas de asados que arruinaron la moral del equipo), los desarrolladores ocultarán los defectos, boicotearán las pruebas y la confianza del equipo colapsará de inmediato [172]. Las métricas deben medir la performance del **proceso**, del **proyecto** y del **producto**, pero nunca de las personas de manera aislada [169, 172].

#### Acuerdos de Alcance Curricular: Auditorías vs. Peritajes
Para evitar la duplicación de contenidos con las asignaturas de años superiores ("Proyecto Final" en 5.º año y "Administración de Sistemas" en 4.º/5.º año), la cátedra de ISW mantiene un acuerdo formal de alcance [174]:
*   **Ingeniería de Software (ISW):** Se enfoca de manera exclusiva en las **auditorías de configuración** ejecutadas durante el proceso de construcción y desarrollo del software (PCA y FCA) [174].
*   **Administración de Sistemas:** Se encarga de enseñar **auditorías informáticas de sistemas en producción** (evaluación de la operación activa del software) y los **peritajes informáticos judiciales** [174].

---

## 2. La Disciplina de Gestión de Configuración de Software (SCM)

### Definición Formal de SCM
De acuerdo con el estándar **ANSI/IEEE 828 (1990)**, la Gestión de Configuración de Software es:
> *"Una disciplina que aplica dirección y monitoreo administrativo y técnico a: identificar y documentar las características funcionales y técnicas de los ítems de configuración, controlar los cambios de esas características, registrar y reportar los cambios y su estado de implementación y verificar correspondencia con los requerimientos"* [4, 14].

SCM es, por lo tanto, la disciplina de ingeniería encargada de estabilizar la evolución de los productos de software en puntos clave y controlar de manera formal los cambios que ocurran a partir de allí [61].

---

### Propósito y Valor de SCM: El Concepto de "Integridad del Producto"
El propósito fundamental de SCM es establecer y mantener la **integridad de los productos de software** a lo largo de todo su ciclo de vida [5, 62]. La **integridad del producto** se alcanza cuando este cumple simultáneamente con los siguientes cuatro criterios esenciales [5]:
1.  **Satisface las necesidades del usuario:** Cumple de manera fiel con los requerimientos especificados y acordados [5].
2.  **Rastreabilidad (Traceability):** Puede ser fácil y completamente rastreado hacia atrás y hacia adelante durante todo su ciclo de vida [5]. Es decir, se puede asociar de forma transparente cada línea de código a un requerimiento de diseño, y este a una necesidad del cliente [183].
3.  **Criterios de Performance:** Satisface las especificaciones técnicas de velocidad, concurrencia, estabilidad y comportamiento operativo [5].
4.  **Expectativas de Costo y Plazo:** Su desarrollo, entrega y mantenimiento se ajustan a las restricciones financieras y cronogramas acordados con el cliente [5].

SCM actúa como un reductor de riesgo crítico en los proyectos de software, protegiendo al producto de las distorsiones que introduce el cambio caótico [82].

---

### Problemas Comunes ante la Ausencia de SCM
Cuando un proyecto no aplica SCM, se expone inevitablemente al caos y a fallas destructivas que impactan la productividad y la calidad del entregable [60]. Los siete problemas clásicos de gestión de componentes identificados por la cátedra son [6]:
1.  **Pérdida de un componente:** Pérdida física de código fuente, diagramas de diseño o scripts de base de datos debido a que no se encontraban centralizados o respaldados.
2.  **Pérdida de cambios (Sobreescritura):** Cuando dos personas trabajan sobre el mismo componente y uno sobreescribe el trabajo del otro al guardar sus cambios, perdiéndose horas o días de esfuerzo.
3.  **Falta de sincronía Fuente - Objeto - Ejecutable:** No saber a ciencia cierta si el archivo ejecutable que está corriendo en producción fue compilado a partir del código fuente exacto que está almacenado en el repositorio.
4.  **Regresión de fallas:** Defectos que ya habían sido identificados, analizados y corregidos en el pasado vuelven a aparecer en versiones nuevas debido a que se utilizó una base de código vieja sin las modificaciones previas.
5.  **Doble mantenimiento:** Realizar las mismas correcciones o mejoras de manera duplicada e independiente en distintas ramas de código por no contar con una estrategia formal de integración.
6.  **Superposición de cambios:** Modificaciones conflictivas en partes comunes del sistema que se interfieren mutuamente y dañan la estabilidad general.
7.  **Cambios no validados:** Incorporar cambios directamente sobre el producto en producción sin haber pasado por un proceso de revisión, prueba y aprobación formal.

#### El Dilema de la "Última Versión Recontra Última"
Este problema es la manifestación clásica de la falta de SCM a nivel de archivos [179]. Sin herramientas o políticas claras de nomenclatura, los miembros del equipo guardan copias físicas con nombres improvisados como `informe_final.docx`, `informe_final_v2.docx`, `informe_final_final_este_si.docx` [179]. Esto genera un descontrol que paraliza las entregas y destruye la credibilidad del equipo técnico [179].

---

## 3. Conceptos Clave de la Gestión de Configuración

### Ítem de Configuración de Software (SCI / IC)
Un **Ítem de Configuración (IC)** es:
> *"Todos y cada uno de los artefactos que forman parte del producto o del proyecto, que pueden sufrir cambios o necesitan ser compartidos entre los miembros del equipo y sobre los cuales necesitamos conocer su estado y evolución."* [7]

Un IC abarca mucho más que los simples archivos de código ejecutable [103]. Incluye de manera exhaustiva [103]:
*   **Planes:** Planes de proyecto, de calidad, de SCM, de iteración [7, 8, 103].
*   **Especificaciones de Requerimientos:** Documento de Especificación de Requerimientos de Software (ERS), casos de uso, modelos gráficos [16, 104].
*   **Diseño:** Documentación de arquitectura de software, especificaciones de interfaces de usuario, esquemas de bases de datos [8, 104].
*   **Código Fuente y Construcción:** Código de programación, código heredado (legacy, COTS, GFI), scripts de construcción (build scripts, makefiles, scripts ANT) [104, 105].
*   **Entorno de Construcción y Soporte:** Compiladores utilizados, variables de red, bibliotecas de terceros [80, 105].
*   **Pruebas:** Casos de prueba, scripts de automatización de pruebas, datos de prueba y resultados registrados [8, 105].
*   **Documentación de Usuario:** Manuales de usuario, guías de instalación, documentación de despliegue [7, 8, 105].

#### Ciclo de Vida Diferenciado: IC de Proyecto vs. IC de Producto
Los ítems de configuración deben clasificarse según la duración de su relevancia [187]:
*   **ICs de Proyecto (Temporales):** Son artefactos cuya utilidad práctica e histórica se agota cuando finaliza el proyecto o una fase específica del desarrollo [187]. Sus ciclos de vida son cortos [187, 188]. Ejemplos: las minutas de reuniones de avance, cronogramas de Gantt del proyecto, o los planes de iteración individuales [16, 187, 188]. No sobreviven al proyecto y no trascienden en el mercado [187].
*   **ICs de Producto (Permanentes):** Son aquellos artefactos que trascienden la vida de los proyectos individuales, persistiendo y evolucionando en el mercado mientras el producto de software siga existiendo y siendo mantenido por la organización [187]. Ejemplos: el código fuente, la arquitectura de software, la especificación de requerimientos del sistema (ERS), y el manual de usuario [16, 187]. Un único producto puede ver pasar decenas de proyectos a lo largo de los años (como el ejemplo de Microsoft Word, que ha evolucionado desde Word para DOS, pasando por Word para Windows, la integración en la suite Office, el cambio de interfaz de 2012, hasta Office 365) [147]. En cada uno de estos proyectos, los ICs de producto continúan su ciclo evolutivo permanente [187].

#### Esquema de Nombrado Único y el Uso de Metadatos
Para evitar duplicación física de archivos, la cátedra y las buenas prácticas prohíben estrictamente incluir el número de versión como parte del nombre físico del archivo (por ejemplo, evitar guardar el archivo como `ERS_v2.pdf`) [185]. 
*   **Nombres unívocos:** El archivo físico en el repositorio debe mantener siempre un nombre unívoco y estático (por ejemplo, `ERS.pdf`) [185].
*   **Control por Metadatos:** La herramienta de SCM (como Git o Subversion) se encarga de manera automatizada de gestionar el historial de versiones en su base de datos a través de metadatos [185, 187]. Esto permite reconstruir cualquier versión anterior a demanda del usuario, sin saturar las carpetas con múltiples copias del mismo documento [180, 187].

---

### Versión y Variante
*   **Versión:** Es la forma particular de un artefacto en un instante de tiempo o contexto dado, representando un estado dentro de una **evolución lineal** de desarrollo [8]. El control de versiones se ocupa de hacer seguimiento a la evolución temporal de cada IC por separado, representándose gráficamente como un grafo secuencial [8, 9].
*   **Variante:** Es una versión de un ítem de configuración que evoluciona por separado y representa una **configuración alternativa** [9]. El software adopta variantes para cumplir con requerimientos específicos sin perder su identidad de producto común [9]. Ejemplos de variantes incluyen adaptaciones para distintos sistemas operativos (variante para Windows vs. variante para Linux), plataformas de hardware (móvil vs. desktop), o idiomas de despliegue [9].

---

### Configuración de Software
Una **configuración de software** es el conjunto integrado de ítems de configuración (CIs) con su correspondiente versión específica en un momento unívoco y determinado [10, 182]. Se asimila conceptualmente a una **foto o instantánea (snapshot)** del estado global del repositorio del proyecto en un momento dado [10, 182].

---

### El Repositorio
El **repositorio** es una base de datos centralizada o distribuida que almacena de manera segura todos los ítems de configuración (ICs) [10]. El repositorio no solo resguarda los archivos físicos, sino que mantiene de manera permanente la historia completa de cada IC, junto con sus atributos de auditoría (autor, fecha del commit, comentario) y las relaciones de dependencia lógica entre ellos [10].

#### Comparación Arquitectónica de Repositorios

| Criterio | Repositorio Centralizado | Repositorio Descentralizado (Distribuido) |
| :--- | :--- | :--- |
| **Definición** | Un único servidor central contiene la totalidad del historial y de los archivos con sus versiones [11]. | Cada máquina cliente de desarrollo posee una copia exacta y completa del repositorio [11]. |
| **Punto Único de Falla** | Si el servidor central falla o pierde la conectividad, "estamos al horno": nadie puede hacer commit ni ver historiales [11]. | Si el servidor central falla, se puede reconstruir de inmediato haciendo "copiar y pegar" desde la máquina de cualquier desarrollador [11]. |
| **Control Administrativo** | Los administradores tienen un control absoluto y directo sobre los permisos de acceso y políticas de commit [11]. | Requiere una gestión de confianza coordinada y acuerdos en las ramas de integración [11]. |
| **Modo de Trabajo** | Dependencia absoluta de la conexión de red para la gran mayoría de las operaciones del historial [11]. | Permite trabajar, consultar el historial completo de versiones, crear ramas y hacer commits de forma local sin conexión a red [11]. |

#### Operaciones Básicas y Mecánica de Uso
Las interacciones cotidianas del desarrollador con el repositorio involucran operaciones estándar [11, 180]:
*   **Check-out (Extracción):** Operación para obtener una copia de trabajo local (workspace) de los archivos del repositorio para iniciar una tarea de desarrollo [11].
*   **Check-in / Commit (Devolución/Confirmación):** Operación que transfiere los archivos modificados desde el área de trabajo local de vuelta al repositorio, creando una versión nueva e inmutable [11]. Los commits deben ser estrictamente **cohesivos**: no se deben agrupar cientos de cambios no relacionados en un solo commit; cada commit debe representar un cambio lógico y autocontenido, acompañado de un mensaje descriptivo claro en sus metadatos [180, 185, 186].
*   **Update (Actualización):** Operación que descarga e integra en el área de trabajo local los últimos cambios realizados y confirmados por otros desarrolladores en el repositorio común, asegurando la sincronización constante del equipo [11, 31].

---

### Línea Base (Baseline)
Una **Línea Base (Baseline)** es una configuración de software formalmente revisada y acordada que sirve como base común para desarrollos posteriores [12]. Una vez establecida, **solo puede ser modificada a través de un procedimiento formal de control de cambios** [12]. Su función vital es permitir ir atrás en el tiempo para reproducir con total precisión el entorno de desarrollo y el estado exacto del producto en un hito histórico específico del proyecto [12].

#### Identificación y Etiquetado
Para marcar y separar una línea base del desarrollo cotidiano, se utilizan **etiquetas (tags)** dentro de la herramienta de control de versiones [12]. Las etiquetas fijan de manera permanente las versiones específicas de todos los ICs que conforman la línea base en ese instante, impidiendo que cambios posteriores alteren esa "foto" histórica [12]. La cátedra advierte que no se debe confundir la etiqueta de una línea base con la versión comercial final del producto [12].

#### Hitos y Representación Temporal de las Líneas Base
A lo largo de un ciclo de desarrollo de software formal, se establecen múltiples líneas base asociadas a hitos de revisión técnica [95, 96, 97]:

```
      System Requirements        Preliminary Design            Critical Design            System Performance
            Review                   Review (PDR)                Review (CDR)                Test Baseline
               │                          │                           │                            │
               ▼                          ▼                           ▼                            ▼
      ┌─────────────────┐        ┌─────────────────┐        ┌──────────────────┐         ┌──────────────────┐
      │   LÍNEA BASE    │        │   LÍNEA BASE    │        │    LÍNEA BASE    │         │    LÍNEA BASE    │
      │   FUNCIONAL     │        │   ASIGNADA      │        │    PRODUCTO PREL.│         │    DE PRODUCTO   │
      └─────────────────┘        └─────────────────┘        └──────────────────┘         └──────────────────┘
```

1.  **Línea Base Funcional:** Establecida en la Revisión de Requerimientos del Sistema (SRR). Su entrada principal es la especificación del sistema actualizada y su resultado es la definición inicial de las funciones globales del sistema [95].
2.  **Línea Base Asignada (Allocated Baseline):** Establecida en la Revisión Preliminar de Diseño (PDR). Define las especificaciones de requerimientos de software (SRS) e interfaces (IRS) trazadas directamente desde los requerimientos del sistema [95].
3.  **Línea Base de Producto Preliminar (o de Diseño de Detalle):** Establecida en la Revisión de Diseño Crítico (CDR). Contiene el diseño detallado, los planes de pruebas y el diseño de interfaces actualizado e inspeccionado [96].
4.  **Línea Base de Producto (Product Baseline):** Establecida tras completar con éxito las auditorías de configuración al final del proceso de pruebas del sistema, confirmando que todos los CIs están completamente validados y listos para producción [97].

---

### Ramas (Branching) e Integración (Merging)
*   **Ramas (Branches):** Bifurcaciones lógicas del desarrollo que permiten a los desarrolladores aislar sus cambios cotidianos y experimentar de manera segura sin perturbar la estabilidad de la rama principal (denominada técnicamente **Trunk**, **Master** o **Main**) [13]. Las ramas se crean con un propósito y una semántica específicos (por ejemplo, corregir un bug crítico o desarrollar un feature nuevo) y pueden ser eventualmente descartadas o integradas [13].
*   **Integración (Merging):** Operación formal que fusiona los cambios desarrollados en una rama de vuelta a la rama principal (Trunk/Master) [13, 14].
*   **Resolución de Conflictos:** Durante el merge, si un mismo componente fue modificado simultáneamente en ambas ramas de forma incompatible, surgirán conflictos [14]. Estos conflictos deben ser analizados utilizando herramientas de diferencias (**diff**) para conciliar las líneas afectadas y asegurar que el código integrado final sea correcto antes de guardarse [14]. La regla general dicta que toda rama útil debe integrarse eventualmente a la principal o ser descartada para evitar ramas muertas de larga duración [14].

---

## 4. Actividades Fundamentales de SCM (Elementos Principales)

De acuerdo con la teoría clásica de Bersoff y la bibliografía del Airlie Software Council, las actividades de SCM se dividen en cuatro pilares fundamentales integrados [63, 67]:

```
                      ┌───────────────────────────────────────┐
                      │    ACTIVIDADES FUNDAMENTALES SCM      │
                      └───────────────────┬───────────────────┘
                                          │
         ┌────────────────────────┬───────┴────────┬────────────────────────┐
         ▼                        ▼                ▼                        ▼
┌──────────────────┐     ┌──────────────────┐    ┌──────────────────┐     ┌──────────────────┐
│  IDENTIFICACIÓN  │     │    CONTROL DE    │    │    AUDITORÍAS    │     │   REGISTRO DE    │
│  DE CONFIGURAC.  │     │     CAMBIOS      │    │ DE CONFIGURACIÓN │     │  ESTADO (STATUS) │
└──────────────────┘     └──────────────────┘    └──────────────────┘     └──────────────────┘
```

### I. Identificación de la Configuración
Es la base sobre la que se apoya SCM. Consiste en definir el esquema de organización técnica que permitirá conocer con exactitud qué elementos forman parte del sistema y en qué versión se encuentran [75]. Sus actividades incluyen [15, 75]:
*   Determinar la estructura lógica del producto y seleccionar qué artefactos serán clasificados como ítems de configuración (ICs) [75, 80].
*   Asignar caracteres de identificación, esquemas y convenciones de nomenclatura unívocos y estandarizados para todos los CIs [15, 75].
*   Definir la estructura de carpetas y jerarquía dentro del repositorio [15, 178].
*   Establecer las reglas de etiquetado y versionado automático manejadas por la herramienta [80].

---

### II. Control de Cambios
Es la actividad destinada a asegurar que todas las modificaciones que se realicen sobre elementos que se encuentran **en una línea base** se procesen de manera controlada, formal y autorizada, evitando la alteración arbitraria [16, 17].

#### Proceso Formal de Control de Cambios
El flujo operativo formal recomendado se activa ante una solicitud de cambio y sigue las siguientes etapas de evaluación y acción [16, 17]:

```
┌─────────────┐     ┌─────────────────────┐     ┌──────────────────┐     ┌──────────────┐
│ Generación  │────▶│ Análisis de Impacto │────▶│  Evaluación CCC  │────▶│  Decisión y  │
│ de SPR/ECP  │     │ (Técnico y Costos)  │     │   (Comité)       │     │ Notificación │
└─────────────┘     └─────────────────────┘     └──────────────────┘     └──────┬───────┘
                                                                                │
                               ┌────────────────────────────────────────────────┘
                               ▼
                    ┌─────────────────────┐     ┌──────────────────┐     ┌──────────────┐
                    │  Orden de Cambio o  │────▶│ Ejecución, Gates │────▶│  Cierre de   │
                    │  estudio técnico    │     │ y Pruebas        │     │  la Petición │
                    └─────────────────────┘     └──────────────────┘     └──────────────┘
```

1.  **Generación de la Petición:** Un stakeholder, cliente, desarrollador o tester detecta un defecto o una oportunidad de mejora y redacta formalmente un **Reporte de Problema de Software (SPR - Software Problem Report)** o una **Propuesta de Cambio de Ingeniería (ECP - Engineering Change Proposal)** [106, 121].
2.  **Análisis de Impacto:** Antes de tomar una decisión, se realiza un análisis multifocal exhaustivo que debe considerar [17]:
    *   *Aspectos Técnicos:* Viabilidad de la solución técnica propuesta [17].
    *   *Efectos Colaterales:* Identificación de otros CIs que se verán afectados por la modificación [17].
    *   *Costos del Proyecto:* Estimación del esfuerzo, horas de desarrollo y testing requeridas [17].
    *   *Impacto General:* Efectos sobre el cronograma general, interfaces del cliente e hitos contractuales [17].
3.  **Evaluación por el Comité de Control de Cambios (CCC):** El comité examina formalmente el SPR/ECP, sopesando el análisis de impacto con las prioridades del negocio [17, 106].
4.  **Generación de Orden de Cambios (Decisión):** Si se aprueba, se genera una orden de cambio formal de ingeniería, se asigna al equipo de desarrollo y se coloca en la cola de trabajo de la iteración [17].
5.  **Ejecución y Verificación:** Se realiza el cambio técnico en el espacio de desarrollo y se somete a estrictos controles de calidad e inspecciones antes de autorizarse su compilación y promoción [106].
6.  **Cierre de la Petición:** Una vez verificado y promovido el cambio exitosamente, el SPR se cierra formalmente en el sistema de registro de estado [107].

#### El Comité de Control de Cambios (CCC / CCB / ERB)
El **Comité de Control de Cambios** (también llamado CCB o ERB) es un órgano de toma de decisiones integrado de manera multidisciplinaria por representantes de todas las áreas clave interesadas en el proyecto: análisis/requerimientos, diseño, implementación, testing, calidad, administración y, en ocasiones, representantes del cliente [18, 108]. Su responsabilidad primaria es asegurar que solo se implementen los cambios estrictamente necesarios y debidamente analizados [108].

#### Roles dentro del CCC
*   **Chairperson (Presidente del Comité):** Es el responsable final de la toma de decisiones y de dirimir cualquier disputa interna que surja entre los miembros del comité [109]. Sus funciones abarcan convocar las reuniones, solicitar análisis de impacto, otorgar aprobaciones finales en su jurisdicción, mantener informada a la alta gerencia sobre impactos en costos/plazos y definir los criterios de aceptabilidad de cambios [109].
*   **Revisores (Miembros del Comité):** Representantes de cada área técnica y organizativa [110]. Cada revisor tiene la obligación de realizar el análisis de impacto dentro de su disciplina, participar en las negociaciones representando los intereses de su área, y contar con la autoridad delegada suficiente para comprometer recursos de su organización en las decisiones del comité [110].

#### Acciones y Decisiones Formales del CCC (Clasificación de Estados de SPR)
Ante un SPR, el comité puede emitir una de las siguientes decisiones formalizadas [107]:
*   **Reject (Rechazar):** Se descarta la petición por no considerarse válida, por falta de viabilidad o por estar fuera de alcance [107].
*   **Assign for Study (Asignar para Estudio):** Se envía el SPR a la organización técnica para un análisis de impacto más profundo o investigación de la falla [107].
*   **Assign for Correction (Asignar para Corrección):** Se aprueba formalmente el cambio y se asigna al equipo para su codificación [107].
*   **Append (Bloquear/Anexar):** Se anexa el SPR a otra petición abierta existente bajo análisis activo, evitando el esfuerzo duplicado [107].
*   **Reanalysis (Reanalizar):** Se reenvía el SPR al equipo técnico debido a que la información presentada en la propuesta o el análisis de impacto es inconsistente [107].
*   **Table (Archivar en Mesa):** Se difiere la discusión del cambio sin establecer una fecha límite inmediata de tratamiento [107].
*   **Defer (Diferir):** Se pospone el análisis o la corrección de la falla y se le asigna de manera obligatoria una fecha límite o número de versión futura para su tratamiento [107].
*   **Identify Testing/Retest Requirements:** Definir formalmente las condiciones de prueba y el plan de regresión requerido para validar el cambio [107].
*   **Build System and Release (Autorizar Build):** Dar autorización a SCM para ejecutar una compilación oficial integrando el cambio aprobado para distribución [107].
*   **Close (Cerrar):** El problema se declara resuelto de manera definitiva y verificado exitosamente [107].

#### Clasificación Formal de Cambios
Los cambios se deben clasificar para asignar los niveles de autorización correspondientes de forma eficiente [114]:
*   **Cambios de Clase I:** Cambios mayores que alteran de forma directa los requerimientos contractuales, costos, plazos de entrega, garantías, o las características funcionales y de performance clave de la línea base formalizada [114]. Requieren la aprobación formal del cliente o de la alta gerencia corporativa [114].
*   **Cambios de Clase II:** Cambios menores, tales como corrección de errores ortográficos en manuales, modificaciones estéticas menores en documentación, o corrección de defectos internos de diseño que no violan especificaciones funcionales ni alteran presupuestos ni fechas [114]. Se resuelven con la aprobación del líder de proyecto y SCM, sin requerir intervención del cliente [114].
*   **Cambios Externos:** Modificaciones sobre información de propiedad conjunta (interfaces) con organizaciones con las que no se mantiene una relación contractual directa [114].
*   **Cambios Internos:** Modificaciones que afectan de forma exclusiva a información interna del equipo antes de ser formalmente entregada o expuesta al cliente [114].

---

### III. Auditorías de Configuración
Las auditorías evalúan de manera independiente el contenido de las líneas base para asegurar que lo construido coincida rigurosamente con lo documentado y especificado [63, 123].

#### Auditoría Física de Configuración (PCA)
La **PCA (Physical Configuration Audit)** es un proceso de verificación que asegura que la presencia física de todos los ítems de configuración especificados en la documentación de la línea base sea real y esté completa en las bibliotecas de almacenamiento de SCM [18, 81]. Comprueba que no falte ningún manual, archivo de código fuente, esquema de base de datos o documento complementario requerido, asegurando la reproducibilidad total del producto a partir de sus componentes físicos [81, 123].

#### Auditoría Funcional de Configuración (FCA)
La **FCA (Functional Configuration Audit)** consiste en una evaluación técnica independiente de los productos de software para verificar de manera exhaustiva que la funcionalidad real y el nivel de performance del sistema coincidan de forma exacta con la especificación formal de requerimientos establecida en la línea base [19]. Comprueba que todas las pruebas (test cases) hayan sido ejecutadas con éxito, alcanzando el estado de aprobación ("ok") o bien que consten como problemas reportados válidos en la nota de release del producto [19].

#### Relación con los Procesos de Validación y Verificación (V&V)
Las auditorías de configuración sirven de soporte directo a los procesos de **V&V** [19]:
*   **Validación:** Proceso que asegura que el problema del usuario sea resuelto de manera apropiada, garantizando que estemos construyendo el **producto correcto** que satisfaga las necesidades reales del usuario [19]. La FCA asiste a la validación al evaluar si la funcionalidad cumple los objetivos especificados [19].
*   **Verificación:** Proceso de aseguramiento técnico que evalúa si el producto cumple con los requisitos y estándares preestablecidos documentados en las líneas base anteriores [19]. Asegura que estemos construyendo el **producto de la manera correcta** [19]. La PCA asiste a la verificación al garantizar que el producto físico real se construya estrictamente a partir de la documentación aprobada [19].

---

### IV. Registro e Informe de Estado (Status Accounting)
Es la actividad de administración y rastreo de la información del sistema de software que registra de manera continua el estado de evolución del repositorio [63, 122]. Responde preguntas de trazabilidad clave como [66, 116]:
*   ¿Cuándo se creó y baselineó una versión específica de un IC? [122]
*   ¿Cuál es el estado de implementación de las propuestas de cambio aprobadas? [66]
*   ¿Qué cambios fueron integrados en el release actual y qué SPRs se cerraron con él? [115, 122]
*   ¿Quién tiene checked-out un archivo determinado para su modificación? [116]
*   ¿Cuáles son las discrepancias o inconsistencias detectadas durante la última auditoría? [122]

---

## 5. El Plan de SCM, las 5 Mejores Prácticas y las 10 Reglas de la Disciplina

### Estructura Estándar del Plan de SCM
El **Plan de Gestión de Configuración (Plan de SCM)** es un documento de planificación formal que se debe desarrollar en las etapas iniciales del proyecto [90]. Su estructura de contenido estándar recomendada incluye las siguientes secciones obligatorias [90]:
1.  **Introducción:** Propósito, alcance del plan y aplicabilidad general al proyecto [90].
2.  **Organización:** Estructura organizativa del equipo y su integración con áreas de Calidad, Desarrollo y Clientes [90].
3.  **Hitos y Fases del Proyecto:** Cronograma de evolución del proyecto con respecto al establecimiento de líneas base [90].
4.  **Identificación de la Configuración:** Criterios para seleccionar CIs, convención de nombres y estructura de carpetas del repositorio [90].
5.  **Gestión de Interfaces:** Procedimientos para el control de interfaces internas y externas del sistema [90].
6.  **Registro de Estado (Status Accounting):** Políticas y frecuencia para el reporte de métricas y estados de cambio [90].
7.  **Auditorías de Configuración:** Cronograma, procesos y criterios para la ejecución de PCA y FCA [90].
8.  **Gestión de Subcontratistas:** Procedimientos para auditar y controlar la calidad y versionado de los entregables de terceros [90].

---

### Las 5 Mejores Prácticas de SCM (Airlie Software Council - SPMN)
El Airlie Software Council identificó cinco prácticas esenciales para institucionalizar de manera exitosa la disciplina en la cultura de ingeniería de la empresa [57, 58]:
1.  **Hacer de SCM la responsabilidad de todos:** Crear una cultura corporativa estricta donde la adherencia a los procesos y políticas de SCM sea la única forma aceptable de trabajar en el proyecto [83].
2.  **Habilitar un proceso de ingeniería que facilite SCM:** Diseñar un flujo de trabajo diario donde mantener la disciplina de configuración no sea un obstáculo administrativo [84]. Identificar fricciones operativas para el desarrollador y optimizarlas continuamente [84].
3.  **Definir el proceso primero, seleccionar las herramientas después:** Evitar a toda costa comprar herramientas avanzadas para luego intentar forzar al equipo a adaptarse a ellas [87]. Se define el proceso acorde a la cultura y luego se elige la suite técnica que mejor lo automatice [87].
4.  **Dotar a SCM de personal con alta competencia técnica:** El personal del área de CM no debe ser administrativo de bajo nivel; deben ser ingenieros altamente calificados capaces de diseñar arquitecturas de compilación complejas, monitorear subcontratistas y automatizar pipelines de CI/CD [88].
5.  **Desarrollar el Plan de SCM de forma temprana:** La planificación de SCM debe nacer con la propuesta inicial del proyecto, asignándole presupuesto, recursos y plazos de forma explícita [90].

---

### Las 10 Reglas Fundamentales de SCM (Airlie)
1.  **Regla 1:** CM debe gestionar formalmente la propiedad de la información y colocar bajo control de configuración cada producto de trabajo de manera oportuna [91, 94].
2.  **Regla 2:** La identificación y control de cambios tempranos de artefactos y herramientas de soporte es una actividad integral al desarrollo [91, 102].
3.  **Regla 3:** El proceso de control de cambios debe ser simple, directo, consistente con la cultura organizacional y libre de burocracia excesiva [91, 106].
4.  **Regla 4:** Las funciones, responsabilidades de rol y flujos de decisión del CCB (Comité) deben estar perfectamente documentados [91, 107].
5.  **Regla 5:** El control de cambios debe ser una actividad prioritaria integrada en la mentalidad diaria del equipo de desarrollo [92, 111].
6.  **Regla 6:** Todo artefacto que sea promovido dentro del repositorio debe hacerlo superando previamente un **Quality Gate (Puerta de Calidad)** técnica y formal [92, 112].
7.  **Regla 7:** Todas las propuestas de modificación deben ser clasificadas estrictamente por clases (Clase I, II, etc.) para optimizar el flujo [92, 114].
8.  **Regla 8:** Toda entrega o release debe estar documentado de manera exhaustiva mediante un documento de **Descripción de Versión de Software (SVD - Software Version Description)** [92, 115].
9.  **Regla 9:** SCM debe mantener una visibilidad total y continua de quién está modificando qué, las relaciones entre CIs y el estado de SPRs abiertos [93, 116].
10. **Regla 10:** No compre herramientas comerciales avanzadas antes de definir formalmente el proceso operativo del equipo [93, 117].

#### Los 3 Corolarios Fundamentales
*   **Corolario 1:** Las métricas de evaluación de SCM deben ser un producto directo y natural del sistema automatizado [93, 118]. Si se requiere esfuerzo administrativo manual para extraer registros de integridad, la herramienta o el proceso están fallando [93, 118].
*   **Corolario 2:** Solo los desarrollos más pequeños y triviales pueden sobrevivir sin el uso de herramientas automatizadas de control de configuración [94, 118].
*   **Corolario 3:** Un sistema maduro, robusto y automatizado de SCM no requiere de un ejército de personas para su administración [94, 118]. Pocas personas capacitadas bastan para dar soporte de configuración a toda una organización de desarrollo [94, 118].

---

### La Segregación de Espacios de Trabajo (Workspaces de Control)
Para administrar de manera segura el ciclo de vida y los niveles de madurez de la información, SCM particiona el entorno en cinco espacios lógicos con políticas de acceso y modificación diferenciadas [97, 98]:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ENGINEERING WORKSPACE                           │
│  • Espacio privado del Ingeniero. Control libre de cambios.            │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │  Calidad: Calificación Técnica
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                            CM WORKSPACE                                │
│  • Compilación oficial, ejecución de scripts de construcción.          │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │  Aprobación formal del CCC / CCB
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      CONTROLLED PROJECT AREA                           │
│  • Estatus de pre-release. Compartido, inmutable sin orden de cambio.  │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │  Quality Gate: Suite de Pruebas
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                             TEST WORKSPACE                             │
│  • Entorno aislado de Testing. Escenarios, casos y reportes.           │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │  Aprobación Formal de Aceptación (FCA)
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    CUSTOMER-CONTROLLED WORKSPACE                       │
│  • Líneas base definitivas (Functional, Allocated, Product).           │
└────────────────────────────────────────────────────────────────────────┘
```

1.  **Espacio de Ingeniería (Engineering Workspace):** Espacio privado donde cada desarrollador realiza sus tareas de construcción cotidianas [98]. El contenido es controlado de manera libre por el ingeniero responsable de la tarea y allí los cambios se realizan de forma ágil sin requerir autorizaciones del comité [98, 99].
2.  **Espacio de SCM (CM Workspace):** Espacio restrictivo controlado en exclusiva por el Configuration Manager [99]. Contiene los scripts oficiales de compilación, herramientas de empaquetado y archivos de control necesarios para reconstruir las versiones del software [99]. Los demás miembros del equipo solo cuentan con privilegios de lectura [100].
3.  **Área de Proyecto Controlada (Controlled Project Area):** Alberga la información y entregables técnicos que han superado una puerta de calidad básica y se comparten internamente con el proyecto, pero que aún no han sido aceptados formalmente por el cliente para conformar una línea base definitiva [100]. Ningún elemento en este espacio puede ser modificado a menos que exista una orden de cambio autorizada por el comité (CCB) [101].
4.  **Espacio de Testing (Test Workspace):** Controlado por el Test Manager, contiene las configuraciones específicas del software liberadas oficialmente por SCM para pruebas, junto con los escenarios de prueba, datos de prueba, scripts de automatización e historiales de resultados [101, 102].
5.  **Espacio de Control del Cliente (Customer-Controlled Workspace):** Contiene la información y entregables formalmente aceptados y aprobados por el cliente, los cuales constituyen las líneas base del contrato (Línea Base Funcional, Asignada o de Producto) [102]. Ningún cambio se puede aplicar en este espacio sin la autorización del cliente o un proceso de cambio Clase I [102].

---

## 6. SCM en Ambientes Ágiles y Gestión de Construcción (Build Management)

### SCM en Ambientes Ágiles
En el desarrollo de software ágil (marcos de trabajo como Scrum, Extreme Programming, etc.), SCM no desaparece, sino que se transforma para eliminar la fricción burocrática y maximizar el valor entregado en cada iteración (Sprint) [20, 21]. Se orienta bajo los siguientes principios conceptuales [20, 21]:
*   **Servir a los ingenieros de desarrollo:** SCM se diseña para empoderar al programador a integrar su código rápido y sin fricciones, en lugar de ser una barrera burocrática que ralentiza el desarrollo [20].
*   **Soporte continuo:** Hace seguimiento y coordina la integración en lugar de "vigilar" o controlar punitivamente a las personas del equipo [20, 21].
*   **Eliminación del desperdicio (Lean SCM):** Evita la generación de documentación redundante u obsoleta ("double documentation") [21, 47]. Si un build script describe de manera ejecutable los pasos para compilar, empaquetar e instalar el software, ese script constituirá en sí mismo la documentación viva y actualizada del proceso [47].
*   **Responsabilidad colectiva:** Mantener la integridad de la base de código del repositorio no es exclusividad del Configuration Manager; es una responsabilidad compartida de manera activa por todo el equipo técnico [21].
*   **Automatización Extrema:** Se busca automatizar todas las tareas repetitivas de verificación de calidad (Quality Gates) mediante herramientas integradas [21].

#### Debate sobre los Elementos Tradicionales en Agile
*   **El Comité de Control de Cambios (CCB):** En proyectos ágiles, la toma de decisiones sobre priorización de cambios se descentraliza y se agiliza [22]. El Product Owner (en Scrum) asume el rol de gestionar de forma continua el backlog y re-priorizar los requerimientos en base al valor del negocio [160]. Para cambios menores técnicos, la autoridad recae de forma directa en el equipo autoorganizado, eliminando la necesidad de reuniones formales y retrasos burocráticos del comité [158, 22].
*   **Las Auditorías:** No se postergan para el final del proyecto [45]. Las revisiones funcionales se ejecutan de manera incremental y continua al final de cada Sprint durante las reuniones de Review con el cliente, y las auditorías físicas de código y dependencias se automatizan en el pipeline de Integración Continua [22].
*   **Los Reportes de Estado:** Se simplifican utilizando tableros Kanban, reportes de churn de código generados automáticamente por la herramienta SCM y gráficos de Burn-down del Sprint, asegurando transparencia absoluta y visibilidad sin trabajo administrativo offline [21, 22].

---

### Concepto de Build (Construcción)
Un **Build (Construcción)** se define formalmente como:
> *"La etapa del proceso de ingeniería donde se integra todo o una parte de la aplicación de software a través de pasos automatizados."* [25]

El proceso del build incluye la extracción automatizada de componentes correctos del repositorio, la compilación del código, la inyección de metadatos, la resolución de archivos de configuración y el empaquetado del software en un binario ejecutable que provea valor [25].

#### Entradas de un Build
El build opera sobre componentes de entrada clasificados en tres tipos [26]:
*   **Archivos de Código Fuente:** Código de programación escrito por el equipo.
*   **Archivos de Metadatos:** Archivos de configuración XML/JSON, esquemas de bases de datos o recursos gráficos estáticos.
*   **Bibliotecas Precompiladas de Terceros:** Dependencias de código de proveedores externos o COTS.

#### Clasificación: Builds Limpios (Clean) e Incrementales (Dirty)
*   **Builds Completos o Limpios (Clean/Full Builds):** Se ejecutan eliminando previamente del área de trabajo todo componente derivado o binario remanente de compilaciones anteriores [26]. El build se inicia completamente desde cero, garantizando la consistencia y detectando errores de compilación ocultos, aunque a costa de un mayor tiempo de ejecución [26].
*   **Builds Incrementales o Sucios (Incremental/Dirty Builds):** Utilizan mecanismos internos de análisis de dependencias para identificar qué archivos fuente han sido modificados desde la última compilación exitosa [26]. Compila únicamente los componentes afectados y reutiliza los binarios intermedios no alterados, logrando una reducción drástica de tiempos de ejecución [26].

---

### Los Tres Patrones de Build en Agile
De acuerdo con el modelo de Steve Berczuk, Brad Appleton y Steve Konieczka en **Agile SCM**, existen tres patrones fundamentales de build, adaptados para diferentes consumidores y frecuencias [24, 29]:

```
           ┌────────────────────────────────────────────────────────┐
           │                  PRIVATE SYSTEM BUILD                  │
           │  • Quién: Desarrollador Individual                     │
           │  • Cuándo: Varias veces por tarea de desarrollo        │
           │  • Foco: Aislamiento, velocidad y pruebas rápidas      │
           └───────────────────────────┬────────────────────────────┘
                                       │  Commit Exitoso
                                       ▼
           ┌────────────────────────────────────────────────────────┐
           │                   INTEGRATION BUILD                    │
           │  • Quién: Todo el Equipo de Desarrollo                 │
           │  • Cuándo: Continuo (cada commit) o diario (Nightly)    │
           │  • Foco: Evitar la integración "Big Bang", test regr.  │
           └───────────────────────────┬────────────────────────────┘
                                       │  Hito de Entrega / Sprint End
                                       ▼
           ┌────────────────────────────────────────────────────────┐
           │                     RELEASE BUILD                      │
           │  • Quién: Testing Independiente, QA y Clientes         │
           │  • Cuándo: Al final de cada iteración / hito comercial  │
           │  • Foco: Distribución formal, BOM, etiquetado formal   │
           └────────────────────────────────────────────────────────┘
```

#### 1. Private System Build (Build de Sistema Privado)
*   **Audiencia / Consumidor:** El desarrollador individual que trabaja en un área aislada (Private Workspace) [29, 31].
*   **Propósito:** Proporcionar feedback inmediato sobre la consistencia y corrección de las modificaciones locales antes de enviarlas al repositorio común [29, 31, 34]. Aísla al equipo de errores de compilación ("romper el build") que retrasen el avance general [31, 34].
*   **Frecuencia:** Varias veces al día, durante los checkpoints del desarrollo de una tarea específica, y de manera obligatoria justo antes de realizar el commit [31, 33, 34].
*   **Secuencia Operativa de Pasos:**
    1.  **Workspace Update:** Sincronizar el área de trabajo local con el último estado estable de la rama común del repositorio para descargar cambios de otros ingenieros [31, 32].
    2.  **Fusión (Merge):** Reconciliar de manera local cualquier conflicto detectado en archivos editados de forma simultánea [32].
    3.  **Compilación Local:** Ejecutar una compilación local (usualmente de tipo incremental para optimizar velocidad) [32, 43].
    4.  **Pruebas Locales:** Ejecutar una suite rápida de pruebas unitarias y de smoke test para certificar la integridad técnica local [32, 45].
    5.  **Commit:** Si todo es exitoso, subir los cambios al codeline [31, 33].

#### 2. Integration Build (Build de Integración)
*   **Audiencia / Consumidor:** El equipo completo de desarrollo y el integrador del sistema [30, 35].
*   **Propósito:** Coordinar e integrar los cambios de todos los desarrolladores de forma regular y frecuente para evitar la "integración del Big Bang" al final de la iteración [36]. Proporciona una advertencia temprana ante inconsistencias o fallas de integración en un entorno limpio y neutral [30, 46].
*   **Frecuencia:** Automatizado de manera continua (desencadenado tras cada commit individual exitoso en la rama común) o ejecutado de forma programada periódica (builds diarios o "Nightly Builds") [36, 42].
*   **Secuencia Operativa de Pasos:**
    1.  Iniciar la construcción en una máquina de compilación centralizada y limpia, libre de variables locales de desarrolladores [30].
    2.  Ejecutar un build completo (Clean Build) para garantizar la consistencia e integridad total de la base de código [36, 44].
    3.  Ejecutar una suite exhaustiva de pruebas automatizadas (pruebas unitarias, funcionales y de integración) [36, 39].
    4.  Publicar de manera visible los resultados y alertar al equipo si la compilación falla [46].

#### 3. Release Build (Build de Entrega)
*   **Audiencia / Consumidor:** El equipo de Testing independiente (QA/V&V) y, en última instancia, el cliente final [30, 42].
*   **Propósito:** Empaquetar y almacenar de forma oficial los resultados binarios de la compilación para propósitos de instalación, entrega comercial y distribución en ambientes de producción [38].
*   **Frecuencia:** Baja frecuencia, ocurriendo únicamente en los hitos oficiales de cierre de Sprint o entregas contractuales específicas [40, 42].
*   **Secuencia Operativa de Pasos:**
    1.  **Etiquetado Formal (Labeling):** Aplicar de forma obligatoria un tag o etiqueta formal e inalterable sobre la línea base del código fuente en el repositorio [37, 39].
    2.  **Extracción limpia:** Descargar el código etiquetado en un servidor oficial exclusivo de compilaciones ("golden build machine") [37].
    3.  **Compilación Absoluta:** Ejecutar una compilación completa y limpia [37].
    4.  **Ejecución de Pruebas de Humo:** Pruebas de validación de empaquetado para asegurar que los instaladores y ejecutables funcionen [37, 45].
    5.  **Empaquetado de Distribución:** Comprimir la entrega en formatos instalables (por ejemplo, archivos ZIP, instaladores MSI, o contenedores Docker) [37].
    6.  **Generación Automatizada de Reportes de SCM:** Compilar de manera automatizada reportes técnicos críticos:
        *   **BOM (Bill of Materials - Lista de Materiales):** Lista exacta de los componentes de hardware, software, librerías y versiones que integran físicamente el release entregado [39].
        *   **CR (Change Request) Reports:** Detalle formal de qué Peticiones de Cambio (SPRs) han sido resueltas en este build y cuáles continúan pendientes [39, 40].
    7.  **Notificación Automática:** Envío por correo electrónico del reporte de resultados del build y distribución electrónica de la SVD (Descripción de Versión) a todos los stakeholders del proyecto [38, 115].

#### Tabla Comparativa de Diferencias Críticas (Integration vs. Release Build)

| Característica / Criterio | Integration Build (Build de Integración) | Release Build (Build de Entrega) |
| :--- | :--- | :--- |
| **Etiquetado de Código** | No suele aplicar una etiqueta permanente de baseline al repositorio común [39]. | Aplica de manera obligatoria una etiqueta inalterable para congelar el hito de código fuente [37, 39]. |
| **Entorno de Compilación** | Puede ejecutarse en servidores de integración comunes o dinámicos [36]. | Se ejecuta estrictamente en una máquina de compilación oficial y limpia ("golden build machine") [37]. |
| **Nivel de Pruebas** | Ejecuta suites exhaustivas y de larga duración de pruebas técnicas y de regresión [39]. | Se enfoca en validación de empaquetado y smoke tests para verificar la instalación del paquete [37]. |
| **Empaquetado** | El resultado se mantiene como artefacto intermedio para testing interno o feedback de devs [38]. | Genera instaladores formales, zips o empaquetados oficiales listos para su distribución y uso del cliente [37, 38]. |
| **Reportes SCM** | Rara vez incluye reportes formales de SCM integrados [39]. | Incluye obligatoriamente reportes automatizados de BOM (Bill of Materials) y estados de CR [39]. |

---

### Escala, Agilidad y Rendimiento del Build
Existe una tensión constante entre la necesidad de velocidad para el desarrollador y el requerimiento de estabilidad y consistencia para la calidad del producto [43, 44]. Para resolver este trade-off, los equipos implementan estrategias de optimización del rendimiento del build [50, 51]:
*   **Almacenamiento de Componentes Intermedios:** Guardar y reutilizar en el repositorio las bibliotecas compiladas estables y componentes intermedios para reducir de forma drástica los tiempos de los builds incrementales cotidianos [51].
*   **Modularización del Proyecto:** Dividir la arquitectura técnica en módulos independientes que generen dependencias limpias en tiempo de ejecución, de modo que modificar un archivo local solo requiera la compilación de su propio módulo y no de la aplicación completa [51].
*   **Inversión en Hardware Dedicado:** Dotar al equipo de servidores de build rápidos y con recursos de hardware paralelos [51]. El Airlie Council señala que ahorrar minutos en cada compilación para un desarrollador que compila varias veces al día compensa de inmediato el costo del hardware de servidores rápidos [51].
*   **Selección Inteligente de Utilidades de Compilación:** Elegir herramientas de automatización de build que soporten compilación paralela, cacheo de tareas y que demuestren una mejor velocidad de procesamiento y linkeo [51].

---

### SCM y la Alineación con los Valores del Manifiesto Ágil
Las buenas prácticas de compilación y gestión ágil de la configuración respaldan los cuatro pilares fundamentales del **Manifiesto Ágil** de la siguiente manera [20, 52, 53, 54]:

1.  **Individuos e Interacciones sobre Procesos y Herramientas:** SCM apoya el flujo humano de trabajo adaptándose a las necesidades de las personas, no obligándolas a realizar tareas burocráticas complejas [52]. Proporciona herramientas accesibles para que cualquier desarrollador pueda ejecutar un Private Build de forma local a voluntad, descentralizando el poder de compilación y promoviendo la colaboración técnica sin fricciones [52].
2.  **Software Funcionando sobre Documentación Exhaustiva:** SCM reemplaza la documentación muerta y obsoleta por **conocimiento ejecutable** a través de scripts de build automatizados [47, 53]. Las políticas de calidad de la empresa se incrustan en el pipeline de código de forma inalterable, automatizando la verificación de estándares técnicos [53].
3.  **Colaboración con el Cliente sobre Negociación Contractual:** SCM facilita la comunicación continua al permitir empaquetar de forma transparente, rápida y segura versiones del software estables para el cliente [53]. Al realizar builds de entrega (Release Builds) de manera frecuente, se alinean las expectativas con la realidad funcional del producto, reduciendo la fricción contractual [53].
4.  **Respuesta al Cambio sobre Seguir un Plan:** SCM no se concibe para impedir o ralentizar los cambios, sino para **facilitar el cambio continuo** con total seguridad [54]. Al contar con un control de versiones robusto, trazabilidad de requerimientos y un proceso ágil de merge y regresión de fallas, el equipo puede responder de inmediato a nuevas oportunidades del negocio del cliente sin poner en riesgo la integridad estructural del producto de software [54].

---
*Fin del Documento Unificado de SCM.*
