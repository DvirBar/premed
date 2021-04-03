import c from "config"

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

export function filterAncs(filters, limit, id) {
    const {
      minDate,
      maxDate,
      name,
      group
    } = filters
 
    const queries = {}

    if(name) {
      queries.$text = {$search: name}
    }

    queries._id = {$ne: id}
    queries.$and = [
      {date: {$lte: maxDate}},
      {date: {$gte: minDate}}
    ]

    if(group) {
      queries.group = group
    }

    return this.find({$and: [
      {...queries}
    ]})
      .sort({date: -1}) 
      .limit(limit) 
      .select("-user")
}