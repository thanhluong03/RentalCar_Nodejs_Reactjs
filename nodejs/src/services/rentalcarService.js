import { promises } from "nodemailer/lib/xoauth2";
import db from "../models/index";
import { where } from "sequelize";
import { raw } from "body-parser";

let createNewRentalCar = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { user_id, car_id, start_date, end_date, total_price, status_id, deposit } = data;
            if (!user_id || !car_id || !start_date || !end_date || !total_price || !status_id) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing required fields'
                });
            }

            const user = await db.User.findByPk(user_id);
            if (!user) {
                return resolve({
                    errCode: 2,
                    errMessage: 'User not found'
                });
            }

            const car = await db.Car.findByPk(car_id);
            if (!car) {
                return resolve({
                    errCode: 3,
                    errMessage: 'Car not found'
                });
            }

            if (car.status_id !== 'SC3') {
                return resolve({
                    errCode: 4,
                    errMessage: 'Car is not available for rental'
                });
            }

            const rental = await db.Rental.create({
                user_id,
                car_id,
                start_date,
                end_date,
                total_price,
                status_id,
                deposit
            });


            await db.Car.update(
                { status_id: 'SC2' },
                { where: { id: car_id } }
            );

            resolve({
                errCode: 0,
                errMessage: 'Rental created successfully',
                data: rental
            });

        } catch (error) {
            console.error('Error in createNewRentalCar:', error);
            reject({
                errCode: -1,
                errMessage: 'Server error'
            });
        }
    });
};


module.exports = {
    createNewRentalCar
}