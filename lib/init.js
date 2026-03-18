import inquirer from "inquirer";
import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import { saveConfig, getEntriesPath } from "./config.js";

export async function initConfig() {
  console.log(chalk.gray("First time setup — this only runs once.\n"));

  const { devlogPath } = await inquirer.prompt([
    {
      type: "input",
      name: "devlogPath",
      message: "Where is your devlog project folder?",
      default: path.join(process.env.HOME || "~", "projects", "devlog"),
      validate: async (input) => {
        const resolved = path.resolve(
          input.replace("~", process.env.HOME || ""),
        );
        const entriesFile = path.join(resolved, "data", "entries.json");
        try {
          await fs.access(entriesFile);
          return true;
        } catch {
          return `Could not find data/entries.json at ${resolved} — check the path and try again.`;
        }
      },
    },
  ]);

  const resolved = path.resolve(
    devlogPath.replace("~", process.env.HOME || ""),
  );
  const config = { devlogPath: resolved };
  await saveConfig(config);

  // verify entries.json is readable
  const entriesPath = getEntriesPath(config);
  const raw = await fs.readFile(entriesPath, "utf-8");
  const entries = JSON.parse(raw);

  console.log("");
  console.log(
    chalk.green("✓") + chalk.white(` Config saved → ~/.devlog-config.json`),
  );
  console.log(
    chalk.green("✓") + chalk.white(` Found ${entries.length} existing entries`),
  );
  console.log(chalk.green("✓") + chalk.white(` Entries file: ${entriesPath}`));
  console.log("");
  console.log(
    chalk.gray("You're set. Run ") +
      chalk.white("devlog") +
      chalk.gray(" from anywhere to add a new entry."),
  );
}
