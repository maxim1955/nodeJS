
"use strict";
const mysql = require("mysql2")
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('world', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
});

const User = sequelize.define('User', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.CHAR(35)
    },
    country_code: {
        type: DataTypes.CHAR(3)
    },
    district: {
        type: DataTypes.CHAR(20)
    },
    population: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    tableName: "city",
    timestamps: false,
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
             name: "Язычейский",
             country_code: "RUS",
             district: "Saint-P",
             population: "20",
         });
         console.log("Jane's auto-generated ID:", user.id);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()

