# Netflix Clone — Backend

API RESTful com Node.js 20, Express e Prisma (SQLite).

## Requisitos

- Node.js 20 LTS
- npm

## Setup

```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
node prisma/seed.js
npm run dev
```

A API estará disponível em `http://localhost:5000`.

## Usuários de teste

| Email           | Senha    |
|-----------------|----------|
| user@test.com   | senha123 |
| admin@test.com  | senha123 |

## Scripts

| Comando                        | Descrição                        |
|-------------------------------|----------------------------------|
| `npm run dev`                 | Inicia com nodemon (hot reload)  |
| `npm start`                   | Inicia em produção               |
| `npx prisma migrate dev`      | Cria/aplica migrações            |
| `node prisma/seed.js`         | Popula o banco com dados mock    |
| `npx prisma studio`           | Interface visual do banco        |

## Variáveis de Ambiente (.env)

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua_chave_secreta"
JWT_EXPIRES_IN="7d"
PORT=5000
CORS_ORIGIN="http://localhost:3000"
```
