const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const prisma = require('../services/prisma');
const jwtConfig = require('../config/jwt');

async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array()[0].msg });

  const { email, password } = req.body;

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: 'E-mail já cadastrado.' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed },
    });

    // Cria perfil padrão automaticamente
    await prisma.profile.create({
      data: { name: email.split('@')[0], userId: user.id },
    });

    const token = jwt.sign({ id: user.id, email: user.email }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    return res.status(201).json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao registrar usuário.' });
  }
}

async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array()[0].msg });

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas.' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Credenciais inválidas.' });

    const token = jwt.sign({ id: user.id, email: user.email }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    return res.json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao fazer login.' });
  }
}

async function me(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, createdAt: true, profiles: true },
    });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar usuário.' });
  }
}

function logout(req, res) {
  // JWT é stateless — o cliente deve remover o token do localStorage
  return res.json({ message: 'Logout realizado. Remova o token do armazenamento local.' });
}

module.exports = { register, login, me, logout };
