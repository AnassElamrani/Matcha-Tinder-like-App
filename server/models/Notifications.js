const db = require('../util/database');

module.exports = class Notifications {



    static saveNotification(type, who, target) {
        return db.execute(
            'INSERT INTO notifications (`type`, `who_id`, `target_id`) VALUES (?, ?, ?)', [type, , who, target]
        )
    }

    static getUserNotifs(userId) {
        return db.execute(
            'SELECT notifications.id , notifications.type, notifications.who_id , users.userName, imgProfil.image FROM notifications INNER JOIN users ON notifications.who_id = users.id INNER JOIN imgProfil ON notifications.who_id = imgProfil.users_id WHERE imgProfil.pointer = 0 AND notifications.target_id = ? ORDER BY id DESC', [userId]
        )
    }

    static doILikeHim(myId, hisId) {
        return db.execute(
            'SELECT * FROM likes WHERE liker = ? AND liked = ?', [hisId, myId]
        )
    }

    static isMatched(myId, hisId) {
        return db.execute(
            'SELECT * FROM matchs WHERE user1 = ? AND user2 = ? OR user1 = ? AND user2 = ?', [myId, hisId, hisId, myId]
        )
    }
}
