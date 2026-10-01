# Advanced MPIDISM: Multilingual Political Ideology Detection in Indian Social Media

Final-Year Engineering Research Project Website & Research Portal.

An interactive, responsive, multi-page web platform showcasing research methodology, pipeline architecture, 9-class ideological taxonomy, and preliminary experimental benchmarks across **Hindi, Hinglish, Bengali, Tamil, and English** political discourse from the 2024 Indian General Elections (Lok Sabha).

---

## Architecture & Technology Stack

- **Framework**: React 18 with TypeScript & Vite
- **Styling**: Tailwind CSS with custom design tokens (cool paper-white, deep indelible election ink `#1e1b4b`, and validation teal `#0d9488`)
- **Routing**: React Router (`HashRouter` for zero-configuration static hosting on GitHub Pages)
- **Visualizations**: Recharts (F1 comparison bars, class distributions, ablation studies)
- **State Persistence**: Browser `localStorage` for deliverable progress tracking (wrapped with error protection)
- **Unit Testing**: Vitest (10 comprehensive test cases covering Hinglish, Hindi Devanagari, sarcasm heuristics, and neutrals)
- **Static Assets**: SVG confusion matrix and 2024 Lok Sabha constituency CSV loader (`/public/data/election_results_2024.csv`)

---

## Project Structure & Data Files

All project content, numbers, team rosters, and evaluation scores are isolated inside `/src/data/` and `/public/data/` so they can be updated without touching UI components:

```
├── .github/workflows/deploy.yml       # GitHub Actions CI/CD to GitHub Pages
├── public/
│   ├── data/
│   │   └── election_results_2024.csv  # 543 Constituency ground truth data
│   ├── confusion_matrix_placeholder.svg # High-contrast confusion matrix preview
│   └── favicon.svg                    # Election indelible ink icon mark
├── src/
│   ├── components/
│   │   ├── common/                    # Badge, Card, Button components
│   │   ├── layout/                    # Navbar, Footer, RootLayout with dark/light mode
│   │   └── classifier/                # LiveClassifier interactive sandbox
│   ├── data/
│   │   ├── projectData.ts             # Overall stats, languages, parties, repo URL
│   │   ├── pipeline.ts                # P1, P2, P3, P4 architectural stages and steps
│   │   ├── results.json               # F1 comparison metrics, per-class table, ablations
│   │   ├── datasetInfo.ts             # Data sources, 9-class descriptions, distributions
│   │   ├── team.ts                    # 4 Members, roles, tasks, placeholders
│   │   ├── progress.ts                # Checklist items and milestones
│   │   └── ethics.ts                  # Ethics statement, limitations, and charter
│   ├── hooks/
│   │   ├── useTheme.ts                # Light / Dark theme switcher
│   │   └── useProgress.ts             # Milestone progress with localStorage persistence
│   ├── lib/
│   │   ├── classifier.ts              # P1 rule-based classifier + pluggable ClassifierService
│   │   └── csvParser.ts               # Constituency CSV parser
│   └── pages/                         # 8 complete application pages
└── tests/
    └── classifier.test.ts             # Unit test suite
```

---

## How to Run Locally

### 1. Prerequisites
- **Node.js** 18+ (tested on Node v20)
- **npm** 9+

### 2. Installation
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Run Unit Tests
```bash
npm test
```
Executes 10 automated test cases testing the rule engine, Hindi/Hinglish vocabulary, sarcasm polarity inversion, and neutrality defaults.

### 5. Build for Production
```bash
npm run build
```
Generates optimized static HTML, CSS, and code-split JS in `./dist/`.

---

## How to Replace Placeholders

To update the website with your finalized empirical findings and real team details, edit only the files in `/src/data/`:

1. **Results & F1 Metrics** (`src/data/results.json`):
   - Replace `targetF1` and `currentF1` for P1, P2, P3 with your actual test split scores.
   - Update `perClassMetrics` precision, recall, and F1 scores.
   - Set `"isPlaceholder": false` once real benchmark runs complete.

2. **Team Members** (`src/data/team.ts`):
   - Replace `"Member 1 [Placeholder]"` with actual investigator names.
   - Update LinkedIn and GitHub profiles.
   - Set `isPlaceholder: false`.

3. **Dataset Volumes** (`src/data/datasetInfo.ts` and `src/data/projectData.ts`):
   - Update real post counts for IndiaVotes2024, RSS collector, and Reddit discussions.
   - Update class distributions once final dataset annotation completes.

4. **Confusion Matrix Graphic** (`public/confusion_matrix_placeholder.svg`):
   - Export your final confusion matrix heatmap plot from Python (`matplotlib` / `seaborn`) as `confusion_matrix_placeholder.svg` or `.png` and place it in `/public/`.

5. **2024 Election CSV** (`public/data/election_results_2024.csv`):
   - Append or replace with the full official 543-constituency Election Commission CSV file.

---

## How to Deploy to GitHub Pages

This repository includes a turnkey GitHub Actions workflow (`.github/workflows/deploy.yml`).

### Setup Steps:
1. Push your project files to your GitHub repository (e.g., `adiris123/election-data-pipeline`):
   ```bash
   git init
   git add .
   git commit -m "feat: complete research website for Advanced MPIDISM"
   git branch -M main
   git remote add origin https://github.com/adiris123/election-data-pipeline.git
   git push -u origin main
   ```
2. In your GitHub repository, navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. Push to `main` or trigger the workflow manually under **Actions** > **Deploy to GitHub Pages** > **Run workflow**.
5. Your website will be live at `https://adiris123.github.io/election-data-pipeline/`.
