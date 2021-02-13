-- Verify portfolio:init on pg

BEGIN;

SELECT * FROM boardgame WHERE id = 2;

ROLLBACK;
