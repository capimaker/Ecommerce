'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        first_name: 'Carlos',
        last_name: 'Ramos',
        email: 'capimaker@gmail.com',
        password: await bcrypt.hash('123456', 10),
        phone: 123456789, 
        role: 'user',
        confirmed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Admin',
        last_name: 'Master',
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 10),
        phone: 987654321, 
        role: 'admin',
        confirmed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
