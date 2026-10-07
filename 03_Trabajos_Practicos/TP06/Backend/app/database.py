"""Persistencia simple en SQLite (archivo ecoharmony.db, se puede abrir con DBeaver)."""

import os
import sqlite3
from pathlib import Path

from app.compra_service import Compra

DB_PATH_DEFAULT = Path(__file__).resolve().parent.parent / "ecoharmony.db"

ESQUEMA = """
CREATE TABLE IF NOT EXISTS compras (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    email         TEXT    NOT NULL,
    fecha_visita  TEXT    NOT NULL,
    cantidad      INTEGER NOT NULL CHECK (cantidad BETWEEN 1 AND 10),
    tipo_pase     TEXT    NOT NULL,
    forma_pago    TEXT    NOT NULL,
    total         INTEGER NOT NULL,
    estado        TEXT    NOT NULL,
    creada_en     TEXT    NOT NULL DEFAULT (datetime('now', 'localtime'))
);

CREATE TABLE IF NOT EXISTS visitantes (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    compra_id  INTEGER NOT NULL REFERENCES compras(id),
    edad       INTEGER NOT NULL CHECK (edad >= 0)
);

CREATE TABLE IF NOT EXISTS mails_enviados (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    destinatario TEXT NOT NULL,
    mensaje      TEXT NOT NULL,
    enviado_en   TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
);
"""


class Repositorio:
    def __init__(self, db_path):
        self.db_path = str(db_path)
        with self._conectar() as conn:
            conn.executescript(ESQUEMA)

    def _conectar(self):
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def guardar_compra(self, compra: Compra) -> int:
        with self._conectar() as conn:
            cursor = conn.execute(
                "INSERT INTO compras (email, fecha_visita, cantidad, tipo_pase, forma_pago, total, estado) "
                "VALUES (?, ?, ?, ?, ?, ?, ?)",
                (
                    compra.email,
                    compra.fecha.isoformat(),
                    compra.cantidad,
                    compra.tipo_pase,
                    compra.forma_pago,
                    compra.total,
                    compra.estado,
                ),
            )
            compra_id = cursor.lastrowid
            conn.executemany(
                "INSERT INTO visitantes (compra_id, edad) VALUES (?, ?)",
                [(compra_id, edad) for edad in compra.edades],
            )
        return compra_id

    def guardar_mail(self, destinatario: str, mensaje: str) -> None:
        with self._conectar() as conn:
            conn.execute(
                "INSERT INTO mails_enviados (destinatario, mensaje) VALUES (?, ?)",
                (destinatario, mensaje),
            )

    def listar_compras(self) -> list[dict]:
        with self._conectar() as conn:
            filas = conn.execute("SELECT * FROM compras ORDER BY id DESC").fetchall()
        return [dict(fila) for fila in filas]

    def listar_mails(self) -> list[dict]:
        with self._conectar() as conn:
            filas = conn.execute("SELECT * FROM mails_enviados ORDER BY id DESC").fetchall()
        return [dict(fila) for fila in filas]


_repositorio = None


def get_repositorio() -> Repositorio:
    global _repositorio
    if _repositorio is None:
        _repositorio = Repositorio(os.environ.get("ECOHARMONY_DB", DB_PATH_DEFAULT))
    return _repositorio
