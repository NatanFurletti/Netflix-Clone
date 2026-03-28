# 🤝 Guia de Contribuição

Obrigado por considerar contribuir para o Netflix Clone! Este guia ajudará você a entender nosso processo de desenvolvimento.

## 📖 Código de Conduta

Sempre seja respeitoso e construtivo. Queremos manter uma comunidade acolhedora para todos.

## 🐛 Reportando Bugs

Antes de criar um relatório de bug:

1. Verifique se o problema já foi reportado
2. Teste com a versão mais recente
3. Colete informações sobre o ambiente:
   - Versão do Node.js
   - Sistema operacional
   - Passos para reproduzir

**Como reportar:**

1. Use o título descritivo e claro
2. Descreva o comportamento observado vs esperado
3. Inclua screenshots/logs quando relevante
4. Forneça exemplo de código se aplicável

```markdown
# Título: [Bug] Erro ao fazer login com email inválido

## Descrição
Ao tentar fazer login com um email inválido, a aplicação...

## Passos para Reproduzir
1. Acesse a página de login
2. Digite "email-invalido" (sem @)
3. Clique em "Entrar"

## Comportamento Esperado
Deve mostrar mensagem de erro validando o email

## Comportamento Atual
A aplicação trava

## Informações do Ambiente
- Node.js: 20.11.0
- Sistema: macOS 14.2.1
- Navegador: Chrome 122
```

## 💡 Sugerindo Melhorias

Sugestões são bem-vindas! Para sugerir uma melhoria:

1. Use título claro e descritivo
2. Descreva a solução proposta
3. Liste possíveis benefícios

```markdown
# Sugestão: Adicionar notificações em tempo real

## Descrição
Implementar notificações em tempo real quando novo conteúdo é adicionado.

## Benefícios
- Mantém usuários atualizados
- Aumenta engajamento
- Melhora experiência

## Implementação Sugerida
Usar Socket.io para conexão bidirecional
```

## 🚀 Processo de Contribuição

### 1. Fork e Clone

```bash
# Fork o repositório no GitHub
# Depois clone seu fork
git clone https://github.com/seu-usuario/Netflix-Clone.git
cd Netflix-Clone
```

### 2. Crie uma Branch

```bash
# Sempre crie uma branch para sua feature/fix
git checkout -b feature/minha-funcionalidade
# ou
git checkout -b fix/corrigir-erro
```

**Convenção de nomes:**
- Feature: `feature/descricao`
- Fix: `fix/descricao`
- Docs: `docs/descricao`
- Refactor: `refactor/descricao`

### 3. Faça suas Alterações

```bash
# Instale dependências
npm install

# Faça suas mudanças
# Teste localmente
```

### 4. Commit suas Mudanças

```bash
# Commits descritivos
git commit -m "Feature: adicionar novo método de pagamento"
git commit -m "Fix: corrigir erro no filtro de gênero"
git commit -m "Docs: atualizar README"
```

**Formato de Commit:**
```
<tipo>: <descrição curta>

<descrição detalhada (opcional)>

Closes #123  # Se fecha uma issue
```

**Tipos:**
- `Feature:` - Nova funcionalidade
- `Fix:` - Correção de bug
- `Docs:` - Mudanças em documentação
- `Refactor:` - Refatoração de código
- `Test:` - Adição/alteração de testes
- `Style:` - Formatação, estilos
- `Chore:` - Atualização de dependências

### 5. Push e Pull Request

```bash
# Push sua branch
git push origin feature/minha-funcionalidade

# Abra Pull Request no GitHub
```

**Checklist do PR:**

- [ ] Testei localmente
- [ ] Segui as convenções de código
- [ ] Atualizei a documentação
- [ ] Não possuo conflitos com `main`
- [ ] Meu código não quebra testes existentes

**Template de PR:**

```markdown
## Descrição
Breve descrição do que foi implementado

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova feature
- [ ] Melhoria
- [ ] Documentação

## Como Testar
1. Passo 1
2. Passo 2
3. Resultado esperado

## Screenshots (se aplicável)
[Adicione imagens]

## Checklist
- [ ] Testei
- [ ] Documentei
- [ ] Sem breaking changes
```

## 📋 Padrões de Código

### Backend (Express/JavaScript)

```javascript
// ✅ BOM
const getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User não encontrado' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ❌ RUIM
exports.getUser = (r, e) => {
  let u = db.users.find(r.params.id).exec();
  e.json(u);
};
```

### Frontend (React)

```javascript
// ✅ BOM
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const data = await userService.getById(userId);
      setUser(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  return <div>{user.name}</div>;
}

// ❌ RUIM
const UserProfile = (props) => {
  const [d, setD] = useState();
  useEffect(() => {
    fetch(`/user/${props.id}`)
      .then(r => r.json())
      .then(d => setD(d))
  }, []);
  return <div>{d?.name}</div>;
};
```

## 🧪 Testes

### Executar Testes (quando implementados)

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

### Escrever Testes

```javascript
// __tests__/authService.test.js
import { authService } from '../services/authService';

describe('authService', () => {
  test('deve fazer login com email e senha válidos', async () => {
    const result = await authService.login('user@test.com', 'senha123');
    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('user');
  });

  test('deve rejeitar email inválido', async () => {
    await expect(authService.login('invalid', 'senha'))
      .rejects.toThrow('Email inválido');
  });
});
```

## 📝 Documentação

Ao adicionar uma nova funcionalidade:

1. Atualize o README.md se necessário
2. Adicione comentários no código complexo
3. Documente parâmetros e retornos
4. Atualize o ARCHITECTURE.md se estrutura mudou

```javascript
/**
 * Busca usuários por gênero de conteúdo
 * @param {number} userId - ID do usuário
 * @param {string} genre - Gênero (ex: "action")
 * @returns {Promise<Array>} Lista de usuários
 * @throws {Error} Se userId inválido
 */
async function getUsersByGenre(userId, genre) {
  // ...
}
```

## 🔄 Review de Código

Quando seu PR receber review:

1. Leia os comentários com mente aberta
2. Responda às perguntas claramente
3. Faça as mudanças solicitadas
4. Faça push novamente (não force push)

## ⚡ Desenvolvimento Local

### Antes de Commitar

```bash
# 1. Teste tudo localmente
npm run dev
npm run build  # Build de produção

# 2. Verifique formatação
npm run lint   # (quando implementado)

# 3. Execute testes
npm test       # (quando implementado)

# 4. Verifique se não quebrou nada
# ... teste manualmente
```

## 🎯 Áreas de Contribuição

Ideias de como contribuir:

### Backend
- [ ] Adicionar testes unitários
- [ ] Implementar rate limiting
- [ ] Adicionar validação avançada (Zod)
- [ ] Sistema de recomendações
- [ ] Cache com Redis

### Frontend
- [ ] Adicionar testes E2E (Cypress)
- [ ] Melhorar UX/UI
- [ ] Adicionar temas (dark/light)
- [ ] Sistema de notificações
- [ ] PWA features

### Documentação
- [ ] Melhorar README.md
- [ ] Adicionar exemplos de código
- [ ] Criar video tutorials
- [ ] Traduzir para outras línguas

## 📞 Precisa de Ajuda?

- **Dúvidas sobre o projeto:** Abra uma discussion
- **Bugs:** Abra uma issue
- **Features:** Abra uma issue com label "enhancement"

## 📜 Licença

Este projeto está sob MIT License. Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença.

---

**Obrigado por contribuir! 🚀**
