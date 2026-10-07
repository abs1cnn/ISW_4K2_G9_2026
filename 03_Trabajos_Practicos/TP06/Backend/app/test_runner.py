"""Ejecuta la suite de pytest en un subproceso y devuelve el resultado de cada test."""

import subprocess
import sys
import tempfile
import xml.etree.ElementTree as ET
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent.parent

# Carpeta dentro de tests/ -> nombre que se muestra en el panel
TIPOS = {
    "unit": "Unitarios",
    "integration": "Integración",
}


def ejecutar_tests() -> dict:
    with tempfile.TemporaryDirectory() as tmp:
        reporte = Path(tmp) / "reporte.xml"
        proceso = subprocess.run(
            [sys.executable, "-m", "pytest", "-v", "-p", "no:cacheprovider", f"--junitxml={reporte}"],
            cwd=BACKEND_DIR,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            timeout=120,
        )
        tests = _leer_reporte(reporte) if reporte.exists() else []

    return {
        "exitoso": proceso.returncode == 0,
        "total": len(tests),
        "pasaron": sum(1 for t in tests if t["resultado"] == "PASSED"),
        "fallaron": sum(1 for t in tests if t["resultado"] == "FAILED"),
        "tests": tests,
        "salida": proceso.stdout + proceso.stderr,
    }


def _leer_reporte(ruta: Path) -> list[dict]:
    tests = []
    for caso in ET.parse(ruta).getroot().iter("testcase"):
        if caso.find("failure") is not None or caso.find("error") is not None:
            resultado = "FAILED"
        elif caso.find("skipped") is not None:
            resultado = "SKIPPED"
        else:
            resultado = "PASSED"
        modulo = caso.get("classname", "").split(".")
        tests.append(
            {
                "tipo": TIPOS.get(modulo[1] if len(modulo) > 2 else "", "Otros"),
                "archivo": modulo[-1],
                "nombre": caso.get("name"),
                "resultado": resultado,
                "duracion": float(caso.get("time", 0)),
            }
        )
    return tests
