# Project Name

One or two sentences about what this project is.

> Built from the Vite + React + TypeScript starter. To start a new project from it, see [Using this as a template](#using-this-as-a-template).

## Tech stack

- **React** and **TypeScript**, built with **Vite**
- **React Router** for pages and URLs
- **Vitest** and **React Testing Library** for tests
- **ESLint** (type-aware, with accessibility rules from `eslint-plugin-jsx-a11y-x`) and **Prettier** for code quality and formatting- **Husky** and **lint-staged** for automatic checks on commit and push
- **GitHub Actions** for automatic checks on every push and pull request

## Getting started

### Prerequisites

- **Node.js 24 or newer.** The `.nvmrc` file pins the major version. If you use [nvm](https://github.com/nvm-sh/nvm), run `nvm install` and then `nvm use` in the project folder.
- **Git.**

### Setup

```bash
git clone git@github.com:<your-username>/<repo-name>.git
cd <repo-name>
nvm use
npm install
npm run dev
```

What each command does:

1. `git clone` downloads the project.
2. `nvm use` switches to the Node version the project expects.
3. `npm install` downloads all dependencies and sets up the Git hooks (see [Automatic checks](#automatic-checks)).
4. `npm run dev` starts the development server. Open the address it prints, usually `http://localhost:5173`. The page reloads as you save files.

Stop the server with `Ctrl+C`.

## Scripts

Run any of these with `npm run <name>`.

| Script         | What it does                                                                                        |
| -------------- | --------------------------------------------------------------------------------------------------- |
| `dev`          | Starts the development server with live reloading.                                                  |
| `build`        | Checks types, then bundles the site into the `dist/` folder, ready to deploy.                       |
| `preview`      | Serves the built site locally so you can see the production version. Run `build` first.             |
| `typecheck`    | Runs the TypeScript compiler to find type errors, without producing any files.                      |
| `lint`         | Runs ESLint to find likely bugs and rule violations.                                                |
| `lint:fix`     | Same as `lint`, but fixes the problems it safely can.                                               |
| `format`       | Rewrites all files into the project's code style using Prettier.                                    |
| `format:check` | Reports files that don't match the code style, without changing anything.                           |
| `test`         | Runs all tests once and exits.                                                                      |
| `test:watch`   | Keeps running and re-runs tests every time you save a file.                                         |
| `check`        | Runs `format:check`, `lint`, `typecheck`, `test`, and `build` in order. Stops at the first failure. |

`prepare` also exists in `package.json`. It runs automatically after `npm install` to set up the Git hooks, and you never need to run it yourself.

**Before pushing, run `npm run check`.** If it passes, CI will pass too.

## Automatic checks

Three layers catch mistakes, each one a safety net for the one before it.

1. **On `git commit`**: the pre-commit hook runs ESLint and Prettier on just the files you changed, fixes what it can, and blocks the commit if something is still wrong.
2. **On `git push`**: the pre-push hook runs the typecheck and the tests across the whole project.
3. **On GitHub**: the CI workflow (`.github/workflows/ci.yml`) runs format check, lint, typecheck, tests, and build on a clean machine for every push to `main` and every pull request. A green check means the project is healthy.

In an emergency you can skip the local hooks with `git commit --no-verify`, but CI will still run.

## Project structure

```
.github/workflows/   CI workflow
.husky/              Git hooks (pre-commit, pre-push)
public/              Static files served as-is (favicon, etc.)
src/
  app/               App root, route list, router, and page layout
  components/        Reusable UI shared across pages (e.g. Hero)
  pages/             One file per page or route
  styles/            All global CSS (see Styling)
  main.tsx           Entry point
tests/               Tests, mirroring the layout of src/
```

## Conventions

### Imports

Use the `@/` shortcut to import across folders, for example `import { Hero } from '@/components/Hero'`. It points to `src/`. Use `./` only for a file in the same folder.

### Exports

Use named exports (`export function Hero`), not default exports. Don't create barrel files (`index.ts` files that re-export other files). Import directly from the file.

### Styling

Styling is plain global CSS in `src/styles/`, kept separate from the components. No inline styles in TSX.

- `tokens.css`: every color, font, and spacing value as a CSS variable. Change the look of the site here.
- `reset.css` and `base.css`: browser consistency and default styles for plain HTML elements.
- `layout.css`: reusable helpers such as `.container` and `.section`.
- `components/`: one CSS file per component, named with [BEM](https://getbem.com/) (`.hero`, `.hero__title`, `.hero--dark`).

`index.css` declares the cascade layer order (`tokens, reset, base, layout, components`). Later layers always override earlier ones, so you never need to fight specificity.

To style a new component, create `src/styles/components/<name>.css` and add this line to `src/styles/index.css`:

```css
@import './components/<name>.css' layer(components);
```

### Adding a page

1. Create `src/pages/<Name>Page.tsx`.
2. Add a route for it in `src/app/routes.tsx`.
3. Add a test in `tests/pages/`.

### Tests

Test files live in `tests/`, mirroring `src/` (the test for `src/components/Hero.tsx` is `tests/components/Hero.test.tsx`). Name them `*.test.ts` or `*.test.tsx`. Find elements by role and text, the way a user would, rather than by class names.

### Commit messages

Use a short prefix that says what kind of change it is: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`, or `ci:`. This isn't enforced, but it keeps the history easy to scan.

## Using this as a template

After creating a repo from the template with **Use this template** on GitHub:

1. Clone it and run `npm install`.
2. In `package.json`, change `"name"`.
3. In `index.html`, change the `<title>` and add a meta description.
4. Replace the placeholder content in `src/pages/HomePage.tsx`. If you change the text, update the matching test in `tests/components/Hero.test.tsx`.
5. Adjust the colors and fonts in `src/styles/tokens.css`.
6. Rewrite the top of this README, and delete this section.

## Not set up yet

These were left out on purpose until they're needed.

### Environment variables

When the project first needs a setting that differs between environments (such as an API address), add three files:

- `.env`: the real values for your machine. It is already listed in `.gitignore`, so it is never committed.
- `.env.example`: a committed checklist of the variable names, with placeholder values and no secrets.
- `src/env.d.ts`: tells TypeScript which variables exist.

```ts
// src/env.d.ts
interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

Only variables starting with `VITE_` reach the browser, and everything in them is public. Never put secrets there. In production, set the values in the hosting service's build settings, not in a `.env` file.

### Deployment

This is a single-page app, so the host must serve `index.html` for any path it doesn't recognize. Otherwise, refreshing on a route such as `/about` returns a 404. Vite's development server handles this automatically, but production hosts need a rewrite rule.
