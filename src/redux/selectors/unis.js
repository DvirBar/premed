export const getUnisFields = (unis, calcFields) => {
    return unis.filter(uni => calcFields.find(field => 
        field.university === uni._id))
}