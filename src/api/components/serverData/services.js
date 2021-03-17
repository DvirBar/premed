import internalData from "../../../../utils/internalData"
import { getByPaths, getInputsByUniAndPath, getUnisByPath } from "../../../../utils/selectors"
import storedCalcs from "../../../../utils/stats/calcs/storedCalcs"
import fields from "../../../../utils/stats/fields/tau"
import groups from "../../../../utils/stats/groups/dataGroups"

class ServerDataSevice {
    getBaseData = () => {
        return internalData
    }
    
    getStatsData = (pathIds) => {
        const resObj = {
            fields: getByPaths(fields, pathIds),
            groups: getByPaths(groups, pathIds),
            calcs: getByPaths(storedCalcs, pathIds)
        }
    
        return resObj
    }
    
    getTableSections = () => {
        let resObj = paths.reduce((obj, path) => {
            return {
                ...obj,
                [path._id]: [
                    {
                        _id: 'no-uni',
                        name: 'כללי',
                        fields: [
                            ...getInputsByUniAndPath(undefined, path._id)
                        ]
                    },
                    ...getUnisByPath(path._id).map(uni => ({
                        ...uni,
                        fields: getInputsByUniAndPath(uni._id,  path._id)
                    }))
                ]
            }
        }, {})
    
        return resObj
    }
}

export default ServerDataSevice