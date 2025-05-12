import locationService from '../services/locationService'

let handleCreateNewLocation = async (req, res) => {
    try {
        let message = await locationService.createNewLocation(req.body);
        return res.status(200).json(message);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let handleGetAllLocations = async (req, res) => {
    let id = req.query.id;
    if(!id)
    {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            locations: []
    
        })
    }
    let locations = await locationService.getAllLocations(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        locations

    })
}

let handleEditLocation = async (req, res) => {
    try {
        let data = req.body;
        let message = await locationService.updateLocation(data);
        return res.status(200).json(message)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let handleDeleteLocation = async (req, res) => {
    try {
        let message = await locationService.deleteLocation(req.body.id);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server. no find id'
        })
    }
        
}
module.exports = {
    handleCreateNewLocation,
    handleGetAllLocations,
    handleEditLocation,
    handleDeleteLocation,
}