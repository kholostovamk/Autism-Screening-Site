# Spectrum Assessment — Setup Guide

## What you have

```
spectrum-assessment/
├── index.html   ← the entire website (one file)
├── Code.gs      ← Google Apps Script backend
└── SETUP.md     ← this file
```

---

## Step 1 — Create the Google Sheet

1. Go to **sheets.google.com** and create a new blank spreadsheet.
2. Name it anything you like (e.g. *Spectrum Results*).
3. Leave it open — you'll need it in Step 2.

---

## Step 2 — Set up the Apps Script backend

1. Inside your spreadsheet, click **Extensions → Apps Script**.
2. Delete all the placeholder code in the editor.
3. Open `Code.gs` from this folder and **paste its entire contents** into the editor.
4. Click **Save** (the floppy disk icon, or Ctrl/Cmd + S).
5. Click **Deploy → New deployment**.
6. Click the gear icon ⚙ next to "Type" and choose **Web app**.
7. Fill in the fields:
   - Description: `Spectrum backend`
   - Execute as: **Me**
   - Who has access: **Anyone**
8. Click **Deploy**.
9. Click **Authorize access** and follow the Google sign-in prompts.
10. After deployment, Google shows you a **Web app URL** — copy it. It looks like:
    `https://script.google.com/macros/s/AKfy.../exec`

---

## Step 3 — Connect the website to the Sheet

1. Open `index.html` in any text editor.
2. Find this line near the top of the `<script>` section:
   ```js
   const SHEETS_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
   ```
3. Replace `YOUR_APPS_SCRIPT_URL_HERE` with the URL you copied, keeping the quotes.
4. Save the file.

---

## Step 4 — Deploy to Netlify

### Option A — Drag and drop (easiest)
1. Go to **app.netlify.com** and log in.
2. Click **Add new site → Deploy manually**.
3. Drag the `spectrum-assessment` folder onto the upload area.
4. Netlify gives you a live URL instantly. Done.

### Option B — GitHub (if you use git)
1. Push the folder to a GitHub repo.
2. In Netlify: **Add new site → Import from Git → GitHub**.
3. Select the repo. Build command: leave blank. Publish directory: `.` (dot).
4. Click Deploy.

---

## Step 5 — Test it

1. Open the live URL, complete the full test.
2. Go back to your Google Sheet — a new row should appear with the results.
3. The sheet columns are:
   `Timestamp | Name | Age | IP | City | Region | Country | Score A | Score B | Score C | Score D | Result Group | Masking Flag`

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Data not appearing in Sheet | Check the Apps Script URL in index.html. Re-deploy Apps Script if needed. |
| Apps Script access error | Re-run Step 2 and make sure "Who has access" is set to **Anyone**. |
| IP / location showing blank | ipapi.co may be rate-limited. Location is best-effort; the test still works fully. |
| Site not loading on Netlify | Make sure you dragged the folder, not just the index.html file. |

---

## Notes

- The question order is **randomised** every time someone takes the test, which reduces scoring bias.
- The sheet is created and headers are added automatically on the first submission.
- No data is sent until the person reaches the results screen (after completing all 30 questions).
