'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Allcode, {foreignKey: 'roleId', targetKey: 'keyMap', as: 'roleData'})
      User.belongsTo(models.Allcode, {foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData'})
    }
  }
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    age: DataTypes.STRING,
    gender: DataTypes.STRING,
    driver_licence: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
  });
  return User;
};