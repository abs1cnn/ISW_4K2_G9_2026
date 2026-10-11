"""Reglas del registro de usuarios (mail + contraseña) y hash de contraseñas."""

import hashlib
import os
import re

FORMATO_EMAIL = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
LARGO_MINIMO_PASSWORD = 8
ITERACIONES = 100_000


def validar_registro(email, password) -> list[str]:
    errores = []
    if not isinstance(email, str) or not FORMATO_EMAIL.match(email.strip()):
        errores.append("El mail ingresado no es válido")
    if not isinstance(password, str) or len(password) < LARGO_MINIMO_PASSWORD:
        errores.append(f"La contraseña debe tener al menos {LARGO_MINIMO_PASSWORD} caracteres")
    return errores


def hashear_password(password: str) -> str:
    sal = os.urandom(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), sal, ITERACIONES)
    return f"{sal.hex()}:{digest.hex()}"
