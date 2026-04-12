export default function UPFLogo({ className = '' }) {
  return (
    <svg
      viewBox="0 0 120 52"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
    >
      {/* Main text "UPF." */}
      <text
        x="2"
        y="36"
        fontFamily="'Arial Black', 'Arial', sans-serif"
        fontWeight="900"
        fontSize="34"
        fill="#1a1a5e"
        letterSpacing="-1"
      >
        UPF.
      </text>

      {/* Colored accent square (top-right of the F) */}
      <rect x="88" y="0" width="14" height="14" fill="#c0392b" rx="1" />

      {/* "University" subtitle */}
      <text
        x="2"
        y="50"
        fontFamily="'Arial', sans-serif"
        fontWeight="400"
        fontSize="11"
        fill="#1a1a5e"
        letterSpacing="2.5"
      >
        University
      </text>
    </svg>
  );
}
