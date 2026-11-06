import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import App from "./App";
import { DEMO_PROFILE } from "./services/auth";
import { saveSession, SESSION_KEY } from "./services/session";
function setup() {
  return render(
    <ChakraProvider value={defaultSystem}>
      <App />
    </ChakraProvider>,
  );
}
beforeEach(() => {
  localStorage.clear();
  window.history.replaceState(null, "", "#conta");
});
async function enter() {
  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: /Preencher acesso/ }));
  await user.click(screen.getByRole("button", { name: "Entrar na Aurora" }));
  return user;
}
describe("jornada de acesso e perfil", () => {
  it("mantém visitante no login mesmo com endereço da conta", () => {
    setup();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.queryByText("Marina Costa")).not.toBeInTheDocument();
    expect(location.hash).toBe("#acesso");
  });
  it("valida senha, sem revelar perfil ou gravar sessão na falha", async () => {
    setup();
    const user = userEvent.setup();
    await user.type(screen.getByLabelText("E-mail"), "demo@aurora.app");
    await user.type(screen.getByLabelText("Senha"), "incorreta");
    await user.click(screen.getByRole("button", { name: "Entrar na Aurora" }));
    expect(screen.getByRole("alert")).toHaveTextContent("incorretos");
    expect(localStorage.getItem(SESSION_KEY)).toBeNull();
    expect(screen.queryByText("Marina Costa")).not.toBeInTheDocument();
  });
  it("entra, exibe dados e restaura acesso após remontagem", async () => {
    const view = setup();
    await enter();
    expect(
      screen.getByRole("heading", { name: "Marina Costa" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("demo@aurora.app").length).toBeGreaterThan(0);
    expect(location.hash).toBe("#conta");
    view.unmount();
    setup();
    expect(screen.queryByLabelText("Senha")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Marina Costa" }),
    ).toBeInTheDocument();
  });
  it("sai e impede restauração da sessão anterior", async () => {
    const view = setup();
    const user = await enter();
    await user.click(
      screen.getAllByRole("button", { name: "Sair da conta" })[0],
    );
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(localStorage.getItem(SESSION_KEY)).toBeNull();
    view.unmount();
    setup();
    expect(
      screen.queryByRole("heading", { name: "Marina Costa" }),
    ).not.toBeInTheDocument();
  });
  it("alterna tema e visibilidade dos saldos no perfil", async () => {
    saveSession(localStorage, DEMO_PROFILE);
    setup();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Ativar tema claro" }));
    expect(document.querySelector(".app")).toHaveAttribute(
      "data-theme",
      "light",
    );
    await user.click(screen.getByRole("button", { name: "Ocultar saldo" }));
    expect(screen.queryByText(/8.450/)).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Mostrar saldo" }),
    ).toBeInTheDocument();
  });
  it("não quebra ao iniciar com JSON corrompido", () => {
    localStorage.setItem(SESSION_KEY, "{");
    setup();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
  });
  it("sincroniza a saída recebida de outra aba", () => {
    saveSession(localStorage, DEMO_PROFILE);
    setup();
    localStorage.removeItem(SESSION_KEY);
    act(() => {window.dispatchEvent(new StorageEvent("storage", { key: SESSION_KEY }));});
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
  });
  it("permite acesso temporário se a escrita estiver bloqueada", async () => {
    setup();
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota");
    });
    await enter();
    expect(
      screen.getByRole("heading", { name: "Marina Costa" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("status")[0]).toHaveTextContent(
      "somente nesta aba",
    );
  });
});
