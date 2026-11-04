<<<<<<< HEAD
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
=======


from email.mime.text import MIMEText
from app.database import get_repositorio
import smtplib

class MailService:
    
    def __init__(self, host: str = "smtp.gmail.com", port: int = 587, emisor: str = '', password: str = ''):
        self.host:str = host
        self.port:int = port
        self.emisor:str = emisor
        self.password:str = password
        self.use_tls:bool = True if port == 587 else False

    def enviar_mail(self, destinatario: str, cuerpo: str) -> bool:
        """Envía email. Retorna True si OK, False si falla (logea error)."""
        try:
            msg = MIMEText(cuerpo, "plain", "utf-8")
            msg["From"] = self.emisor
            msg["To"] = destinatario
            msg["Subject"] = 'EcoHarmony Park: Confirmación de compra de entradas'

            with smtplib.SMTP(self.host, self.port) as server:
                if self.use_tls:
                    server.starttls()
                if self.emisor and self.password:
                    server.login(self.emisor, self.password)
                server.send_message(msg)

            print("Email enviado a %s", destinatario)
            return True

        except Exception as e:
            print("Error enviando email a %s: %s", destinatario, e)
            return False


def get_mail_service():
    return MailService(
        host="smtp.gmail.com",
        port=587,
        emisor="tucorre@gmail.com",    # este esel correo de HecoArmony Park, reemplazar por el correo real
        password="password generada por google"  # Contraseña para que la app ´ppueda mandar o tenga permisos de usar el gmail esto se hace desde google account settings
    )
>>>>>>> 560bff255f7e278dc140a01d612b1f1b3b985a70
