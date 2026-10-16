# AGENT.md  -  JHTUH (Area 51 x Skillsoft partner site)

> Auto-loaded instructions for AI agents. Factual, short; update when repo changes.

## 1. Project overview

- Public marketing / lead-gen site for Area 51's Skillsoft partnership. Static React UI migrated onto **Laravel 12 + Inertia.js 2**  -  routing, content, auth, forms server-side; React kept look/prop shapes.
- Runtime content in MySQL; `resources/js/data/*.js` = editable seed source (`export-content.mjs` -> `database/data/*.json` -> `ContentSeeder`).
- Stack: Laravel 12 (PHP ^8.2), Inertia 2, React 18 + Vite 5, Tailwind 3.4 (`.cjs`), Fortify auth, PHPUnit 11.5. Tests on SQLite `:memory:`.

## 2. Setup & environment

- PHP ^8.2, Node (no `engines` pin / `.nvmrc`), MySQL dev DB `jhtuh_skillsoft` @ `127.0.0.1` root/no password. Lockfiles committed.

```powershell
composer install
Copy-Item .env.example .env
php artisan key:generate

# create the database (or edit DB_* in .env)
php -r "new PDO('mysql:host=127.0.0.1','root','')->exec('CREATE DATABASE jhtuh_skillsoft CHARACTER SET utf8mb4');"

php artisan migrate --seed   # schema + content + demo learner
npm install
```

Demo learner: `student@area51.ph` / `password`.

## 3. Common commands

```powershell
composer dev              # serve + queue:listen + pail + npm dev (needs npx concurrently; opens browser  -  prefer two-terminal below in agent sessions)
php artisan serve         # http://localhost:8000
npm run dev               # Vite 5 on :5173 + HMR (server.open=true)
php artisan test                      # 12 tests, 120 assertions
php artisan test --filter=ContentPagesTest
npm run build             # -> public/build (~15s)  -  run before finishing frontend/CSS work
npm run preview
php vendor/bin/pint --test        # check only (see gotcha 7: currently FAILS on untouched tree)
php vendor/bin/pint <touched-files>  # format ONLY files you touched
node scripts/export-content.mjs                  # resources/js/data/*.js -> database/data/*.json
php artisan db:seed --class=ContentSeeder          # groups: 'legacy'
php artisan db:seed --class=RequestedCatalogSeeder # groups: 'core'/'aspire'
php artisan migrate --seed   # DatabaseSeeder = both seeders + demo learner
php artisan pail             # logs
```

- `dev`/`build`/`preview` are the ONLY npm scripts. `build:ssr` does NOT exist despite README/`config/inertia.php` references.

## 4. Architecture notes

- Flow: `routes/web.php` -> single-action controller (`__invoke`, or `ApplicationController@store`) -> `Inertia::render('pages/X', [...])` -> React page in `resources/js/pages/` -> shared `<Layout>` injected once in `main.jsx`.
- Routes: `/` (Home), `/program?p=<key>` (ProgramPage, unknown key -> `aiml` fallback), `/cse-courses`, `/skillsoft-catalog?cat=<category>` (unknown -> `All`), `POST /applications` (throttle 10/min), `/dashboard` (auth), `/login|/register|/logout` from Fortify (not `web.php`).
- `app/Support/ContentPresenter.php`  -  DB -> React prop shapes (`program/tracks/coreTracks/searchIndex/journeys/aspireJourneys/categories/cseProgram`). Preserve shapes; components assume old JS-module shapes.
- `HandleInertiaRequests.php`  -  shared props every page: `auth.user` (id/name/email/role), `categories`, `catalog` (compact search index), `flash`.
- `ApplicationController@store` + `StoreApplicationRequest`  -  public apply form; stores record, derives `program_id` via `Program::findByKey`, `source_page` from referer path, redirects back with `flash.success`.
- New page recipe: migration -> model -> `ContentPresenter` method -> single-action controller -> route -> `resources/js/pages/X.jsx` (no Layout wrapper) -> feature test.
- `legacy/` = reference-only static original. Never import from it. Same for `.aspire_extract.txt`, `Aspire-Journeys_260912_140423.pdf`, `JHTUH-IMAGES/` (source assets, not build inputs).
- Do NOT touch: `database/data/*.json` (generated), `public/build/` (gitignored build output), machine-parsed `docs/skillsoft-course-catalog-requested.md` (catalog seeder reads it).

## 5. Code conventions (PHP / JS / tests / style / git)

**PHP** (`app/`, `database/`, `routes/`, `config/`)

