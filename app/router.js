const { Router } = require('express');

const boardgameController = require('./controllers/boardgameController');

const router = Router();

router.get('/boardgames', boardgameController.allBoardgames);

router.get('/boardgames/:id', boardgameController.oneBoardgame);

router.post('boardgames', boardgameController.addNewGame);

module.exports = router;