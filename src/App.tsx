import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { ArrowUpRight, Layers, ShieldCheck, Command } from "lucide-react";
import { Header } from "./components/Header";
import { Card } from "./components/Card";
import { AuthProvider, useAuth } from "./AuthContext";
import { Account } from "./components/Account";
export default function App() {
  return (
    <AuthProvider>
      <AuroraApp />
    </AuthProvider>
  );
}
function AuroraApp() {
  const { user } = useAuth();
  useEffect(() => {
    window.history.replaceState(null, "", user ? "#conta" : "#acesso");
  }, [user]);
  const [dark, setDark] = useState(true);
  if (user)
    return <Account dark={dark} toggleTheme={() => setDark((v) => !v)} />;
  return (
    <Box className="app" data-theme={dark ? "dark" : "light"} id="inicio">
      <a className="skip-link" href="#acesso">
        Pular para o acesso
      </a>
      <div className="page-shell">
        <Header dark={dark} toggleTheme={() => setDark((v) => !v)} />
        <main>
          <section className="hero">
            <div className="hero-copy">
              <span className="eyebrow">
                <span /> FINANÇAS COM OUTRO OLHAR
              </span>
              <h1>
                Seu dinheiro.
                <br />
                Novos <span>horizontes.</span>
              </h1>
              <p className="hero-description">
                Mais clareza para o presente.
                <br />
                Mais espaço para o que vem depois.
              </p>
              <div
                className="visual-scene"
                aria-label="Ilustração de cartão Aurora, sem dados bancários reais"
                role="img"
              >
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="bank-card">
                  <div className="card-top">
                    <span>aurora.</span>
                    <Command size={22} />
                  </div>
                  <svg className="chip" viewBox="0 0 34 26" aria-hidden="true">
                    <rect
                      x="1"
                      y="1"
                      width="32"
                      height="24"
                      rx="5"
                      fill="none"
                      stroke="currentColor"
                    />
                    <path
                      d="M11 1v24M23 1v24M1 9h10m12 0h10M1 17h10m12 0h10"
                      stroke="currentColor"
                    />
                  </svg>
                  <div className="card-bottom">
                    <span>SEU PRÓXIMO CAPÍTULO</span>
                    <span>VIRTUAL</span>
                  </div>
                </div>
                <div className="floating-note">
                  <span className="note-icon">
                    <ArrowUpRight size={19} />
                  </span>
                  <div>
                    <small>Mais possibilidades</small>
                    <strong>Um jeito Aurora de seguir.</strong>
                  </div>
                </div>
              </div>
              <div className="hero-caption">
                <span className="caption-line" />
                <span>O futuro começa com uma escolha.</span>
                <span className="caption-number">01 — 03</span>
              </div>
            </div>
            <div className="access-column">
              <Card />
              <p className="access-footnote">
                Projeto de portfólio · Não é uma instituição financeira
              </p>
            </div>
          </section>
          <section
            className="experience"
            id="experiencia"
            aria-label="A experiência Aurora"
          >
            <div className="experience-intro">
              <span className="eyebrow">PENSADO PARA O SEU RITMO</span>
              <h2>
                O essencial.
                <br />
                Bem resolvido.
              </h2>
            </div>
            <article>
              <span className="feature-icon">
                <Layers size={21} />
              </span>
              <h3>Clareza em cada detalhe</h3>
              <p>
                Uma interface que organiza o essencial e dá espaço para o que
                importa.
              </p>
            </article>
            <article>
              <span className="feature-icon">
                <ShieldCheck size={21} />
              </span>
              <h3>Liberdade para explorar</h3>
              <p>
                Conheça o ambiente com dados fictícios, sem cadastro e sem
                enviar informações.
              </p>
            </article>
          </section>
        </main>
        <footer>
          <span>© {new Date().getFullYear()} Aurora</span>
          <span>Conceito independente de experiência financeira.</span>
          <a href="#inicio">
            Voltar ao início <ArrowUpRight size={14} />
          </a>
        </footer>
      </div>
    </Box>
  );
}
