import { beforeEach, describe, expect, it, vi } from "vitest";
import { DEMO_PROFILE } from "./auth";
import { readSession, saveSession, clearSession, SESSION_KEY } from "./session";
beforeEach(() => localStorage.clear());
describe("persistência do perfil demonstrativo", () => {
  it("restaura perfil válido sem armazenar senha", () => {
    expect(saveSession(localStorage, DEMO_PROFILE, 1000)).toBe(true);
    expect(readSession(localStorage, 1001)).toEqual(DEMO_PROFILE);
    expect(localStorage.getItem(SESSION_KEY)).not.toMatch(
      /password|Aurora2026!/,
    );
  });
  it.each([
    "{",
    "null",
    "[]",
    "true",
    '{"version":1,"user":{},"expiresAt":999999}',
  ])("recusa entrada inválida %s", (raw) => {
    localStorage.setItem(SESSION_KEY, raw);
    expect(readSession(localStorage, 1000)).toBeNull();
  });
  it("recusa sessão expirada", () => {
    saveSession(localStorage, DEMO_PROFILE, 1000);
    expect(readSession(localStorage, 1000 + 8 * 60 * 60 * 1000)).toBeNull();
  });
  it("recusa perfil arbitrário mesmo em JSON válido", () => {
    saveSession(localStorage, { ...DEMO_PROFILE, name: "Outro" }, 1000);
    expect(readSession(localStorage, 1001)).toBeNull();
  });
  it("remove apenas a chave da aplicação", () => {
    localStorage.setItem("theme", "light");
    saveSession(localStorage, DEMO_PROFILE);
    expect(clearSession(localStorage)).toBe(true);
    expect(readSession(localStorage)).toBeNull();
    expect(localStorage.getItem("theme")).toBe("light");
  });
  it("trata falhas de leitura, escrita e remoção", () => {
    const fail = () => {
      throw new Error("bloqueado");
    };
    const store = {
      getItem: vi.fn(fail),
      setItem: vi.fn(fail),
      removeItem: vi.fn(fail),
    };
    expect(readSession(store)).toBeNull();
    expect(saveSession(store, DEMO_PROFILE)).toBe(false);
    expect(clearSession(store)).toBe(false);
  });
});
