const { expect } = require('chai');

const Boardgame = require('../app/models/boardgame');


// TEST sur la class Boardgame
describe('Boardgame model', function() {
    // Préparation d'un contexte favorable à l'exécution des TU
    before(function() {

        // L'objet à valider
        mockBoardgame = {
            name: "sorcières",
            minAge: 8,
            minPlayers: 2,
            maxPlayers: 4,
            note: 4,
            type: "créativité",
            duration: 30,
            creator: "Audrey Alexandre"
        };
    });

    it('should create an instance of Boardgame  from an object litteral', function() {
        const theGame = new Boardgame(mockBoardgame);

        expect(theGame).to.have.property('name').to.equal('sorcières');
    });
});


// TEST sur les fonctions 

const db = require('../app/database');

// pour la fonction findOne(id)
const theIds = {};

describe('Boardgame model', function() {

    before(async function() {
        {
            const {rows} = await db.query(
                `INSERT INTO boardgame(name, min_age, min_players, max_players, type, note, duration, creator)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
                RETURNING id;`,
                 ['mock name', 3, 1, 2, 'mock type', 3, 20, 'mock creator']);

            theIds.boardgame = rows[0].id;
        }

    });

    after(async function() {
        // avant les tests, on insère des données de test
        // donc après, on nettoie

        await db.query('DELETE FROM boardgame WHERE id = $1;', [theIds.boardgame]);

    });

    describe('#findOne()', function() {
        it('should fetch an instance of Boardgame', async function() {
            const theGame = await Boardgame.findOne(theIds.boardgame);

            expect(theGame).to.be.an.instanceOf(Boardgame);
        });
    })
});