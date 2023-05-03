'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
      name: 'John',
      email: 'john.superadmin@gmail.com',
      password: '$2b$10$dMjlr6OX.X.HVtUCxKqjieWXd7FANz9HqAnCV23XdKfWeEa.7HJpC',
      role: 'superadmin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      name: 'Clara',
      email: 'clara.superadmin@gmail.com',
      password: '$2b$10$dMjlr6OX.X.HVtUCxKqjieWXd7FANz9HqAnCV23XdKfWeEa.7HJpC',
      role: 'superadmin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};