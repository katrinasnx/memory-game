# Memory Game — Card Matching Application

An interactive, browser-based memory card matching game. The primary objective is to discover and match all pairs of hidden card images using the minimum number of attempts.

This application was engineered from scratch as a practical assignment for the **RS School 2026Q3** course.

[🟢 Live Deployment Demo](https://katrinasnx.github.io/memory-game/)

---

## Key Functionality
* **Dynamic Grid Blueprint:** Generates a clean 4x4 matrix comprising 16 cards (8 unique paired images).
* **Algorithmic Randomization:** Employs the Fisher-Yates shuffle method to guarantee randomized card layouts upon initial boot and subsequent restarts.
* **State Machine & Locks:** Implements turn-based evaluation where mismatching cards are temporarily exposed for ~1000ms. The interface is strictly locked during comparison to eliminate input race conditions.
* **Persistent Leaderboard Layer:** Records and caches the top 10 historical game scores inside `localStorage`, sorting records dynamically by lowest move count, then chronological progression (DD.MM.YYYY).
* **Safe Memory Cleaning:** The "New Game" triggers immediately abort active timeouts (`clearTimeout`) and flush DOM trees without triggering complete page reloads.
* **Zero-HTML Footprint:** 100% of the UI nodes are spawned at runtime via JavaScript (`document.createElement`). The entry HTML document ships with a completely naked `<body>`.

---

## Mechanics & Rules
1. The user interacts with any face-down card to reveal its image, then selects a second token. 
2. Flipping a pair increments the overall move counter by 1.
3. If the selected items are identical, they maintain an active face-up state permanently.
4. If a mismatch occurs, both elements automatically revert back to their hidden state after a 1-second delay frame.
5. The game session concludes immediately once all 8 matching pairs are mapped.

---

## Local Setup & Development Environment
Since the application operates on native ES Modules, it requires a local server layer to bypass CORS restrictions when loading scripts.

1. Clone the repository and navigate into the target branch:
   ```bash
   git clone https://katrinasnx.github.io/memory-game/
   cd memory-game
   git checkout memory-game
   ```
2. Open the project folder in VS Code, install the **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**.

---

## Project Evaluation Breakdown (Score: 100 / 100 + 5 Bonus)

### Core Scope (+40 Points)
* **[+10]** The initial rendering pass serves a uniform 4x4 matrix of 16 hidden cards.
* **[+10]** Elements undergo algorithmic randomized shuffling (Fisher-Yates) during mount and soft-resets.
* **[+10]** Card flips execute using hardware-accelerated CSS 3D matrix transformations.
* **[+10]** Successfully matched elements retain an active open state for the remainder of the session.

### Advanced Scope (+40 Points)
* **[+10]** Erroneous pairs trigger a controlled 1-second delay frame before flipping back to hidden state.
* **[+10]** Interaction events are rejected (`lockBoard`) while active card evaluations are pending.
* **[+10]** A step counter logs performance accurately at the end of each round/pair attempt.
* **[+10]** The victory routine launches immediately upon identifying the 8th valid pair.

### Hacker Scope (+20 Points)
* **[+10]** End-game victory modal renders fluidly, exposing total moves alongside a manual restart trigger.
* **[+10]** High-scores array caches data locally, maintaining a persistent Top-10 ledger ordered by performance efficiency.

### Extra Bonus (+5 Points)
* **[+5]** Delivers an exhaustive, error-free technical English documentation file detailing usage guidelines and run workflows.
### Penalties & Quality Control Audit (0 Deductions)
* **Compliant:** Zero third-party UI utilities, design libraries, or layout frameworks applied.
* **Compliant:** The source `index.html` file features an unpolluted `<body>` hosting nothing but a single module import path: `<script type="module" src="./js/index.js"></script>`.
* **Compliant:** Zero forbidden string-parsing DOM injectors utilized across the repository (`innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`, `DOMParser`, `alert`, `prompt`, `confirm` are completely avoided).
* **Compliant:** Zero source code comments remain inside production scripts, maintaining a clean codebase.
* **Compliant:** Commit log history shows a robust tree structure featuring more than 10 clean, verified Conventional Commits.
