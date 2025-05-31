'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       models.Product.belongsToMany(models.Category, {
    through: models.ProductCategory,
    foreignKey: "product_id"
  });
  models.Category.belongsToMany(models.Product, {
    through: models.ProductCategory,
    foreignKey: "category_id"
  });

  models.Product.belongsToMany(models.Order, {
    through: models.OrderProduct,
    foreignKey: "product_id"
  });
  models.Order.belongsToMany(models.Product, {
    through: models.OrderProduct,
    foreignKey: "order_id"
  });

  models.Product.hasMany(models.Review, { foreignKey: "product_id" });
  models.Review.belongsTo(models.Product, { foreignKey: "product_id" });
}
  }
  Product.init({
    name_product: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};