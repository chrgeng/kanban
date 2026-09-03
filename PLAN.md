# Kanban MVP implementation plan

## Phase 1: Foundation

- [x] Scaffold a client-rendered Next.js application in `frontend`.
- [x] Add TypeScript, linting, unit-test, and browser-test configuration.
- [x] Add a root `.gitignore` covering build and test output.

Success criteria: the application installs cleanly and the initial route builds.

## Phase 2: Product experience

- [x] Render one board with exactly five columns and realistic starter cards.
- [x] Allow every column title to be renamed in place.
- [x] Add cards with a title and optional details, and delete existing cards.
- [x] Move and reorder cards with pointer and keyboard drag-and-drop.
- [x] Deliver a responsive, polished interface using the required color palette.

Success criteria: every requested interaction works without persistence or unrelated features.

## Phase 3: Verification

- [x] Unit test all state transitions.
- [x] Component test the key add, delete, and rename flows.
- [x] Exercise the complete application in Chromium with Playwright.
- [x] Pass lint, type checking, unit tests, browser tests, and a production build.

Success criteria: all automated checks pass and the browser-tested production UI has no blocking defects.

## Phase 4: Handoff

- [x] Leave the development server running and provide its local URL.

Success criteria: the user can open and use the finished board immediately.
