import express from "express";
import { URL } from "./models.js";
import { Log } from "./logger.js";
import { nanoid } from "nanoid";

const router = express.Router();

router.post("/shorten", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    await Log("backend", "error", "route", "URL missing in request");
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const shortCode = nanoid(6);
    const newUrl = await URL.create({ originalUrl: url, shortCode });
    await Log("backend", "info", "route", `Shortened URL: ${url} -> ${shortCode}`);
    res.json({ shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}` });
  } catch (err) {
    await Log("backend", "error", "route", `Failed to shorten URL: ${err.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:shortCode", async (req, res) => {
  try {
    const record = await URL.findOne({ shortCode: req.params.shortCode });
    if (!record) {
      await Log("backend", "warn", "route", `Short code not found: ${req.params.shortCode}`);
      return res.status(404).json({ error: "Not found" });
    }

    if (record.expiry && record.expiry < new Date()) {
      await Log("backend", "warn", "route", `Expired short code: ${req.params.shortCode}`);
      return res.status(410).json({ error: "URL expired" });
    }

    record.clicks += 1;
    await record.save();

    await Log("backend", "info", "route", `Redirecting ${req.params.shortCode} -> ${record.originalUrl}`);
    res.redirect(record.originalUrl);
  } catch (err) {
    await Log("backend", "error", "route", `Redirect error: ${err.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/stats/:shortCode", async (req, res) => {
  try {
    const record = await URL.findOne({ shortCode: req.params.shortCode });
    if (!record) {
      await Log("backend", "warn", "route", `Stats requested for invalid short code: ${req.params.shortCode}`);
      return res.status(404).json({ error: "Not found" });
    }

    res.json({
      shortCode: record.shortCode,
      originalUrl: record.originalUrl,
      createdAt: record.createdAt,
      clicks: record.clicks,
      expiry: record.expiry || null
    });
  } catch (err) {
    await Log("backend", "error", "route", `Stats error: ${err.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
