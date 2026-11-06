import { Moon, Sun, ArrowUpRight } from "lucide-react";
export function Brand() {
  return (
    <a href="#inicio" className="brand" aria-label="Aurora, início">
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <path
          d="M6 31 18 7h6l12 24h-8l-7-15-5 10h10l-3 5Z"
          fill="currentColor"
        />
        <path d="m7 35 27-7" stroke="currentColor" strokeWidth="2" />
      </svg>
      <span>
        aurora<span className="brand-dot">.</span>
      </span>
    </a>
  );
}
export function Header({
  dark,
  toggleTheme,
}: {
  dark: boolean;
  toggleTheme: () => void;
}) {
  return (
    <header className="site-header">
      <Brand />
      <nav aria-label="Navegação principal">
        <a href="#experiencia">A experiência</a>
        <a href="#acesso">
          Sua conta <ArrowUpRight size={14} />
        </a>
      </nav>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}
      >
        {dark ? <Sun size={19} /> : <Moon size={19} />}
      </button>
    </header>
  );
}
