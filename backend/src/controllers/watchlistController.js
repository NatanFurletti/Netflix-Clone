const prisma = require('../services/prisma');

async function getWatchlist(req, res) {
  const userId = parseInt(req.params.userId);
  if (req.user.id !== userId) return res.status(403).json({ error: 'Acesso negado.' });

  try {
    const items = await prisma.watchlist.findMany({
      where: { userId },
      include: { content: { include: { genre: true } } },
      orderBy: { addedAt: 'desc' },
    });
    return res.json(items);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar watchlist.' });
  }
}

async function addToWatchlist(req, res) {
  const userId = parseInt(req.params.userId);
  if (req.user.id !== userId) return res.status(403).json({ error: 'Acesso negado.' });

  const { contentId } = req.body;
  if (!contentId) return res.status(400).json({ error: 'contentId é obrigatório.' });

  try {
    const item = await prisma.watchlist.upsert({
      where: { userId_contentId: { userId, contentId: parseInt(contentId) } },
      update: {},
      create: { userId, contentId: parseInt(contentId) },
    });
    return res.status(201).json(item);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao adicionar à watchlist.' });
  }
}

async function removeFromWatchlist(req, res) {
  const userId = parseInt(req.params.userId);
  const contentId = parseInt(req.params.contentId);
  if (req.user.id !== userId) return res.status(403).json({ error: 'Acesso negado.' });

  try {
    await prisma.watchlist.delete({
      where: { userId_contentId: { userId, contentId } },
    });
    return res.json({ message: 'Removido da watchlist.' });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao remover da watchlist.' });
  }
}

module.exports = { getWatchlist, addToWatchlist, removeFromWatchlist };
