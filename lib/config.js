import fs from "fs/promises";
import path from "path";
import os from "os";

const CONFIG_PATH = path.join(os.homedir(), ".devlog-config.json");

export async function getConfig() {
  try {
    const raw = await fs.readFile(CONFIG_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function saveConfig(config) {
  await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");
}

export function getEntriesPath(config) {
  return path.join(config.devlogPath, "data", "entries.json");
}
