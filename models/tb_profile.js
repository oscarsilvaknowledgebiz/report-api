const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");
const Projeto = require("./tb_projetos");
const Usuario = require("./tb_usuarios");

const Profile = conn.define(
  "tb_profile",
  {
    id_profile: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    id_projetos: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    id_user: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    data_create: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  { freezeTableName: true }
);



Profile.belongsTo(Usuario, {
  foreignKey: "id_user",
  constraints: true,
  foreignKeyConstraint: true,
});

Profile.belongsTo(Projeto, {
  foreignKey: "id_projetos",
  constraints: true,
  foreignKeyConstraint: true,
});

module.exports = Profile;
