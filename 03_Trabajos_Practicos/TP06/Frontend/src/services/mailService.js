// Simulación del envío de mail: guarda los mensajes en memoria
const enviados = [];

export function enviarMail(destinatario, mensaje) {
  enviados.push({ destinatario, mensaje, fecha: new Date() });
}

export function mailsEnviados() {
  return [...enviados];
}
