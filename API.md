# 📡 Documentação da API REST

Documentação completa dos endpoints da API Netflix Clone.

## Base URL

```
http://localhost:5000/api
```

## 📋 Índice

1. [Autenticação](#autenticação)
2. [Usuários](#usuários)
3. [Perfis](#perfis)
4. [Conteúdo](#conteúdo)
5. [Gêneros](#gêneros)
6. [Watchlist](#watchlist)
7. [Histórico](#histórico)
8. [Códigos de Erro](#códigos-de-erro)

---

## 🔐 Autenticação

### POST /auth/register

Registrar novo usuário.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "senha123",
  "profileName": "Meu Perfil"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com"
  },
  "profile": {
    "id": 1,
    "name": "Meu Perfil"
  }
}
```

**Erros:**
- `400` - Email já existe
- `400` - Validação falhou

---

### POST /auth/login

Fazer login de usuário.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

**Erros:**
- `401` - Email não encontrado
- `401` - Senha incorreta
- `400` - Validação falhou

---

## 👤 Usuários

### GET /users/me

Obter dados do usuário autenticado.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "createdAt": "2024-01-15T10:30:00Z",
  "profiles": [
    {
      "id": 1,
      "name": "Meu Perfil",
      "avatarUrl": "https://..."
    }
  ]
}
```

**Erros:**
- `401` - Token não fornecido ou inválido

---

## 👨‍👩‍👧 Perfis

### GET /profiles

Listar perfis do usuário autenticado.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Meu Perfil",
    "avatarUrl": "https://",
    "userId": 1
  },
  {
    "id": 2,
    "name": "Perfil 2",
    "avatarUrl": "https://",
    "userId": 1
  }
]
```

---

### POST /profiles

Criar novo perfil.

**Headers:**
```
Authorization: Bearer {token}
```

**Request:**
```json
{
  "name": "Novo Perfil",
  "avatarUrl": "https://example.com/avatar.jpg"
}
```

**Response (201):**
```json
{
  "id": 3,
  "name": "Novo Perfil",
  "avatarUrl": "https://example.com/avatar.jpg",
  "userId": 1,
  "createdAt": "2024-01-15T11:00:00Z"
}
```

**Erros:**
- `400` - Nome obrigatório
- `401` - Token inválido

---

### GET /profiles/:id

Obter perfil específico.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "id": 1,
  "name": "Meu Perfil",
  "avatarUrl": "https://",
  "userId": 1,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

### PUT /profiles/:id

Atualizar perfil.

**Headers:**
```
Authorization: Bearer {token}
```

**Request:**
```json
{
  "name": "Perfil Atualizado",
  "avatarUrl": "https://example.com/new-avatar.jpg"
}
```

**Response (200):**
```json
{
  "id": 1,
  "name": "Perfil Atualizado",
  "avatarUrl": "https://example.com/new-avatar.jpg",
  "userId": 1
}
```

---

### DELETE /profiles/:id

Deletar perfil.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "message": "Perfil deletado com sucesso"
}
```

---

## 🎬 Conteúdo

### GET /content

Listar conteúdo com filtros opcionais.

**Query Parameters:**
```
?genre=action              # Filtrar por gênero
?type=MOVIE               # Filtrar por tipo (MOVIE|SERIES)
?search=Avatar            # Buscar por título
?page=1                   # Paginação
&limit=10                 # Items por página
```

**Response (200):**
```json
[
  {
    "id": 1,
    "title": "Avatar",
    "description": "Um filme épico de ficção científica...",
    "genre": {
      "id": 1,
      "name": "Ficção Científica"
    },
    "releaseYear": 2009,
    "director": "James Cameron",
    "actors": "Sam Worthington, Zoe Saldana",
    "thumbnailUrl": "https://...",
    "videoUrl": "https://...",
    "duration": 162,
    "type": "MOVIE",
    "rating": 8.5,
    "createdAt": "2024-01-15T10:00:00Z"
  }
]
```

---

### GET /content/:id

Obter detalhes de um conteúdo específico.

**Response (200):**
```json
{
  "id": 1,
  "title": "Avatar",
  "description": "Um filme épico de ficção científica...",
  "genre": {
    "id": 1,
    "name": "Ficção Científica"
  },
  "releaseYear": 2009,
  "director": "James Cameron",
  "actors": "Sam Worthington, Zoe Saldana",
  "thumbnailUrl": "https://",
  "videoUrl": "https://",
  "duration": 162,
  "type": "MOVIE",
  "rating": 8.5,
  "createdAt": "2024-01-15T10:00:00Z"
}
```

**Erros:**
- `404` - Conteúdo não encontrado

---

## 🏷️ Gêneros

### GET /genres

Listar todos os gêneros.

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Ficção Científica"
  },
  {
    "id": 2,
    "name": "Drama"
  },
  {
    "id": 3,
    "name": "Ação"
  }
]
```

---

### GET /genres/:id/content

Listar conteúdo de um gênero específico.

**Query Parameters:**
```
?limit=10              # Itens por página
```

**Response (200):**
```json
[
  {
    "id": 1,
    "title": "Avatar",
    "genre": {
      "id": 1,
      "name": "Ficção Científica"
    },
    ...
  }
]
```

---

## 📚 Watchlist

### GET /watchlist

Obter watchlist do usuário autenticado.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
[
  {
    "id": 5,
    "userId": 1,
    "contentId": 1,
    "addedAt": "2024-01-15T11:30:00Z",
    "content": {
      "id": 1,
      "title": "Avatar",
      "thumbnailUrl": "https://",
      "rating": 8.5
    }
  }
]
```

---

### POST /watchlist

Adicionar conteúdo à watchlist.

**Headers:**
```
Authorization: Bearer {token}
```

**Request:**
```json
{
  "contentId": 1
}
```

**Response (201):**
```json
{
  "id": 5,
  "userId": 1,
  "contentId": 1,
  "addedAt": "2024-01-15T11:30:00Z"
}
```

**Erros:**
- `400` - Conteúdo já na watchlist
- `404` - Conteúdo não encontrado
- `401` - Token inválido

---

### DELETE /watchlist/:contentId

Remover conteúdo da watchlist.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "message": "Removido da watchlist"
}
```

**Erros:**
- `404` - Item não encontrado na watchlist

---

## 📺 Histórico

### GET /history

Obter histórico de visualização.

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
```
?limit=10              # Itens por página
```

**Response (200):**
```json
[
  {
    "id": 10,
    "userId": 1,
    "contentId": 1,
    "watchedAt": "2024-01-15T15:00:00Z",
    "progress": 85,
    "content": {
      "id": 1,
      "title": "Avatar",
      "duration": 162
    }
  }
]
```

---

### POST /history

Registrar visualização (ou atualizar progresso).

**Headers:**
```
Authorization: Bearer {token}
```

**Request:**
```json
{
  "contentId": 1,
  "progress": 85
}
```

**Response (201):**
```json
{
  "id": 10,
  "userId": 1,
  "contentId": 1,
  "watchedAt": "2024-01-15T15:00:00Z",
  "progress": 85
}
```

---

### GET /history/:contentId

Obter progresso de um conteúdo específico.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "id": 10,
  "userId": 1,
  "contentId": 1,
  "watchedAt": "2024-01-15T15:00:00Z",
  "progress": 85
}
```

---

## ❌ Códigos de Erro

### Tabela de Erros

| Código | Significado | Descrição |
|--------|-------------|-----------|
| `200` | OK | Requisição bem-sucedida |
| `201` | Created | Recurso criado com sucesso |
| `204` | No Content | Sem conteúdo na resposta |
| `400` | Bad Request | Dados inválidos |
| `401` | Unauthorized | Token ausente ou inválido |
| `403` | Forbidden | Acesso negado |
| `404` | Not Found | Recurso não encontrado |
| `409` | Conflict | Conflito (ex: email já existe) |
| `500` | Server Error | Erro interno do servidor |

### Formato de Erro

```json
{
  "status": 400,
  "error": "Validação falhou",
  "details": [
    "Email inválido",
    "Senha deve ter no mínimo 6 caracteres"
  ]
}
```

---

## 🧪 Exemplos de Uso com cURL

### Registrar

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "senha123",
    "profileName": "Meu Perfil"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "senha123"
  }'
