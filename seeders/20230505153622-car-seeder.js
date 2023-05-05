'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cars', [{
        nama_mobil: 'Honda Jazz',
        harga_sewa: '255000000',
        ukuran: 'medium',
        foto: 'defaultjazzhnd.jpg',
        available: true,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_mobil: 'Honda Brio',
        harga_sewa: '154000000',
        ukuran: 'small',
        foto: 'brio.jpg',
        available: true,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_mobil: 'Toyota Rush',
        harga_sewa: '500000000',
        ukuran: 'large',
        foto: 'rush.jpg',
        available: false,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_mobil: 'Daihatsu Alya',
        harga_sewa: '12000000',
        ukuran: 'small',
        foto: 'daihatsualya.jpg',
        available: false,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cars', null, {});
  }
};