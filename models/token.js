'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      models.Token.belongsTo(models.User, { foreignKey: 'UserId' });
    }
  }
  Token.init({
    token: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};
