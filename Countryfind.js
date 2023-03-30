
"use strict";

const mysql = require("mysql2")
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('world', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
});

const User = sequelize.define('User', {
    // Model attributes are defined here
    code: {
        type: DataTypes.CHAR(3),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.CHAR(52),
        allowNull: false,
    },
    continent: {
        type: DataTypes.ENUM('Asia','Europe','North America','Africa','Oceania','Antarctica','South America'),
        defaultValue: "Asia",
    },
    region: {
        type: DataTypes.CHAR(26),
    },
    surface_area: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0,
    },

}, {
    tableName: "country",
    timestamps:false,
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true



;(async ()=>{
    try {
        await User.sync({
            alter: true,
            force:false,
        });

        const user = await User.create({
            code: "LiL",
            name: "ANN",
        });
        console.log("Jane's auto-generated ID:", user.code);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()

