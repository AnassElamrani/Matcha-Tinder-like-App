const db = require('../util/database');

module.exports = class Chat {

    static peopleIds(userId) {
        return db.execute(
            'SELECT * FROM matchs WHERE user1 = ? OR user2 = ?', [userId, userId]
        )
    }

    static peopleBoard(userId) {
       return db.execute(
           'SELECT users.userName, imgProfil.image FROM users INNER JOIN imgProfil ON users.id = imgProfil.users_id WHERE users.id = ? AND imgProfil.pointer = 0', [userId]
           ) 
        }
}
