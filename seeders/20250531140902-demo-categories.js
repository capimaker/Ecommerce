'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name_category: 'Deportivo',
        description: 'Coches de alto rendimiento y velocidad como Ferrari o Lamborghini.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name_category: 'SUV',
        description: 'Vehículos deportivos utilitarios de lujo como el Range Rover Sport.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name_category: 'Eléctrico',
        description: 'Coches de lujo eléctricos como el Tesla Model S o Porsche Taycan.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name_category: 'Clásico',
        description: 'Modelos antiguos de colección con valor histórico.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};

