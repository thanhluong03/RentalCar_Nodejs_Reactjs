'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Rental extends Model {
        static associate(models) {
            Rental.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
            Rental.belongsTo(models.Car, { foreignKey: 'car_id', as: 'car' });
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
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        timestamps: true,
    });
    return Rental;
};