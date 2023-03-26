const { DataTypes } = require("sequelize");
const Match = require("./match.model.js")
const User = require("./user.model.js")

module.exports = (sequelize, DataTypes) => {

    const Card = sequelize.define("card", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        match_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cards: {
            type: DataTypes.JSON,
            allowNull: false
        }
    })

    return Card
}
