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
};

export const SECCIONES = [
  { id: 'entradas', etiqueta: 'Entradas' },
  { id: 'mapa', etiqueta: 'Mapa' },
  { id: 'horarios', etiqueta: 'Alimentación' },
];

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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {ICONOS[id]}
          </svg>
          <span>{etiqueta}</span>
        </button>
      ))}
    </nav>
  );
}
