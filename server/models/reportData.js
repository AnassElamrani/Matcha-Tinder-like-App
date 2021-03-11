const db = require('../util/database')

module.exports = class Report {
  constructor(id, reporter, reported, feedback) {
    this.id = id
    this.reporter = reporter
    this.reported = reported
    this.feedback = feedback
  }

  save() {
    return db.execute(
      'INSERT INTO report(reporter, reported, feedback) VALUES(?, ?, ?)',
      [this.reporter, this.reported, this.feedback]
    )
  }

  static alreadyReported(reporter, reported) {
    return db.execute(
      'SELECT * FROM report WHERE `reporter` = ? AND `reported` = ?', [reporter, reported]
    )
  }
} 