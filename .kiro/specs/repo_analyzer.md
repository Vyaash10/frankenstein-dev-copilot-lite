Goal: A front-end only web app that helps developers quickly understand a GitHub repository.

User inputs:
- GitHub repo URL (string)
- Main language (string from a dropdown)
- Short description of the project (optional string)

Outputs (three sections):
1. Project Summary: 3–5 bullet points.
2. Suggested Starter Tasks: 5–10 bullet points.
3. README Improvement Tips: 3–5 bullet points.

Implementation constraints:
- Everything runs in the browser using JavaScript only (no backend).
- Use a single function generateAnalysis(input) in script.js.
- input is an object: { url, language, description }.
- The function returns an object: { summary: string[], tasks: string[], readmeTips: string[] }.
- Use simple heuristics based on language and keywords from description.

Files:
- index.html: form for inputs and sections to display results.
- style.css: simple, modern styling, centered layout.
- script.js: implements generateAnalysis and wires the form to the UI.
