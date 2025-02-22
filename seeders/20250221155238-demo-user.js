'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'afdal',
        email: 'afdalrafi@gmail.com',
        password: 'asdf',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'rafi',
        email: 'rafiafdal@gmail.com',
        password: 'asdf',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'muhammad',
        email: 'muhammad@gmail.com',
        password: 'asdf',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
