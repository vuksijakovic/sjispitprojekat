'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Korisnik extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Korisnik.hasMany(models.Narudzbina, { foreignKey: 'korisnik_id' });

    }
  }
  Korisnik.init({
    ime: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    uloga: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Korisnik',
  });
  return Korisnik;
};