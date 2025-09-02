// server/src/ia/ia.routes.js
import express from "express";
import fs from "fs";
import { DataIAService } from "./DataIAService.js";

const router = express.Router();
const iaService = new DataIAService();

router.get("/download", (req, res) => {
  try {
    const batch = iaService.generateBatch("user_demo");

    if (!batch || !batch.data || batch.data.length === 0) {
      return res.status(400).json({ ok: false, error: "No se generaron datos." });
    }

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=customers.csv");
    res.send(fs.readFileSync(batch.file));
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
