# devlg

A minimal CLI tool to log what you build, fix, learn and figure out — directly into your [devlog](https://github.com/HassanAmirii/devlog) site from anywhere on your machine.

```
devlg ─── your dev memory
? What kind of entry?
  ❯ ● built        — shipped or created something
    ● learned      — understood something new
    ● fixed        — debugged or resolved an issue
    ● figured out  — had a realization or insight
? Title: Deployed JIA — AI goal accountability app
? Description: Vibecoded a full goal manager with AI advisor...
? Stack / tags: HTML, CSS, JS, DeepSeek API
✓ Entry saved
  built — Deployed JIA — AI goal accountability app
  9 total entries in your devlog
```

---

## Install

```bash
npm install -g @hassan2bit/devlg
```

## Setup (first time only)

```bash
devlg init
```

Point it at your local [devlog](https://github.com/HassanAmirii/devlog) project folder. Config is saved to `~/.devlog-config.json`.

## Usage

```bash
# Add a new entry interactively
devlg

# Show recent entries in the terminal
devlg list

# Show last 10 entries
devlg list -n 10

# Re-run setup
devlg init
```

## How it works

`devlg` writes directly to `data/entries.json` inside your devlog project folder. After logging an entry, go to your devlog folder and push to Netlify or GitHub Pages to go live.

## Pair with devlog

This CLI is built to work with the [devlog](https://github.com/HassanAmirii/devlog) site — a clean minimal developer journal you can host free on Github page.

1. Fork [devlog](https://github.com/HassanAmirii/devlog)
2. Deploy to Gihub page
3. Install `@hassan2bit/devlg` and run `devlg init`
4. Log from anywhere, push to deploy

## License

MIT
