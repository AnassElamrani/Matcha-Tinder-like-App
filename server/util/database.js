const mysql = require("mysql2");

///////////////////////////// get ip docker container /////////////////////////////
// const ip = require("docker-ip");

// const ipAdress = ip(); // 192.168.99.100 a "default" one
// ///////////////////////////////////////////////////////////////////////////////////////

const pool = mysql.createPool({
  host: '192.168.99.102',
  user: "root",
  database: "Matcha",
  password: "tiger",
});

module.exports = pool.promise();