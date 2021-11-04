const Sequelize = require('sequelize');
const { proyecciones, reproyectar } = require('../functions/projections')

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
    posicionWGS84: {
      type: DataTypes.VIRTUAL,
      get() {
        const rawValue = this.getDataValue('posicion');
        let coordenadas = reproyectar(proyecciones.EPSG5344,proyecciones.WGS84,rawValue.coordinates)

        return {
          crs: { type: 'name', properties: { name: 'EPSG:4326' } },
          type: 'Point',
          coordinates: coordenadas
        }
      },
      allowNull: true
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
