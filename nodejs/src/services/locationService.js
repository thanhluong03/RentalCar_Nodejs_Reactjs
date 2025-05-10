
import { errorMonitor, promises } from "nodemailer/lib/xoauth2";
import db from "../models/index";
import { where } from "sequelize";
import { raw } from "body-parser";
const { Op } = require('sequelize');
let checkValidate = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let condition = {
        name_location: data.name_location
      }
      if(data.id) {
        condition.id = {[Op.ne] : data.id};
      }
      let location = await db.Location.findOne({
        where: condition
      });
      if (location) {
        if(location.name_location === data.name_location)
        {
            resolve({isValid: false, message: 'Location name is already in use!!'});
        }
      } else {
        resolve({isValid: true});
      }
    } catch (e) {
      reject(e);
    }
  });
};
let createNewLocation = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let check = await checkValidate({
                name_location: data.name_location
            });
            if (!check.isValid){
                resolve({
                    errCode: 1,
                    errMessage: check.message
                });
            } else {
                await db.Location.create({
                    image: data.image,
                    name_location: data.name_location
                });
                resolve ({
                    errCode: 0,
                    message: 'OK'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}


let getAllLocations = (locationId) => {
    return new Promise (async(resolve, reject) => {
        try {
            let locations = '';

            if(locationId === 'ALL') {
                locations = await db.Location.findAll();
                if(locations && locations.image)
                {
                    locations.image = new Buffer(locations.image, 'base64').toString('binary');
                }
            }

            if (locationId && locationId !== 'ALL'){
                locations = await db.Location.findOne({
                    where: {id: locationId}
                });
                if(locations && locations.image){
                    locations.image = new Buffer(locations.image, 'base64').toString('binary');
                }
            }

            resolve(locations);
        } catch (e) {
            reject(e);
        }
    })
}

let updateLocation = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.id) {
                resolve({
                    errCode: 4,
                    errMessage: 'Mising required parameter'
                })
            }
            let check = await checkValidate ({
                id: data.id,
                name_location: data.name_location
            });

            if(!check.isValid) {
                resolve({
                    errCode: 3,
                    errMessage: check.message
                })
                return;
            } 
            
            let location = await db.Location.findOne({
                where: {id: data.id},
                raw: false
            })

            if(location){
                location.name_location = data.name_location;
                if(data.avatar) {
                    location.image = data.avatar;
                }
                await location.save();
                resolve ({
                    errCode: 0,
                    errorMessage: 'Update the location success!!'
                })
            } else {
                resolve ({
                    errCode: 6,
                    errMessage: 'Location not found!!'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let deleteLocation = (locationId) => {
    return new Promise (async(resolve, reject) => {
        let location = await db.Location.findOne({
            where: {id: locationId}
        })

        if(!location){
            resolve({
                errCode: 4,
                errMessage: 'The location not find'
            })
        } else {
            await db.Location.destroy({
                where: {id: locationId}
            })
        }

        resolve({
            errCode: 0,
            errMessage: 'The location is delete'
        })
    })
}
module.exports = {
    createNewLocation,
    getAllLocations, 
    updateLocation,
    deleteLocation
}