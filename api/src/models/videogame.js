const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    background_image: {
      type :DataTypes.STRING,
      allowNull: false,
    },
    released: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    rating:{
      type:DataTypes.FLOAT ,
      allowNull: false
    },
    created:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },
  { timestamps: false });
};
