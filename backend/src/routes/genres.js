const { Router } = require('express');
const { listGenres, listContentByGenre } = require('../controllers/contentController');

const router = Router();

router.get('/', listGenres);
router.get('/:genreId/content', listContentByGenre);

module.exports = router;
