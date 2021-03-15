const db = require('../util/database');

module.exports = class Notifications {

    // static peopleIds(userId) {
    //     return db.execute(
    //         'SELECT * FROM matchs WHERE user1 = ? OR user2 = ?', [userId, userId]
    //     )
    // }

    static saveNotification(type, who, target) {
        return db.execute(
            'INSERT INTO notifications (`type`, `who_id`, `target_id`) VALUES (?, ?, ?)', [type, , who, target]
        )
    }
    // SELECT notifications.who_id , users.userName, imgProfil.image FROM notifications INNER JOIN users ON notifications.who_id = users.id INNER JOIN imgProfil ON notifications.who_id = imgProfil.users_id WHERE imgProfil.pointer = 0

    static getUserNotifs = (userId) => {
        return db.execute(
            'SELECT notifications.type , notifications.who_id , users.userName, imgProfil.image FROM notifications INNER JOIN users ON notifications.who_id = users.id INNER JOIN imgProfil ON notifications.who_id = imgProfil.users_id WHERE imgProfil.pointer = 0 AND notifications.target_id = ?', [userId]
        )
    }
}
