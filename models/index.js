const dbConfig = require('../config/db.config.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

    }
)

sequelize.authenticate()
.then(() => {
    console.log("connected...")
})
.catch(err => {
    console.log("error", err);
})

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model.js')(sequelize, DataTypes)
db.matches = require('./match.model.js')(sequelize, DataTypes)
db.cards = require('./card.model.js')(sequelize, DataTypes)

//relations
db.users.hasMany(db.cards, {
    foreignKey: 'user_id'
})
db.cards.belongsTo(db.users, {
    foreignKey: 'user_id'
})

db.matches.hasMany(db.cards, {
    foreignKey: 'match_id'
})
db.cards.belongsTo(db.matches, {
    foreignKey: 'match_id'
})




db.sequelize.sync({ force: false })
.then(() => {
    console.log("sync done");
})

module.exports = db;
