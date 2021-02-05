const Joi = require('joi');

const boardgameSchema = Joi.object({
    name: Joi.string().required(),
    minAge: Joi.number().integer().positive().required(),
    minPlayers: Joi.number().integer().positive().required(),
    maxPlayers: Joi.number().integer().positive(),
    note: Joi.number().integer().positive().required(),
    type: Joi.string().required(),
    duration: [
        Joi.number().integer().positive().required(), // en minutes
        Joi.object({ // un objet avec des props hours et minutes
            hours: Joi.number().integer().positive().required(),
            minutes: Joi.number().integer().positive().required()
        })
    ],
    creator: Joi.string().required()
});

module.exports = boardgameSchema;