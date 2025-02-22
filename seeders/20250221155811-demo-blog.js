'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('BLogs', [
        {
          authorId: 1,
          title: 'kopi pahit',
          image: '/img/cog.jpg',
          content: 'ini konten',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('BLogs', null, {});
  }
};
