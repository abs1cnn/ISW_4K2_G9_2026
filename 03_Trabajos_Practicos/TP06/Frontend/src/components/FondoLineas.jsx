// Fondo decorativo de líneas abstractas verdes
const LINEAS = [
  { d: 'M-50 120 C 200 20, 400 220, 650 100 S 1100 40, 1300 160', color: '#66bb6a', ancho: 2 },
  { d: 'M-50 180 C 250 80, 450 280, 700 160 S 1100 100, 1300 220', color: '#a5d6a7', ancho: 1.5 },
  { d: 'M-50 420 C 150 520, 450 320, 700 450 S 1050 560, 1300 400', color: '#81c784', ancho: 2.5 },
  { d: 'M-50 480 C 200 580, 480 380, 720 510 S 1080 620, 1300 460', color: '#c8e6c9', ancho: 1.5 },
  { d: 'M-50 700 C 300 600, 500 820, 800 690 S 1150 640, 1300 760', color: '#4caf50', ancho: 1.8 },
  { d: 'M-50 760 C 280 660, 520 880, 820 750 S 1150 700, 1300 820', color: '#a5d6a7', ancho: 1.2 },
];

export default function FondoLineas() {
  return (
    <svg className="fondo-lineas" viewBox="0 0 1250 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {LINEAS.map(({ d, color, ancho }) => (
        <path key={d} d={d} fill="none" stroke={color} strokeWidth={ancho} strokeLinecap="round" />
      ))}
      <circle cx="1080" cy="140" r="90" fill="none" stroke="#c8e6c9" strokeWidth="1.5" />
      <circle cx="160" cy="620" r="60" fill="none" stroke="#c8e6c9" strokeWidth="1.5" />
    </svg>
  );
}
