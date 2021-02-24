CREATE DATABASE IF NOT EXISTS Matcha;

use Matcha;

CREATE TABLE IF NOT EXISTS users(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,`oauth_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL, `email` VARCHAR(255) NOT NULL, `userName` VARCHAR(255) NOT NULL, `firstName` VARCHAR(255) NOT NULL, `lastName` VARCHAR(255) NOT NULL, `password` VARCHAR(255) NOT NULL, `vkey` VARCHAR(255) NOT NULL, `verify` int(11) NOT NULL DEFAULT 0, `age` int(11), `gender` ENUM('Male', 'Women', 'Other'), `type` ENUM('Male', 'Women', 'Other'), `bio` VARCHAR(255), `fameRating` int(11) DEFAULT 1, `status` int(11) DEFAULT 1);

CREATE TABLE IF NOT EXISTS tag(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `name` VARCHAR(255) NOT NULL);

CREATE TABLE IF NOT EXISTS tag_user(`id` int(11) NOT NULL AUTO_INCREMENT, `users_id` int(11) NOT NULL, `tag_id` int(11) NOT NULL, PRIMARY KEY (id), FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (tag_id) REFERENCES tag(id) ON DELETE CASCADE);

INSERT INTO `tag` (`name`)
VALUES ('#chess'),('#sport'),('#wine'),('#party');

CREATE TABLE IF NOT EXISTS imgProfil(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `users_id` int(11) NOT NULL, `image` VARCHAR(255) NOT NULL, `pointer` int(11)  NOT NULL DEFAULT 0 ,FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS location(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `users_id` int(11) NOT NULL, `city` VARCHAR(255) NOT NULL, `lat` FLOAT(10, 6) NOT NULL , `long` FLOAT(10, 6 )  NOT NULL ,FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS likes(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `liker` int(11) NOT NULL, `liked` int(11) NOT NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE IF NOT EXISTS matchs(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `liker` int(11) NOT NULL, `liked` int(11) NOT NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)

CREATE TABLE IF NOT EXISTS blocked(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `blocker` int(11) NOT NULL, `blocked` int(11) NOT NULL,`dlt` int(11) NOT NULL DEFAULT 0, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)

CREATE TABLE IF NOT EXISTS history(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `visitor_id` int(11) NOT NULL, `visited_id` int(11) NOT NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)

-- UPDATE users
-- SET `fame rating` = `fame rating` + 100
-- WHERE id = 2

-- fill profil 100 -- like 20 -- match 150 -- chat 80





-- to complet
-- SELECT *, now() as date, HOUR(TIMEDIFF(created_at, now())) as `diff` from dislike WHERE HOUR(TIMEDIFF(created_at, now())) >= 5

-- working with triggers
-- DELIMITER $$

--     Create Trigger before_delete_dislike
--     AFTER UPDATE ON dislike FOR EACH ROW  
--     BEGIN  
--            IF HOUR(TIMEDIFF(created_at, now())) >= 5 THEN
--         BEGIN
--             DELETE FROM dislike WHERE HOUR(TIMEDIFF(created_at, now())) >= 5;
--         END;
--     END IF;
--    END;
-- $$
-- DELIMITER ;


-- create procedure to delete a row from table dislike

DELIMITER //
create procedure delete_like()
    BEGIN
        DELETE FROM blocked WHERE HOUR(TIMEDIFF(created_at, now())) >= 5 AND dlt = 1;
    END //

-- launch this peocedure at every seecond

CREATE EVENT myevent
    ON SCHEDULE EVERY 1 SECOND
    DO
      CALL delete_like();