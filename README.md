# Aurora · Minha conta

Demonstração de fintech com página de perfil, acesso por e-mail e senha e persistência local. Entrega preparada para o desafio **Criando a Página Com os Detalhes do Usuário Com React**, da Formação TypeScript Fullstack Developer da DIO.

## Experimentar

```sh
npm ci
npm run dev
```

Abra http://127.0.0.1:5175/ e use **Preencher acesso de demonstração**. Credenciais públicas fictícias: `demo@aurora.app` / `Aurora2026!`.

O perfil exibe Marina Costa, e-mail e informações de uma conta fictícia. É possível alternar temas, ocultar saldos, copiar o e-mail, exportar o perfil em JSON e sair. Nenhum pagamento ou transferência ocorre. A página usa dados locais fixos.

## Requisitos atendidos

| Requisito | Onde conferir |
| --- | --- |
| E-mail e senha validados; TDD | src/services/auth.ts e auth.test.ts |
| Estado compartilhado por Context API | src/AuthContext.tsx |
| Dados do usuário em localStorage | src/services/session.ts |
| Acesso restaurado sem exibir login | Inicialização do AuthProvider |
| Perfil com nome e e-mail, condicionado ao acesso | src/components/Account.tsx e App.tsx |
| Saída e tratamento de dados inválidos | Contexto, serviço de sessão e testes |
| Deploy Netlify | netlify.toml; site público no Netlify |

A navegação é uma composição condicional de telas, com fragmentos `#acesso` e `#conta`. Abrir o fragmento da conta não contorna a condição de login. Não há React Router nesta entrega; o enunciado não exige uma biblioteca específica de roteamento.

## Organização

- `services/auth.ts`: comparação das credenciais públicas da demonstração e perfil tipado.
- `services/session.ts`: serialização, validação de estrutura, restauração e remoção da chave da aplicação.
- `AuthContext.tsx`: acesso compartilhado, saída, avisos de armazenamento bloqueado e sincronização entre abas.
- `components/Card.tsx`: formulário e mensagens de erro.
- `components/Account.tsx`: perfil, informações e ações demonstrativas.
- `styles.css`: identidade Aurora em violeta, azul e neutros, temas e breakpoints.

A senha não é persistida. A entrada de armazenamento tem versão, perfil fictício e prazo de oito horas, validado durante a restauração. O prazo não encerra automaticamente uma tela já aberta. Dados corrompidos ou outro perfil são recusados. Se a escrita falhar, o acesso permanece em memória com aviso. A saída remove somente a chave da aplicação, preservando outros dados da origem.

## Verificação em 06/11/2026

```sh
npm test
npm run build
```

25 testes aprovados em três arquivos: validação das credenciais, armazenamento ausente/inválido/expirado, falhas de acesso ao storage, restauração, proteção da tela, saída, sincronização entre abas, temas e ocultação de valores. TypeScript e build de produção aprovados.

TDD da validação: antes da implementação, os dois testes positivos falharam com retorno null; cinco casos de recusa passaram. Após implementar, os sete testes da validação passaram. A suíte foi ampliada para persistência e integração.

Verificação no Chrome: entrada, restauração após reload, saída sem restauração posterior, temas claro/escuro e viewport 390 × 844. Sem rolagem horizontal nessa medida (área de conteúdo 375 px). Exportação JSON conferida no arquivo baixado; cópia do e-mail apresentou confirmação. Capturas no diretório evidencias da pasta do curso. Testes de navegador não substituem cobertura em todos os aparelhos.

## Publicar no Netlify

Configuração pronta: comando `npm run build`, diretório `dist`. É possível conectar o repositório no Netlify ou enviar o conteúdo de dist. Publicação autorizada em 06/11/2026. Repositório: https://github.com/EVI-DEV1/dio-aurora-account-react . Site público: https://aurora-account-evi.netlify.app/ . Build enviado diretamente ao Netlify e publicado em 06/11/2026. Resposta HTTP 200 e login demonstrativo conferidos na versão pública. Entrega confirmada na DIO em 06/11/2026, com o estado PROJETO ENTREGUE após aceite autorizado dos termos.

## Escopo e créditos

É uma demonstração de interface para portfólio, sem backend de autenticação. O perfil salvo é editável no navegador; os dados locais não representam uma sessão segura. Um produto financeiro real exige servidor, autorização de dados e infraestrutura apropriada. Não use informações ou credenciais reais.

Referência educacional: [DIO — desafio03-ts](https://github.com/digitalinnovationone/desafio03-ts), por [Nathally Souza](https://github.com/nathyts). A identidade e a tela de entrada evoluem o projeto Aurora Homepage React do mesmo portfólio. Implementação independente em React, TypeScript, Vite e Chakra UI; ícones Lucide; fontes DM Sans e Manrope (Google Fonts, com alternativas locais de sistema). Os créditos do curso e das bibliotecas são preservados.

