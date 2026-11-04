import logging
import os
import smtplib
from email.message import EmailMessage

logger = logging.getLogger(__name__)

SMTP_HOST = os.getenv("ECOHARMONY_SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("ECOHARMONY_SMTP_PORT", "587"))
EMAIL_FROM = os.getenv("ECOHARMONY_EMAIL_FROM", "abigailcanaan@gmail.com")
EMAIL_PASSWORD = os.getenv("ECOHARMONY_EMAIL_PASSWORD")


def enviar_confirmacion_compra(destinatario: str, mensaje: str) -> bool:
    """Envía un mail de confirmación usando SMTP de Gmail si está configurado."""
    if not EMAIL_PASSWORD:
        logger.warning(
            "No se envió el mail de confirmación porque falta ECOHARMONY_EMAIL_PASSWORD. "
            "Para usar Gmail, configurar una App Password y setear ECOHARMONY_EMAIL_FROM."
        )
        return False

    try:
        msg = EmailMessage()
        msg["Subject"] = "Confirmación de compra - EcoHarmony Park"
        msg["From"] = EMAIL_FROM
        msg["To"] = destinatario
        msg.set_content(mensaje)

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15) as servidor:
            servidor.ehlo()
            servidor.starttls()
            servidor.login(EMAIL_FROM, EMAIL_PASSWORD)
            servidor.send_message(msg)

        logger.info("Mail enviado correctamente a %s", destinatario)
        return True
    except Exception:
        logger.exception("Fallo al enviar el mail de confirmación a %s", destinatario)
        return False
