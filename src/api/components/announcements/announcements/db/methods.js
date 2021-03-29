export function get(limit) {
    return this.find()
            .sort({ date: -1})
            .limit(limit)
            .select("-user")
}  

export function getFromDate(limit, lastDate, id) {
    return this.find({$and: [
      {date: {$lte: lastDate}},
      {_id: {$ne: id}}  
    ]})
            .sort({ date: -1})
            .limit(limit)
            .select("-user")
} 