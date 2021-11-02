const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('arboles', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    posicion: {
      type: DataTypes.GEOMETRY('GEOMETRY', 0),
      allowNull: false
    },
    especie: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'especies',
        key: 'id'
      }
    },
    localidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'localidades',
        key: 'ogc_fid'
      }
    },
    fecha_carga: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'arboles',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "IX_localidad",
        fields: [
          { name: "localidad" },
        ]
      },
      {
        name: "IXpos",
        fields: [
          { name: "posicion" },
        ]
      },
      {
        name: "PK",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "clave",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
