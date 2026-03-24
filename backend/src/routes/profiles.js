const { Router } = require('express');
const { body } = require('express-validator');
const { updateProfile, deleteProfile } = require('../controllers/profileController');
const auth = require('../middleware/auth');

const router = Router();

router.put('/:id', auth, [
  body('name').notEmpty().withMessage('Nome é obrigatório.'),
], updateProfile);

router.delete('/:id', auth, deleteProfile);

module.exports = router;
