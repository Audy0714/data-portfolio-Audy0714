require('dotenv').config();

const express = require('express');

const app = express();

const port = process.env.PORT || 5478;

const apiRouter = require('./app/router');

// ce MD sert à informer notre app qu'on communiquera avec elle en JSON
// il transforme le payload de toutes les requêtes (qui n'est qu'une string à la base)
// en un objet utilisable dans les MW suivants, via request.body 
app.use(express.json());

app.use('/v1', apiRouter);

// ici, on pourrait aussi écrire notre 404

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));

