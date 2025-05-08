import { promises } from "nodemailer/lib/xoauth2";
import db from "../models/index";
import { where } from "sequelize";
import { raw } from "body-parser";




let checkCarLicensePlate = (CarLicensePlate) => {
  return new Promise(async (resolve, reject) => {
    try {
      let car = await db.Car.findOne({
        where: { license_plate: CarLicensePlate },
      });
      if (car) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createNewCar = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let check = await checkCarLicensePlate(data.license_plate);
            if(check === true){
                resolve({
                    errCode: 1,
                    errMessage: 'Your license plate is already in used, Please try another license palte!!'
                })
            }
            else {
                await db.Car.create({
                    name_car: data.name_car,
                    image: data.image,
                    license_plate: data.license_plate,
                    type_id: data.type_id,
                    brand: data.brand,
                    model_year: data.model_year,
                    price_of_day: data.price_of_day,
                    status_id: data.status_id,
                    location_id: data.locationId
                })
                resolve ({
                    errCode: 0,
                    message: 'OK'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

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
            exclude: [] // Đảm bảo đúng tên trường
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
      if(!data.id || !data.type_id || !data.status_id) {
        resolve({
          errCode: 2,
          errMessage: 'Mising required parameter'
        })
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
          errCode: 1,
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
        errCode: 2,
        errMessage: 'The car is not find'
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