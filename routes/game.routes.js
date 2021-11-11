const { Router } = require('express');
const router = Router();

const gameController = require('./../controllers/game.controller');

router.get('/', gameController.home);

module.exports = router;