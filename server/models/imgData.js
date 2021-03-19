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

  /// to compleet
  static justThefirstRows(id){
      return db.execute('UPDATE`imgProfil` SET`pointer` = 0 WHERE users_id = ? AND (SELECT TRUE FROM(SELECT COUNT(*) from imgProfil WHERE`users_id` = ? having COUNT(*) = 1) as t)', [id, id])
  }

  static condtionBeforeUpdate(id) {
    return db.execute('SELECT * FROM `imgProfil` WHERE `users_id` = ? AND `pointer` = 0', [id])
  }

  static justThefirstRows1(id) {
    return db.execute('UPDATE `imgProfil` SET`pointer` = `pointer` - 1 WHERE users_id = ? AND (SELECT TRUE FROM(SELECT COUNT(*) from imgProfil WHERE`users_id` = ? AND pointer <> 0) as t)', [id, id])
  }

  static updateJustProfil(id){
    return db.execute(
      'UPDATE imgProfil SET pointer=( case when pointer <> 0 then 0 else 0 end) WHERE users_id = ? LIMIT 1',
      [id]
    )
  }

  static updateJustProfil1(oldPointer, id) {
    return db.execute(
      'UPDATE imgProfil SET pointer=( case when pointer = 0 then ? else pointer end) WHERE users_id = ? LIMIT 1',
      [oldPointer, id]
    )
  }

  static updateImgPointer(oldPointer, newPointer, id) {
    return db.execute(
      'UPDATE imgProfil SET pointer=( case when pointer = ? then ? when pointer = ? then ? else pointer end) WHERE users_id = ?', [oldPointer, newPointer, newPointer, oldPointer, id]
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

  static displayAllImages(id) {
    return db.execute(
      'SELECT GROUP_CONCAT(image ORDER BY pointer ASC SEPARATOR ",") as images from imgProfil i WHERE i.users_id = ?',
      [id]
    )
  }

  static DeleteImagesUsers(id, image) {
    return db.execute('DELETE FROM imgProfil WHERE users_id = ? AND image = ?', [id, image])
  }
}