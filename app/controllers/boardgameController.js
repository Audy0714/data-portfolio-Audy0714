
const Boardgame = require('../models/boardgame');


/**
 * Le controller chargé de centraliser le middleware concernant les jeux de société
 */
const boardgameController = {

    // GET /boardgames

    /**
     * Middleware chargé de trouver tous les jeux de société
     * @param {Express.Request} request - l'objet représentant la requête findAll() 
     * @param {Express.Response} response - l'objet représentant la réponse games
     */
    allBoardgames : async (request, response) => {
        const games = await Boardgame.findAll();

        response.json(games);
    },

    // GET /boardgames/:id

    /**
     * Middleware chargé de trouver un jeu de société via son id
     * @param {Express.Request} request - l'objet représentant la requête findOne() 
     * @param {Express.Response} response - l'objet représentant la réponse game
     */
    oneBoardgame : async (request, response) => {

        const gameId = request.params.id;

        const game = await Boardgame.findOne(gameId);

        response.json(game);
    },

    // POST /boardgames/ (corps en JSON)
    /**
     * Middleware chargé d'ajouter des jeux de société 
     * Retourne le nouveau jeu utilisant les nouvelles propositions
     * @param {Express.Request} request - l'objet représentant la requête addNewGame
     * @param {Express.Response} response - l'objet représentant la réponse newGame
     */
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

    // DELETE /boardgames/:id (corps en JSON)
    /**
     * Middleware chargé de supprimer un jeu via son id
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - status 200 - le jeu est bien supprimé ou status 400 - le jeu n'existe pas 
     */
    deleteGame : async (request, response) => {

        const gameId = request.params.id;

        const game = await Boardgame.findOne(gameId);

        console.log(game);

        if (!game) {

            response.satus(404).json(`Le jeu n'existe pas avec cette id ${gameId}`);

        } else {

            await game.delete();

            response.status(200).json(`Le jeu avec cette id ${gameId} a bien été supprimé`);
        }

    },

    // PATCH /boardgames/:id (corps en JSON)
    /**
     * Middleware chargé de modifier un jeu de société via son id
     * Retourne le nouveau jeu utilisant les nouvelles propositions
     * @param {Express.Request} request - l'objet représentant la requête updateOneBoardgame
     * @param {Express.Response} response - l'objet représentant la réponse game
     */
    updateOneBoardgame: async (request, response) => {
        // je récupère l'id du jeu à modifier
        const { id } = request.params;

        // je récupère les nouvelles données
        const data = request.body;

        let game = await Boardgame.findOne(id);
        
        // si le jeu à modifier n'hexiste pas
        if (!game) {

            response.satus(404).json(`Le jeu n'existe pas avec cette id ${id}`);

        } else {

            for (const prop in data) {

                game.name = data.name,
                game.minAge = data.minAge,
                game.minPlayers = data.minPlayers,
                game.maxPlayers = data.maxPlayers,
                game.type = data.type,
                game.note = data.note,
                game.duration = data.duration,
                game.creator = data.creator

                game[prop] = data[prop];
            }

            await game.update();

            response.status(200).json(game);
        }
       
    }


};

module.exports = boardgameController;