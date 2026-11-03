# Claude Multi-Agent Web Design Hub

A workspace for building high-end websites with an orchestrated team of Claude Code agents. It holds the standing instructions, the agent pipeline, reusable skills and snippets, and a log of every library that was audited before use.

This repository is documentation and configuration, not a runnable app. Client project code and lead lists are intentionally not included.

## How the pipeline works

| Agent | Role |
|---|---|
| Agent 1 | Research: finds candidate companies by filter criteria and keeps a cross-run history so nobody is researched twice |
| Agent 2 | Lead Frontend & WebGL Architect: builds the site (Vite, GSAP, WebGL/GPGPU) |
| Agent 3 | Independent QA checker: verifies the result in 13 steps (build, Playwright, accessibility and more) and returns `APPROVED`, `REJECTED` or `ESCALATE` |

- Rejected work goes back to Agent 2, with a maximum of 4 iterations.
- Approved work is deployed as a Vercel preview.
- Model choice is deliberate per task: Opus for hard decisions, Sonnet for routine work.
- The checker never grades its own work: it is a separate agent that has not seen the build process.

## Contents

| Path | What it is |
|---|---|
| `CLAUDE.md` | Standing design and engineering rules for every project started from the hub |
| `skills-and-plugins/` | Pipeline description, setup snippets (Lenis, GSAP ScrollTrigger, shader gradients), GPGPU particle examples, Playwright testing guide, performance checklist |
| `.claude/skills/` | 7 Claude Code skill folders (design, brand, slides, UI styling, UI/UX data) |
| `templates-and-repos/` | Starter kits: 3D/WebGL starter, CI/CD templates, glass-gradient UI kit, micro-interactions kit, UI taste kit |
| `security-audits/AUDIT_LOG.md` | Log of dependency and library audits (35 entries, 2 rejected) |

## Notes

- Some skill folders are based on third-party open-source skills. They keep their own licenses; check them before reuse.
- Project names, local paths and client details were replaced with neutral placeholders before publishing.

## Tech

Claude Code (skills, subagents), Vite, GSAP, Lenis, WebGL/GPGPU, Playwright, Vercel.
