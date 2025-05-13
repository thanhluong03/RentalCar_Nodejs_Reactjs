'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Car extends Model {
        static associate(models) {
            Car.belongsTo(models.Location, {foreignKey: 'location_id'});
        }
    }

    Car.init ({
        name_car: DataTypes.STRING,
        image: DataTypes.STRING,
        license_plate: DataTypes.STRING,
        type_id: DataTypes.STRING,
        brand: DataTypes.STRING,
        model_year: DataTypes.STRING,
        price_of_day: DataTypes.STRING,
        status_id: DataTypes.STRING,
        location_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Car',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        timestamps: true,
    });
    return Car;
};