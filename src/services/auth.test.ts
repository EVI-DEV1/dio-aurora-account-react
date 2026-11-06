import { describe, expect, it } from "vitest";
import { authenticate, DEMO_EMAIL, DEMO_PASSWORD } from "./auth";
describe("validação de acesso demonstrativo", () => {
  it("aceita somente o par de credenciais da demonstração", () => {
    expect(authenticate(DEMO_EMAIL, DEMO_PASSWORD)).toMatchObject({
      name: "Marina Costa",
      email: DEMO_EMAIL,
    });
  });
  it.each(["", "errada", "aurora2026!", "Aurora2026! "])(
    "recusa senha inválida: %s",
    (password) => {
      expect(authenticate(DEMO_EMAIL, password)).toBeNull();
    },
  );
  it("recusa e-mail incorreto mesmo com senha correta", () => {
    expect(authenticate("outro@aurora.app", DEMO_PASSWORD)).toBeNull();
  });
  it("normaliza espaços e caixa do e-mail, preservando a senha", () => {
    expect(authenticate(" DEMO@AURORA.APP ", DEMO_PASSWORD)).not.toBeNull();
  });
});
