import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronRight,
  Eye,
  EyeOff,
  Mail,
  Moon,
  Sun,
  LogOut,
  UserRound,
  Wallet,
  BadgeCheck,
  ArrowDownLeft,
  Download,
  Check,
} from "lucide-react";
import { Brand } from "./Header";
import { useAuth } from "../AuthContext";
const transactions = [
  {
    name: "Estúdio Horizonte",
    detail: "Projeto editorial · 04 nov",
    amount: 3200,
    type: "in",
  },
  {
    name: "Café do Parque",
    detail: "Alimentação · 03 nov",
    amount: -28.5,
    type: "out",
  },
  {
    name: "Livraria Página",
    detail: "Compras · 02 nov",
    amount: -119.9,
    type: "out",
  },
];
const money = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value,
  );
export function Account({
  dark,
  toggleTheme,
}: {
  dark: boolean;
  toggleTheme: () => void;
}) {
  const { user, logout, warning } = useAuth();
  const [hidden, setHidden] = useState(false);
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState("");
  const title = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    title.current?.focus();
  }, []);
  if (!user) return null;
  async function copy() {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    try {
      await Promise.race([
        navigator.clipboard.writeText(user!.email),
        new Promise<never>((_, reject) => {
          timeout = setTimeout(() => reject(new Error('Área de transferência indisponível')), 1500);
        }),
      ]);
      setCopied(true);
      setNotice('E-mail copiado para a área de transferência.');
    } catch {
      setNotice("Copie o e-mail exibido em Dados da conta.");
    } finally {
      clearTimeout(timeout);
    }
  }
  function download() {
    const data = JSON.stringify(
      { ambiente: "Demonstração Aurora", perfil: user },
      null,
      2,
    );
    const url = URL.createObjectURL(
      new Blob([data], { type: "application/json" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "aurora-perfil-demo.json";
    a.click();
    URL.revokeObjectURL(url);
    setNotice("Resumo do perfil exportado.");
  }
  return (
    <div className="app workspace" data-theme={dark ? "dark" : "light"}>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <aside className="sidebar">
        <Brand />
        <span className="workspace-label">SEU ESPAÇO</span>
        <a href="#conta" className="side-active">
          <UserRound size={18} />
          Minha conta
          <ChevronRight size={15} />
        </a>
        <div className="sidebar-bottom">
          <span className="demo-pill">AMBIENTE DEMONSTRATIVO</span>
          <p>
            Uma experiência Aurora.
            <br />
            Todos os dados são fictícios.
          </p>
          <button className="logout" onClick={logout}>
            <LogOut size={17} />
            Sair da conta
          </button>
        </div>
      </aside>
      <div className="workspace-content">
        <header className="account-header">
          <span>
            Conta pessoal <ChevronRight size={14} /> Visão geral
          </span>
          <div>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <span className="mini-avatar" aria-label="Perfil de Marina Costa">
              MC
            </span>
            <button
              className="mobile-logout"
              onClick={logout}
              aria-label="Sair da conta"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>
        <main id="conteudo" className="account-main">
          <div className="page-heading">
            <div>
              <span className="eyebrow">BEM-VINDA AO SEU ESPAÇO</span>
              <h1 ref={title} tabIndex={-1}>
                Tudo sobre a sua conta<span>.</span>
              </h1>
              <p>Um olhar claro para seus dados e seus próximos passos.</p>
            </div>
            <button className="outline-button" onClick={download}>
              <Download size={16} />
              Exportar perfil
            </button>
          </div>
          {warning && (
            <p role="status" className="storage-warning">
              {warning}
            </p>
          )}
          <div className="account-grid">
            <section
              className="profile-panel panel"
              aria-labelledby="profile-heading"
            >
              <div className="panel-top">
                <span>PERFIL DO TITULAR</span>
                <BadgeCheck size={20} />
              </div>
              <div className="profile-avatar">
                MC
                <span>
                  <Check size={12} />
                </span>
              </div>
              <h2 id="profile-heading">{user.name}</h2>
              <p className="profile-email">{user.email}</p>
              <span className="member-since">Cliente desde março de 2024</span>
              <div className="profile-divider" />
              <dl className="profile-facts">
                <div>
                  <dt>Modalidade</dt>
                  <dd>Conta pessoal</dd>
                </div>
                <div>
                  <dt>Plano</dt>
                  <dd>Aurora Essencial</dd>
                </div>
                <div>
                  <dt>Status da demonstração</dt>
                  <dd className="status-dot">Ativo</dd>
                </div>
              </dl>
            </section>
            <section
              className="details-panel panel"
              aria-labelledby="details-heading"
            >
              <div className="section-heading">
                <div>
                  <span className="eyebrow">SEUS DADOS, BEM ORGANIZADOS</span>
                  <h2 id="details-heading">Dados da conta</h2>
                </div>
                <UserRound size={20} />
              </div>
              <dl className="detail-list">
                <div>
                  <dt>Nome completo</dt>
                  <dd>{user.name}</dd>
                </div>
                <div>
                  <dt>E-mail de acesso</dt>
                  <dd>
                    {user.email}
                    <button onClick={copy} aria-label="Copiar e-mail">
                      {copied ? "Copiado" : "Copiar"}
                      {copied ? (
                        <Check size={13} />
                      ) : (
                        <ArrowUpRight size={13} />
                      )}
                    </button>
                  </dd>
                </div>
                <div>
                  <dt>Identificador da conta</dt>
                  <dd>AURORA · 0001</dd>
                </div>
                <div>
                  <dt>Tipo de ambiente</dt>
                  <dd>Demonstração de produto</dd>
                </div>
              </dl>
              <div className="data-note">
                <Mail size={17} />
                <p>
                  Um perfil feito para explorar.
                  <span>
                    Os dados desta conta são fictícios e não podem ser editados.
                  </span>
                </p>
              </div>
            </section>
            <section
              className="balance-panel panel"
              aria-labelledby="balance-heading"
            >
              <div className="section-heading">
                <span id="balance-heading">Saldo demonstrativo</span>
                <button
                  aria-label={hidden ? "Mostrar saldo" : "Ocultar saldo"}
                  className="plain-icon"
                  onClick={() => setHidden(!hidden)}
                >
                  {hidden ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <strong className="balance-value">
                {hidden ? "••••••" : money(8450.8)}
              </strong>
              <span className="balance-caption">
                Disponível na conta fictícia
              </span>
              <div className="balance-trend">
                <Wallet size={17} />
                <span>Clareza para planejar o próximo capítulo.</span>
              </div>
            </section>
            <section
              className="activity-panel panel"
              aria-labelledby="activity-heading"
            >
              <div className="section-heading">
                <h2 id="activity-heading">Últimos movimentos</h2>
                <span className="subtle-tag">EXEMPLOS</span>
              </div>
              {transactions.map((t) => (
                <div className="transaction" key={t.name}>
                  <span className={"transaction-icon " + t.type}>
                    {t.type === "in" ? (
                      <ArrowDownLeft size={17} />
                    ) : (
                      <ArrowUpRight size={17} />
                    )}
                  </span>
                  <div>
                    <strong>{t.name}</strong>
                    <small>{t.detail}</small>
                  </div>
                  <span className={t.type === "in" ? "positive" : ""}>
                    {hidden
                      ? "••••"
                      : (t.amount > 0 ? "+ " : "− ") +
                        money(Math.abs(t.amount))}
                  </span>
                </div>
              ))}
            </section>
          </div>
          <p role="status" className="account-notice">
            {notice ||
              (copied ? "E-mail copiado para a área de transferência." : "")}
          </p>
          <footer className="account-footer">
            <span>aurora. — Mais clareza, novos horizontes.</span>
            <span>Portfólio · Sem operações financeiras reais</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
