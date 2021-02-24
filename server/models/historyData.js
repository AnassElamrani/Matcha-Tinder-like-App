const db = require('../util/database')
module.exports = class Like {
    constructor(id, visitor, visited) {
        this.id = id
        this.visitor = visitor
        this.visited = visited
    }
    save() {
        return db.execute('INSERT INTO history(`visitor_id`, `visited_id`) VALUES(?, ?)', [
            this.visitor,
            this.visited,
        ])
    }
    static checkIfVisited(data) {
        return db.execute('SELECT * from history WHERE visitor_id = ? AND visited_id = ?', [
            data.visitor,
            data.visited
        ])
    }

    static getHistoryData(id){
        return db.execute('SELECT u.id, u.userName, h.created_at from history h INNER JOIN users u ON h.visited_id = u.id WHERE visitor_id = ?', [id])
    }
}