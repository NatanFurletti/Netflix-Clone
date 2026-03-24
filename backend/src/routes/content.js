const { Router } = require('express');
const {
  listContent,
  getFeatured,
  getTrending,
  getContentById,
  listGenres,
  listContentByGenre,
} = require('../controllers/contentController');

const router = Router();

// ATENÇÃO: rotas fixas ANTES da rota com parâmetro dinâmico (:id)
router.get('/featured', getFeatured);
router.get('/trending', getTrending);
router.get('/', listContent);
router.get('/:id', getContentById);

module.exports = router;
