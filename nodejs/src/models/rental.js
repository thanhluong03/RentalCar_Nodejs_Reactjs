'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Rental extends Model {
        static associate(models) {

        }
    }
    Rental.init ({
        user_id: DataTypes.INTEGER,
        car_id: DataTypes.INTEGER,
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        total_price: DataTypes.DECIMAL,
        status_id: DataTypes.STRING,
        deposit: DataTypes.DECIMAL,
    }, {
        sequelize,
        modelName: 'Rental',
    });
    return Rental;
};