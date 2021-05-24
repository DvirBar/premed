const filterSlaves = fields => {
    let nonSlaves = []
    let slaves = []

    for(let field of fields) {
        if(field.slaves || field.isSlave) {
            slaves.push(field)
        }

        else {
            nonSlaves.push(field)
        }
    }

    return {
        nonSlaves,
        slaves
    }
}

export default filterSlaves