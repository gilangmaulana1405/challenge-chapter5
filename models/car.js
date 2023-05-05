'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Car.init({
    nama_mobil: DataTypes.STRING,
    harga_sewa: DataTypes.STRING,
    ukuran: DataTypes.STRING,
    foto: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Car',
  });

  Car.associate = function (models) {
    Car.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };

  return Car;
};