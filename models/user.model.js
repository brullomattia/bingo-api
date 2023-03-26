const { DataTypes } = require("sequelize");
const Card = require("./card.model.js")

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        mobile_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        points: {
            type: DataTypes.INTEGER
        }
    })

    return User
}

