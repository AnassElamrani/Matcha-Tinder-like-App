const db = require("../util/database");

module.exports = class Chat {
  static peopleIds(userId) {
    return db.execute(
      "SELECT * FROM matchs WHERE (user1 = ? OR user2 = ?) AND NOT EXISTS (SELECT * from blocked bl WHERE ? = bl.blocker AND user2 = bl.blocked)",
      [userId, userId, userId]
    );
  }

  static peopleBoard(userId) {
    return db.execute(
      "SELECT users.userName, users.id, imgProfil.image FROM users INNER JOIN imgProfil ON users.id = imgProfil.users_id WHERE users.id = ? AND imgProfil.pointer = 0",
      [userId]
    );
  }

  static getUserInfos(userId) {
    return db.execute("SELECT * FROM users WHERE id = ?", [userId]);
  }

  static saveMessage(from, to, content) {
    return db.execute(
      "INSERT INTO conversations(id_from, id_to, content) VALUES (?, ?, ?)",
      [from, to, content]
    );
  }

  static getConversation(user1, user2) {
    return db.execute(
      "SELECT * FROM conversations WHERE id_from = ? AND id_to = ? OR id_from = ? AND id_to = ? ORDER BY timestamp ASC",
      [user1, user2, user2, user1]
    );
  }
}