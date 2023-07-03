const { Sequelize, DataTypes } = require("sequelize");

const conn = require("../data/conn");

const Nivel = require("./tb_nivel");
const Status = require("./tb_status");


const Usuario = conn.define(
  "tb_usuarios",
  {
    id_user: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sobrenome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    id_nivel: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    id_status: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  { freezeTableName: true }
);



Usuario.belongsTo(Nivel, {
  foreignKey: "id_nivel",
  constraints: true,
  foreignKeyConstraint: "id_nivel",
});

Usuario.belongsTo(Status, {
    foreignKey: "id_status",
    constraints: true,
    foreignKeyConstraint: "id_status",
  });




module.exports = Usuario;