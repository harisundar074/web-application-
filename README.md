# AI, Robotics & VLA Workshop — Content

This repository contains the slide decks for the AI, Robotics, and Vision-Language-Action Models workshop delivered by e-Yantra, IIT Bombay.

## Modules

| Chapter | Folder |
|--------|--------|
| Ch 1 — Introduction to Alphabot | `Ch1-Introduction-to-Alphabot/` |
| Ch 2 — IO Interfacing and Masking | `Ch2-IO-Interfacing-and-Masking/` |
| Ch 3 — Motion Control and Motor Interfacing | `Ch3-Motion-Control-and-Motor-Interfacing/` |
| Ch 4 — Pulse Width Modulation | `Ch4-Pulse-Width-Modulation/` |
| Ch 5 — Ultrasonic Sensor | `Ch5-Ultrasonic-Sensor/` |
| Ch 6 — Analog to Digital Converter | `Ch6-Analog-to-Digital-Converter/` |
| Ch 7 — Line Following Bot | `Ch7-Line-Following-Bot/` |

## Slides (Slidev)

Each module is a [Slidev](https://sli.dev) deck at `<module-folder>/slides.md`.

```bash
npm install        # one-time setup
npm run dev:ch1    # present chapter 1 — hot-reloading dev server
npm run dev:ch6    # ...swap the number for any chapter (ch1 – ch7)
```

Edit a module's content directly in its `slides.md` using standard Slidev/Markdown
(slides separated by `---`, optional `layout:` frontmatter per slide — see the
[Slidev docs](https://sli.dev/guide/) for syntax and built-in layouts like `quote`,
`statement`, `section`, `end`, `two-cols`, `image-right`, etc.).

To export a static build of every module (e.g. for hosting):

```bash
npm run build      # outputs to dist/<module-folder>/
```

### Host with Docker

On a server with Docker and Docker Compose installed, run:

```bash
docker compose up -d --build
```

The workshop is available at `http://<server-address>:8080/`. Set `PORT` to use a different
host port, for example `PORT=9000 docker compose up -d --build`. The container serves static
files on port 80; use your server's HTTPS reverse proxy if the site needs a domain and TLS.

The Docker build serves the decks from `/`. The existing `npm run build` command still builds
for GitHub Pages under `/workshop-robotics-vla/`.

To set the optional live-demo iframe URL, put `VITE_DEMO_IFRAME_URL=https://...` in `.env`
before building the image, then run `docker compose up -d --build` again after any change.
The URL is public in the generated site and must be reachable from viewers' browsers.

### Live website demo template

The template gallery includes a `live-demo` slide for an interactive website shown during a
browser presentation. Copy the example environment file, set the public demo URL, and start
the template deck:

```bash
cp .env.example .env
# Set VITE_DEMO_IFRAME_URL=http://localhost:8080 in .env (CaseTwin example)
npm run dev:template
```

`VITE_DEMO_IFRAME_URL` is read when the Slidev server or production build starts, so restart
the dev server or rebuild after changing it. `VITE_*` values are bundled into the client: never
put credentials, API keys, or private URLs in this variable. Real `.env` files remain ignored;
the checked-in `.env.example` intentionally leaves the value blank.

For local workshops, a slide deck served over HTTP can embed an HTTP demo such as
`http://localhost:8080`. If the deck is served over HTTPS, use an HTTPS demo URL or a same-origin
HTTPS proxy: browsers block mixed-content HTTP iframes. PDF export is not a reliable rendering of
an interactive external iframe; use this template for a live browser presentation or static web
output.

The demo starts disarmed so arrow keys keep navigating slides. Click the frame (or **Interact**)
to use it; moving the mouse off the frame, clicking **Exit demo**, or changing slide hands
navigation back. A focused cross-origin iframe keeps key presses to itself, so this can't be
avoided while you're actually typing inside the demo.

To use the slide in a module deck, add these two files next to its `slides.md` (copy them from
`template/`), then add a `layout: live-demo` slide. `npm run lint` fails if either is missing:

- `layouts/live-demo.vue`: Slidev only discovers layouts beside the deck entry.
- `vite.config.ts`: points `envDir` at the repo root so the deck reads `.env`.

#### Presenting the demo from GitHub Pages

The Pages build takes the demo URL from the `DEMO_IFRAME_URL` repository variable
(Settings → Secrets and variables → Actions → Variables). The deck is served over HTTPS and the
demo over HTTP, so the presenter's laptop must be on the e-Yantra network or VPN, with the
browser set up once:

- **Chrome:** open the deck. If Chrome asks to access devices on your local network, click
  **Allow**. If the demo frame stays blank, click the icon left of the address bar →
  **Site settings** → set **Insecure content** (and **Local network access**, if listed) to
  **Allow**, then reload.
- **Brave:** same site settings as Chrome (or add `https://e-yantra.github.io` under
  `brave://settings/content/insecureContent` → Allowed). Also click the Brave lion icon and turn
  **Shields** off for the site, so Brave doesn't upgrade or block the HTTP frame. Then reload.

These settings apply only to `e-yantra.github.io` and only in the browser you set them in.

If you launch Slidev from a VS Code terminal and the navigation-bar icons come out blank, run it
as `env -u VSCODE_CWD npm run dev:ch1`. UnoCSS skips loading local icon sets when it sees
`VSCODE_CWD`.

### Theme: slidev-theme-tahta

Every deck uses the [`slidev-theme-tahta`](https://github.com/zcag/tahta) community theme
(`theme: slidev-theme-tahta` in each deck's headmatter) in its **`minimal`** variant — Swiss
restraint, maximum whitespace, hairline rules, red accent
(`themeConfig: { variant: minimal }`). There's no local theme code to maintain: colors, fonts,
motion, and ~25 slide layouts (`cover`, `stats`, `compare`, `steps`, `chart`, `timeline`,
`quote`, `two-cols`, `diagram`, and more) all ship with the package. Full authoring reference:
`node_modules/slidev-theme-tahta/AGENTS.md` (also mirrors the table below).

Other variants worth knowing (set via `themeConfig.variant`): `editorial` (refined serif,
the theme's own default), `brutalist` (mono, engineering-flavored), `notebook` (informal,
workshop-y), `boardroom` (navy/orange, enterprise). Full list with "best for" guidance in the
AGENTS.md file above.

### Picking a slide layout

Every slide is a `layout:` choice + frontmatter fields — no CSS, no manual grids:

```md
---
layout: stats
kicker: Impact
title: Impact So Far
stats:
  - { value: 92, unit: "%", label: "Accuracy — n=500 patients" }
  - { value: 0, label: "Data breaches — on-prem deployment" }
---
```

| Layout | Use for |
|---|---|
| `cover` / `section` / `end` | Opener, chapter divider, closer |
| `default` | General content — markdown body (bullets, prose) |
| `statement` / `quote` | One big centered claim / a pull quote |
| `stats` / `fact` / `metric` | 2–4 hero numbers / one giant figure / number + context |
| `two-cols` | Generic split, body left + `::right::` |
| `compare` / `vs` | Before/after table / two-panel A-vs-B |
| `steps` / `timeline` | A process / a dated sequence |
| `chart` | ECharts bar/line/area/donut |
| `diagram` | Themed Mermaid flowchart/sequence/etc. |
| `image` / `showcase` / `bleed` | Text+image / asymmetric hero / full-bleed image |
| `code` / `code-explain` | Code block, optionally with a numbered explanation |
| `agenda` / `define` / `columns` / `panels` / `reference` | TOC / term+definition / parallel lists / cards / cheatsheet |

Full list + every field: `node_modules/slidev-theme-tahta/AGENTS.md`.

Compose components inside a `default`/`two-cols`/`statement` body for richer slides —
`<Stat>`, `<Callout>`, `<Meter>`, `<Terminal>`, `<Tags>`, `<Figure>`, `<Plot>` (charts),
and more (all listed in AGENTS.md).

### Validating a deck

The theme ships a linter — run it after editing (catches empty slides, bad frontmatter,
missing required fields, too many of the same layout in a row). The template command applies
the same Tahta checks while recognizing its local `live-demo` layout:

```bash
npm run lint            # all 7 decks
npm run lint:template   # template gallery, including the live-demo example
npx tahta-lint Ch2-IO-Interfacing-and-Masking/slides.md   # just one
```

### Logos (addons/logos/)

The theme's own brand mechanism (`themeConfig.logo`) shows one logo prominently on
openers and small in the footer elsewhere — not what we want here, since e-Yantra needs
to stay small and bottom-right on every slide (including the cover) and IIT Bombay only
on the very first slide. So logos are a tiny separate
[Slidev addon](https://sli.dev/guide/write-plugin) instead of theme code:

- `addons/logos/global-bottom.vue` — e-Yantra bottom-right on every slide (fainter on the
  cover), IIT Bombay top-right only on slide 1 (`$nav.currentPage === 1`)
- Referenced from each deck's headmatter as `addons: [addons/logos]`

To change logo position/opacity/visibility, edit that one file — it applies to all 7 decks.
