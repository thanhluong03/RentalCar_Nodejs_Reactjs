import carService from "../services/carService";

let handleCreateNewCar = async (req, res) => {
    try {
        let message = await carService.createNewCar(req.body);
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

let handleGetAllCars = async (req, res) => {
    let id = req.query.id;
    if(!id)
    {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            cars: []
    
        })
    }
    let cars = await carService.getAllCars(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        cars

    })
}

let handleEditCar = async (req, res) => {
    try {
        let data = req.body;
        let message = await carService.updateCar(data);
        return res.status(200).json(message)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let handleDeleteCar = async (req, res) => {
    try {
        let message = await carService.deleteCar(req.body.id);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server. no find id'
        })
    }
        
}

let handleGetAllPrices = async (req, res) => {
    try {
        let prices = await carService.getAllPrices();
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            prices
    });
    } catch (e){
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let handleGetAllCarByPrices = async (req, res) => {
    try {
        const price = req.query.price; 
        if (!price) {
            return res.status(400).json({
            errCode: 1,
            errMessage: "Missing price parameter",
        });
    }
    let carbyprices = await carService.getCarsByPrice(price);
        return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        carbyprices
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
        errCode: -1,
        errMessage: 'Error from the server'
    })
  }
}

let handleSearchCar = async (req, res) => {
    try {
        const keyword = req.query.keyword;

        if (!keyword) {
            return res.status(400).json({
                errCode: 1,
                errMessage: "Missing parameter",
            });
        }

        let cars = await carService.searchCars(keyword);

        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            cars
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from the server'
        });
    }
};


module.exports = {
    handleCreateNewCar: handleCreateNewCar,
    handleGetAllCars: handleGetAllCars,
    handleEditCar: handleEditCar,
    handleDeleteCar: handleDeleteCar,
    handleGetAllPrices,
    handleGetAllCarByPrices,
    handleSearchCar
}