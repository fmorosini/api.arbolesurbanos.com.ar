const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('arboles_bariloche', {
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
      allowNull: false
    },
    localidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2
    },
    fecha_carga: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'arboles_bariloche',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "arboles_bariloche_id_idx",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "arboles_bariloche_localidad_idx",
        fields: [
          { name: "localidad" },
        ]
      },
      {
        name: "arboles_bariloche_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "arboles_bariloche_posicion_idx",
        fields: [
          { name: "posicion" },
        ]
      },
    ]
  });
};
