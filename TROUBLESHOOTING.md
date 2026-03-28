# 🔧 Guia de Troubleshooting

Soluções para problemas comuns ao executar o Netflix Clone.

## 📑 Índice

1. [Problemas de Instalação](#problemas-de-instalação)
2. [Problemas do Backend](#problemas-do-backend)
3. [Problemas do Frontend](#problemas-do-frontend)
4. [Problemas de Banco de Dados](#problemas-de-banco-de-dados)
5. [Problemas de Rede/CORS](#problemas-de-redecors)
6. [Performance](#performance)
7. [Outros](#outros)

---

## 📥 Problemas de Instalação

### ❌ "npm: command not found"

**Causa:** Node.js não está instalado

**Solução:**
```bash
# Verificar instalação
node --version
npm --version

# Se não tiver, instale em:
# https://nodejs.org (versão 20 LTS recomendada)

# Após instalar, reinicie o terminal
```

---

### ❌ "git: command not found"

**Causa:** Git não está instalado

**Solução:**
```bash
# Windows/Mac/Linux
# Instale em https://git-scm.com

# Verificar depois
git --version
```

---

### ❌ Permissão negada ao instalar

**Windows:**
```bash
# Execute como Administrador o PowerShell
# E execute:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Mac/Linux:**
```bash
# Normalmente funciona com sudo
sudo npm install -g npm
```

---

### ❌ node_modules corrompido

```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Ou em Windows
rmdir /s node_modules
del package-lock.json
npm cache clean --force
npm install
```

---

## 🚀 Problemas do Backend

### ❌ "npm run dev" não funciona

**Causa:** nodemon não instalado ou arquivo corrompido

**Solução:**
```bash
cd backend
npm install
npm run dev

# Se ainda não funcionar, tente:
npx nodemon src/server.js
```

---

### ❌ "Cannot find module 'express'"

**Causa:** Dependências não instaladas

**Solução:**
```bash
cd backend
npm install

# Verificar package.json existe
cat package.json
```

---

### ❌ "PORT=5000 is already in use"

**Causa:** Outra aplicação usando a porta

**Solução:**

**Windows:**
```bash
# Encontrar processo usando porta 5000
netstat -ano | findstr :5000

# Matar o processo (ex: PID 1234)
taskkill /PID 1234 /F
```

**Mac/Linux:**
```bash
# Encontrar processo
lsof -i :5000

# Matar o processo
kill -9 <PID>

# Ou mudando a porta em .env
PORT=5001
```

---

### ❌ "Unexpected token" ou "SyntaxError"

**Causa:** Arquivo JavaScript com erro de sintaxe

**Solução:**
```bash
# Verificar o arquivo apontado pelo erro
# Exemplo: src/controllers/authController.js

# Procurar por:
# - Vírgulas faltando
# - Parênteses/chaves desbalanceadas
# - Aspas não fechadas

# Usar editor com linting:
# VS Code + ESLint extension
```

---

### ❌ Erro ao conectar ao banco de dados

**Causa:** Arquivo .env não configurado ou DATABASE_URL incorreta

**Solução:**
```bash
cd backend

# 1. Verificar se .env existe
ls -la .env
# ou no Windows: dir .env

# 2. Se não existe
cp .env.example .env

# 3. Verificar conteúdo
cat .env

# 4. Verificar DATABASE_URL
# Deve parecer com: file:./prisma/dev.db

# 5. Se tudo está certo, tentar reset
npm run prisma:reset
```

---

### ❌ "PRISMA_INTERACTIVE" error

**Causa:** Problema com migrações do Prisma

**Solução:**
```bash
cd backend

# Resetar banco de dados
npm run prisma:reset

# Se não funcionar:
rm prisma/dev.db
npm run prisma:migrate
npm run prisma:seed
```

---

## 🎨 Problemas do Frontend

### ❌ "npm run dev" não abre servidor

**Causa:** Vite config incorreta

**Solução:**
```bash
cd frontend

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install

# Tentar novamente
npm run dev

# Se porta 3000 ocupada:
npm run dev -- --port 3001
```

---

### ❌ "Blank page" ou "Cannot find module"

**Causa:** Dependências faltando

**Solução:**
```bash
cd frontend

# 1. Verificar package.json
cat package.json

# 2. Reinstalar
npm install

# 3. Limpar cache Vite
rm -rf node_modules/.vite

# 4. Tentar novamente
npm run dev
```

---

### ❌ Estilos Tailwind não funcionam

**Causa:** Configuração Tailwind incorreta

**Solução:**
```bash
cd frontend

# 1. Verificar tailwind.config.js
cat tailwind.config.js

# 2. Verificar postcss.config.js
cat postcss.config.js

# 3. Verificar styles/index.css tem as directives
# @tailwind base;
# @tailwind components;
# @tailwind utilities;

# 4. Reinstalar
npm install tailwindcss postcss autoprefixer

# 5. Reiniciar servidor
npm run dev
```

---

### ❌ Componentes React não renderizam

**Causa:** Erro no código React

**Solução:**
```bash
# 1. Abrir Console do Navegador (F12)
# 2. Verificar erros vermelhos
# 3. Procurar por:
#    - Componente não exported
#    - Props faltando
#    - Estado não inicializado

# Exemplo de erro comum:
// ❌ RUIM - sem return
function MyComponent() {
  const data = useFetch(...);
}

// ✅ BOM
function MyComponent() {
  const data = useFetch(...);
  return <div>{data}</div>;
}
```

---

### ❌ "CORS error" no console

**Causa:** Backend não aceita requisições do frontend

**Solução:**
```bash
# 1. Verificar backend/.env
cat backend/.env
# CORS_ORIGIN deve ser http://localhost:3000

# 2. Verificar se backend está rodando em 5000
curl http://localhost:5000/api/health

# 3. Se frontend em porta diferente, atualizar .env backend
CORS_ORIGIN="http://localhost:3001"

# 4. Reiniciar backend
# Ctrl+C
npm run dev
```

---

### ❌ API_URL não funciona

**Causa:** Variável VITE não configurada

**Solução:**
```bash
cd frontend

# 1. Verificar .env
cat .env

# Deve ter:
# VITE_API_URL=http://localhost:5000/api

# 2. Se não tiver
echo 'VITE_API_URL=http://localhost:5000/api' > .env

# 3. Verificar services/api.js
# Deve usar: import.meta.env.VITE_API_URL

# 4. Reiniciar
npm run dev
```

---

## 🗄️ Problemas de Banco de Dados

### ❌ "database.db does not exist"

**Causa:** Migrações não foram executadas

**Solução:**
```bash
cd backend

# Executar migrações
npm run prisma:migrate

# Ou reset completo
npm run prisma:reset

# Verificar se arquivo foi criado
ls -la prisma/dev.db
```

---

### ❌ "Prisma Studio não abre"

**Causa:** Porta 5555 em uso ou erro na config

**Solução:**
```bash
cd backend

# Reintentar com porta diferente
npx prisma studio --port 5556

# Ou verificar se não há outro Prisma Studio aberto
lsof -i :5555  # Mac/Linux
netstat -ano | findstr :5555  # Windows
```

---

### ❌ Schema Prisma invalido

**Causa:** Erro na sintaxe do schema.prisma

**Solução:**
```bash
cd backend

# Validar schema
npx prisma validate

# Procurar por:
# - Typos em tipos (String, Int, Boolean)
# - Relacionamentos incorretos
# - PK/FK não definidas corretamente

# Exemplo erro:
// ❌ RUIM
model User {
  id String @id  // Faltou @default(cuid())
}

// ✅ BOM
model User {
  id String @id @default(cuid())
}
```

---

### ❌ Dados de seed não aparecem

**Causa:** Seed script não executado

**Solução:**
```bash
cd backend

# Executar seed manualmente
npm run prisma:seed

# Ou node direto
node prisma/seed.js

# Verificar em Prisma Studio
npm run prisma:studio

# Se não aparece, checar script existe
cat prisma/seed.js
```

---

## 🌐 Problemas de Rede/CORS

### ❌ CORS error: "Access-Control-Allow-Origin header missing"

**Solução completa:**

```bash
# Backend (.env)
CORS_ORIGIN="http://localhost:3000"

# Backend (src/config/cors.js)
module.exports = {
  origin: process.env.CORS_ORIGIN,
  credentials: true
};

# Backend (src/server.js)
const cors = require('cors');
const corsConfig = require('./config/cors');
app.use(cors(corsConfig));
```

**Então reiniciar backend:**
```bash
npm run dev
```

---

### ❌ "Failed to fetch" no frontend

**Causa:** Backend não está respondendo

**Solução:**
```bash
# 1. Verificar se backend está rodando
curl http://localhost:5000/api/health

# 2. Se não responde, iniciar
cd backend
npm run dev

# 3. Verificar firewall
# Windows: Adicionar Node.js à whitelist do firewall
# Mac: System Preferences → Security

# 4. Tentar localhost ao invés de 127.0.0.1
VITE_API_URL=http://localhost:5000/api
```

---

### ❌ "Network timeout"

**Causa:** Servidor lento ou fora

**Solução:**
```bash
# 1. Verificar se backend está rodando
ps aux | grep node  # Mac/Linux
tasklist | findstr node  # Windows

# 2. Aumentar timeout em services/api.js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000  // 10 segundos
});

# 3. Verificar conexão internet
ping 8.8.8.8
```

---

## ⚡ Performance

### ❌ Aplicação lenta

**Otimizações:**

```javascript
// Frontend - Code splitting
const Browse = lazy(() => import('./pages/Browse'));

// Frontend - Memoization
const ContentCard = memo(({ content }) => {
  return <div>...</div>;
});

// Backend - Índices no DB
model Content {
  @@index([genreId])
  @@index([type])
}

// Backend - Paginação
prisma.content.findMany({
  skip: (page - 1) * 10,
  take: 10
});
```

---

### ❌ Vite build muito lento

**Otimizações:**
```bash
cd frontend

# Limpar cache
rm -rf node_modules/.vite
rm -rf dist

# Usar build otimizado
npm run build -- --minify terser
```

---

## 🔍 Outros

### ❌ "Cannot read property 'map' of undefined"

**Causa:** State não inicializado

**Solução:**
```javascript
// ❌ RUIM
const [items, setItems] = useState();
return items.map(...);  // Erro se items undefined

// ✅ BOM
const [items, setItems] = useState([]);
return items.map(...);  // Funciona sempre

// ✅ BOM (com verificação)
const [items, setItems] = useState(null);
if (!items) return <Spinner />;
return items.map(...);
```

---

### ❌ "auth0 is not defined"

**Causa:** Variável/import faltando

**Solução:**
```javascript
// Verificar imports
import { auth0 } from './services/auth0';

// Ou verificar se está no contexto
const { auth0 } = useContext(AuthContext);
```

---

### ❌ Comandos npm não reconhecidos

**Causa:** package.json scripts não defini dos

**Solução:**
```bash
# Verificar package.json
cat package.json

# "scripts" deve ter:
"scripts": {
  "dev": "...",
  "build": "...",
  "start": "..."
}

# Se faltando, adicionar e testar
npm run dev
```

---

### ✅ Verificação Completa de Setup

Se tudo está quebrado, execute isto:

```bash
# Backend
cd backend
rm -rf node_modules package-lock.json prisma/dev.db
npm install
npm run prisma:migrate
npm run prisma:seed
npm run dev

# Em outro terminal
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev

# Testar
open http://localhost:3000
curl http://localhost:5000/api/health
```

---

## 📞 Ainda Precisa de Ajuda?

1. Verificar erros em: [Google Chrome DevTools](https://developer.chrome.com/docs/devtools/)
2. Procurar solução em: [Stack Overflow](https://stackoverflow.com)
3. Abrir issue no repositório com:
   - Versão do Node.js (`node --version`)
   - Sistema operacional
   - Erro completo (copiar do terminal)
   - Passos para reproduzir

---

**Última atualização: Março 2026**
