import { useState, type FormEvent } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useAuth } from "../AuthContext";
import { DEMO_EMAIL, DEMO_PASSWORD } from "../services/auth";
export function Card() {
  const { login, warning } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!login(email, password)) {
      setError(
        "E-mail ou senha incorretos. Use a conta de demonstração abaixo.",
      );
      return;
    }
    setPassword("");
  }
  return (
    <section className="login-card" id="acesso" aria-labelledby="access-title">
      <div className="card-eyebrow">
        <span className="live-dot" />
        SEU ESPAÇO AURORA
        <LockKeyhole size={15} />
      </div>
      <h2 id="access-title">Bom ter você aqui.</h2>
      <p className="card-description">
        Entre para conhecer sua conta por outro ângulo.
      </p>
      <form onSubmit={submit}>
        <div className="field">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            autoComplete="off"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            required
            aria-invalid={!!error}
            aria-describedby={error ? "login-error" : undefined}
            placeholder="voce@exemplo.com"
          />
        </div>
        <div className="field">
          <label htmlFor="password">Senha</label>
          <div className="password-wrap">
            <input
              id="password"
              type={visible ? "text" : "password"}
              autoComplete="off"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
              aria-invalid={!!error}
              aria-describedby={error ? "login-error" : undefined}
              placeholder="Digite sua senha"
            />
            <button
              className="reveal"
              type="button"
              aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
              onClick={() => setVisible(!visible)}
            >
              {visible ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        {error && (
          <p className="form-error" id="login-error" role="alert">
            {error}
          </p>
        )}
        <button className="action-button" type="submit">
          Entrar na Aurora
          <ArrowRight size={18} />
        </button>
      </form>
      <div className="demo-box">
        <span>EXPERIMENTE SEM CADASTRO</span>
        <p>Uma conta fictícia, pronta para conhecer.</p>
        <button
          onClick={() => {
            setEmail(DEMO_EMAIL);
            setPassword(DEMO_PASSWORD);
            setError("");
          }}
        >
          Preencher acesso de demonstração
          <ArrowRight size={15} />
        </button>
        <small>
          {DEMO_EMAIL} · {DEMO_PASSWORD}
        </small>
      </div>
      {warning && (
        <p role="status" className="storage-warning">
          {warning}
        </p>
      )}
      <p className="privacy-note">
        <LockKeyhole size={13} />
        Use apenas os dados fictícios acima.
      </p>
    </section>
  );
}