- PSR-4 `App\`, 4-space indent, LF, final newline (`.editorconfig`).
- Full parameter and return types everywhere: `public function __invoke(): Response`, `protected function casts(): array`.
- Array-returning methods carry array-shape docblocks: `@return array<string, mixed>`, `@return list<string>`.
- Controllers stay thin; one single-action `__invoke` per page (except `ApplicationController@store`); validation in FormRequests; no service/action layers.
- Models: `$fillable` arrays, `casts()` method, typed relations (`HasMany`, `BelongsTo`) ordered by `sort`.
- Schema is snake_case; camelCase appears only at the presenter boundary.
- Ordering inside classes: public API first, `private static` helpers below (see `ContentPresenter`).

**Tests** (`tests/`)

- PHPUnit  -  **no Pest**. `RefreshDatabase` + SQLite `:memory:`.
- Method naming: `test_snake_case_behaviour(): void`.
- Feature assertions use `assertInertia(...)` + `component('pages/X')`, and `setUp()` seeds `ContentSeeder::class`.

**JS / JSX** (`resources/js/`)

- **No semicolons**, single quotes, **2-space indent** (note: `.editorconfig` says 4  -  JS here is 2).
- Function components, `export default function ...`, named imports at the top of the file.
- Pages export only the component; the shared `<Layout>` is applied in `main.jsx`  -  never wrap a page individually.
- Reusable hooks live in `resources/js/hooks/`; cross-page UI state lives in `UIContext`.
- No TypeScript, no ESLint, no Prettier, no path aliases  -  match the neighbouring file's style by hand.

**Styling**

- Tailwind **3.4** configured via `tailwind.config.cjs` (`.cjs`, not `.js`). Never v4 syntax such as `@theme` or `@custom-variant`.
- Use the existing palette: `navy` / `navyDark` / `navyLight`, `teal` (+ `dark` / `light` / `bg`), `gold`, `ink`, `muted`, `line`, `soft`; fonts `font-body` (Inter) / `font-heading` (Outfit).
- Reuse the shared classes in `app.css` (`.input`, `.filter-tab`, `.reveal`, `.no-scrollbar`, `.marquee-track`) rather than adding new one-offs.
- Preserve `prefers-reduced-motion` handling already present for `.reveal` and the marquee.

**Git**

- Only `main` exists; history is direct-to-main with informal messages (some `feat:` / `feat(scope):`, many plain lowercase).
- Windows working tree runs with `core.autocrlf=true` while `.gitattributes` forces `* text=auto eol=lf`.

## 6. Available skills and when to use them

> `find-skills` is project-scoped (`.agents/skills/find-skills`, takes precedence). All others are
> global (`%USERPROFILE%\.agents\skills\`).

- **laravel-best-practices** (official Laravel org)  -  backend patterns: controllers, models, migrations,
  FormRequests, policies, jobs, Eloquent, N+1, caching, validation.
  Invoke when: touching `app/`, `routes/web.php`, `database/`, `config/`.
  Constraint: keep thin single-action controllers + `ContentPresenter`; no service/action layers unasked.
- **laravel-inertia-react**  -  Inertia pages, `useForm`, shared props, persistent layouts.
  Invoke when: touching `resources/js/pages/`, `components/`, `HandleInertiaRequests.php`, `main.jsx`.
  Constraint: repo is Inertia 2 + React 18 + Laravel 12, but skill metadata says `laravelVersion 13.x`  - 
  do not apply v13-only APIs.
- **laravel-owasp-security**  -  OWASP Top 10 audit + secure coding for Laravel + React/Inertia.
  Invoke when: touching auth/Fortify, `StoreApplicationRequest`, `ApplicationController@store`
  (throttled `POST /applications`), or on any "security review / audit".
  Constraint: tests run on SQLite `:memory:`, dev on MySQL  -  no MySQL-only features in validated paths.
- **laravel-testing**  -  feature/unit tests, HTTP tests, factories, facade mocks, auth testing.
  Invoke when: touching or adding anything under `tests/`.
  Constraint: **PHPUnit 11.5 only  -  no Pest**; `RefreshDatabase` + `assertInertia` + `component('pages/X')`;
  seed `ContentSeeder::class` in `setUp()` like `ContentPagesTest.php`.
- **spatie-laravel-php**  -  Spatie PSR-12 + Laravel conventions for PHP/Blade.
  Invoke when: creating/editing/reviewing any `app/`, `routes/`, `config/`, `database/`, Blade file.
  Constraint: read gotcha #7 first  -  Pint default fails on this tree; format only touched files.
- **copywriting**  -  short-form marketing copy (headlines, CTAs, landing/ad/email, PAS/AIDA/BAB).
  Invoke when: user asks for headline/CTA/landing copy or edits program/catalog/journey strings.
  Constraint: copy only  -  never change presenter prop shapes for copy; edit `resources/js/data/*.js`
  (seed source), not generated `database/data/*.json`.
- **seo**  -  meta tags, JSON-LD, sitemap/robots, Lighthouse.
  Invoke when: touching `resources/views/app.blade.php`, `<Head>` usage, public SEO files, "improve SEO".
  Constraint: SSR is off and `build:ssr` does not exist  -  do not claim SSR is active.
- **wcag-audit-patterns**  -  WCAG 2.2 audits (automated + manual) with remediation.
  Invoke when: touching modals, Header/nav, forms, auth pages, Toasts, or any a11y audit/fix.
  Constraint: preserve existing `prefers-reduced-motion` handling for `.reveal` and marquee.
- **web-design-guidelines**  -  UI/UX/accessibility review vs web interface guidelines.
  Invoke when: user asks "review my UI / check accessibility / audit design".
  Constraint: judge against Tailwind 3.4 + existing palette (`navy`, `teal`, `gold`, `ink`, `muted`,
  `line`, `soft`; `font-body`/`font-heading`)  -  never v4/shadcn tokens.
- **frontend-design**  -  aesthetic direction/typography for new or reshaped UI.
  Invoke when: adding a page/section in `resources/js/pages/` or `components/Home/`.
  Constraint: extend `styles.css` + `app.css` shared classes (`.input`, `.filter-tab`, `.reveal`,
  `.no-scrollbar`, `.marquee-track`); no new design language.
- **vercel-react-best-practices**  -  React performance (components, fetching, bundle).
  Invoke when: writing/reviewing `resources/js/**/*.jsx`.
  Constraint: React 18 + Vite 5 + Inertia 2 only  -  ignore all Next.js advice (no App Router,
  Server Components, `next/image`).
- **tailwind-v4-shadcn**  -  **DO NOT USE in this repo.** Tailwind v4 + shadcn; repo is Tailwind 3.4 via
  `tailwind.config.cjs`. v4 syntax (`@theme`, `@custom-variant`) breaks the build. Listed so agents skip it.
- **find-skills**  -  discovers/installs skills on "how do I do X / is there a skill for X".
  Constraint: interactive prompt hangs non-interactively  -  always
  `npx skills add <repo> --skill <name> -g -y -a cline,cursor,codex,gemini-cli,github-copilot,opencode --json`;
  bare `-g -y` fails (auto-detects 21 agents incl. PromptScript, which rejects global installs).

## 7. Known gotchas / repo-specific pitfalls

1. DB split: dev = MySQL `jhtuh_skillsoft`; tests = SQLite `:memory:` (forced by `phpunit.xml`).
2. Seed groups are a contract: `ContentSeeder` = `group='legacy'`; `RequestedCatalogSeeder` =
   `'core'`/`'aspire'`. UI filters depend on these strings  -  do not rename.
3. `database/data/*.json` is **generated** (`node scripts/export-content.mjs`)  -  edit
   `resources/js/data/*.js`, then re-export.
4. `docs/skillsoft-course-catalog-requested.md` is machine-parsed by the catalog seeder  -  do not reformat casually.
5. Inertia names are case-sensitive lowercase paths (`pages/Home`, `pages/auth/Login`); shared `<Layout>`
   is applied once in `main.jsx`  -  never wrap a page individually.
6. SSR is aspirational: README + `config/inertia.php` mention it, but no `build:ssr` script exists and SSR
   stays off. Do not "enable SSR" without adding script + server entry + build step.
7. `php vendor/bin/pint --test` currently **fails** on this tree with default preset  -  check-only first,
   then `pint <touched-files>` only; never bulk-format.
8. JS style contradicts `.editorconfig`: JS/JSX is 2-space, no semicolons, single quotes (4-space = PHP).
9. Fortify: most features disabled; `app/Actions/Fortify/` = CreateNewUser + password/profile only.
   `/login`, `/register`, `/logout` come from Fortify, not `routes/web.php`.
10. `.gitattributes` forces LF (`* text=auto eol=lf`) while Windows runs `core.autocrlf=true`  -  do not
    "fix" line endings wholesale.
11. `legacy/` = reference only; tailwind config is `.cjs`; modal names are exactly
    `search`/`login`/`register` in `UIContext.jsx`.
12. `composer dev` needs `concurrently` via `npx` at runtime (not in `package.json`) and opens a browser
    from `npm run dev`  -  prefer `php artisan serve` + `npm run dev` in agent sessions.

## 8. Do's and Don'ts

Do:

- Run `php artisan test` (or `--filter=`) before finishing backend work; `npm run build` before frontend/CSS work.
- Add a feature test in `tests/Feature/` for every new page/endpoint, following `ContentPagesTest.php`.
- Validation in FormRequests; thin single-action controllers; payload mapping in `ContentPresenter`.
- Match neighbouring file style by hand (no ESLint/Prettier/TS/aliases).
- Reuse palette tokens + `app.css` shared classes; keep reduced-motion support.

Do not:

- Do not hand-edit `database/data/*.json`, `public/build/`, or `legacy/`.
- Do not add Pest, TypeScript, ESLint, Prettier, path aliases, service/action layers, or Tailwind v4/shadcn.
- Do not bulk-run Pint, bulk-rename seed groups, or reformat the machine-parsed catalog doc.
- Do not commit `.env`, `database/*.sqlite`, `node_modules/`, `vendor/`, `public/build/` (all gitignored).
- Do not commit to `main` unless asked; never push or force-push. Leave branching decisions to the user.

## 9. Open questions (ask  -  do not guess)

- Deployment target/process (Forge/Vapor/shared hosting? CI? is `npm run build` in deploy?).
- Production DB/queue/mail (MySQL host? what consumes `applications`  -  mail, DB only, CRM webhook?).
- Auth roadmap (demo learner + Fortify login/register = full scope, or roles/admin coming?).
- SSR intent (stay CSR, or build `build:ssr` + node SSR server?).
- Commit convention going forward (informal direct-to-main is current state  -  keep or Conventional Commits + PRs?).