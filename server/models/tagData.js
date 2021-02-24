const db = require('../util/database')

module.exports = class Tag {
  constructor(id, name) {
    this.id = id
    this.name = name
  }

  save() {
    return db.execute('INSERT INTO tag(name) VALUES(?)', [this.name])
  }

  static tagExists(name) {
    return db.execute('SELECT id FROM tag WHERE name = ?', [name])
  }

  static tagIdModel(id, name) {
    return db.execute(
      'SELECT * FROM tag INNER JOIN tag_user on tag.id = tag_user.tag_id WHERE tag_user.users_id = ? AND tag.name = ?',
      [id, name]
    )
  }

  static getLastOne() {
    return db.execute('SELECT * FROM tag ORDER BY ID DESC LIMIT 1')
  }

  // Insert data in table tag_user (n,n)
  static insertInTagUser(idUser, idTag) {
    return db.execute('INSERT INTO tag_user(users_id, tag_id) VALUES(?, ?)', [
      idUser,
      idTag,
    ])
  }

  static cmpIdTag(id) {
    return db.execute(
      'SELECT t.name FROM tag_user tu INNER JOIN tag t on tu.tag_id = t.id WHERE users_id = ?',
      [id]
    )
  }
  static getAllTag(id) {
    return db.execute('SELECT * FROM tag WHERE id = ?', [id])
  }

  static DeleteTags(id) {
    return db.execute('DELETE FROM tag_user WHERE users_id = ?', [id])
  }
}
