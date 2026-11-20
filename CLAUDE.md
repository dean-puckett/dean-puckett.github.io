# Dean Puckett portfolio site: instructions for Claude

Static site, no build step. GitHub Pages serves the repo root as-is.
Dean adds projects by describing them in chat. Your job: update the content
file, add media, check the result, then commit and push.

## Layout

- `index.html` page shell (nav, footer, script tags). Rarely needs edits.
- `assets/data/projects.js` **all content**: site info (`SITE`), filter
  categories (`CATEGORIES`) and every project (`PROJECTS`). Most changes happen here.
- `assets/js/app.js` renders the home page and project pages (hash routes like `#project-<slug>`).
- `assets/js/flow.js` hero background animation (potential flow past a cylinder).
- `assets/css/styles.css` styles and the four color schemes (`forest` default and first in the picker, then `xenon`, `plume`, `blueprint`).
- `assets/img/` images as `name.webp` (max 1800 px) + `name-sm.webp` (max 760 px).
- `assets/video/` H.264 MP4s (720 px wide) + a `.jpg` poster frame each.
- `assets/docs/` resume PDF and any project reports.
- `assets/fonts/` self-hosted Archivo variable font (OFL license included).

## Adding a project

1. Get the details from Dean: title, org, role, dates, location, type, what he
   personally did, outcome, numbers, and media files. Ask for anything missing.
   Never invent numbers, dates, outcomes or claims.
2. Add an object to `PROJECTS` in `projects.js`. Position in the array = position
   on the home page (most impressive and recent first).

```js
{
  slug: "kebab-case-unique",          // URL: #project-<slug>
  title: "Full project title",
  shortTitle: "Card title",           // shown on the home grid
  blurb: "1-2 sentences: what it is and my role.",  // back of the card on hover
  category: "team",                   // must match an id in CATEGORIES
  org: "Team or class, ASU",
  role: "Dean's role",
  dates: "January 2027 to present",   // "Month YYYY to Month YYYY"
  location: "Tempe, Arizona",
  type: "Short project type",
  tags: ["Skill", "Tool"],            // 3 to 5
  cover: { src: "assets/img/name", pos: "50% 50%" },  // or { logo: "assets/img/name", label: "Name" } or { wordmark: "Text" }
  keyFigure: { value: "202.828 Pa", label: "What the number means" },  // or null
  summary: "One paragraph on what the project is.",
  did: ["What Dean personally did, one item each."],
  outcome: "Result.",                 // "" hides the section
  learned: "",                        // "" hides the section
  media: [
    { type: "image", src: "assets/img/name", caption: "Caption", wide: true },  // wide = spans 2 columns
    { type: "video", src: "assets/video/name.mp4", poster: "assets/video/name.jpg", caption: "Caption" }
  ],
  galleries: [                        // optional extra titled image sections, shown above "Photos and videos"
    { title: "Section title", text: "One line of context.", media: [ /* same shape as media */ ] }
  ],
  docs: [{ label: "Project report (PDF)", href: "assets/docs/file.pdf" }]
}
```

3. Media processing (run from repo root):

```bash
# images: large + small webp
python3 -c "
from PIL import Image, ImageOps; import sys
src, name = sys.argv[1], sys.argv[2]
im = ImageOps.exif_transpose(Image.open(src)).convert('RGB')
a = im.copy(); a.thumbnail((1800, 1800)); a.save(f'assets/img/{name}.webp', 'WEBP', quality=82)
b = im.copy(); b.thumbnail((760, 760)); b.save(f'assets/img/{name}-sm.webp', 'WEBP', quality=78)
" "path/to/photo.jpg" new-image-name

# videos: 720 px wide H.264 + poster frame
ffmpeg -i in.mov -vf scale=720:-2 -c:v libx264 -preset veryfast -crf 26 -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart assets/video/name.mp4
ffmpeg -ss 2 -i assets/video/name.mp4 -frames:v 1 -q:v 4 assets/video/name.jpg
```

Keep each video under ~10 MB. GitHub rejects files over 100 MB.

## Writing rules (Dean's, apply to every word on the site)

- First person, plain and direct, like a capable peer. Mix sentence lengths.
- No em dashes. Use commas, periods, colons or parentheses.
- Never use: delve, dynamic (as an adjective), testament, tapestry, leverage, utilize,
  seamless, furthermore, in conclusion, underscore, paradigm, critically,
  paramount, transforming, passionate about, wear many hats, hit the ground running.
- Capitalize Hall Effect and Xenon.
- Experimental Propulsion Club role is "Propulsion Team Member" (propulsion only, never manufacturing).
  Wheels2Africa role is "Mechanical Research Lead". Dean did not do coding on Wheels2Africa.
- Only state facts Dean or his files gave you.

## Before pushing

1. `node --check assets/js/app.js assets/data/projects.js`
2. Serve locally (`python3 -m http.server`) and screenshot the home page and the
   new project page at 1440 px and 390 px wide. Check images load and nothing overflows.
3. Commit with a clear message ("Add <project> project") and push to `main`.
   GitHub Pages redeploys in about a minute.

## Notes

- Dean's school docs, resumes and project files live in `C:/Users/Dean/Desktop/ASU` (resumes in `Resumes/`,
  class work in `Semesters/`). Check them for facts before asking, but site wording rules above still win
  (e.g. resumes may still say "Propulsion and Manufacturing Teams").
- `SITE.contactLine` is the line under "Get in touch".

- Some project reports (Snowboard, Lamp, Shock Absorber, Accelerometer, T.R.A.M.)
  still link to PDFs hosted on the old Wix site. If Dean provides the PDFs, put
  them in `assets/docs/` and update the `docs` hrefs.
- `SITE.theme` sets the color scheme; `SITE.showThemePicker` shows the switcher.
