'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vrsta_knjige extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vrsta_knjige.hasMany(models.Knjiga, { foreignKey: 'vrsta_knjige_id' });

    }
  }
  Vrsta_knjige.init({
    naziv: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Vrsta_knjige',
  });
  return Vrsta_knjige;
};