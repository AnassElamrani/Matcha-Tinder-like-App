const seed = require('./db_seed')
const mysql = require('mysql2')
const ipAdress = require("docker-ip")() // 192.168.99.100 a "default" one

let connection = mysql.createConnection({
      host: `${ipAdress}`,
      user: "root",
      password: "tiger"
});

connection.connect(function(err) {
      if (err) throw err;
      connection.query(`CREATE DATABASE Matcha`, (err) => {
            if (err) console.log("Database already exist.");
            else{
              connection.query(`USE Matcha`);
              connection.query(
                "CREATE TABLE IF NOT EXISTS users(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,`oauth_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL, `email` VARCHAR(255) NOT NULL, `userName` VARCHAR(255) NOT NULL, `firstName` VARCHAR(255) NOT NULL, `lastName` VARCHAR(255) NOT NULL, `password` VARCHAR(255) NOT NULL, `vkey` VARCHAR(255) NOT NULL, `verify` int(11) NOT NULL DEFAULT 0, `age` int(11), `gender` ENUM('Male', 'Women', 'Other'), `type` ENUM('Male', 'Women', 'Other'), `bio` VARCHAR(255), `fameRating` int(11) DEFAULT 1, `status` int(11) DEFAULT 1);"
              );
              connection.query("CREATE TABLE IF NOT EXISTS tag(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `name` VARCHAR(255) NOT NULL);");

              connection.query("CREATE TABLE IF NOT EXISTS tag_user(`id` int(11) NOT NULL AUTO_INCREMENT, `users_id` int(11) NOT NULL, `tag_id` int(11) NOT NULL, PRIMARY KEY (id), FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (tag_id) REFERENCES tag(id) ON DELETE CASCADE);");
              connection.query("CREATE TABLE IF NOT EXISTS imgProfil(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `users_id` int(11) NOT NULL, `image` VARCHAR(255) NOT NULL, `pointer` int(11)  NOT NULL DEFAULT 0 ,FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE);");
              connection.query("CREATE TABLE IF NOT EXISTS location(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `users_id` int(11) NOT NULL, `city` VARCHAR(255) NOT NULL, `lat` FLOAT(10, 6) NOT NULL , `long` FLOAT(10, 6 )  NOT NULL ,FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE);");
              connection.query("CREATE TABLE IF NOT EXISTS likes(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `liker` int(11) NOT NULL, `liked` int(11) NOT NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);");
              connection.query("CREATE TABLE IF NOT EXISTS matchs(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `user1` int(11) NOT NULL, `user2` int(11) NOT NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)");
              connection.query("CREATE TABLE IF NOT EXISTS blocked(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `blocker` int(11) NOT NULL, `blocked` int(11) NOT NULL,`dlt` int(11) NOT NULL DEFAULT 0, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)");
              connection.query("CREATE TABLE IF NOT EXISTS history(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `visitor_id` int(11) NOT NULL, `visited_id` int(11) NOT NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)");
              connection.query("CREATE TABLE IF NOT EXISTS report(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `reporter` int(11) NOT NULL, `reported` int(11) NOT NULL, `feedback` VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)");
              connection.query("CREATE TABLE IF NOT EXISTS report(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `reporter` int(11) NOT NULL, `reported` int(11) NOT NULL, `feedback` VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)");
              connection.query(`CREATE PROCEDURE delete_like() BEGIN DELETE FROM blocked WHERE HOUR(TIMEDIFF(created_at, now())) >= 5 AND dlt = 1; END`); 
            //   connection.query(`CREATE PROCEDURE Update_duplicated_userName() BEGIN UPDATE users SET `userName` = concat(`userName`,'0') WHERE `oauth_id` IS NOT NULL AND users.`userName` in (SELECT * FROM (SELECT `userName` FROM users GROUP BY `userName` HAVING COUNT(`userName`) > 1) as a); END`); 
              connection.query(`CREATE EVENT myevent ON SCHEDULE EVERY 1 SECOND DO CALL delete_like();`);
            //   connection.query(`CREATE EVENT myevent ON SCHEDULE EVERY 1 SECOND DO CALL Update_duplicated_userName();`);
              seed.DBSeeds(connection);
            }
            connection.end();
      });
      // connection.query("DROP DATABASE Matcha");
});