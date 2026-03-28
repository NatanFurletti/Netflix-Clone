# 👨‍💻 Guia de Desenvolvimento

Guia para entender a estrutura do código e contribuir com o projeto.

## 📚 Tabela de Conteúdos

1. [Arquitetura Geral](#arquitetura-geral)
2. [Backend - Structure](#backend---structure)
3. [Frontend - Structure](#frontend---structure)
4. [Padrões e Convenções](#padrões-e-convenções)
5. [Como Adicionar Funcionalidades](#como-adicionar-funcionalidades)
6. [Debugging](#debugging)

---

## 🏗️ Arquitetura Geral

O projeto segue o padrão **Client-Server** com separação clara entre frontend e backend:

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React)                       │
│                    (Port 3000 - Vite)                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Pages | Components | Services | Context | Hooks     │  │
│  └────────────────────┬─────────────────────────────────┘  │
└─────────────────────────┼─────────────────────────────────┘
                          │ HTTP / REST API
                          │ (Axios)
         ┌────────────────┴─────────────────┐
         │                                  │
┌────────▼──────────────────────────────────▼──────────┐
│           Backend (Node.js + Express)                │
│               (Port 5000)                            │
│  ┌──────────────────────────────────────────────┐   │
│  │ Routes → Controllers → Services → Prisma ORM│   │
│  └────────────────────┬─────────────────────────┘   │
└─────────────────────────┼──────────────────────────┘
                          │
         ┌────────────────┴──────────────────┐
         │ SQLite Database                  │
         │ (Arquivo: dev.db)                │
         └─────────────────────────────────┘
```

### Fluxo de Requisição

```
Frontend (React Component)
    ↓
Service Layer (authService, contentService)
    ↓
API Layer (Axios)
    ↓
Backend Route (/api/auth, /api/content, etc)
    ↓
Controller (lógica de negócio)
    ↓
Prisma Client (ORM)
    ↓
SQLite Database
```

---

## 🚀 Backend - Structure

### Localização: `backend/src/`

#### 1. **Routes** (`routes/`)
Define os endpoints HTTP:

```
routes/
├── auth.js       # POST /api/auth/login, /api/auth/register
├── content.js    # GET /api/content, /api/content/:id
├── genres.js     # GET /api/genres
├── profiles.js   # GET/POST /api/profiles
└── users.js      # GET /api/users/me
```

**Exemplo:**
```javascript
// routes/auth.js
router.post('/login', authController.login);
router.post('/register', authController.register);
```

#### 2. **Controllers** (`controllers/`)
Lógica de negócio e validação:

```
controllers/
├── authController.js       # Login, registro
├── contentController.js     # Listar conteúdo
├── historyController.js     # Histórico de visualização
├── profileController.js     # Gerenciar perfis
└── watchlistController.js   # Minha lista
```

**Padrão:**
```javascript
// controllers/authController.js
exports.login = async (req, res) => {
  // 1. Validar entrada
  // 2. Buscar usuário no banco
  // 3. Verificar senha
  // 4. Gerar JWT
  // 5. Retornar resposta
};
```

#### 3. **Middleware** (`middleware/`)
Processamento intermediário:

```
middleware/
├── auth.js              # Verificar JWT
│   - Middleware de autenticação
│   - Adiciona user ao req.user
│
└── errorHandler.js      # Tratamento global de erros
    - Captura erros
    - Retorna respostas consistentes
```

**Uso:**
```javascript
router.get('/me', auth, userController.getMe);
// auth middleware verificará se tem token válido
```

#### 4. **Config** (`config/`)
Configurações da aplicação:

```
config/
├── cors.js    # Configuração CORS
└── jwt.js     # Segredos e opções JWT
```

#### 5. **Services** (`services/`)
Camada de serviços/utilitários:

```
services/
└── prisma.js  # Cliente Prisma
```

#### 6. **Database** (`prisma/`)
Definição de modelos e migrações:

```
prisma/
├── schema.prisma    # Modelos de dados
│   - User
│   - Profile
│   - Content
│   - Genre
│   - Watchlist
│   - WatchHistory
│
└── seed.js          # Dados iniciais
```

### Fluxo Backend - Exemplo Prático

**Requisição para listar conteúdo:**

```
GET /api/content?genre=drama
    ↓
routes/content.js
  router.get('/', contentController.getAll)
    ↓
controllers/contentController.js
  exports.getAll = async (req, res) => {
    const { genre } = req.query;
    const contents = await prisma.content.findMany({
      where: { genre: { name: genre } }
    });
    res.json(contents);
  }
    ↓
prisma/schema.prisma
  model Content { ... }
    ↓
SQLite Database
  SELECT * FROM Content WHERE genreId IN (SELECT id FROM Genre WHERE name = 'drama')
```

---

## 🎨 Frontend - Structure

### Localização: `frontend/src/`

#### 1. **Pages** (`pages/`)
Componentes de página (roteáveis):

```
pages/
├── Login.jsx         # Página de login
├── Register.jsx      # Página de registro
├── Browse.jsx        # Feed principal
├── ContentDetail.jsx  # Detalhes do conteúdo
├── Player.jsx        # Player de vídeo
├── MyList.jsx        # Minha watchlist
├── Search.jsx        # Busca
└── Profiles.jsx      # Gerenciar perfis
```

**Padrão:**
```javascript
// pages/Browse.jsx
function Browse() {
  const { profile } = useContext(AuthContext);
  const [contents, setContents] = useState([]);

  useEffect(() => {
    contentService.getAll().then(setContents);
  }, []);

  return (
    <div>
      <Navbar />
      <HeroSection content={contents[0]} />
      <ContentRow title="Trending" contents={contents} />
    </div>
  );
}
```

#### 2. **Components** (`components/`)
Componentes reutilizáveis:

```
components/
├── Navbar.jsx          # Barra de navegação
├── ContentCard.jsx     # Card individual
├── ContentRow.jsx      # Row de múltiplos cards
├── HeroSection.jsx     # Seção hero
├── PrivateRoute.jsx    # Rota protegida
└── Spinner.jsx         # Loading spinner
```

**Exemplo - ContentCard:**
```javascript
function ContentCard({ content, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={content.thumbnailUrl} alt={content.title} />
      <h3>{content.title}</h3>
      <p>{content.genre.name}</p>
    </div>
  );
}
```

#### 3. **Context** (`context/`)
Estado global (Context API):

```
context/
├── AuthContext.jsx      # Estado de autenticação
│   - user
│   - profile
│   - token
│   - login()
│   - logout()
│
└── WatchlistContext.jsx # Estado da watchlist
    - watchlist
    - addToWatchlist()
    - removeFromWatchlist()
```

**Uso:**
```javascript
const { user, login } = useContext(AuthContext);

const handleLogin = async (email, password) => {
  const { token, user } = await authService.login(email, password);
  login(token, user);
};
```

#### 4. **Services** (`services/`)
Chamadas à API:

```
services/
├── api.js               # Configuração Axios
├── authService.js       # POST /login, /register
├── contentService.js    # GET /content
├── historyService.js    # POST /history
├── profileService.js    # GET/POST /profiles
└── watchlistService.js  # POST/DELETE /watchlist
```

**Padrão:**
```javascript
// services/contentService.js
export const contentService = {
  getAll: (genre) => api.get('/content', { params: { genre } }),
  getById: (id) => api.get(`/content/${id}`),
  search: (query) => api.get('/content/search', { params: { q: query } })
};

// Uso
const contents = await contentService.getAll('action');
```

#### 5. **Hooks** (`hooks/`)
Custom React hooks:

```
hooks/
└── useFetch.js  # Hook para fetch com loading/erro
```

**Exemplo:**
```javascript
// hooks/useFetch.js
function useFetch(fetcher) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetcher()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [fetcher]);

  return { data, loading, error };
}

// Uso
function MyComponent() {
  const { data: contents, loading } = useFetch(() => contentService.getAll());
  if (loading) return <Spinner />;
  return <ContentRow contents={contents} />;
}
```

#### 6. **Styles** (`styles/`)
Estilos globais:

```
styles/
└── index.css    # Tailwind imports, variáveis globais
```

---

## 📋 Padrões e Convenções

### Nomeação de Arquivos

- **Components:** PascalCase (`ContentCard.jsx`)
- **Pages:** PascalCase (`Browse.jsx`)
- **Services:** camelCase (`authService.js`)
- **Contextos:** PascalCase + Context (`AuthContext.jsx`)
- **Hooks:** camelCase com prefixo `use` (`useFetch.js`)

### Nomeação de Variáveis

```javascript
// ✅ Bom
const user = await userService.getById(userId);
const handleLoginClick = () => { ... };
const isLoading = true;

// ❌ Ruim
const u = await userService.getById(userId);
const onLoginClick = () => { ... };  // use handle, not on
const loading = true;  // use isLoading
```

### Estrutura de Resposta da API

**Sucesso:**
```json
{
  "status": 200,
  "data": { ... },
  "message": "Operação realizada com sucesso"
}
```

**Erro:**
```json
{
  "status": 400,
  "error": "Validação falhou",
  "details": ["Email inválido"]
}
```

### Autenticação

```javascript
// Frontend - Armazena token em sessionStorage
const token = sessionStorage.getItem('token');

// Backend - Verifica token em req.headers.authorization
const token = req.headers.authorization?.split(' ')[1];
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

---

## 🛠️ Como Adicionar Funcionalidades

### Exemplo: Adicionar Sistema de Ratings

#### 1. Backend - Adicionar Model

```javascript
// prisma/schema.prisma
model Rating {
  id        Int      @id @default(autoincrement())
  userId    Int
  contentId Int
  score     Int      // 1-5
  comment   String?
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  content   Content  @relation(fields: [contentId], references: [id], onDelete: Cascade)

  @@unique([userId, contentId])
}
```

#### 2. Backend - Criar Migration

```bash
npm run prisma:migrate -- --name add_ratings
```

#### 3. Backend - Criar Controller

```javascript
// controllers/ratingController.js
exports.create = async (req, res) => {
  const { contentId, score, comment } = req.body;
  const userId = req.user.id;

  const rating = await prisma.rating.upsert({
    where: { userId_contentId: { userId, contentId } },
    update: { score, comment },
    create: { userId, contentId, score, comment }
  });

  res.json(rating);
};
```

#### 4. Backend - Adicionar Route

```javascript
// routes/ratings.js
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const auth = require('../middleware/auth');

router.post('/', auth, ratingController.create);

module.exports = router;

// server.js
app.use('/api/ratings', require('./routes/ratings'));
```

#### 5. Frontend - Service

```javascript
// services/ratingService.js
export const ratingService = {
  create: (contentId, score, comment) =>
    api.post('/ratings', { contentId, score, comment })
};
```

#### 6. Frontend - Component

```javascript
// components/RatingForm.jsx
function RatingForm({ contentId, onRate }) {
  const [score, setScore] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    await ratingService.create(contentId, score, comment);
    onRate();
  };

  return (
    <div>
      <input type="range" min="1" max="5" value={score} onChange={e => setScore(e.target.value)} />
      <textarea value={comment} onChange={e => setComment(e.target.value)} />
      <button onClick={handleSubmit}>Enviar Avaliação</button>
    </div>
  );
}
```

---

## 🐛 Debugging

### Backend

**1. Ativar logs detalhados:**
```javascript
// Adicione no server.js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

**2. Usar Prisma Studio:**
```bash
npm run prisma:studio
```

**3. Adicionar console.logs estratégicos:**
```javascript
console.log('User:', user);
console.log('Token:', token);
```

### Frontend

**1. Usar React DevTools:**
- Install: https://chrome.google.com/webstore

**2. Inspecionar Network:**
- Abra DevTools (F12)
- Aba Network
- Veja requisições HTTP

**3. Debugar Context:**
```javascript
console.log('Auth context:', useContext(AuthContext));
```

**4. Usar localStorage inspecionador:**
```javascript
// DevTools Console
sessionStorage.getItem('token')
```

---

## 📖 Recursos Úteis

- [Express Docs](https://expressjs.com/)
- [Prisma Docs](https://www.prisma.io/docs/)
- [React Docs](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)

## 🚀 Próximas Melhorias

- [ ] Testes unitários (Jest)
- [ ] Testes E2E (Cypress)
- [ ] Validação com Zod
- [ ] Real-time updates (Socket.io)
- [ ] Sistema de recomendações
- [ ] Compressão de vídeo
- [ ] Cache com Redis

---

**Dúvidas?** Abra uma issue no repositório!
