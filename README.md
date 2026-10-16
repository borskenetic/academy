# Area 51 x Skillsoft (JHTUH)

Area 51's Skillsoft partner site. The front end is the original React UI (same look and behaviour); it is now served by a **Laravel 12 backend through Inertia.js**, so routing, data, authentication and forms are server-side.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Laravel 12 (PHP 8.2-8.5) |
| Bridge | Inertia.js - `inertiajs/inertia-laravel` 2.x + `@inertiajs/react` 2.x |
| Front end | React 18 + Vite 5 (`laravel-vite-plugin`) |
| Styling | Tailwind CSS 3.4 (`tailwind.config.cjs`) + `resources/css/styles.css` design system |
| Auth | Laravel Fortify (login, register, logout) rendered as Inertia forms |
| Database | MySQL (`jhtuh_skillsoft`); SQLite in-memory for tests |

## Routes

| Route | Controller | Inertia page |
| --- | --- | --- |
| `GET /` | `HomeController` | `pages/Home` |
| `GET /program?p=<key>` | `ProgramController@show` | `pages/ProgramPage` |
| `GET /cse-courses` | `CseCoursesController` | `pages/CseCourses` |
| `GET /skillsoft-catalog?cat=<category>` | `CatalogController` | `pages/SkillsoftCatalog` |
| `GET /login`, `GET /register` | Fortify | `pages/auth/Login`, `pages/auth/Register` |
| `POST /login`, `POST /register`, `POST /logout` | Fortify | - |
| `POST /applications` | `ApplicationController@store` | - (throttled 10/min) |
| `POST /api/skillsoft-leads` | `Api\SkillsoftLeadController@store` | JSON lead intake for LCC/NDMC (throttled 10/min) |
| `GET /dashboard` | `DashboardController` | `pages/Dashboard` (auth only) |

## Local setup

```powershell
composer install
Copy-Item .env.example .env
php artisan key:generate

# create the database (or change DB_* in .env)
php -r "new PDO('mysql:host=127.0.0.1','root','')->exec('CREATE DATABASE jhtuh_skillsoft CHARACTER SET utf8mb4');"

php artisan migrate --seed   # content + demo learner
npm install
```

Run the app (two terminals):

```powershell
php artisan serve      # http://localhost:8000
npm run dev            # Vite dev server (assets + HMR)
```

Production build: `npm run build` -> `public/build`, then serve `public/`.

Demo learner account: `student@area51.ph` / `password`.

## Branded funnel deployment

The LCC and NDMC static sites submit registrations to this application's JSON API. In production:

1. Set `APP_URL` to this Laravel site's HTTPS URL.
2. Set `CORS_ALLOWED_ORIGINS` to the exact comma-separated funnel origins (no paths), then run `php artisan config:cache`. Example:
   `https://lcc.example,https://ndmc.example,https://earist.example,https://zppsu.example,https://jmc.example`
3. Run `php artisan migrate --force` so the dashboard can store institution and course metadata.
4. In each funnel (`LCC`, `NDMC`, `EARIST`, `ZPPSU`, `JMC`) set:
   `VITE_LEADS_API_URL=https://academy.pantas.org/api/skillsoft-leads`
   then rebuild locally and upload that app's `dist/` contents.
5. Submit one registration from each live site and confirm all appear in `/dashboard`.

The endpoint is intentionally anonymous and stateless. It accepts `lcc`, `ndmc`, `earist`, `zppsu`, and `jmc`, enforces each school's official email domain, and applies validation, a honeypot, CORS restrictions, and per-IP throttling.

## Content workflow

Runtime content lives in the database. The `resources/js/data/*.js` modules are kept as the editable **seed source**:

```powershell
# 1. edit resources/js/data/programsData.js, skillsoftCatalog.js,
#    aspireJourneys.js or cseProgram.js
node scripts/export-content.mjs        # -> database/data/*.json
php artisan db:seed --class=ContentSeeder
```

`ContentSeeder` upserts programs, program courses/featured/details, catalog tracks with outcomes, aspire journeys and learning domains. `App\Support\ContentPresenter` shapes those rows into the exact payloads the React views expect, so the components did not have to change shape.

Seeded content: 9 programs, 110 courses, 27 catalog tracks (110 outcomes), 52 aspire journeys, 38 domains.

## Tests

```powershell
php artisan test
```

`tests/Feature/ContentPagesTest.php` covers every page component, the program fallback, catalog filtering, application validation/storage, the auth guard and registration roles (12 tests, 120 assertions).

## Project layout

```
app/Http/Controllers/     page + form controllers
app/Http/Middleware/      HandleInertiaRequests (shared auth/flash/categories/catalog props)
app/Support/              ContentPresenter (DB -> view payloads)
app/Models/               Program, ProgramCourse, SkillsoftTrack, AspireJourney, Application, ...
database/data/            JSON exported from resources/js/data (seed input)
database/seeders/         ContentSeeder, DatabaseSeeder
resources/js/pages/       Inertia pages (default layout applied in main.jsx)
resources/js/components/  Header, Footer, Modals, AuthForms, AspireJourneys, Home/*
resources/css/            app.css (Tailwind) + styles.css (design system)
resources/views/app.blade.php   root Blade view (@inertia)
scripts/export-content.mjs      data exporter
legacy/                   original static HTML/CSS/JS (reference only)
```

## Known follow-ups

- Password reset / email verification / 2FA views are not built yet; those Fortify features are disabled in `config/fortify.php`.
- Content editing uses the seeder workflow - add Filament (or Inertia CRUD screens) for a browser-based admin.
- SSR is available but off (`config/inertia.php`); enable it plus `npm run build:ssr` if server-rendered HTML is needed for SEO.
- Skillsoft/Percipio single sign-on and the Rs. 885 course-fee checkout are not implemented; the apply flow stores an application record.