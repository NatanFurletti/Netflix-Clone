const { validationResult } = require('express-validator');
const prisma = require('../services/prisma');

async function listProfiles(req, res) {
  const userId = parseInt(req.params.id);
  if (req.user.id !== userId) return res.status(403).json({ error: 'Acesso negado.' });

  try {
    const profiles = await prisma.profile.findMany({ where: { userId } });
    return res.json(profiles);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao listar perfis.' });
  }
}

async function createProfile(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array()[0].msg });

  const userId = parseInt(req.params.id);
  if (req.user.id !== userId) return res.status(403).json({ error: 'Acesso negado.' });

  const { name, avatarUrl } = req.body;

  try {
    const count = await prisma.profile.count({ where: { userId } });
    if (count >= 5) return res.status(400).json({ error: 'Limite de 5 perfis atingido.' });

    const profile = await prisma.profile.create({ data: { name, avatarUrl, userId } });
    return res.status(201).json(profile);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao criar perfil.' });
  }
}

async function updateProfile(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array()[0].msg });

  const profileId = parseInt(req.params.id);
  const { name, avatarUrl } = req.body;

  try {
    const profile = await prisma.profile.findUnique({ where: { id: profileId } });
    if (!profile) return res.status(404).json({ error: 'Perfil não encontrado.' });
    if (profile.userId !== req.user.id) return res.status(403).json({ error: 'Acesso negado.' });

    const updated = await prisma.profile.update({
      where: { id: profileId },
      data: { name, avatarUrl },
    });
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao atualizar perfil.' });
  }
}

async function deleteProfile(req, res) {
  const profileId = parseInt(req.params.id);

  try {
    const profile = await prisma.profile.findUnique({ where: { id: profileId } });
    if (!profile) return res.status(404).json({ error: 'Perfil não encontrado.' });
    if (profile.userId !== req.user.id) return res.status(403).json({ error: 'Acesso negado.' });

    await prisma.profile.delete({ where: { id: profileId } });
    return res.json({ message: 'Perfil excluído.' });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao excluir perfil.' });
  }
}

module.exports = { listProfiles, createProfile, updateProfile, deleteProfile };
