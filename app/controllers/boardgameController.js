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
        // les infos du jeu à ajouter
        const theGame = request.body;

        // si duration contient 150, on laisse comme ça : c'est 150 minutes
        if (typeof theGame.duration === "object") {
            // on fait un petit calcul pour retrouver le format entier en minutes
            theGame.duration = 60 * theGame.duration.hours +
            theGame.duration.minutes;
        }

         // ici, duration est forcément un entier
         
        const newGame = new Boardgame(theGame);

        await newGame.save();

        // sans await, il va me manquer
        // la certitude que tout s'est bien passé
        // l'id

        response.json(newGame);
    }
};

module.exports = boardgameController;