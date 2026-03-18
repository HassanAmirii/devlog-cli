import inquirer from "inquirer";
import fs from "fs/promises";
import chalk from "chalk";
import { getConfig, getEntriesPath } from "./config.js";

const TAGS = ["built", "learned", "fixed", "figured out"];

const TAG_COLORS = {
  built: chalk.green,
  learned: chalk.blue,
  fixed: chalk.red,
  "figured out": chalk.yellow,
};

export async function addEntry() {
  const config = await getConfig();
  const entriesPath = getEntriesPath(config);

  console.log(chalk.gray("New entry — press Ctrl+C to cancel\n"));

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "tag",
      message: "What kind of entry?",
      choices: [
        {
          name: `${chalk.green("●")} built        — shipped or created something`,
          value: "built",
        },
        {
          name: `${chalk.blue("●")} learned      — understood something new`,
          value: "learned",
        },
        {
          name: `${chalk.red("●")} fixed         — debugged or resolved an issue`,
          value: "fixed",
        },
        {
          name: `${chalk.yellow("●")} figured out  — had a realization or insight`,
          value: "figured out",
        },
      ],
    },
    {
      type: "input",
      name: "title",
      message: "Title:",
      validate: (val) => val.trim().length > 3 || "Title is too short",
    },
    {
      type: "input",
      name: "desc",
      message: "Description:",
      validate: (val) => val.trim().length > 5 || "Add a bit more detail",
    },
    {
      type: "input",
      name: "stack",
      message: "Stack / tags (comma separated):",
      filter: (val) =>
        val
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
    },
    {
      type: "confirm",
      name: "confirm",
      message: (ans) => {
        const color = TAG_COLORS[ans.tag] || chalk.white;
        return `\n  ${color(ans.tag.toUpperCase())}  ${chalk.white(ans.title)}\n  ${chalk.gray(ans.desc)}\n  ${chalk.gray(ans.stack.join(", "))}\n\n  Save this entry?`;
      },
      default: true,
    },
  ]);

  if (!answers.confirm) {
    console.log(chalk.gray("\n✗ Cancelled."));
    return;
  }

  // Build the new entry
  const today = new Date().toISOString().split("T")[0];
  const newEntry = {
    date: today,
    tag: answers.tag,
    title: answers.title.trim(),
    desc: answers.desc.trim(),
    stack: answers.stack,
  };

  // Read existing entries, prepend new one, write back
  const raw = await fs.readFile(entriesPath, "utf-8");
  const entries = JSON.parse(raw);
  entries.unshift(newEntry);
  await fs.writeFile(entriesPath, JSON.stringify(entries, null, 2), "utf-8");

  const color = TAG_COLORS[answers.tag] || chalk.white;
  console.log("");
  console.log(chalk.green("✓") + " Entry saved");
  console.log(
    chalk.gray("  ") +
      color(answers.tag) +
      chalk.gray(" — ") +
      chalk.white(answers.title),
  );
  console.log(
    chalk.gray("  ") +
      chalk.gray(`${entries.length} total entries in your devlog`),
  );
  console.log("");
  console.log(
    chalk.gray(
      "  Remember to Push your devlog folder to github so as to update your live site",
    ),
  );
}
