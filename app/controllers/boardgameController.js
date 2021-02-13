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
    },

    deleteGame : async (request, response) => {

        const gameId = request.params.id;

        const game = await Boardgame.findOne(gameId);

        console.log(game);

        if (!game) {

            response.satus(404).json(`Le jeu n'existe pas avec cette id ${gameId}`);

        } else {

            const foundGame = new Boardgame(game);

            console.log(foundGame);

            await foundGame.delete();

            response.status(200).json();
        }

    },
    updateOneBoardgame: async (request, response) => {
        // je récupère l'id du jeu à modifier
        const { id } = request.params;

        // je récupère les nouvelles données
        const data = request.body;

        let game = await Boardgame.findOne(id, data);
        
        // si le jeu à modifier n'hexiste pas
        if (!game) {

            response.satus(404).json(`Le jeu n'existe pas avec cette id ${id}`);

        } else {

            const foundGame = new Boardgame(game);

            console.log(`Le jeu trouvé est`, foundGame);

            await foundGame.update();

            response.status(200).json(foundGame);
        }
       
    }


};

module.exports = boardgameController;