'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Narudzbina extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Narudzbina.belongsTo(models.Korisnik, { foreignKey: 'korisnik_id' });
      Narudzbina.belongsTo(models.Knjiga, { foreignKey: 'knjiga_id' });
      Narudzbina.belongsTo(models.Dodatna_oprema, { foreignKey: 'dodatna_oprema_id' });

    }
  }
  Narudzbina.init({
    korisnik_id: DataTypes.INTEGER,
    knjiga_id: DataTypes.INTEGER,
    dodatna_oprema_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Narudzbina',
  });
  return Narudzbina;
};