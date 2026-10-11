import { useState } from 'react';

export default function Registro({ emailInicial = '', onRegistrado }) {
  const [email, setEmail] = useState(emailInicial);
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [errores, setErrores] = useState([]);

  async function registrar() {
    setErrores([]);
    setMensaje('');
    try {
      const respuesta = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (respuesta.ok) {
        setMensaje('¡Listo! Ya podés comprar entradas con ese mail.');
        onRegistrado?.();
        return;
      }
      const datos = await respuesta.json();
      setErrores(datos.errores || ['No se pudo registrar el usuario']);
    } catch {
      setErrores(['No hay conexión con el servidor, intentá de nuevo']);
    }
  }

  return (
    <fieldset>
      <legend>Registro</legend>
      <label>
        Mail
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Contraseña (mín. 8 caracteres)
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="button" onClick={registrar}>
        Registrarme
      </button>
      {mensaje && <p className="ayuda">{mensaje}</p>}
      {errores.length > 0 && (
        <ul className="error">
          {errores.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </fieldset>
  );
}
