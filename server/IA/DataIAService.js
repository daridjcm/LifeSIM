// server/src/ia/DataIAService.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'json2csv';
import { faker } from '@faker-js/faker';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMP_DIR = path.join(__dirname, '../../data/temp');

const CALL_STATUSES = [
  'Make Call',
  'Call Rejected',
  'Call Accepted',
  'Call Completed',
  'No Call',
];
const LAST_ID_FILE = path.join(TEMP_DIR, "lastId.json");

export class DataIAService {
  constructor() {
    if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });
    
    // Create lastId.json if it doesn't exist
    if (!fs.existsSync(LAST_ID_FILE)) {
      fs.writeFileSync(LAST_ID_FILE, JSON.stringify({ lastId: 0, lastBatch: 0 }, null, 2));
    }
  }

  getLastData() {
    const content = fs.readFileSync(LAST_ID_FILE, "utf-8");
    return JSON.parse(content);
  }

  setLastData(data) {
    fs.writeFileSync(LAST_ID_FILE, JSON.stringify(data, null, 2));
  }

  generateBatch(userId) {
    const size = Math.floor(Math.random() * 3) + 5;
    const data = [];

    const lastData = this.getLastData();
    let lastId = lastData.lastId;
    let lastBatch = lastData.lastBatch;

    for (let i = 0; i < size; i++) {
      const fullName = faker.person.fullName();

      const countryCode = "+57";
      const phoneNumber = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
      const phone = `${countryCode} ${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;

      const callStatus = CALL_STATUSES[Math.floor(Math.random() * CALL_STATUSES.length)];

      data.push({
        id: ++lastId,
        fullName,
        phone,
        callStatus,
      });
    }

    // Update lastId and lastBatch
    lastBatch++;
    this.setLastData({ lastId, lastBatch });

    const file = path.join(TEMP_DIR, `customers${lastBatch}.csv`);
    const csv = parse(data);
    fs.writeFileSync(file, csv);

    return { batchNumber: lastBatch, data, file };
  }
}
