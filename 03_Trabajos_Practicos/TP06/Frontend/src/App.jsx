import { useState } from 'react';
import CompraEntradas from './components/CompraEntradas';
import Confirmacion from './components/Confirmacion';
import NavInferior from './components/NavInferior';
import FondoLineas from './components/FondoLineas';
import Proximamente from './components/Proximamente';

export default function App() {
  const [compra, setCompra] = useState(null);
  const [seccion, setSeccion] = useState('entradas');

  function renderSeccion() {
    if (seccion === 'mapa') return <Proximamente titulo="Mapa del parque" />;
    if (seccion === 'horarios') return <Proximamente titulo="Horarios de alimentación" />;
    if (compra) return <Confirmacion compra={compra} onNuevaCompra={() => setCompra(null)} />;
    return <CompraEntradas onCompra={setCompra} />;
  }

  return (
    <div className="app">
      <FondoLineas />

      <header className="encabezado">
        <h1>EcoHarmony Park</h1>
      </header>

      <main className="contenido">{renderSeccion()}</main>

      <NavInferior seccionActual={seccion} onCambiar={setSeccion} />
    </div>
  );
}
