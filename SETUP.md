# 🚀 Guia de Instalação e Setup

Este guia fornece instruções detalhadas para configurar o Netflix Clone em sua máquina local.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js 20 LTS** (ou superior)
  - Download: https://nodejs.org
  - Verificar: `node --version`
- **npm** (vem com Node.js)
  - Verificar: `npm --version`
- **Git**
  - Download: https://git-scm.com
  - Verificar: `git --version`

## 📥 1. Clone o Repositório

```bash
git clone https://github.com/NatanFurletti/Netflix-Clone.git
cd Netflix-Clone
```

## 🔧 2. Setup do Backend

### 2.1 Instale as Dependências

```bash
cd backend
npm install
```

### 2.2 Configure as Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` se necessário:

```env
# Banco de dados
DATABASE_URL="file:./dev.db"

# JWT
JWT_SECRET="sua_chave_secreta_aqui_minimo_32_caracteres"
JWT_EXPIRES_IN="7d"

# Servidor
PORT=5000

# CORS (Frontend)
CORS_ORIGIN="http://localhost:3000"
```

**Notas sobre variáveis:**
- `DATABASE_URL`: Caminho do banco SQLite (recomenda-se manter padrão)
- `JWT_SECRET`: Use uma string aleatória e segura para produção
- `JWT_EXPIRES_IN`: Tempo de expiração do token (ex: 7d, 24h)
- `PORT`: Porta do servidor (padrão 5000)
- `CORS_ORIGIN`: URL do frontend para CORS

### 2.3 Configure o Prisma e o Banco de Dados

```bash
# Gere o Prisma Client
npm run prisma:generate

# Crie e aplique as migrações
npm run prisma:migrate

# (Opcional) Popule o banco com dados iniciais
npm run prisma:seed
```

**O que cada comando faz:**

| Comando | Descrição |
|---------|-----------|
| `prisma:generate` | Gera o client Prisma para usar no código |
| `prisma:migrate` | Aplica migrações e cria tabelas no banco |
| `prisma:seed` | Insere dados de teste no banco (usuários, conteúdo) |
| `prisma:studio` | Abre interface visual do banco (Prisma Studio) |

### 2.4 Inicie o Backend

```bash
npm run dev
```

A API estará rodando em: **http://localhost:5000**

Você verá no terminal:
```
🚀 Server running on http://localhost:5000
```

**Parar o servidor:** Pressione `Ctrl + C`

## 🎨 3. Setup do Frontend

### 3.1 Abra um Novo Terminal

Em um novo terminal (mantenha o backend rodando):

```bash
cd frontend
```

### 3.2 Instale as Dependências

```bash
npm install
```

### 3.3 Configure as Variáveis de Ambiente

Crie um arquivo `.env` na pasta `frontend`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` se necessário:

```env
# API Backend
VITE_API_URL=http://localhost:5000/api
```

**Nota:** A variável `VITE_` é prefix obrigatório no Vite para expor variáveis para o navegador.

### 3.4 Inicie o Frontend

```bash
npm run dev
```

O frontend estará disponível em: **http://localhost:3000**

Você verá no terminal:
```
➜  Local:   http://localhost:3000/
➜  Press h to show help
```

**Parar o servidor:** Pressione `Ctrl + C`

## ✅ Verificando a Instalação

Após iniciar backend e frontend, verifique:

1. **Backend está rodando:**
   ```bash
   curl http://localhost:5000/api/health
   ```
   Deve retornar: `{"status":"ok"}`

2. **Frontend está acessível:**
   - Abra http://localhost:3000 no navegador
   - Você deve ver a página de login do Netflix Clone

3. **Banco de dados foi criado:**
   - Verifique se o arquivo `backend/prisma/dev.db` existe

## 🔑 Testando com Credenciais Padrão

Se executou o seed (`npm run prisma:seed`), use:

```
Email:   user@test.com
Senha:   senha123
```

Ou:

```
Email:   admin@test.com
Senha:   senha123
```

## 🗂️ Estrutura de Arquivos Criada

Após o setup completo:

```
Netflix-Clone/
├── backend/
│   ├── node_modules/          # Dependências
│   ├── prisma/
│   │   └── dev.db             # Banco de dados SQLite
│   ├── .env                   # Variáveis de ambiente
│   └── ...
├── frontend/
│   ├── node_modules/          # Dependências
│   ├── .env                   # Variáveis de ambiente
│   ├── dist/                  # Build (criado por `npm run build`)
│   └── ...
└── ...
```

## 🔄 Reiniciando Tudo do Zero (Reset Completo)

Se quiser resetar e começar novamente:

### Backend
```bash
cd backend

# Limpar banco de dados e migrações
npm run prisma:reset

# Ou manualmente:
rm prisma/dev.db
npm run prisma:migrate
npm run prisma:seed
```

### Frontend
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## 🐛 Troubleshooting

### ❌ "npm: command not found"
- Instale Node.js em https://nodejs.org

### ❌ "Port 5000 is already in use"
- Mude a porta em `backend/.env`: `PORT=5001`
- Atualize o CORS no mesmo arquivo

### ❌ "Port 3000 is already in use"
- Mude a porta executando: `npm run dev -- --port 3001`

### ❌ Erro ao criar migrations
```bash
rm prisma/dev.db
npm run prisma:migrate
```

### ❌ Variáveis de ambiente não funcionam
- Certifique-se que usou `cp .env.example .env`
- Reinicie o servidor após editar `.env`
- Frontend usa `VITE_` como prefix (ex: `VITE_API_URL`)

### ❌ CORS Error no console do navegador
- Verifique se `CORS_ORIGIN` em `backend/.env` bate com sua URL do frontend
- Padrão: `http://localhost:3000`

## 📚 Próximos Passos

1. Leia [DEVELOPMENT.md](./DEVELOPMENT.md) para entender a estrutura do código
2. Consulte [ARCHITECTURE.md](./ARCHITECTURE.md) para detalhes técnicos
3. Veja [API.md](./API.md) para documentação dos endpoints

## 💡 Dicas

- Use `npm run prisma:studio` para visualizar o banco graficamente
- Use ferramentas como **Postman** ou **Insomnia** para testar a API
- Use **React DevTools** browser extension para debugar o frontend
- Mantenha dois terminais abertos: um para backend, outro para frontend

## 🆘 Precisando de Ajuda?

Se encontrar problemas:
1. Verifique as versões: `node --version` e `npm --version`
2. Delete node_modules e instale novamente
3. Abra uma issue no repositório com detalhes do erro
