
import rentalcar from "../services/rentalcarService";
let handleCreateNewRentalCar = async (req, res) => {
    try {
        let message = await rentalcar.createNewRentalCar(req.body);
        return res.status(200).json(message)
    } catch (e) {
        console.log(e);
        return res.status(500).json ({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
module.exports = {
    handleCreateNewRentalCar
}