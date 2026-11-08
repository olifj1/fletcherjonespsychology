# Fletcher-Jones Psychology website

Small static website for Fletcher-Jones Psychology, the private clinical psychology practice of Kathryn Walsh.

- Live: https://fletcherjonespsychology.co.uk/ (also https://olifj1.github.io/fletcherjonespsychology/)
- Contact email: kathryn@fletcherjonespsychology.co.uk
- Currently a "coming soon" holding page. The full site (Home, About, Contact) is in progress — see TASKS.md.

## Layout

All site files live in the repo root:

- `index.html` — page markup
- `style.css` — all styling
- `app.js` — small enhancements (header scroll state, footer year)
- `sw.js` — retired service worker; it only clears old caches and unregisters itself. Keep it until there's no chance of old visitors returning (well into 2027), then delete it.
- `icon-192.png`, `icon-512.png` — favicon / touch icon
- `CNAME` — custom domain. **Never remove or change.**
- `assets/` — images (create when first needed)

## Working method

- Plain HTML/CSS/JS. No frameworks, npm or build step. GitHub Pages serves `main`; a merge goes live in about a minute.
- Use relative paths (`./style.css`) so the site works on both the custom domain and the github.io subpath.
- Claude works on its own branch, commits with clear messages and pushes. It opens a pull request into `main` only when asked. The owner reviews and merges from a phone.
- After a merge, start the next change from the updated `main`. If a PR is still open, add commits to it and update its description.
- Keep TASKS.md (remove finished items) and CHANGELOG.md (one line per change) up to date in the same PR as the work.
- Test before pushing: serve locally with `python3 -m http.server`, check pages in a headless browser for broken links, missing images and console errors, then tell the owner what to check on their phone.
- Images go in `assets/`, sized sensibly for the web. If a changed image doesn't update live, add a version to its URL (`photo.jpg?v=2`).
- UK English. Small, focused changes, one topic per PR.

## Rules

- This is a clinical practice site. Don't invent qualifications, registrations, specialisms, testimonials or clinical claims — use only wording Kathryn has supplied or approved.
- The repo is public: never commit patient information, contact submissions, credentials or anything confidential.
- No contact or intake forms that collect personal or clinical details; contact is by email link unless the owner decides otherwise (would need a UK GDPR review).
- The page has `noindex, nofollow` while in development. Remove it at launch.
- DNS and email are with IONOS; site changes never involve the mail DNS records.
- Not the same project as the owner's game / Learning Play app — keep them separate.
