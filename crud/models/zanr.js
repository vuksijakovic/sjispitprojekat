'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Zanr extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Zanr.hasMany(models.Knjiga, { foreignKey: 'zanr_id' });

    }
  }
  Zanr.init({
    naziv: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Zanr',
  });
  return Zanr;
};