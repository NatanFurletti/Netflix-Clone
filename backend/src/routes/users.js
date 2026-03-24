const { Router } = require('express');
const { body } = require('express-validator');
const { listProfiles, createProfile, updateProfile, deleteProfile } = require('../controllers/profileController');
const { getWatchlist, addToWatchlist, removeFromWatchlist } = require('../controllers/watchlistController');
const { getHistory, recordHistory } = require('../controllers/historyController');
const auth = require('../middleware/auth');

const router = Router();

// Profiles
router.get('/:id/profiles', auth, listProfiles);
router.post('/:id/profiles', auth, [
  body('name').notEmpty().withMessage('Nome é obrigatório.'),
], createProfile);

// Watchlist
router.get('/:userId/watchlist', auth, getWatchlist);
router.post('/:userId/watchlist', auth, addToWatchlist);
router.delete('/:userId/watchlist/:contentId', auth, removeFromWatchlist);

// History
router.get('/:userId/history', auth, getHistory);
router.post('/:userId/history', auth, recordHistory);

module.exports = router;
