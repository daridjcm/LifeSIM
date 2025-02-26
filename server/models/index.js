import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {};

const loadModels = async () => {
  const modelsDir = path.join(__dirname);
  const modelFiles = fs
    .readdirSync(modelsDir)
    .filter((file) => file.endsWith(".js") && file !== "index.js");

  await Promise.all(
    modelFiles.map(async (file) => {
      const module = await import(`./${file}`);
      const model = module.default(sequelize, DataTypes);
      db[model.name] = model;
    }),
  );

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
};

await loadModels();

export default db;
export { sequelize };
