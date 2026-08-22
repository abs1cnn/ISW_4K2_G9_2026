# ISW_4K2_C2_2026

Repositorio correspondiente a la materia **Ingeniería de Software - 4K2 - Ciclo 2026**.
Grupo 9

## Participantes

- 83573 - Begliardo, Francisco Hugo
- 93686 - Brollo, Lucas Emanuel
- 85817 - Calvi, Francisco
- 85860 - Canaan, Abigail Sara
- 90023 - Carreras, Nicolás
- 85922 - Marrali, Matias
- 87440 - Mazzucco, Giuliano
- 63903 - Rodríguez, Fernando Marcos
- 86424 - Dagum , Braian David

# Reglas de nombrado

| Nombre                           | Regla de nombrado                        | Ubicación                                            | Extensiones admitidas                        |
| -------------------------------- | ---------------------------------------- | ---------------------------------------------------- | -------------------------------------------- |
| **Configuración**                | `ISW_[nombre_del_documento].[extensión]` | `00_Configuracion/`                                  | `.pdf`                                       |
| **Libros**                       | `[titulo_del_libro].[extensión]`         | `01_Bibliografia/Libros/`                            | `.pdf`, `.epub`, `.docx`                     |
| **Papers**                       | `[titulo_del_paper].[extensión]`         | `01_Bibliografia/Papers/`                            | `.pdf`                                       |
| **Material complementario**      | `[tema].[extensión]`                     | `01_Bibliografia/Material_Complementario/`           | `.pdf`, `.docx`, `.pptx`, `.xlsx`            |
| **Unidades**                     | `U[numero_de_unidad]`                    | `02_Unidades/`                                       | No aplica (carpeta)                          |
| **Notas**                        | `[tema].[extensión]`                     | `02_Unidades/U[numero_de_unidad]/Notas/`             | `.pdf`, `.pptx`, `.docx`                     |
| **Práctica**                     | `[tema].[extensión]`                     | `02_Unidades/U[numero_de_unidad]/Practica/`          | `.pdf`, `.docx`, `.xlsx`                     |
| **Resúmenes de unidad**          | `Res_[tema].[extensión]`                 | `02_Unidades/U[numero_de_unidad]/Resumenes/`         | `.pdf`, `.docx`, `.md`                       |
| **Trabajos prácticos**           | `TP[numero]`                             | `03_Trabajos_Practicos/`                             | No aplica (carpeta)                          |
| **Consignas**                    | `[tema].[extensión]`                     | `03_Trabajos_Practicos/TP[numero]/Consigna/`         | `.pdf`, `.docx`                              |
| **Desarrollo de TP**             | `[tema].[extensión]`                     | `03_Trabajos_Practicos/TP[numero]/Desarrollo/`       | `.pdf`, `.docx`, `.xlsx`, `.drawio`          |
| **Entregas de TP**               | `Entrega_TP[numero].[extensión]`         | `03_Trabajos_Practicos/TP[numero]/Entrega/`          | `.pdf`, `.zip`                               |
| **Primer parcial - anteriores**  | `[año]_[tema].[extensión]`               | `04_Parciales/Primer_Parcial/Parciales_Anteriores/`  | `.pdf`                                       |
| **Primer parcial - ejercicios**  | `Ej_[tema].[extensión]`                  | `04_Parciales/Primer_Parcial/Ejercicios/`            | `.pdf`, `.docx`                              |
| **Primer parcial - resúmenes**   | `Res_[tema].[extensión]`                 | `04_Parciales/Primer_Parcial/Resumenes/`             | `.pdf`, `.docx`, `.md`                       |
| **Segundo parcial - anteriores** | `[año]_[tema].[extensión]`               | `04_Parciales/Segundo_Parcial/Parciales_Anteriores/` | `.pdf`                                       |
| **Segundo parcial - ejercicios** | `Ej_[tema].[extensión]`                  | `04_Parciales/Segundo_Parcial/Ejercicios/`           | `.pdf`, `.docx`                              |
| **Segundo parcial - resúmenes**  | `Res_[tema].[extensión]`                 | `04_Parciales/Segundo_Parcial/Resumenes/`            | `.pdf`, `.docx`, `.md`                       |
| **Finales anteriores**           | `[año]_[tema].[extensión]`               | `05_Final/Finales_Anteriores/`                       | `.pdf`                                       |
| **Final - resúmenes**            | `Res_[tema].[extensión]`                 | `05_Final/Resumenes/`                                | `.pdf`, `.docx`, `.md`                       |
| **Final - ejercicios**           | `Ej_[tema].[extensión]`                  | `05_Final/Ejercicios/`                               | `.pdf`, `.docx`                              |
| **Presentaciones**               | `[tema].[extensión]`                     | `06_Clases/Presentaciones/`                          | `.pptx`, `.pdf`                              |
| **Apuntes**                      | `[tema].[extensión]`                     | `06_Clases/Apuntes/`                                 | `.pdf`, `.docx`, `.md`                       |
| **Grabaciones**                  | `[fecha]_[tema].[extensión]`             | `06_Clases/Grabaciones/`                             | `.mp4`, `.mp3`                               |
| **Trabajos de investigación**    | `TI[numero]`                             | `07_Trabajos_Investigacion/`                         | No aplica (carpeta)                          |
| **Lineamientos**                 | `[tema].[extensión]`                     | `07_Trabajos_Investigacion/Lineamientos/`            | `.pdf`, `.docx`                              |
| **Desarrollo TI**                | `[tema].[extensión]`                     | `07_Trabajos_Investigacion/TI[numero]/Desarrollo/`   | `.pdf`, `.docx`, `.xlsx`, `.drawio`, `.pptx` |
| **Entregas TI**                  | `Entrega_TI[numero].[extensión]`         | `07_Trabajos_Investigacion/TI[numero]/Entrega/`      | `.pdf`, `.zip`                               |


## Estructura del repositorio

```text
ISW/
│
├── 00_Configuracion/
│
├── 01_Bibliografia/
│   ├── Libros/
│   ├── Papers/
│   └── Material_Complementario/
│
├── 02_Unidades/
│   └── U<<Nro>>/
│       ├── Notas/
│       ├── Practica/
│       └── Resumenes/
│   
│
├── 03_Trabajos_Practicos/
│   └── TP<<Nro>>/
│       ├── Consigna/
│       ├── Desarrollo/
│       └── Entrega/ 
│
├── 04_Parciales/
│   ├── Primer_Parcial/
│   │   ├── Parciales_Anteriores/
│   │   ├── Ejercicios/
│   │   └── Resumenes/
│   │
│   └── Segundo_Parcial/
│       ├── Parciales_Anteriores/
│       ├── Ejercicios/
│       └── Resumenes/
│
├── 05_Final/
│   ├── Finales_Anteriores/
│   ├── Resumenes/
│   └── Ejercicios/
│
└── 06_Clases/
│   ├── Apuntes/
│   ├── Grabaciones/
│   └── Presentaciones/
│    
└── 07_Trabajos_Investigacion/
    ├── Lineamientos/
    └── TI<<Nro>>/
        ├── Desarrollo/
        └── Entrega/
```
