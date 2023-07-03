const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");


const Projetos = conn.define(
  "tb_projetos",
  {
    id_projetos: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    descricao: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    repositorio: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    data_ini: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    data_fim: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    gestor: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    cliente: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    id_profile: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  { freezeTableName: true }
);



module.exports = Projetos;
