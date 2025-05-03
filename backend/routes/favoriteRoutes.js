const express = require('express');
const router = express.Router();

const { toggleFavorite, getFavorites } = require('../controller/favoriteController');
const authMiddleware = require('../middleware/authmiddleware');

router.post('/toggle', authMiddleware, toggleFavorite);
router.get('/', authMiddleware, getFavorites);

module.exports = router;
