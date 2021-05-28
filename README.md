# Portfolio jeux de société

Une API REST pour gérer une collection de jeux de société

## Stack

- Node 10+
  - dotenv 
  - Express
  - Joi
  - pg
- PostgreSQL 11+
  - Sqitch

## Configuration

- npm init -y pour installer les dépendances 
- psql -d boardgame -f seeding.sql pour insérer les données de la table
- sqitch deploy db:pg:boardgame
- sqitch revert db:pg:boardgame
- sqitch verify db:pg:boardgame
- node index.js pour se connecter à l'api REST
- tests unitaires => npm test

## Structure des données dans conception => Boardgames.mcd

BOARDGAME: name, min_age, min_players, max_players, type, note, duration, creator