# 📖 Guidance Website — How To Use

Everything you need to run, maintain, and publish content to your Abrar Studio website.

**Owner:** Abrar Ahmed
**Stack:** React + Vite + Tailwind CSS
**Content model:** Markdown files (Git-driven, no database)

---

## Table of Contents

1. [Running the Project](#1-running-the-project)
2. [Publishing a New Guide](#2-publishing-a-new-guide)
3. [Frontmatter Reference](#3-frontmatter-reference)
4. [Markdown Formatting](#4-markdown-formatting)
5. [Managing Guides](#5-managing-guides)
6. [Project Structure](#6-project-structure)
7. [Customization](#7-customization)
8. [Deployment](#8-deployment)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Running the Project

### Install dependencies (first time only)
```bash
npm install
```

### Start the local dev server
```bash
npm run dev
```
Open the URL shown in the terminal (usually `http://localhost:5173`). Changes appear instantly.

### Build for production
```bash
npm run build
```
Output goes to the `dist/` folder as a single, self-contained `index.html`.

### Preview the production build
```bash
npm run preview
```

---

## 2. Publishing a New Guide

Publishing is as simple as adding a Markdown file. **No code changes required.**

### Step-by-step

1. **Create a new file** in `src/content/guides/` using this naming format:
   ```
   YYYY-MM-DD-kebab-case-title.md
   ```
   Example: `2026-07-15-building-ai-workflows.md`

2. **Copy the contents** of `src/content/guides/_template.md` into your new file.

3. **Fill in the frontmatter** (the YAML block between the `---` marks).

4. **Write your guide** in Markdown below the frontmatter.

5. **Save.** In dev mode it appears instantly. For production, commit and push:
   ```bash
   git add .
   git commit -m "Add guide: Your Guide Title"
   git push
   ```

6. Your hosting platform rebuilds automatically (~60 seconds) and the guide goes live.

### The slug (URL) is automatic

The date prefix is stripped to create the URL. So:
```
File:  2026-07-15-building-ai-workflows.md
URL:   /guides/building-ai-workflows
```

---

## 3. Frontmatter Reference

Every guide file **must** start with this YAML block:

```yaml
---
title: "Your Guide Title Here"
description: "A compelling description under 160 characters."
pubDate: 2026-07-15
category: ai
tags:
  - tag1
  - tag2
  - tag3
difficulty: beginner
duration: 8
featured: false
---
```

### Field details

| Field | Required | Type | Notes |
|-------|----------|------|-------|
| `title` | ✅ Yes | string | Wrap in quotes. Displays as the page H1. |
| `description` | ✅ Yes | string | Keep under 160 characters for SEO. |
| `pubDate` | ✅ Yes | `YYYY-MM-DD` | Controls sort order (newest first). |
| `category` | ✅ Yes | enum | Must be one of the 7 categories below. |
| `tags` | ✅ Yes | list | Use 2–5 tags. Each on its own `- ` line. |
| `difficulty` | ✅ Yes | enum | `beginner`, `intermediate`, or `advanced`. |
| `duration` | ✅ Yes | number | Estimated read time in minutes. |
| `featured` | ❌ No | boolean | `true` shows it in the Featured section. Default `false`. |
| `draft` | ❌ No | boolean | `true` hides it from the site. Default `false`. |
| `updatedDate` | ❌ No | `YYYY-MM-DD` | Optional "last updated" date. |
| `coverImage` | ❌ No | string | Optional path to a cover image. |

### Valid categories

| Slug | Label | Use for |
|------|-------|---------|
| `ai` | AI | AI tools, workflows, prompting, integrations |
| `design` | Design | Visual design, layout, UI/UX, typography, color |
| `development` | Development | Frontend, backend, frameworks, coding patterns |
| `tools` | Tools | Tool reviews, tutorials, workflow tips |

> ⚠️ The category value must match a slug **exactly** (lowercase), or the guide won't be filtered correctly.

---

## 4. Markdown Formatting

The custom renderer supports the following syntax.

### Headings
```markdown
## H2 — Major sections
### H3 — Subsections
#### H4 — Minor points
```

### Text emphasis
```markdown
**bold text**
*italic text*
***bold and italic***
```

### Inline code
```markdown
Press `Cmd + K` to open the menu.
```

### Code blocks (with language hint)
````markdown
```typescript
const example = "syntax highlighted";
```
````

### Bullet lists
```markdown
- First item
- Second item
- Third item
```

### Numbered lists
```markdown
1. First step
2. Second step
3. Third step
```

### Task lists (checklists)
```markdown
- [x] Completed task
- [ ] Pending task
```

### Tables
```markdown
| Column A | Column B |
|----------|----------|
| Value 1  | Value 2  |
| Value 3  | Value 4  |
```

### Links
```markdown
[Link text](https://example.com)
```

### Horizontal rule
```markdown
---
```

---

## 5. Managing Guides

### Hide a guide (unpublish)
Set `draft: true` in its frontmatter. It disappears from the site but stays in your repo.

### Schedule guides in advance
Write several guides with `draft: true`. On publish day, flip to `draft: false` and push.

### Feature a guide
Set `featured: true` to display it prominently in the Featured section on the homepage.

### Delete a guide permanently
Delete the `.md` file from `src/content/guides/` and push.

### Update an existing guide
Edit the `.md` file, optionally add an `updatedDate`, and push.

---

## 6. Project Structure

```
guidance-website/
├── HOW_TO_USE.md                    ← This file
├── index.html                       ← Page title & fonts
├── package.json
├── src/
│   ├── App.tsx                      ← Routes
│   ├── main.tsx                     ← Entry point
│   ├── index.css                    ← Design tokens & prose styles
│   │
│   ├── content/
│   │   └── guides/
│   │       ├── _template.md         ← Copy this for new guides
│   │       └── *.md                 ← YOUR GUIDES GO HERE
│   │
│   ├── components/
│   │   ├── Layout.tsx               ← Page shell (header/sidebar/footer)
│   │   ├── Header.tsx               ← Top nav + theme toggle
│   │   ├── Sidebar.tsx              ← Category navigation
│   │   ├── Footer.tsx
│   │   ├── GuideCard.tsx            ← Card in the guide grid
│   │   ├── MarkdownRenderer.tsx     ← Renders guide content
│   │   ├── Logo.tsx
│   │   └── ThemeToggle.tsx          ← Dark/light switch
│   │
│   ├── pages/
│   │   ├── HomePage.tsx             ← Guide feed
│   │   ├── GuidePage.tsx            ← Single guide view
│   │   └── CategoryPage.tsx         ← Category listing
│   │
│   ├── data/
│   │   └── guides.ts                ← Auto-loads all .md files
│   │
│   ├── utils/
│   │   └── parseMarkdown.ts         ← Frontmatter parser
│   │
│   ├── hooks/
│   │   └── useTheme.ts              ← Theme persistence
│   │
│   └── types/
│       └── guide.ts                 ← TypeScript types
```

**You will mostly only ever touch `src/content/guides/`.**

---

## 7. Customization

### Change site title
Edit `<title>` in `index.html`.

### Change the accent color
Edit `--color-accent` in `src/index.css` (line under `@theme`):
```css
--color-accent: #6E56F8;        /* your brand color */
--color-accent-hover: #7F6BFA;  /* slightly lighter */
```

### Change fonts
1. Update the Google Fonts `<link>` in `index.html`.
2. Update `--font-display`, `--font-body`, `--font-sans` in `src/index.css`.

### Edit navigation links
Edit the `navLinks` array in `src/components/Header.tsx`.

### Add / rename / remove categories
Edit the `categories` array in `src/data/guides.ts` **and** the category enum in `src/types/guide.ts`. Also update the label maps in `GuidePage.tsx` and `CategoryPage.tsx`.

### Edit footer text
Edit `src/components/Footer.tsx`.

---

## 8. Deployment

This site builds to a single static file, so it works on any static host.

### Cloudflare Pages
1. Push your repo to GitHub.
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Deploy.

### Vercel
1. Import the GitHub repo.
2. Framework is auto-detected (Vite).
3. Deploy.

### Netlify
1. Import the repo.
2. Build command: `npm run build`
3. Publish directory: `dist`

After the first setup, **every `git push` triggers an automatic rebuild and redeploy.**

---

## 9. Troubleshooting

### My guide isn't showing up
- Is `draft` set to `false` (or omitted)?
- Is the `pubDate` a valid `YYYY-MM-DD` date?
- Is the YAML frontmatter valid (spaces, not tabs; correct indentation)?
- Is the file inside `src/content/guides/` with a `.md` extension?

### The build fails
- Check all required frontmatter fields are present.
- Confirm `category` exactly matches a valid slug.
- Confirm `difficulty` is `beginner`, `intermediate`, or `advanced`.
- Make sure `duration` is a number, not text.

### The category page shows "No guides yet"
That category simply has no published guides. Add a guide with that `category` value.

### Tags or lists look wrong
Ensure each list item / tag is on its own line and correctly indented in the frontmatter:
```yaml
tags:
  - correct
  - formatting
```

### Preview locally before publishing
```bash
npm run dev
```
Always check a new guide renders correctly before pushing to production.

---

## Quick Cheat Sheet

```bash
# New guide
touch src/content/guides/$(date +%Y-%m-%d)-my-topic.md
# → paste _template.md contents, edit, save

# Preview
npm run dev

# Publish
git add . && git commit -m "Add guide: My Topic" && git push
```

That's it. Git is your CMS. 🚀
