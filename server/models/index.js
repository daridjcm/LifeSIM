import fs from 'fs';
import path from 'path';
import { sequelize } from '../config/database.js';
import { Sequelize } from 'sequelize';
const basename = path.basename(import.meta.url);
const db = {};

fs.readdirSync(new URL('.', import.meta.url).pathname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && 
      file !== basename && 
      file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = import(`./${file}`).then(module => module.default(sequelize, Sequelize.DataTypes));
    db[file.replace('.js', '')] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

export default db;
export { sequelize };