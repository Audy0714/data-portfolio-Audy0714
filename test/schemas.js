const { expect } = require('chai');

const boardgameSchema = require('../app/schemas/boardgame');

// Déclaration d'un faux boardgame dans le context global pour effectuer son insertion
let mockBoardgame;

describe('Boardgame schema', function() {

    // Préparation d'un contexte favorable à l'exécution des TU
    before(function() {

        // L'objet à valider
        mockBoardgame = {
            name: "Fantômes",
            minAge: 8,
            minPlayers: 2,
            maxPlayers: 4,
            note: 4,
            type: "créativité",
            duration: 30,
            creator: "Audrey Alexandre"
        };
    });

    it('should validate a valid Boardgame', function() {
        // valider un schéma valide, ça fonctionne

        // validate sur un schema Joi retourne un objet avec systématiquement une propriété value
        // et, en cas d'erreur, une propriété error
        expect(boardgameSchema.validate(mockBoardgame)).not.to.have.property('error');

    });

});