'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Izdavac extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Izdavac.hasMany(models.Knjiga, { foreignKey: 'izdavac_id' });

    }
  }
  Izdavac.init({
    naziv: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Izdavac',
  });
  return Izdavac;
};