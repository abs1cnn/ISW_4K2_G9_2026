

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