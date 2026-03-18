import fs from "fs/promises";
import chalk from "chalk";
import { getConfig, getEntriesPath } from "./config.js";

const TAG_COLORS = {
  built: chalk.green,
  learned: chalk.blue,
  fixed: chalk.red,
  "figured out": chalk.yellow,
};

export async function listEntries(count = 5) {
  const config = await getConfig();
  const entriesPath = getEntriesPath(config);

  const raw = await fs.readFile(entriesPath, "utf-8");
  const entries = JSON.parse(raw);

  const recent = entries.slice(0, count);

  console.log(
    chalk.gray(`Showing ${recent.length} of ${entries.length} entries\n`),
  );
  console.log(chalk.gray("─".repeat(52)));

  recent.forEach((entry) => {
    const color = TAG_COLORS[entry.tag] || chalk.white;
    const date = new Date(entry.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    console.log("");
    console.log(color(`  ${entry.tag.padEnd(12)}`) + chalk.gray(date));
    console.log(chalk.white(`  ${entry.title}`));
    console.log(
      chalk.gray(
        `  ${entry.desc.slice(0, 80)}${entry.desc.length > 80 ? "…" : ""}`,
      ),
    );
    if (entry.stack.length) {
      console.log(
        chalk.gray("  [") +
          chalk.cyan(entry.stack.join(", ")) +
          chalk.gray("]"),
      );
    }
  });

  console.log("");
  console.log(chalk.gray("─".repeat(52)));
  console.log(
    chalk.gray(`\n  Run ${chalk.white("devlg")} to add a new entry.`),
  );
}
