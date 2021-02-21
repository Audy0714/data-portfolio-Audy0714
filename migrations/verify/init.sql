-- Verify portfolio:init on pg

BEGIN;

SELECT "name", creator FROM boardgame;

ROLLBACK;
