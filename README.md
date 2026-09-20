# Cardiology Index

GitHub Pages-ready cardiology landing page.

## Files
- `index.html` — main page
- `style.css` — responsive design
- `script.js` — search and category filtering
- `assets/cardiology-bg.png` — cardiology background image

## Chapter links
Each card currently points to a future chapter folder, for example:

`chapters/heart-failure/`

Create the corresponding folder and place that chapter's own `index.html` inside it.

## GitHub Pages
Publish the repository from `main` → `/ (root)`.


## Admin — Add New Topic
The category filter buttons were removed. An **Add New Topic** button is now shown directly below search.

Edit `ADMIN_NEW_TOPIC_URL` in `script.js` so it points to your repository, e.g.:

`https://github.com/YOUR-USERNAME/YOUR-REPOSITORY/new/main/chapters`

The website itself is static; actual write access is enforced by GitHub. Visitors without repository write/admin permission cannot commit a new topic.


## Current cardiology chapter index
The landing page now contains 26 cardiology topics in alphabetical order.
All topic cards use the same heart SVG icon.
The search field and GitHub-authenticated admin "Add New Topic" button are preserved.


## Admin button — fixed version
- The Add New Topic button now has a dedicated click handler.
- On `USERNAME.github.io/REPOSITORY/`, the GitHub repository is detected automatically.
- When testing locally or on a custom domain, the page asks for the repository URL once and stores it in localStorage.
- GitHub itself enforces write/admin permissions before a new topic can be committed.
