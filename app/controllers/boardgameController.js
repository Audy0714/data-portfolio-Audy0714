const Boardgame = require('../models/boardgame');

const boardgameController = {
    allBoardgames : async (request, response) => {
        const games = await Boardgame.findAll();

        response.json(games);
    },

    oneBoardgame : async (request, response) => {

        const gameId = request.params.id;

        const game = await Boardgame.findOne(gameId);

        response.json(game);
    },

    addNewGame : async (request, response) => {

        const theGame = new Game(request.body);

        const newGame = await Boardgame.save(theGame);

        response.json(newGame);
    }
};

module.exports = boardgameController;