const getGroupConfig = (values, group) => {
    const selTypes = values.filter(val => val.isType)
    const selType = selTypes.find(type => 
        type.field === group.typeId).value

    const config = group.config?.uniqueGroupType
                ?   selType ? group.config[selType] : group.config
                :   group.config

    return config
}

export default getGroupConfig

