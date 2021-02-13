const { Router } = require('express');

const boardgameController = require('./controllers/boardgameController');

const router = Router();

const { validateBody } = require('./services/validator');

const boardgameSchema = require('./schemas/boardgame');

router.get('/boardgames', boardgameController.allBoardgames);

router.get('/boardgames/:id', boardgameController.oneBoardgame);

router.post('/boardgames',validateBody(boardgameSchema), boardgameController.addNewGame);

router.delete('/boardgames/:id', boardgameController.deleteGame);

router.patch('/boardgames/:id', boardgameController.updateOneBoardgame);

module.exports = router;