'use strict';

const { FOREIGNKEYS } = require('sequelize/lib/query-types');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint("BLogs",{
      fields:['authorId'],
      type:'foreign key',
      name: "fk-auhtorId-users",
      references:{
        table:'Users',
        field:'id'
      },
      onUpdate:"CASCADE",
      onDelete:"CASCADE",
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('BLogs', 'fk-auhtorId-users')
  }
};
