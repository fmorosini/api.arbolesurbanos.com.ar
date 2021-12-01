const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuarios', {
    uid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'usuarios',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "usuarios_email_idx",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "usuarios_pk",
        unique: true,
        fields: [
          { name: "uid" },
        ]
      },
      {
        name: "usuarios_uid_idx",
        unique: true,
        fields: [
          { name: "uid" },
        ]
      },
    ]
  });
};
