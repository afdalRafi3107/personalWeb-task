'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Projects', [
      {
        authorId: 1,
        projectName: 'Project 1',
        image: '/img/cog.jpg',
        descript: 'ini deskripsi project',
        tech: 'Node js, Reac Js',
        startAt: "",
        endAt: "",
        totalHari: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
  ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
