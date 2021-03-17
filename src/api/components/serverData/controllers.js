import ServerDataSevice from './services'
const sdServiceInstance = new ServerDataSevice()

class ServerDataController {
    getBaseData(req, res, next) {
        res.send(sdServiceInstance.getBaseData())
        next()
    }

    getStatsData(req, res, next) {
        res.send(sdServiceInstance.getStatsData())
        next()
    }

    getTableSections(req, res, next) {
        res.send(sdServiceInstance.getTableSections())
        next()
    }
}

export default ServerDataController