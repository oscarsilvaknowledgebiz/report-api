const http = require('http');
const app = require('./app')
require('dotenv').config()
const conn = require('./data/conn')
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const schedule = require('node-schedule')
const atividadeController = require('./controller/atividadeController');

const rule_sendReport = new schedule.RecurrenceRule()
rule_sendReport.hour = 19
rule_sendReport.minute = 0
rule_sendReport.dayOfWeek = [5]

const job_sendReport = schedule.scheduleJob(rule_sendReport, () => {
    atividadeController.enviarRelatorioScheduleJob()
})

conn.sync().then(() => {
    server.listen(port);
    console.log('foi iniciado na porta' + port)
   }).catch((err) => console.error(err)); 