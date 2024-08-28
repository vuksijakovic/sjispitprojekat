'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Knjigas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      naziv: {
        type: Sequelize.STRING
      },
      cijena: {
        type: Sequelize.DECIMAL
      },
      autor_id: {
        type: Sequelize.INTEGER
      },
      zanr_id: {
        type: Sequelize.INTEGER
      },
      izdavac_id: {
        type: Sequelize.INTEGER
      },
      vrsta_knjige_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Knjigas');
  }
};