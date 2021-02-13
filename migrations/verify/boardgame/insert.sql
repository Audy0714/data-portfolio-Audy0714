-- Verify portfolio:boardgame/insert on pg

BEGIN;

SELECT bname, bcre FROM new_boardgme WHERE id = 3;

ROLLBACK;
