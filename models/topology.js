const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('topology', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "topology_name_key"
    },
    srid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precision: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    hasz: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'topology',
    schema: 'topology',
    timestamps: false,
    indexes: [
      {
        name: "topology_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "topology_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