```

### Usar Token

```bash
# Guardar token da resposta anterior
TOKEN="eyJhbGciOiJIUzI1NiIs..."

# Usar em requisições autenticadas
curl -X GET http://localhost:5000/api/users/me \
  -H "Authorization: Bearer $TOKEN"
```

### Listar Conteúdo

```bash
curl -X GET "http://localhost:5000/api/content?genre=action&limit=10"
```

### Adicionar à Watchlist

```bash
TOKEN="eyJhbGciOiJIUzI1NiIs..."

curl -X POST http://localhost:5000/api/watchlist \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"contentId": 1}'
```

---

## 🧩 Exemplos de Uso com Axios (Frontend)

### Configuração

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Exemplos

```javascript
// Login
const { token, user } = await api.post('/auth/login', {
  email: 'user@example.com',
  password: 'senha123'
});
sessionStorage.setItem('token', token);

// Listar conteúdo
const contents = await api.get('/content', {
  params: { genre: 'action' }
});

// Adicionar à watchlist
await api.post('/watchlist', { contentId: 1 });

// Obter histórico
const history = await api.get('/history');

// Registrar visualização
await api.post('/history', {
  contentId: 1,
  progress: 85
});
```

---

## 📈 Rate Limiting

Atualmente, não há rate limiting implementado. Em produção, recomenda-se adicionar:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // Limite de 100 requisições por IP
});

app.use('/api/', limiter);
```

---

## 🔄 Paginação

Para endpoints com muito dados, use paginação:

```
GET /content?page=1&limit=10

Response:
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 150,
    "pages": 15
  }
}
```

*(Implementação futura)*

---

## 📚 Recursos Adicionais

- **Testando API:** [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/)
- **Documentação Prisma:** https://www.prisma.io/docs/
- **JWT:** https://jwt.io/
- **REST Best Practices:** https://restfulapi.net/

---

**Última atualização: Março 2026**
