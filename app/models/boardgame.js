const db = require('../database');

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

    /*
        setters (accesseurs)

        appeler :
        this.min_players = 4
        déclenchera :
        this.minPlayers(4)
        aura pour effet :
        this.minPlayers = 4
    */

    set min_players(val) {
    this.minPlayers = val;
    }

    set max_players(val) {
    this.maxPlayers = val;
    }

    set min_age(val) {
    this.minAge = val;
    }



    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    // méthode static sur une class donc ici Boardgame, on pourra appeler Boardgame.findAll()
    static async findAll() {

        const { rows } = await db.query('SELECT * FROM boardgame;');

        return rows.map(game => new Boardgame(game));
    }

    static async findOne(id) {

        const { rows } = await db.query('SELECT * FROM boardgame WHERE id = $1;', [id]);

        return new Boardgame(rows[0]);
    }

    // pas statique car propre à chaque instance car ici on insère un nouveau jeu
    async save() {
        // props de this => insérer une ligne dans la bdd
        const { rows } = await db.query(`SELECT * FROM new_boardgame($1);`, [this]); // minAge

        this.id = rows[0].id;
    }

    // pour supprimer un jeu
    async delete() {
     
         const { rows } = await db.query(`DELETE FROM boardgame WHERE id = $1;`, [this.id]);
            
         //this.id = rows[0].id;
    }

    // pour modifier un jeu
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