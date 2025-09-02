// server/src/ia/DataIAService.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";
import { parse } from "json2csv";
import { faker } from "@faker-js/faker";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMP_DIR = path.join(__dirname, "../../data/temp");

const CALL_STATUSES = ["Make Call", "Call Rejected", "Call Accepted", "Call Completed", "No Call"];

export class DataIAService {
  constructor() {
    if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });
  }

  // Genera entre 5 y 7 registros falsos
  generateBatch(userId) {
    const size = Math.floor(Math.random() * 3) + 5;
    const data = [];

    for (let i = 0; i < size; i++) {
      const fullName = faker.person.fullName(); // nombre aleatorio realista
      const phone = faker.phone.number("+57 3##-#######"); // teléfono estilo Colombia
      const callStatus =
        CALL_STATUSES[Math.floor(Math.random() * CALL_STATUSES.length)];

      data.push({
        id: randomUUID(),
        fullName,
        phone,
        callStatus,
      });
    }

    const batchId = randomUUID();
    const csv = parse(data);
    const file = path.join(TEMP_DIR, `lote-${batchId}.csv`);
    fs.writeFileSync(file, csv);

    return { batchId, data, file };
  }
}
