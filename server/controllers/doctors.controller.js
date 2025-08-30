import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Build the path to the JSON file
const dataPath = path.join(__dirname, "../../client/src/utils/Doctors.json");

// Read the JSON file
const doctors = JSON.parse(readFileSync(dataPath, "utf-8"));

export const getDoctors = (req, res) => {
  res.status(200).json({
    ok: true,
    doctors: doctors
  });
};
