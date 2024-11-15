const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profile', auth, userCtrl.getProfile);
router.put('/profile', auth, userCtrl.updateProfile);

module.exports = router;