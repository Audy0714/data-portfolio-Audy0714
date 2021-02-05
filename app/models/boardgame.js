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

    /*static async addOne(boardgame) {
      
        const result = await db.query (`INSERT INTO boardgame (name, min_age, min_players, max_players, type, note, duration, creator) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;`, [
            boardgame.name,
            boardgame.min_age,
            boardgame.min_players,
            boardgame.max_players,
            boardgame.type,
            boardgame.note,
            boardgame.duration,
            boardgame.creator
        ]).rows;

        return new Boardgame (result);

    }*/

    // pas static car propre à chaque instance
    async save() {
        // props de this => insérer une ligne dans la BDD
        
    }
}

module.exports = Boardgame;