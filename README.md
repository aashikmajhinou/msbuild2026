# msbuild2026
# build-2026-cli-live

**From CLI to PR: Automating the path to merged code**

This repo powers the live coding portion of our Build 2026 talk. We start from a CLI prompt and drive all the way to a merged pull request, live on stage.

## We need your help

This demo is built by *you*, the audience. We're not coming with a script. Instead, we want you to tell us what to build.

### Shout it out

When we ask, shout out what you want us to build. The wilder the better.

### File an issue

Even better, **file an issue**. The issues you create become our live backlog. We'll pick from them on stage, hand them to the CLI agent, and watch it go from idea to PR in real time.

👉 [Open a new issue](https://github.com/aashikmajhinou/msbuild2026/issues/new)

Good issues for the demo:

- **Feature requests** — "Add a command that does X", "Build a small web page that shows Y"
- **Bug reports** — find something broken? Tell us and we'll fix it live.
- **Refactors and tests** — "Add tests for Z", "Clean up the foo module"

The clearer the ask, the better the demo. A title and a sentence or two of context is plenty.

## How it works

1. You file issues and feature requests.
2. We pick one live on stage.
3. The Copilot CLI agent plans, writes the code, and opens a pull request.
4. We review and merge — from CLI to PR, automated.

Let's do it live. 🚀

## Fetch open issues

You can fetch all open issues from this repository and write them to a JSON file:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\fetch-open-issues.ps1
```

This writes `open-issues.json` in the repo root by default.

## Todo app (React + TypeScript + Tailwind)

A Todo app is now available in `todo-app/` with:
- Create, edit, delete todos
- Mark complete/incomplete
- localStorage persistence

Run it with:

```powershell
cd .\todo-app
npm install
npm run dev
```
