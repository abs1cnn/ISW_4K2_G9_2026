import logging
import os
import smtplib
from email.message import EmailMessage

logger = logging.getLogger(__name__)


def enviar_confirmacion_compra(destinatario: str, mensaje: str) -> bool:
    """Envía la confirmación por SMTP cuando hay credenciales."""

    host = os.getenv("ECOHARMONY_SMTP_HOST", "smtp.gmail.com")
    port = int(os.getenv("ECOHARMONY_SMTP_PORT", "587"))
    remitente = os.getenv("ECOHARMONY_EMAIL_FROM")
    password = os.getenv("ECOHARMONY_EMAIL_PASSWORD")

    if not remitente or not password:
        logger.info("SMTP no configurado: no se envía correo real.")
        return False

    try:
        email = EmailMessage()
        email["Subject"] = "Confirmación de compra - EcoHarmony Park"
        email["From"] = remitente
        email["To"] = destinatario
        email.set_content(mensaje)

        with smtplib.SMTP(host, port, timeout=15) as servidor:
            servidor.starttls()
            servidor.login(remitente, password)
            servidor.send_message(email)

        return True

    except Exception:
        logger.exception("No se pudo enviar el correo.")
        return False
