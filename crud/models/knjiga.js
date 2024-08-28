'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Knjiga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Knjiga.belongsTo(models.Autor, { foreignKey: 'autor_id' });
      Knjiga.belongsTo(models.Zanr, { foreignKey: 'zanr_id' });
      Knjiga.belongsTo(models.Izdavac, { foreignKey: 'izdavac_id' });
      Knjiga.belongsTo(models.Vrsta_knjige, { foreignKey: 'vrsta_knjige_id' });
      Knjiga.hasMany(models.Narudzbina, { foreignKey: 'knjiga_id' });
    }
  }
  Knjiga.init({
    naziv: DataTypes.STRING,
    cijena: DataTypes.DECIMAL,
    autor_id: DataTypes.INTEGER,
    zanr_id: DataTypes.INTEGER,
    izdavac_id: DataTypes.INTEGER,
    vrsta_knjige_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Knjiga',
  });
  return Knjiga;
};