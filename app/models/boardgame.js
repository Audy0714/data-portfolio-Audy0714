const db = require('../database');

class Boardgame {
    id;
    name;
    // camelCase ici, snake_case côté BDD
    minAge;
    minPlayers;
    maxPlayers;
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

    // méthode static sur une class donc ici Boardgame, on pourra appeler Boargame.findAll()
    static async findAll() {

        const { rows } = await db.query('SELECT * FROM boardgame;');

        return rows.map(game => new Boardgame(game));
    }

    static async findOne(id) {

        const { rows } = await db.query('SELECT * FROM boardgame WHERE id = $1;', [id]);

        return new Boardgame(rows[0]);
    }
}

module.exports = Boardgame;