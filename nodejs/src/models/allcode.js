'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Allcode.hasMany(models.User, {foreignKey: 'positionId', as: 'positionData'})
      Allcode.hasMany(models.User, {foreignKey: 'gender', as: 'genderData'})
      Allcode.hasMany(models.Car, {foreignKey: 'type_id', as: 'typeData'})
      Allcode.hasMany(models.Car, {foreignKey: 'status_id', as: 'statusData'})
    }
  }
  Allcode.init({
    keyMap: DataTypes.STRING,
    type: DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Allcode',
  });
  return Allcode;
};