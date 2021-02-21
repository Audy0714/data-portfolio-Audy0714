const db = require('../database');

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

class Boardgame {
    id;
    name;
    // camelCase ici, snake_case côté BDD
    minAge;
    minPlayers;
    maxPlayers;
    type;
    note;
    duration;
    creator;


    // mise en place de setters
    set min_players(val) {
    this.minPlayers = val;
    }

    set max_players(val) {
    this.maxPlayers = val;
    }

    set min_age(val) {
    this.minAge = val;
    }



    // mise en place d'un constructeur
    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }


    /**
     * Fonction pour trouver tous les jeux
     * @static - méthode static
     * @function findAll - trouve tous les jeux
     * @returns {Promise} - la promesse des jeux trouvés
     */

    // méthode static sur une class donc ici Boardgame, on pourra appeler Boardgame.findAll()
    static async findAll() {

        const { rows } = await db.query('SELECT * FROM boardgame;');

        return rows.map(game => new Boardgame(game));
    }

    /**
     * Fonction pour trouver un jeu via son id
     * @static - méthode static
     * @function findOne - trouve le jeu via son id
     * @param {Number} id.path.required - l'id du jeu à chercher
     * @returns {Promise} - la promesse du bon jeu trouvé
     */

    static async findOne(id) {

        const { rows } = await db.query('SELECT * FROM boardgame WHERE id = $1;', [id]);

        return new Boardgame(rows[0]);
    }

    /**
     * Fonction pour sauvegarder un nouveau jeu
     * @function save
     */

    // pas statique car propre à chaque instance car ici on insère un nouveau jeu
    async save() {
        // props de this => insérer une ligne dans la bdd
        const { rows } = await db.query(`SELECT * FROM new_boardgame($1);`, [this]); // minAge

        this.id = rows[0].id;
    }

     /**
     * Fonction pour supprimer un jeu
     * @function delete
     */

    async delete() {
     
         const { rows } = await db.query(`DELETE FROM boardgame WHERE id = $1;`, [this.id]);
            
    }

     /**
     * Fonction pour modifier un jeu
     * @function update
     */

    async update() {

        const { rows } = await db.query(
            `UPDATE boardgame
                SET name = $2,
                    min_age = $3,
                    min_players = $4,
                    max_players = $5,
                    type = $6,
                    note = $7,
                    duration = $8,
                    creator = $9
                WHERE id = $1;`, [this.id, this.name, this.minAge, this.minPlayers, this.maxPlayers, this.type, this.note, this.duration, this.creator]
        );

    }
    
};


module.exports = Boardgame;