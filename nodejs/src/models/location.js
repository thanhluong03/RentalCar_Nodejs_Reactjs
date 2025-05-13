'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Location extends Model {
        static associate(models) {
            Location.hasOne(models.Car, {foreignKey: 'location_id'})
        }
    }
    Location.init ({
        image: DataTypes.STRING,
        name_location: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Location',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        timestamps: true,
    });
    return Location;
};