# Frankenstein Repo Copilot

Frankenstein Repo Copilot is a tiny web app that turns any GitHub repository link into a readable project overview, study plan, and contribution checklist for student developers.

## What it does

- Summarizes a repository’s purpose and likely architecture from just the URL + language.
- Suggests practical starter tasks, roadmap ideas, and potential risks.
- Generates a learning path so beginners know what to read, run, and modify first.
- Runs entirely in the browser – just open `index.html`.

## How to use it

1. Open `index.html` in your browser.
2. Paste a GitHub repository URL.
3. Select the main language.
4. (Optional) Add a short description.
5. Click **Analyze Repo** to see summary, tasks, roadmap, learning path, and more.

## Tech stack

- HTML, CSS, JavaScript (front‑end only)
- Kiro IDE (specs, steering docs, and vibe coding for all code generation) [web:22][web:52]

## Kiro usage

- **Specs**: `.kiro/specs/repo_analyzer.md` defines the analysis function, inputs, and outputs.
- **Steering**: `.kiro/steering/coding-style.md` keeps the UI simple and beginner‑friendly.
- **Vibe**: Used to generate and iterate on the UI layout, animations, and smarter analysis logic.

## Hackathon

Built for the **Kiroween 2025** hackathon as a Frankenstein‑category project that stitches together repo metadata, heuristics, and AI‑assisted coding to make GitHub repos less scary for new contributors. [web:8][web:9][web:11]
