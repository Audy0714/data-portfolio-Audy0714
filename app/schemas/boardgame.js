const Joi = require('joi');

// PATCH /boardgames/:id => car tous les champs ne sont pas obligatoires
const variations = {
  patch: (boardgameSchema) => boardgameSchema.optional()
}

// Description de ce qu'est concrètement un jeu de société
const boardgameSchema = Joi.object({
    name: Joi.string().required().alter(variations),
    minAge: Joi.number().integer().positive().required().alter(variations),
    minPlayers: Joi.number().integer().positive().required().alter(variations),
    maxPlayers: Joi.number().integer().positive().alter(variations),
    note: Joi.number().integer().positive().required().alter(variations),
    type: Joi.string().required().alter(variations),
    duration: [
        Joi.number().integer().positive().required().alter(variations), // en minutes
        Joi.object({ // un objet avec des props hours et minutes
            hours: Joi.number().integer().positive().required().alter(variations),
            minutes: Joi.number().integer().positive().required().alter(variations)
        })
    ],
    creator: Joi.string().required().alter(variations)
});

module.exports = boardgameSchema;