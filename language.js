"use strict";

const mysql = require("mysql2")
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('world', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
});

const User = sequelize.define('User', {
    // Model attributes are defined here
    country_code: {
        type: DataTypes.CHAR(3),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    language: {
        type: DataTypes.CHAR(30),
        allowNull: false,
        primaryKey: true,
    },
    is_official: {
        type: DataTypes.ENUM('T','F'),
        defaultValue: "F",
    },
    percentage: {
        type: DataTypes.DECIMAL(4,1),
        defaultValue: 0.00,
    },

}, {
    tableName: "country_language",
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

        const user = await User.findAll({
            where:{
                country_code: "WSM"
            }
        });
        console.log(user)
        console.log("Jane's auto-generated ID:", user.code);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()
