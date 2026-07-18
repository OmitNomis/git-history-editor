# GitRevise — Edit Your Git Commit History

GitRevise is a browser-based tool for rewriting Git commit history. Fix author
names and emails, rewrite commit messages, and adjust commit dates through a
spreadsheet-style editor — then copy the generated script and run it in your
repo. Nothing leaves your machine: your history is decoded, edited, and turned
back into a script entirely in the browser.

**Live app:** [gitrevise.netlify.app](https://gitrevise.netlify.app)

## Why

Sometimes a repository's history needs cleaning up:

- **Wrong authorship** — commits attributed to the wrong name or email (a
  misconfigured `git config`, a personal email on a work repo, etc.).
- **Messy commit messages** — typos or unclear messages you'd rather not leave
  in the permanent record.
- **Off timestamps** — commit dates that don't line up with your project's
  timeline.

Doing this by hand means wrestling with `git filter-branch` and its
`--env-filter` / `--msg-filter` syntax. GitRevise gives you a table to edit
instead and writes the correct script for you.

## How It Works

GitRevise has no backend. The flow is:

1. **Export your history.** In your repo, run the provided `git log` command. It
   prints your commits in a compact format and base64-encodes them so they
   survive copy/paste (including non-ASCII names and messages):

   ```bash
   git log -100 --pretty=format:"%H*#%an*#%ae*#%at*#%s" | base64 | tr -d "\n"
   ```

   Change `-100` to however many commits back you want to import.

2. **Import.** Paste the output into the app. GitRevise decodes it into an
   editable table of SHA, author name, author email, date, and message.

3. **Edit.** Click any field to change it. Edited cells are tracked so you can
   see exactly what changed.

4. **Generate the script.** Click **Done**. GitRevise produces a
   `git filter-branch` command that applies only your edits, scoped to the
   smallest revision range needed (and handles the root commit correctly).

5. **Apply it.** Copy or download the script and run it in your repo to rewrite
   history.

> [!WARNING]
> Rewriting history creates **new** commits with new SHAs. This breaks anyone
> who has already based work on the original commits. Avoid rewriting commits
> that have been pushed to a shared branch. If you must push a rewritten
> history, use `git push --force` deliberately and make sure collaborators know.

Not ready to touch a real repo? Use the **Click here to import a sample Git
history** link in the app to try the whole flow with dummy data.

## Tech Stack

- **[Vite](https://vitejs.dev/)** — build tool and dev server
- **[React](https://react.dev/)** + **[TypeScript](https://www.typescriptlang.org/)**
- **[Chakra UI](https://chakra-ui.com/)** — component and styling library

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (which includes npm)
- [Yarn](https://yarnpkg.com/) (recommended)

### Setup

```bash
# 1. Clone the repository
git clone git@github.com:OmitNomis/git-history-editor.git
cd git-history-editor

# 2. Install dependencies
yarn install

# 3. Start the dev server
yarn dev
```

The app runs at [http://localhost:5173](http://localhost:5173).

### Scripts

| Command        | Description                                  |
| -------------- | -------------------------------------------- |
| `yarn dev`     | Start the Vite dev server                    |
| `yarn build`   | Type-check and build for production          |
| `yarn preview` | Preview the production build locally         |
| `yarn lint`    | Run ESLint over the project                  |

## Contributing

Issues and pull requests are welcome. If you're fixing a bug or adding a
feature, please run `yarn lint` before opening a PR.

---

Made with ❤️ by [OmitNomis](https://github.com/OmitNomis)
