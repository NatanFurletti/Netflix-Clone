const { Router } = require('express');
const { body } = require('express-validator');
const { register, login, me, logout } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = Router();

router.post('/register', [
  body('email').isEmail().withMessage('E-mail inválido.'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres.'),
], register);

router.post('/login', [
  body('email').isEmail().withMessage('E-mail inválido.'),
  body('password').notEmpty().withMessage('Senha é obrigatória.'),
], login);

router.get('/me', auth, me);
router.post('/logout', auth, logout);

module.exports = router;
