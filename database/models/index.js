'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://rgsfmkdctjvykl:af3b2530cd791b741a38e290e023818e2a9990a0f4ccdd88bf01ae3d06900505@ec2-34-207-12-160.compute-1.amazonaws.com:5432/d4h5o5seoueaft',
  {
    logging: false,
    ssl: { rejectUnauthorized: false } //solved the problem with self signed sertificate
}    
);

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
