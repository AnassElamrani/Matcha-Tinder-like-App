const db = require('../util/database');

module.exports = class Img {
  constructor(id, users_id, image, pointer) {
    this.id = id
    this.users_id = users_id
    this.image = image
    this.pointer = pointer
  }
  save() {
    return db.execute(
      'INSERT INTO imgProfil(users_id, image, pointer) VALUES (?, ?, ?)',
      [this.users_id, this.image, this.pointer]
    )
  }

  static checkImg(users_id, pointer) {
    return db.execute(
      'SELECT * FROM imgProfil WHERE `users_id` = ? AND `pointer` = ?',
      [users_id, pointer]
    )
  }

  static updateImg(users_id, image, pointer) {
    return db.execute(
      'UPDATE imgProfil SET image = ? WHERE `users_id` = ? AND `pointer` = ?',
      [image, users_id, pointer]
    )
  }

  static updateImgPointer(oldPointer, newPointer) {
    return db.execute(
      'UPDATE imgProfil SET pointer=( case when pointer=? then ? when pointer=? then ? else 0 end)',
      [oldPointer, newPointer, newPointer, oldPointer]
    )
  }

  static ImgsTotalNumber(userId) {
    return db.execute('SELECT * FROM imgProfil WHERE users_id = ?', [userId])
  }

  static DeleteImages(id) {
    return db.execute('DELETE FROM imgProfil WHERE users_id = ?', [id])
  }

  static selectImg(id) {
    return db.execute('SELECT * from imgProfil WHERE `users_id` = ?', [id])
  }
}