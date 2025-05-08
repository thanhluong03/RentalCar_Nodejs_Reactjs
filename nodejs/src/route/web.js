import express from "express";

import userController from "../controllers/userController";
import carControler from "../controllers/carController";
let router = express.Router();
let initWebRoutes = (app) => {



    router.post("/api/login", userController.handleLogin);
    router.get("/api/get-all-users", userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    router.get("/api/allcode", userController.getAllCode);

    router.post('/api/create-new-car', carControler.handleCreateNewCar);
    router.get("/api/get-all-cars", carControler.handleGetAllCars);
    router.put('/api/edit-car', carControler.handleEditCar);
    router.delete('/api/delete-car', carControler.handleDeleteCar);

    return app.use("/", router);
}

module.exports = initWebRoutes;