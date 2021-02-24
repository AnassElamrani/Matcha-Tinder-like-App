const db = require('../util/database')

module.exports = class Geo {
  constructor(id, users_id, city, lat, long) {
    this.id = id
    this.users_id = users_id
    this.city = city
    this.lat = lat
    this.long = long
  }
  save() {
    return db.execute(
      'INSERT INTO location(`users_id`, `city`, `lat`, `long`) VALUES(?, ?, ?, ?)',
      [this.users_id, this.city, this.lat, this.long]
    )
  }

  static getLatLong(id) {
    return db.execute(
      'SELECT l.lat, l.long, u.type FROM location l INNER JOIN users u on u.id = l.users_id WHERE l.users_id = ?',
      [id]
    )
  }

  static getAll(cord, gender, id) {
    let setGender
    if (gender === 'Other')
      setGender = `(u.gender = 'Male' OR u.gender = "Women")`
    else setGender = `u.gender = "${gender}"`
    return db.execute(
      `SELECT DISTINCT(u.id), u.fameRating, l.lat, l.long, l.city, u.gender, u.userName, u.firstName, u.lastName, u.age, u.bio, ST_Distance_Sphere(point(?, ?), point (l.long, l.lat)) / 1000 AS km , (SELECT COUNT(*) from tag_user t1 INNER JOIN tag_user t2 ON t1.tag_id = t2.tag_id WHERE t1.users_id = ? AND t2.users_id = u.id) as tag, (SELECT GROUP_CONCAT(image ORDER BY pointer ASC SEPARATOR ',') from imgProfil i WHERE i.users_id = u.id) as images from users as u INNER JOIN location as l on u.id = l.users_id INNER JOIN imgProfil as i1 on u.id = i1.users_id WHERE u.id <> ? AND u.status <> 1 AND NOT EXISTS (SELECT * from likes lk WHERE ? = lk.liker AND u.id = lk.liked) AND NOT EXISTS (SELECT * from blocked bl WHERE ? = bl.blocker AND u.id = bl.blocked) AND ${setGender} AND ST_Distance_Sphere(point(?, ?), point (l.long , l.lat)) / 1000 < 100 ORDER By tag DESC, u.fameRating DESC`,
      [cord[1], cord[0], id, id, id, id, cord[1], cord[0]]
    )
  }

  static updateGeo(data) {
    return db.execute(
      'UPDATE location SET city = ?, lat = ?, `long` = ? WHERE users_id = ?',
      [data.city, data.latlng.lat, data.latlng.lng, data.id]
    )
  }

  static updateLatlng(data) {
    return db.execute(
      'UPDATE location SET lat = ?, `long` = ? WHERE users_id = ?',
      [data.latlng.lat, data.latlng.lng, data.id]
    )
  }

  static checkLocIs(id) {
    return db.execute('SELECT * FROM location WHERE users_id = ?', [id])
  }

  static searchUsers(cord, gender, id, age, rating, geo, tag) {
    let setGender
    if (gender === 'Other')
      setGender = `(u.gender = 'Male' OR u.gender = "Women")`
    else setGender = `u.gender = "${gender}"`
    
    let stringTag = `(`
    
    if (tag.length !== 0){
      tag.map((el) => {
        if (el.name.charAt(0)) {
          stringTag = stringTag.concat('t3.name = "' + el.name + '" OR ')
        }
      })
      stringTag = stringTag.substring(0, stringTag.length - 4) + ')'
    }else
      stringTag = true
      
    return db.execute(
      `SELECT DISTINCT(u.id), u.fameRating, l.lat, l.long, l.city, u.gender, u.userName, u.firstName, u.lastName, u.age, u.bio, ST_Distance_Sphere(point(?, ?), point (l.long, l.lat)) / 1000 AS km , (SELECT GROUP_CONCAT(t3.name) from tag_user t1 INNER JOIN tag_user t2 ON t1.tag_id = t2.tag_id INNER JOIN tag t3 ON t1.tag_id = t3.id WHERE t1.users_id = ? AND t2.users_id = u.id AND ${stringTag}) as tag1,(SELECT COUNT(*) from tag_user t1 INNER JOIN tag_user t2 ON t1.tag_id = t2.tag_id WHERE t1.users_id = 1 AND t2.users_id = u.id) as tag,(SELECT GROUP_CONCAT(image ORDER BY pointer ASC SEPARATOR ',') from imgProfil i WHERE i.users_id = u.id) as images from users as u INNER JOIN location as l on u.id = l.users_id INNER JOIN imgProfil as i1 on u.id = i1.users_id WHERE u.id <> ? AND u.status <> 1 AND NOT EXISTS (SELECT * from likes lk WHERE ? = lk.liker AND u.id = lk.liked) AND NOT EXISTS (SELECT * from blocked bl WHERE ? = bl.blocker AND u.id = bl.blocked) AND ${setGender} AND ST_Distance_Sphere(point(?, ?), point (l.long, l.lat)) / 1000 <= 100 AND u.age BETWEEN ${age[0]} AND ${age[1]} AND ST_Distance_Sphere(point(?, ?), point (l.long, l.lat)) / 1000 <= ${geo} AND u.fameRating <= ${rating} AND (SELECT GROUP_CONCAT(t3.name) from tag_user t1 INNER JOIN tag_user t2 ON t1.tag_id = t2.tag_id INNER JOIN tag t3 ON t1.tag_id = t3.id WHERE t1.users_id = ? AND t2.users_id = u.id AND ${stringTag}) IS NOT NULL ORDER By tag DESC, u.fameRating DESC`,
      [cord[1], cord[0], id, id, id, id, cord[1], cord[0], cord[1], cord[0], id]
    )
  }
}
