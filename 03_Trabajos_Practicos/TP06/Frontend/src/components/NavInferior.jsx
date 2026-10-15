const ICONOS = {
  entradas: (
    <path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4zM10 6v12" />
  ),
  mapa: <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14" />,
  horarios: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  panel: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4M7 12l3-3 2 2 4-4" />
    </>
  ),
};

export const SECCIONES = [
  { id: 'entradas', etiqueta: 'Entradas' },
  { id: 'mapa', etiqueta: 'Mapa' },
  { id: 'horarios', etiqueta: 'Alimentación' },
];

// Panel del backend (tests y compras registradas), se abre en otra pestaña
const URL_PANEL_BACKEND = 'http://localhost:8000';

function Icono({ id }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {ICONOS[id]}
    </svg>
  );
}

export default function NavInferior({ seccionActual, onCambiar }) {
  return (
    <nav className="nav-inferior">
      {SECCIONES.map(({ id, etiqueta }) => (
        <button
          key={id}
          className={`nav-item${seccionActual === id ? ' activo' : ''}`}
          onClick={() => onCambiar(id)}
          aria-current={seccionActual === id ? 'page' : undefined}
        >
          <Icono id={id} />
          <span>{etiqueta}</span>
        </button>
      ))}
      <a className="nav-item" href={URL_PANEL_BACKEND} target="_blank" rel="noopener noreferrer">
        <Icono id="panel" />
        <span>Panel</span>
      </a>
    </nav>
  );
}
