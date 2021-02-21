-- Verify portfolio:check_players on pg

-- Vérifier si la contrainte players_order est true
BEGIN;

SELECT min-players < max_players FROM boardgame;

ROLLBACK;
