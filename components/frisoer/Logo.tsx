// Ordmærke: et lille prisme, der bryder lyset, og navnet i spærret serif.
export default function Logo() {
  return (
    <span className="fr-logo">
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
        <path d="M16 4 29 27H3Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M16 4v23M16 4 9.5 27M16 4l6.5 23" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
      </svg>
      <span className="fr-logo-tekst">
        <span>Prisme</span>
        <small>Hair Studio</small>
      </span>
    </span>
  );
}
