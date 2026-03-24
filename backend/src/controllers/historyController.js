const prisma = require('../services/prisma');

async function getHistory(req, res) {
  const userId = parseInt(req.params.userId);
  if (req.user.id !== userId) return res.status(403).json({ error: 'Acesso negado.' });

  try {
    const history = await prisma.watchHistory.findMany({
      where: { userId },
      include: { content: { include: { genre: true } } },
      orderBy: { watchedAt: 'desc' },
    });
    return res.json(history);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar histórico.' });
  }
}

async function recordHistory(req, res) {
  const userId = parseInt(req.params.userId);
  if (req.user.id !== userId) return res.status(403).json({ error: 'Acesso negado.' });

  const { contentId, progress } = req.body;
  if (!contentId) return res.status(400).json({ error: 'contentId é obrigatório.' });

  try {
    const record = await prisma.watchHistory.upsert({
      where: { userId_contentId: { userId, contentId: parseInt(contentId) } },
      update: { progress: parseInt(progress) || 0, watchedAt: new Date() },
      create: { userId, contentId: parseInt(contentId), progress: parseInt(progress) || 0 },
    });
    return res.status(201).json(record);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao registrar histórico.' });
  }
}

module.exports = { getHistory, recordHistory };
