# Netflix Clone 🎬

Uma aplicação full-stack que replica as principais funcionalidades da Netflix, desenvolvida com **Node.js**, **Express**, **Prisma**, **React** e **Tailwind CSS**.

## 📋 Visão Geral

O projeto é uma plataforma de streaming com as seguintes funcionalidades:

- ✅ Autenticação de usuários (registro, login, JWT)
- ✅ Gerenciamento de perfis de usuário
- ✅ Catálogo de conteúdo (filmes e séries)
- ✅ Sistema de watchlist (minha lista)
- ✅ Histórico de visualização
- ✅ Busca de conteúdo
- ✅ Filtro por gênero
- ✅ Player de vídeo

## 🏗️ Arquitetura

```
Netflix-Clone/
├── backend/           # API Node.js + Express + Prisma
│   ├── src/
│   │   ├── controllers/    # Lógica de negócio
│   │   ├── routes/         # Endpoints da API
│   │   ├── middleware/     # Autenticação, erros
│   │   ├── services/       # Serviços auxiliares
│   │   ├── config/         # Configurações (JWT, CORS)
│   │   └── server.js       # Arquivo principal
│   ├── prisma/
│   │   ├── schema.prisma   # Modelo de dados
│   │   └── seed.js         # Dados iniciais
│   └── package.json
│
└── frontend/          # App React + Vite + Tailwind
    ├── src/
    │   ├── components/     # Componentes reutilizáveis
    │   ├── pages/          # Páginas da aplicação
    │   ├── services/       # Chamadas à API
    │   ├── context/        # Context API para estado global
    │   ├── hooks/          # Custom hooks
    │   ├── styles/         # Estilos CSS
    │   ├── App.jsx         # Componente raiz
    │   └── main.jsx        # Ponto de entrada
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## 🚀 Quick Start

### Pré-requisitos
- Node.js 20 LTS ou superior
- npm ou yarn
- Git

### Instalação Rápida

```bash
# 1. Clone o repositório
git clone https://github.com/NatanFurletti/Netflix-Clone.git
cd Netflix-Clone

# 2. Configure o backend
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev
npm run dev

# 3. Em outro terminal, configure o frontend
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:3000` (frontend) e a API em `http://localhost:5000`.

## 📚 Documentação Completa

- **[SETUP.md](./SETUP.md)** - Guia detalhado de instalação e configuração
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Guia de desenvolvimento e estrutura do código
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Arquitetura técnica do projeto
- **[API.md](./API.md)** - Documentação dos endpoints da API

## 🔐 Credenciais de Teste

Depois de executar o seed do banco de dados, você pode fazer login com:

| Email           | Senha    |
|-----------------|----------|
| user@test.com   | senha123 |
| admin@test.com  | senha123 |

## 🛠️ Stack Tecnológico

### Backend
- **Node.js 20** - Runtime JavaScript
- **Express 4** - Framework web
- **Prisma 5** - ORM e migrações de banco de dados
- **SQLite** - Banco de dados
- **JWT** - Autenticação
- **bcryptjs** - Hashing de senhas
- **CORS** - Compartilhamento de recursos

### Frontend
- **React 18** - Biblioteca UI
- **Vite 5** - Build tool
- **React Router 6** - Roteamento
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Framework de estilos
- **react-icons** - Ícones

## 📝 Scripts Disponíveis

### Backend
```bash
npm run dev                  # Inicia com nodemon (hot reload)
npm start                    # Inicia em produção
npm run prisma:generate      # Gera Prisma Client
npm run prisma:migrate       # Cria/aplica migrações
npm run prisma:seed          # Popula banco com dados iniciais
npm run prisma:studio        # Abre Prisma Studio (visualizador DB)
```

### Frontend
```bash
npm run dev                  # Inicia servidor de desenvolvimento
npm run build                # Build para produção
npm run preview              # Preview do build de produção
```

## 📋 Estrutura de Pastas - Backend

```
backend/
├── src/
│   ├── config/              # Configurações
│   │   ├── cors.js          # Configuração CORS
│   │   └── jwt.js           # Configuração JWT
│   ├── controllers/         # Lógica de negócio
│   │   ├── authController.js
│   │   ├── contentController.js
│   │   ├── historyController.js
│   │   ├── profileController.js
│   │   └── watchlistController.js
│   ├── middleware/          # Middlewares
│   │   ├── auth.js          # Verificação de token JWT
│   │   └── errorHandler.js  # Tratamento de erros
│   ├── routes/              # Endpoints
│   │   ├── auth.js
│   │   ├── content.js
│   │   ├── genres.js
│   │   ├── profiles.js
│   │   └── users.js
│   ├── services/            # Serviços auxiliares
│   │   └── prisma.js        # Cliente Prisma
│   └── server.js            # Arquivo principal
├── prisma/
│   ├── schema.prisma        # Modelo de dados
│   └── seed.js              # Script de seed
├── .env                     # Variáveis de ambiente (gitignored)
├── .env.example             # Exemplo de variáveis
└── package.json
```

## 📦 Estrutura de Pastas - Frontend

```
frontend/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── ContentCard.jsx
│   │   ├── ContentRow.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Navbar.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── Spinner.jsx
│   ├── context/             # Context API
│   │   ├── AuthContext.jsx
│   │   └── WatchlistContext.jsx
│   ├── hooks/               # Custom hooks
│   │   └── useFetch.js
│   ├── pages/               # Páginas da aplicação
│   │   ├── Browse.jsx
│   │   ├── ContentDetail.jsx
│   │   ├── Login.jsx
│   │   ├── MyList.jsx
│   │   ├── Player.jsx
│   │   ├── Profiles.jsx
│   │   ├── Register.jsx
│   │   └── Search.jsx
│   ├── services/            # Chamadas à API
│   │   ├── authService.js
│   │   ├── api.js
│   │   ├── contentService.js
│   │   ├── historyService.js
│   │   ├── profileService.js
│   │   └── watchlistService.js
│   ├── styles/              # Estilos
│   │   └── index.css
│   ├── App.jsx              # Componente raiz
│   └── main.jsx             # Ponto de entrada
├── index.html
├── .env                     # Variáveis de ambiente
├── .env.example             # Exemplo
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🤝 Contribuindo

As contribuições são bem-vindas! Para modificar o projeto localmente:

1. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
2. Commit suas mudanças (`git commit -m 'Add: Nova funcionalidade'`)
3. Push para a branch (`git push origin feature/NovaFuncionalidade`)
4. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para detalhes.

## 👤 Autor

Desenvolvido por **Natan Furletti**

---

**Próximos Passos:**
- Leia [SETUP.md](./SETUP.md) para configurar o projeto localmente
- Veja [DEVELOPMENT.md](./DEVELOPMENT.md) para entender a estrutura
- Consulte [API.md](./API.md) para documentação dos endpoints
