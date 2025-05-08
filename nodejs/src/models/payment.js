'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Payment extends Model {
        static associate(models) {

        }
    }

    Payment.init ({
        rental_id: DataTypes.INTEGER,
        payment_method_id: DataTypes.STRING,
        total_price: DataTypes.DECIMAL,
    }, {
        sequelize,
        modelName: 'Payment',
    });
    return Payment;
};