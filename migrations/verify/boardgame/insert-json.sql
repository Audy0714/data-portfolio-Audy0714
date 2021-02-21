-- Verify portfolio:boardgame/insert-json on pg

BEGIN;

SELECT duration, creator FROM new_boardgame;

ROLLBACK;