function getGroupConfig(group, selTypes) {
    const selType = selTypes.find(type => 
        type.field === group.typeId)?.value
    
    let config 

    if(group.config) {
        config = group.config.uniqueGroupType
        ?   selType ? group.config[selType] : group.config
        :   group.config
    }

    return config
}

export default getGroupConfig
