const { Sequelize } = require("sequelize");
require("dotenv").config();

// "user": "knowledgebiz_root",
// "password": "Knoeledgebiz@2023",
// "database": "knowledgebiz_db",
// "host": "104.211.30.63",
// "port": "3389"

const sequelize = new Sequelize(
  "dev_report",
  "knowledgebiz_root",
  "Dev@2023",
  {
    host: "report-mysql-azure.mysql.database.azure.com",
    dialect: "mysql",
  }
);
try {
  sequelize.authenticate();
  console.log("Success connect");
} catch (error) {
  console.error(error);
}

module.exports = sequelize;