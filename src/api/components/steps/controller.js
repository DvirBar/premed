import StepService from "./service";
const stepServiceInstance = new StepService()

class StepController {
    async getAll(req, res, next) {
        try {
            const step = await stepServiceInstance.getAll()

            return res.status(200).send(step)
        }

        catch(err) {
            next(err)
        }
     }

     async getByPath(req, res, next) {
         const {
             pathId
         } = req.body
         
        try {
            const step = await stepServiceInstance.getByPath(pathId)
            
            return res.status(200).send(step)
        }
        catch(err) {
            next(err)
        }
     }
}

export default StepController