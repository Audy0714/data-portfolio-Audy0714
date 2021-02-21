const { Router } = require('express');

const router = Router();

const boardgameController = require('./controllers/boardgameController');

const { validateBody } = require('./services/validator');

const boardgameSchema = require('./schemas/boardgame');

/** 
 * Un jeu de société
 * @typedef {Object} Boardgame
 * @property {Number} id - id du jeu
 * @property {String} name - nom du jeu
 * @property {Number} minAge - âge minimum
 * @property {Number} minPlayers - nombre de joueur minimum
 * @property {Number} maxPlayers - nombre de joueur maximum
 * @property {String} type - type du jeu
 * @property {Number} note - note donnée au jeu
 * @property {Number} duration - temps de jeu d'une partie : en minutes ou heures/minutes
 * @property {String} creator - créateur du jeu
*/


/**
 * Retourne tous les jeux
 * @route GET /boardgames
 * @group Boardgames - gestion de la collection de jeux de société
 * @returns {JSON} 200 - les jeux trouvés
 *  */ 

router.get('/boardgames', boardgameController.allBoardgames);


/**
 * Retourne un jeu trouvé via son id
 * @route GET /boardgames/:id
 * @group Boardgames - gestion de la collection de jeux de société
 * @param {Number} id.path.required - l'id à fournir
 * @returns {JSON} 200 - le jeu trouvé
 *  */ 

router.get('/boardgames/:id', boardgameController.oneBoardgame);


/**
 * Retourne un nouveau jeu créé
 * @route POST /boardgames
 * @group Boardgames - gestion de la collection de jeux de société
 * @summary Enregistre un nouveau jeu en base de données
 * @param {Boardgame.model} boardgame.body.required
 * @returns {JSON} 200 - le jeu créé 
*/

router.post('/boardgames',validateBody(boardgameSchema), boardgameController.addNewGame);


/**
 * Retourne le status 200 ou 400 du jeu supprimé
 * @route DELETE /boardgames/:id
 * @group Boardgames - gestion de la collection de jeux de société
 * @param {Number} id.path.required - l'id à fournir
 * @returns {JSON} 200 - le jeu supprimé ou 400 - le jeu n'existe pas
*/

router.delete('/boardgames/:id', boardgameController.deleteGame);


/**
 * Retourne un jeu modifié
 * @route PATCH /boardgames/:id
 * @group Boardgames - gestion de la collection de jeux de société
 * @param {Number} id.path.required - l'id à fournir
 * @summary Enregistre les modifications d'un jeu existant en base de données
 * @param {Boardgame.model} boardgame.body.required
 * @returns {JSON} 200 - le jeu modifié ou 400 - le jeu n'existe pas
*/

router.patch('/boardgames/:id', boardgameController.updateOneBoardgame);


module.exports = router;