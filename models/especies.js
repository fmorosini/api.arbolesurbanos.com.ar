const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('especies', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombrevulgar: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    nombrecientifico: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    imagen: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    magnitud: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    follaje: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    url_ficha: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    thumbnail: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "latifoliada_perenne.gif"
    }
  }, {
    sequelize,
    tableName: 'especies',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "especies_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
