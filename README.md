# Bank Frontend

Frontend em React para consumo da API bancária
[bank_api_drf](https://github.com/orgjr/bank_api_drf). A aplicação implementa a
interface de autenticação e operações bancárias básicas, usando sessões/cookies
da API Django REST Framework.

## Funcionalidades

- Página inicial institucional e tela de login.
- Proteção de rotas privadas em `/user/*`.
- Dashboard com dados pessoais, agência, conta e saldo do usuário autenticado.
- Depósito via geração de boleto.
- Consulta e pagamento de boleto por linha digitável/código de barras.
- Transferência entre contas.
- Extrato com filtro por últimos 15 ou 30 dias.
- Logout integrado à API.
- Redirecionamento para página de erro customizada.
- Interface estilizada com Tailwind CSS.

## Stack

- React 18
- Vite
- React Router DOM
- Tailwind CSS 4 via `@tailwindcss/vite`
- React Helmet Async
- Swiper
- ESLint

## Integração com a API

Este frontend foi desenvolvido para funcionar com a API:

```text
https://github.com/orgjr/bank_api_drf
```

Durante o desenvolvimento, as requisições apontam para:

```text
http://localhost:8000
```

Principais endpoints consumidos:

| Fluxo | Endpoint |
| --- | --- |
| Login | `POST /bank/auth/login/` |
| Logout | `POST /bank/auth/logout/` |
| Usuário autenticado | `GET /bank/user/me/` |
| Gerar boleto de depósito | `POST /bank/payment_slip/` |
| Buscar boleto | `GET /bank/payment_slip/get/?payment_slip_number=...` |
| Pagar boleto | `POST /bank/transaction/payment/` |
| Transferência | `POST /bank/transaction/transfer/` |
| Extrato | `GET /bank/transactions/extract/?start_date=...&end_date=...` |

As chamadas usam `credentials: 'include'`, então a API precisa permitir cookies
de sessão e CORS com credenciais para a origem do Vite. Requisições `POST`
enviam o cabeçalho `X-CSRFToken`, lido do cookie `csrftoken`.

## Rotas

Rotas públicas:

- `/` - página inicial.
- `/login` - autenticação.
- `/logout` - encerramento da sessão.
- `/error` - erro customizado.

Rotas privadas:

- `/user` - redireciona para `/user/dashboard`.
- `/user/dashboard` - painel do usuário.
- `/user/deposit` - depósito.
- `/user/deposit/paymentslip/detail` - detalhe do boleto gerado para depósito.
- `/user/extract` - extrato.
- `/user/payment` - pagamento.
- `/user/payment/paymentslip/detail` - detalhe do boleto consultado.
- `/user/transfer` - transferência.
- `/user/error` - erro customizado dentro da área autenticada.

As rotas privadas passam pelo componente `PrivateRoute`, que consulta
`/bank/user/me/`. Se o usuário não estiver autenticado, ele é redirecionado para
`/login`.

## Como executar

Pré-requisitos:

- Node.js instalado.
- API `bank_api_drf` rodando em `http://localhost:8000`.

Instale as dependências:

```bash
npm install
```

Execute o servidor de desenvolvimento:

```bash
npm run dev
```

Gere uma build de produção:

```bash
npm run build
```

Visualize a build localmente:

```bash
npm run preview
```

Execute o lint:

```bash
npm run lint
```

## Estrutura principal

```text
src/
  components/   Componentes compartilhados, proteção de rota e erro customizado
  helpers/      Formatadores, utilitários de data, moeda, conta e CSRF
  hooks/        Hooks auxiliares para tratamento de erro e pagamentos
  pages/        Telas públicas e privadas da aplicação
  routes/       Definição das rotas com React Router
  styles/       Entrada do Tailwind CSS e estilos complementares
```

## Observações

- O endereço base da API está definido diretamente nas chamadas `fetch`.
- O suporte a Pix aparece na interface como item futuro.
- Para autenticação funcionar em desenvolvimento, confirme as configurações de
  CORS, CSRF e cookies de sessão no backend.
