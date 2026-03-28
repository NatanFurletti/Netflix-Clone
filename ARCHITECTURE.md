# 🏛️ Arquitetura Técnica - Netflix Clone

Documento detalhado sobre a arquitetura, decisões de design e padrões técnicos do projeto.

## 📚 Índice

1. [Overview](#overview)
2. [Arquitetura de Camadas](#arquitetura-de-camadas)
3. [Banco de Dados](#banco-de-dados)
4. [Autenticação e Segurança](#autenticação-e-segurança)
5. [Comunicação Frontend-Backend](#comunicação-frontendbackend)
6. [Padrões de Design](#padrões-de-design)
7. [Escalabilidade](#escalabilidade)

---

## 📊 Overview

### Stack Geral

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT                                  │
│  React 18 + Vite + Tailwind + React Router + Axios              │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                    REST API (HTTP/JSON)
                    ┌──────────────────┐
                    │ Cors Enabled     │
                    │ JWT Auth         │
                    └──────────────────┘
                               │
┌──────────────────────────────┴──────────────────────────────────┐
│                         SERVER                                  │
│  Node.js 20 + Express 4 + JWT + bcryptjs + CORS                │
├──────────────────────────────────────────────────────────────────┤
│  Routes → Controllers → Services → ORM                          │
└──────────────────────────────┬──────────────────────────────────┘
                               │
┌──────────────────────────────┴──────────────────────────────────┐
│                      DATABASE                                   │
│  Prisma ORM + SQLite                                            │
│  (Arquivo: dev.db)                                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ Arquitetura de Camadas

### Backend - MVC + Services Pattern

```
┌─────────────────────────────────────────────────────┐
│              HTTP Request (Express)                 │
├─────────────────────────────────────────────────────┤
│  1. Routes Layer                                    │
│     - Parse URLs e métodos HTTP                    │
│     - Middleware de autenticação                   │
├─────────────────────────────────────────────────────┤
│  2. Controllers Layer                              │
│     - Validação de entrada                         │
│     - Coordenação de lógica de negócio             │
│     - Formatação de respostas                      │
├─────────────────────────────────────────────────────┤
│  3. Services Layer                                 │
│     - Lógica de negócio complexa                   │
│     - Operações auxiliares                         │
├─────────────────────────────────────────────────────┤
│  4. Data Access Layer (Prisma)                     │
│     - Queries ao banco de dados                    │
│     - Transformação de dados                       │
├─────────────────────────────────────────────────────┤
│  5. Database Layer (SQLite)                        │
│     - Persistência de dados                        │
│     - ACID compliance                              │
├─────────────────────────────────────────────────────┤
│  HTTP Response (JSON)                              │
└─────────────────────────────────────────────────────┘
```

### Frontend - Component Architecture

```
┌─────────────────────────────────────────────────────┐
│  App.jsx (Root)                                     │
├─────────────────────────────────────────────────────┤
│  Context Providers                                  │
│  - AuthContext                                      │
│  - WatchlistContext                                │
├─────────────────────────────────────────────────────┤
│  Router (React Router v6)                          │
├─────────────────────────────────────────────────────┤
│  Pages Layer                                        │
│  - Browse                                           │
│  - Login                                            │
│  - ContentDetail                                    │
│  - etc...                                           │
├─────────────────────────────────────────────────────┤
│  Components Layer                                   │
│  - Navbar                                           │
│  - ContentCard                                      │
│  - HeroSection                                      │
│  - etc...                                           │
├─────────────────────────────────────────────────────┤
│  Hooks & Context                                    │
│  - useFetch                                         │
│  - useContext(AuthContext)                         │
├─────────────────────────────────────────────────────┤
│  Services Layer                                     │
│  - authService                                      │
│  - contentService                                   │
│  - etc...                                           │
├─────────────────────────────────────────────────────┤
│  API Client (Axios)                                │
├─────────────────────────────────────────────────────┤
│  Backend API (HTTP)                                │
└─────────────────────────────────────────────────────┘
```

---

## 🗄️ Banco de Dados

### Schema Prisma

```sql
┌─────────────────────────────────────────────────────┐
│               ENTIDADES PRINCIPAIS                  │
├─────────────────────────────────────────────────────┤

User (Usuário)
├─ id (PK)
├─ email (UNIQUE)
├─ password (hashed)
├─ createdAt
├─ updatedAt
└─ Relations: 1-* profiles, watchlist, watchHistory

Profile (Perfil do Usuário)
├─ id (PK)
├─ name
├─ avatarUrl
├─ userId (FK → User)
└─ Relations: *-1 user

Genre (Gênero)
├─ id (PK)
├─ name (UNIQUE)
└─ Relations: 1-* contents

Content (Conteúdo)
├─ id (PK)
├─ title
├─ description
├─ genreId (FK → Genre)
├─ releaseYear
├─ director
├─ actors
├─ thumbnailUrl
├─ videoUrl
├─ duration (minutos)
├─ type (MOVIE|SERIES)
├─ rating (float)
├─ createdAt
└─ Relations: *-1 genre, 1-* watchlist, watchHistory

Watchlist (Minha Lista)
├─ id (PK)
├─ userId (FK → User)
├─ contentId (FK → Content)
├─ addedAt
├─ Relations: *-1 user, *-1 content
└─ Constraint: UNIQUE(userId, contentId)

WatchHistory (Histórico de Visualização)
├─ id (PK)
├─ userId (FK → User)
├─ contentId (FK → Content)
├─ watchedAt
├─ progress (%)
├─ Relations: *-1 user, *-1 content
└─ Constraint: UNIQUE(userId, contentId)
```

### Relacionamentos

```
User (1) ──────── (N) Profile
User (1) ──────── (N) Watchlist
User (1) ──────── (N) WatchHistory

Genre (1) ──────── (N) Content

Content (1) ──────── (N) Watchlist
Content (1) ──────── (N) WatchHistory
```

### Queries Comuns

```javascript
// Listar conteúdo com gênero
prisma.content.findMany({
  include: { genre: true }
});

// Watchlist do usuário
prisma.watchlist.findMany({
  where: { userId },
  include: { content: { include: { genre: true } } }
});

// Histórico de visualização
prisma.watchHistory.findMany({
  where: { userId },
  include: { content: true },
  orderBy: { watchedAt: 'desc' }
});
```

---

## 🔐 Autenticação e Segurança

### Fluxo de Autenticação

```
┌─────────────────────────────────────────────────────┐
│  REGISTRO (Sign Up)                                 │
├─────────────────────────────────────────────────────┤
│  1. POST /api/auth/register
│  {
│    "email": "user@example.com",
│    "password": "senha123",
│    "profileName": "Meu Perfil"
│  }
│
│  2. Hash da senha com bcryptjs
│    - Salt rounds: 10
│    - Tempo: ~100ms
│
│  3. Salvar User no banco
│
│  4. Retornar token JWT
│    {
│      "token": "eyJhbGc...",
│      "user": { "id": 1, "email": "..." }
│    }
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  LOGIN (Sign In)                                    │
├─────────────────────────────────────────────────────┤
│  1. POST /api/auth/login
│  {
│    "email": "user@example.com",
│    "password": "senha123"
│  }
│
│  2. Buscar User por email
│
│  3. Comparar senha com bcryptjs
│
│  4. Se válido, gerar JWT
│    - Header: { alg: "HS256", typ: "JWT" }
│    - Payload: { id, email, iat, exp }
│    - Secret: process.env.JWT_SECRET
│    - Expires: 7 dias
│
│  5. Retornar token
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  REQUISIÇÕES AUTENTICADAS                           │
├─────────────────────────────────────────────────────┤
│  1. Cliente envia GET /api/users/me
│    Header: Authorization: Bearer {token}
│
│  2. Middleware de autenticação:
│    - Extrai token do header
│    - Verifica assinatura com JWT_SECRET
│    - Decodifica payload
│    - Adiciona user ao req.user
│
│  3. Controller acessa req.user
│
│  4. Se token expirado ou inválido:
│    - Retorna 401 Unauthorized
└─────────────────────────────────────────────────────┘
```

### Middleware de Autenticação

```javascript
// middleware/auth.js
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.slice(7); // Remove "Bearer "
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};
```

### Segurança

| Aspecto | Implementação |
|--------|--------------|
| **Senhas** | bcryptjs com 10 salt rounds |
| **Tokens** | JWT com secret de 32+ caracteres |
| **Expiração** | 7 dias |
| **CORS** | Configurado para localhost:3000 |
| **Headers** | Content-Type: application/json |
| **Validação** | express-validator em rotas |
| **Erros** | Sem exposição de detalhes internos |

---

## 🔄 Comunicação Frontend-Backend

### Estrutura de Requisição

```javascript
// Frontend (services/api.js)
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Interceptor de token
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Uso
api.get('/content')
api.post('/auth/login', { email, password })
```

### Fluxo de Requisição Completa

```
FRONTEND                          BACKEND

1. Usuário clica "Adicionar à Lista"
        │
        │ dispatch action
        v
2. watchlistService.add(contentId)
        │
        │ api.post('/watchlist', { contentId })
        │ (axios interceptor adiciona token)
        v
3. POST /api/watchlist
   Header: Authorization: Bearer xxx
   Body: { contentId: 5 }
                          4. Route handler
                             watchlistRoutes.post
                          5. Middleware auth.js
                             Verifica token
                             Adiciona req.user
                          6. Controller
                             watchlistController.add
                          7. Prisma ORM
                             INSERT INTO Watchlist
                          8. Database
                             ✓ Inserido com sucesso
                          9. Response
                             { id: 12, userId: 1, contentId: 5 }
        │
        v
10. Recebe resposta em frontend
    Atualiza Context (WatchlistContext)
    Re-renderiza componentes
    Mostra feedback ao usuário
```

---

## 🎯 Padrões de Design

### 1. MVC Pattern (Backend)

**Model** → Prisma Schema  
**View** → JSON Response  
**Controller** → Request handlers  

```javascript
// Model (prisma/schema.prisma)
model Content { ... }

// Controller (controllers/contentController.js)
exports.getAll = async (req, res) => { ... }

// Route (routes/content.js)
router.get('/', contentController.getAll);
```

### 2. Repository Pattern (Abstração de Dados)

```javascript
// services/prisma.js
const db = new PrismaClient();

// Controllers usam apenas:
await db.content.findMany()
await db.watchlist.create()
```

### 3. Context API (React)

```javascript
// context/AuthContext.jsx
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  const login = (token, user) => {
    sessionStorage.setItem('token', token);
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
}

// Pages/components usam:
const { user, login } = useContext(AuthContext);
```

### 4. Custom Hooks (Lógica Reutilizável)

```javascript
// hooks/useFetch.js
function useFetch(fetcher) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetcher()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [fetcher]);

  return { data, loading, error };
}
```

### 5. Service Layer (Reutilização de Lógica API)

```javascript
// services/contentService.js
export const contentService = {
  getAll: (genre) => api.get('/content', { params: { genre } }),
  getById: (id) => api.get(`/content/${id}`),
  search: (query) => api.get('/content/search', { params: { q: query } })
};

// Uso em múltiplos componentes
const contents = await contentService.getAll('action');
```

---

## 📈 Escalabilidade

### Melhorias Futuras

#### Curto Prazo
- [ ] Testes automatizados (Jest)
- [ ] Validação avançada (Zod)
- [ ] Paginação de resultados
- [ ] Rate limiting

#### Médio Prazo
- [ ] Redis para cache
- [ ] Compressão de vídeos
- [ ] Upload de arquivos (S3)
- [ ] Notificações em tempo real (Socket.io)

#### Longo Prazo
- [ ] Microsserviços
- [ ] Kubernetes
- [ ] Replicação de banco de dados
- [ ] CDN para vídeos
- [ ] Machine Learning para recomendações

### Otimizações Possíveis

```javascript
// Lazy loading - Frontend
const Browse = lazy(() => import('./pages/Browse'));

// Paginação - Backend
prisma.content.findMany({
  skip: (page - 1) * pageSize,
  take: pageSize
});

// Cache - Backend com Redis
const contents = await redis.get('contents:action');
if (!contents) {
  contents = await prisma.content.findMany(...);
  await redis.setex('contents:action', 3600, contents);
}

// Índices de banco - Prisma
model Content {
  @@index([genreId])
  @@index([type])
}
```

---

## 🔗 Dependências Principais

### Backend

```json
{
  "@prisma/client": "^5.10.0",      // ORM
  "express": "^4.18.3",              // Framework web
  "jsonwebtoken": "^9.0.2",           // JWT
  "bcryptjs": "^2.4.3",               // Hash de senhas
  "cors": "^2.8.5",                   // CORS middleware
  "dotenv": "^16.4.5",                // Variáveis de ambiente
  "express-validator": "^7.0.1"       // Validação de entrada
}
```

### Frontend

```json
{
  "react": "^18.2.0",                 // UI library
  "react-dom": "^18.2.0",             // React DOM
  "react-router-dom": "^6.22.3",      // Roteamento
  "axios": "^1.6.7",                  // Cliente HTTP
  "tailwindcss": "^3.4.1",            // CSS framework
  "vite": "^5.1.6"                    // Build tool
}
```

---

## 📊 Diagramas

### Entity-Relationship Diagram

```
User
├── id (PK)
├── email (UNIQUE)
└── password

Profile
├── id (PK)
├── userId (FK)
└── name

Genre
├── id (PK)
└── name (UNIQUE)

Content
├── id (PK)
├── genreId (FK)
└── title

Watchlist
├── userId (FK)
├── contentId (FK)
└── (userId, contentId) = UNIQUE

WatchHistory
├── userId (FK)
├── contentId (FK)
└── (userId, contentId) = UNIQUE
```

---

**Documento atualizado em: Março 2026**  
Para dúvidas sobre a arquitetura, abra uma issue no repositório.
