<div align="center">

# Diretório de Clientes (Client Directory)

Aplicação fullstack para listagem e consulta de clientes.
Desenvolvida com **NestJS** no backend e **Vue 3 + Vuetify** no frontend.

</div>

---

## Tecnologias

### Backend
- [NestJS](https://nestjs.com/) + TypeScript
- Arquitetura em módulos com Mapper pattern
- Atualização periódica dos dados via `@nestjs/schedule`

### Frontend
- [Vue 3](https://vuejs.org/) + TypeScript + Vite
- [Vuetify 3](https://vuetifyjs.com/) — UI components
- [Pinia](https://pinia.vuejs.org/) — gerenciamento de estado
- [VueUse](https://vueuse.org/) — debounce e utilitários

---

## Funcionalidades

- Listagem de clientes em grid responsivo (3 colunas)
- Filtro por estado (UF) com scroll interno
- Busca por nome com debounce
- Ordenação por nome ou data de cadastro
- Paginação com seleção de itens por página
- Detalhe do cliente em página dedicada
- Tema claro/escuro
- Alertas globais de erro

---

## Estrutura

```
client-directory/
├── backend/
├── frontend/
└── README.md
```

---

## Como rodar

### 🐳 Com Docker

> Pré-requisito: [Docker](https://www.docker.com/) instalado.

Na raiz do projeto, execute:

```bash
docker compose up --build
```

| Serviço   | URL                        |
|-----------|----------------------------|
| Frontend  | http://localhost:8080      |
| Backend   | http://localhost:3737      |

---

### 💻 Sem Docker

> Pré-requisito: [Node.js 20+](https://nodejs.org/) instalado.

**1. Backend**

```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

> Disponível em: http://localhost:3737

**2. Frontend**

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

> Disponível em: http://localhost:5173

---

## Variáveis de ambiente

Copie o `.env.example` dentro de `backend/` e ajuste se necessário:

```env
CLIENTS_API_URL=https://jsm-challenges.s3.amazonaws.com/frontend-challenge.json
PORT=3737
```

---

## API

| Método | Rota                  | Descrição                      |
|--------|-----------------------|--------------------------------|
| GET    | `/api/clients`        | Lista paginada com filtros     |
| GET    | `/api/clients/:id`    | Detalhe de um cliente          |
| GET    | `/api/clients/states` | Lista de estados disponíveis   |

### Query params — GET /api/clients

| Param       | Tipo   | Descrição                     |
|-------------|--------|-------------------------------|
| `page`      | number | Página atual (default: 1)     |
| `limit`     | number | Itens por página (default: 9) |
| `state`     | string | Filtro por UF                 |
| `name`      | string | Busca por nome                |
| `sortBy`    | string | `name` ou `registeredAt`      |
| `sortOrder` | string | `asc` ou `desc`               |
