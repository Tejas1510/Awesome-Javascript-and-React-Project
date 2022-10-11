const {getAllPlanets} = require('../../models/planets.model')

const httpGetAllPlanets = async (req,res,next) => {
    return res.status(200).json(await getAllPlanets())
}



module.exports = {
    httpGetAllPlanets
}