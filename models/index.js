const dbConfig = require('../config/dbconfig');
const Sequelize = require('sequelize');


const sequelize1 = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
});

sequelize1.authenticate()
    .then(() => {

        console.log('Authentication successful')
    }).catch(err => {
        console.log("error:" + err)
    })

const db = {};
db.Sequelize = Sequelize
db.sequelize = sequelize1;
db.models = {}
db.models.Users = require('./user')(sequelize1, Sequelize.DataTypes)
db.models.tasks = require('./tasks')(sequelize1, Sequelize.DataTypes)
db.models.admin = require('./role')(sequelize1, Sequelize.DataTypes)
//db.models.adminstask = require('./assignedtask')(sequelize1, Sequelize.DataTypes)
db.sequelize.sync({ force: false })
    .then(() => {
        console.log("re-sync done")
    })
module.exports = db;
