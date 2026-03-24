const prisma = require('../services/prisma');

async function listContent(req, res) {
  const { genre, type, search, page = 1, limit = 20 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const where = {};
  if (type) where.type = type;
  if (search) where.title = { contains: search };
  if (genre) where.genre = { name: { contains: genre } };

  try {
    const [data, total] = await Promise.all([
      prisma.content.findMany({
        where,
        include: { genre: true },
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.content.count({ where }),
    ]);

    return res.json({
      data,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao listar conteúdo.' });
  }
}

async function getFeatured(req, res) {
  try {
    const count = await prisma.content.count();
    const skip = Math.floor(Math.random() * count);
    const [content] = await prisma.content.findMany({
      include: { genre: true },
      skip,
      take: 1,
    });
    return res.json(content);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar destaque.' });
  }
}

async function getTrending(req, res) {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Busca os 10 conteúdos com mais registros em WatchHistory nos últimos 30 dias
    const trending = await prisma.watchHistory.groupBy({
      by: ['contentId'],
      where: { watchedAt: { gte: thirtyDaysAgo } },
      _count: { contentId: true },
      orderBy: { _count: { contentId: 'desc' } },
      take: 10,
    });

    // Se não houver histórico, retorna os mais recentes como fallback
    if (trending.length === 0) {
      const fallback = await prisma.content.findMany({
        include: { genre: true },
        take: 10,
        orderBy: { rating: 'desc' },
      });
      return res.json(fallback);
    }

    const ids = trending.map((t) => t.contentId);
    const contents = await prisma.content.findMany({
      where: { id: { in: ids } },
      include: { genre: true },
    });

    return res.json(contents);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar trending.' });
  }
}

async function getContentById(req, res) {
  const id = parseInt(req.params.id);
  try {
    const content = await prisma.content.findUnique({
      where: { id },
      include: { genre: true },
    });
    if (!content) return res.status(404).json({ error: 'Conteúdo não encontrado.' });
    return res.json(content);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar conteúdo.' });
  }
}

async function listGenres(req, res) {
  try {
    const genres = await prisma.genre.findMany({ orderBy: { name: 'asc' } });
    return res.json(genres);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao listar gêneros.' });
  }
}

async function listContentByGenre(req, res) {
  const genreId = parseInt(req.params.genreId);
  const { page = 1, limit = 20 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  try {
    const [data, total] = await Promise.all([
      prisma.content.findMany({
        where: { genreId },
        include: { genre: true },
        skip,
        take: parseInt(limit),
      }),
      prisma.content.count({ where: { genreId } }),
    ]);

    return res.json({
      data,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao listar conteúdo por gênero.' });
  }
}

module.exports = { listContent, getFeatured, getTrending, getContentById, listGenres, listContentByGenre };
