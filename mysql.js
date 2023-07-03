const mysql = require('mysql');
require('dotenv').config()

var pool = mysql.createPool({
    "user": "knowledgebiz_root",
    "password": "Knoeledgebiz@2023",
    "database": "knowledgebiz_db",
    "host": "104.211.30.63",
    "port": "3389"
});


exports.pool = pool;