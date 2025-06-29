'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.Order, { foreignKey: "user_id" });
    }
  }
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    role: DataTypes.STRING,
    confirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};