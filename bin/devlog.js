#!/usr/bin/env node

import { program } from "commander";
import { addEntry } from "../lib/add.js";
import { initConfig } from "../lib/init.js";
import { listEntries } from "../lib/list.js";
import { getConfig } from "../lib/config.js";
import chalk from "chalk";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { version } = require("../package.json");

const logo = `
${chalk.green("dev")}${chalk.white("lg")} ${chalk.gray("─── your dev memory")}
`;

program
  .name("devlg")
  .description("Log what you build, fix, learn and figure out")
  .version(version);

// devlog init
program
  .command("init")
  .description("Set up devlog CLI for the first time")
  .action(async () => {
    console.log(logo);
    await initConfig();
  });

// devlog list
program
  .command("list")
  .description("Show recent entries")
  .option("-n, --count <number>", "Number of entries to show", "5")
  .action(async (opts) => {
    console.log(logo);
    const config = await getConfig();
    if (!config) return;
    await listEntries(parseInt(opts.count));
  });

// devlog (no subcommand) → add entry
program.action(async () => {
  console.log(logo);
  const config = await getConfig();
  if (!config) {
    console.log(
      chalk.yellow("⚠  Not set up yet. Run: ") + chalk.white("devlg init"),
    );
    return;
  }
  await addEntry();
});

program.parse();
