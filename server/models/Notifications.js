const db = require('../util/database');

module.exports = class Notifications {

    // static peopleIds(userId) {
    //     return db.execute(
    //         'SELECT * FROM matchs WHERE user1 = ? OR user2 = ?', [userId, userId]
    //     )
    // }

    static saveNotification(who, target, type) {
        return db.execute(
            ''
        )
    }
}
