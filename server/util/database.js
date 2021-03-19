const mysql = require("mysql2")

///////////////////////////// get ip docker container /////////////////////////////
const ipAdress = require("docker-ip")() // 192.168.99.100 a "default" one
///////////////////////////////////////////////////////////////////////////////////////

const pool = mysql.createPool({
  host: `${ipAdress}`,
  user: "root",
  database: "Matcha",
  password: "tiger",
})

module.exports = pool.promise()