const express = require('express');
const router = express.Router();

const articleCtrl = require('../controllers/article');

const auth = require('../middleware/auth');

const multer = require('../middleware/multer.config');

router.get('/', auth, articleCtrl.getAllArticles);
router.get('/:id', auth, articleCtrl.getArticle);
router.post('/', auth, multer, articleCtrl.createArticle);

module.exports = router;