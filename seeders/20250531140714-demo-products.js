'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      { name_product: 'Ferrari SF90', price: 420000, createdAt: new Date(), updatedAt: new Date() },
      { name_product: 'Tesla Model S Plaid', price: 140000, createdAt: new Date(), updatedAt: new Date() },
      { name_product: 'Lamborghini Urus', price: 250000, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
