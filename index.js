require('dotenv').config();

const express = require('express');

//const pg = require('pg');

const app = express();

const port = process.env.PORT || 5478;

// ici, on pourrait aussi écrire notre 404

app.listen(port, () => { console.log(`Listening on http://localhost:${port}`) });

