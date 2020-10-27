export const getFieldByArgs = (fields, args) => {

    const fieldArr = fields.filter(field => 
        args.find(arg => 
            arg.role === field.role
        ||  arg.role === field.group.role
        ||  arg.role === field.calcOutput.role))

    return fieldArr
}
