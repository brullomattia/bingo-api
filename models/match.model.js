const { DataTypes } = require("sequelize");
const Card = require("./card.model.js")

module.exports = (sequelize, DataTypes) => {

    const Match = sequelize.define("match", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        n_cards: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        state: {
            type: DataTypes.ENUM('pending','started','closed'),
            allowNull: false,
            defaultValue: 'pending'
        },
        numbers: {
            type: DataTypes.JSON
        },
        actual_move: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        players : {
            type: DataTypes.INTEGER,
            allowNull: false, 
            defaultValue: 0
        },
        connected: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        five: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        bingo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    })

    return Match
}
