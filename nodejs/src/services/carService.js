import { promises } from "nodemailer/lib/xoauth2";
import db from "../models/index";
import { where } from "sequelize";
import { raw } from "body-parser";
const { Op } = require('sequelize');



let checkValidate = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let condition = {
        [Op.or]: [
          { name_car: data.name_car },
          { license_plate: data.license_plate }
        ]
      }
      if(data.id){
        condition.id = {[Op.ne] : data.id};
      }
      let car = await db.Car.findOne({
        where:
          condition
      });

      if (car) {
        if (car.name_car === data.name_car ) {
          resolve({ isValid: false, message: 'Car name is already in use!' });
        }
        if (car.license_plate === data.license_plate) {
          resolve({ isValid: false, message: 'License plate is already in use!' });
        }
      } else {
        resolve({ isValid: true });
      }

    } catch (e) {
      reject(e);
    }
  });
};



let createNewCar = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkValidate({
        license_plate: data.license_plate,
        name_car: data.name_car
      });

      if (!check.isValid) {
        resolve({
          errCode: 1,
          errMessage: check.message 
        });
      } else {
        await db.Car.create({
          name_car: data.name_car,
          image: data.image,
          license_plate: data.license_plate,
          type_id: data.type_id,
          brand: data.brand,
          model_year: data.model_year,
          location_id: data.location_id,
          price_of_day: data.price_of_day,
          status_id: data.status_id,
        });
        resolve({
          errCode: 0,
          message: 'OK'
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};


let getAllCars = (carId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cars = '';
      
      if (carId === 'ALL') {
        cars = await db.Car.findAll();
        if(cars && cars.image){
          cars.image = new Buffer(cars.image, 'base64').toString('binary');
        }
      }

      if (carId && carId !== 'ALL') {
        cars = await db.Car.findOne({
          where: { id: carId },
          attributes: {
            exclude: [] 
          }
        });

        if(cars && cars.image){
          cars.image = new Buffer(cars.image, 'base64').toString('binary');
        }
      }

      resolve(cars);
    } catch (e) {
      reject(e);
    }
  });
};

let updateCar = (data) =>{
  return new Promise(async(resolve, reject) =>{
    try {
      if(!data.id || !data.type_id || !data.status_id || !data.location_id ) {
        resolve({
          errCode: 4,
          errMessage: 'Mising required parameter'
        })
      }
      let check = await checkValidate ({
        id: data.id,
        name_car: data.name_car,
        license_plate: data.license_plate
      })
      if(!check.isValid)
      {
        resolve({
          errCode: 3,
          errMessage: check.message
        });
        return;
      }
      let car = await db.Car.findOne({
        where: {id: data.id},
        raw: false
      })

      if(car) {
        car.name_car = data.name_car;
        car.license_plate = data.license_plate;
        car.type_id = data.type_id;
        car.brand = data.brand;
        car.model_year = data.model_year;
        car.location_id = data.location_id,
        car.price_of_day = data.price_of_day;
        car.status_id = data.status_id;
        if(data.avatar) {
          car.image = data.avatar;
        }
        await car.save();
        resolve ({
          errCode: 0,
          errMessage: 'Update the car success!!'
        })
      } else {
        resolve({
          errCode: 6,
          errMessage: 'Car not found!!'
        })
      }

    } catch (e) {
      reject(e)
    }
  })
}

let deleteCar = (carId) => {
  return new Promise( async(resolve, reject) => {
    let car = await db.Car.findOne({
      where: {id: carId}
    })
    if(!car)
    {
      resolve ({
        errCode: 4,
        errMessage: 'The car not find'
      })
    } else {
      await db.Car.destroy({
        where: {id: carId}
      })
    }

    resolve ({
       errCode: 0,
       errMessage: 'The car is delete'
    })
  })
}
module.exports = {
    createNewCar: createNewCar,
    getAllCars: getAllCars,
    updateCar: updateCar,
    deleteCar: deleteCar,
}