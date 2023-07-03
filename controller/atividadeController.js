const { Sequelize, Op } = require("sequelize");
const nodemailer = require("nodemailer");
const mysql = require("../mysql").pool;
const  Atividade  = require("../models/tb_atividade");
const  Envio  = require("../models/tb_envio");

const listarAtividades = async (req, res, next) => {
  try {
    const atividades = await Atividade.findAll();
    return res.status(200).send({ response: atividades });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const calcularTotalTempo = async (req, res, next) => {
  try {
    const { id_user } = req.params;
    const resultado = await Atividade.sum("tempo", {
      where: {
        id_user: id_user,
        data_send: {
          [Op.eq]: Sequelize.literal("CURDATE()"),
        },
      },
    });
    console.log(resultado)
    return res.status(200).send({ response: resultado });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: error.message });
  }
};

const enviarRelatorio = async (req, res, next) => {
  try {
    const { estado, nome } = req.body;

    const resultado = await Envio.create({ estado, nome });

    async function enviarEmail() {
      try {
        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
          host: "smtp.office365.com",
          port: 587,
          secure: false,
          auth: {
            user: "dev@knowledgebiz.pt", // generated ethereal user
            pass: "Vuw20954", // generated ethereal password
          },
        });

        let info = await transporter.sendMail({
          from: '"Time Knowledge Biz 🚀" <dev@knowledgebiz.pt>', // sender address
          to: "marta.corona@knowledgebiz.pt", // list of receivers
          subject: "Acabou de chegar o relatório de " + nome + " ✔", // Subject line
          html:
            "<div style='background-color: #04193a; width: 100%; height: 80px; text-align: center;'></div><div><h1 style='color: #04193a; text-align: center;'>Olá Marta! " +
            nome +
            " acabou de enviar o seu report semanal. Vá até o seu Ambiente e veja como está a ser o dia de sua equipa :)</h1><h5 style='color: #767675; text-align: center;'>KNOWLEDGEBIZ © 2023 ALL RIGHTS RESERVED</h5><h5 style='color: #767675; text-align: center;'><b>Group</b> Rua Marcos Assunção, nº4 | Almada</h5>", // html body
        });

        console.log("Mensagem enviada: %s", info.messageId);
        console.log(
          "URL de visualização: %s",
          nodemailer.getTestMessageUrl(info)
        );
      } catch (error) {
        console.error(error);
      }
    }

    enviarEmail();

    return res.status(201).send({
      mensagem: "Atividade cadastrada com sucesso!",
      id_envio: resultado.id_envio,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const enviarRelatorioScheduleJob = async () => {
  try {
    async function enviarEmail() {
      try {
        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
          host: "smtp.office365.com",
          port: 587,
          secure: false,
          auth: {
            user: "dev@knowledgebiz.pt", // generated ethereal user
            pass: "Vuw20954", // generated ethereal password
          },
        });

        let info = await transporter.sendMail({
          from: '"Time Knowledge Biz 🚀" <dev@knowledgebiz.pt>', // sender address
          to: "marta.corona@knowledgebiz.pt", // list of receivers
          subject: "Acabaram de chegar os relatórios semanais", // Subject line
          html:
            "<div style='background-color: #04193a; width: 100%; height: 80px; text-align: center;'></div><div><h1 style='color: #04193a; text-align: center;'>Olá Marta! \nAcabaram de chegar os relatórios semanais. Vá até o seu Ambiente e veja como foi a semana da sua equipa :)</h1><h5 style='color: #767675; text-align: center;'>KNOWLEDGEBIZ © 2023 ALL RIGHTS RESERVED</h5><h5 style='color: #767675; text-align: center;'><b>Group</b> Rua Marcos Assunção, nº4 | Almada</h5>", // html body
        });

        console.log("Mensagem enviada: %s", info.messageId);
        console.log(
          "URL de visualização: %s",
          nodemailer.getTestMessageUrl(info)
        );
      } catch (error) {
        console.error(error);
      }
    }

    enviarEmail();

    return {
      mensagem: "Atividade cadastrada com sucesso!",
      id_envio: resultado.id_envio,
    };
  } catch (error) {
    return { error: error.message }
  }
};

const cadastrarAtividade = async (req, res, next) => {
  try {
    const {
      dataR,
      projeto,
      tempo,
      horas,
      brief,
      deadline,
      blocking,
      observation,
      nome_user,
      dia_semana,
      id_user,
    } = req.body;

    const resultado = await Atividade.create({
      dataR,
      projeto,
      tempo,
      horas,
      brief,
      deadline,
      blocking,
      observation,
      nome_user,
      dia_semana,
      id_user,
    });

    return res.status(201).send({
      mensagem: "Atividade cadastrada com sucesso!",
      id_atividade: resultado.id_atividade,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAtividadesPorUsuario = async (req, res, next) => {
  try {
    const { id_user } = req.params;

    const resultado = await Atividade.findAll({
      where: {
        id_user: id_user,
        date_send: Sequelize.literal("CURDATE()"),
      },
    });

    return res.status(200).send({ response: resultado });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const editarAtividade = async (req, res, next) => {
  try {
    const {
      projeto,
      tempo,
      horas,
      brief,
      deadline,
      blocking,
      observation,
      nome_user,
      id_user,
      dia_semana,
      id_atividade,
    } = req.body;

    await Atividade.update(
      {
        projeto,
        tempo,
        horas,
        brief,
        deadline,
        blocking,
        observation,
        nome_user,
        dia_semana,
        id_user,
      },
      {
        where: {
          id_atividade,
        },
      }
    );

    const response = {
      mensagem: "Atividade atualizada com sucesso",
      atividadeEditada: {
        id_atividade,
        projeto,
        tempo,
        hora,
        brief,
        deadline,
        blocking,
        observation,
        nome_user,
        dia_semana,
        id_user,
      },
    };

    return res.status(201).send(response);
  } catch (error) {
   
    return res.status(500).send({ error: error.message });
  }
};

const excluirAtividade = async (req, res, next) => {
  try {
    const { id_atividade } = req.body;

    await Atividade.destroy({
      where: {
        id_atividade,
      },
    });

    return res.status(202).send({
      mensagem: "Dados excluídos com sucesso!",
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  listarAtividades,
  calcularTotalTempo,
  enviarRelatorio,
  enviarRelatorioScheduleJob,
  cadastrarAtividade,
  getAtividadesPorUsuario,
  editarAtividade,
  excluirAtividade
};
