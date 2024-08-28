'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dodatna_oprema extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Dodatna_oprema.hasMany(models.Narudzbina, { foreignKey: 'dodatna_oprema_id' });

    }
  }
  Dodatna_oprema.init({
    naziv: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Dodatna_oprema',
  });
  return Dodatna_oprema;
};