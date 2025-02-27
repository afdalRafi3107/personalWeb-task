require("dotenv").config();
const pg = require("pg");

module.exports = {
    development: {
    "username": "postgres",
    "password": "R@f!3107",
    "database": "personalWeb_task",
    host: "127.0.0.1",
    dialect: "postgres",
    dialectModule: pg,
    // dialectOptions: {
    //   ssl: {
    //     require: false,
    //     rejectUnauthorized: false,
    //   },
    // },
},
production: {
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      host: process.env.POSTGRES_HOST,
      dialect: "postgres",
      dialectModule: pg,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
  },
};