'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const tableDescription = await queryInterface.describeTable('Customers');

    // Define the existing table structure in the up function
    await queryInterface.createTable('Customers', {
      // Define each column based on its name and definition
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        timestamps: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        timestamps: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the 'customers' table if the migration needs to be reverted
    await queryInterface.dropTable('Customers');
  },
};
