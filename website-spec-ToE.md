# Terms of Engagement, Website Build Spec

*Handoff doc for the website session. Read this first, then pull copy from `output.md`. Purpose: turn four overlapping course chapters into one linear page, told once. Visual direction comes from the existing skeleton UI, not this file.*

*Rule from the project: don't invent facts or metrics. Items marked **PENDING** or **FROM PAVLOS** are not settled yet, flag them rather than filling them in.*

---

## 1. Page metadata (header block)

Model it on the Velvet header line. Sourced from `brief-ToE.md`.

- **Title:** Rebuilding expert onboarding at Dialectica to lower compliance risk across 25,000+ experts a month
- **Company:** Dialectica (expert network)
- **Role:** Sole designer, led all research and visual design; also built a small Design System from scratch on a new visual language
- **Team:** Cross-functional, PM and engineers
- **Platform:** Web
- **Tools:** Figma
- **Timeline:** Redesign launched 1 May 2025. Post-launch data runs May 2025 to Mar 2026. *(PENDING: project start / design duration not confirmed.)*

---

## 2. Page section order (told once)

| # | Section | Canonical copy source | Notes |
|---|---------|----------------------|-------|
| 1 | Hero + metadata | Title from 5.3, header block above | |
| 2 | Context | 5.3 · Context description | The one-flow, 25k to 35k/month setup |
| 3 | Problem area | 5.4 · Opportunity statement (status quo / if nothing changed / desired outcome) | Business-strategy framing, not a user-pain fix. Keep numbers out here; they live in Outcome |
| 4 | Research | 5.3 · Research description | Heuristic review + data review |
| 5 | Design changes (4) | **5.5 · Change 01–04** (richest copy) | Each: Before / After / Why + before-after visual. Tell these ONCE here |
| 5a | Deep pocket 1 | 5.5 · Deep pocket 1 (inline editing, cut) | Nest under Change 01 |
| 5b | Deep pocket 2 | 5.5 · Deep pocket 2 (Profile Boost v1 to v2) | Nest under Change 04 |
| 6 | Experiment (rolled back) | 5.5 · "The experiment we ran and rolled back" | Terms moved to end; +~20% Profile Boost, -~10% Terms signing |
| 7 | Outcome | 5.3 · Outcome description | Flat ~90% completion; the headline result |
| 8 | Retrospective | **5.6** (four parts: you / process / users / business) | Users part carries the confirmed numbers; don't re-describe the four changes, reference them by name |

Canonical rule: where 5.3, 5.5 and 5.6 cover the same change, **5.5 wins for the change body**, **5.6 wins for the retrospective**, **5.3 supplies framing lines only** (Context, Research, Outcome). This is what stops the page repeating the four changes three times.

---

## 3. Image manifest

All files in `Images/`. Filenames contain spaces and brackets, rename to web-safe slugs (e.g. `getting-started-1-1-experiences.jpg`) or URL-encode before use.

| Slot | File | Role | Status |
|------|------|------|--------|
| Problem area | `Old ToE.jpg` | "Zoom out" of the old flow | **PENDING annotations from Pavlos**: (1) the two flat tabs, (2) current experience sitting undifferentiated. Don't ship un-annotated |
| Change 01 (after) | `Getting started [1.1]_ Experiences.jpg` | Current experience isolated at top | Ready |
| Change 02 (after) | `Getting started [1.4]_ Tutorial.jpg`, `Getting started [1.3]_ Questionnaire.jpg` | Tutorial + Questionnaire as sub-steps | Ready. Also `[1.2]_ ToE.jpg` shows the Terms sub-step if a third is wanted |
| Change 03 (after) | `Availabilities.jpg` | Editable weekly calendar | Ready. Ideal would be a short capture of a slot being dragged (**FROM PAVLOS** if wanted) |
| Change 04 (after, shipped v2) | `KM v2 _ Categories - Selected categories.png`, `KM v2 _ Vendors - Selected vendors.png` | Two-step shortlist select | Ready |
| Deep pocket 1 | `[Deep] Editable experience.png` | Cut inline-edit concept | Ready |
| Deep pocket 2 | `[Deep] Boost profile - Filled.png` (v1), `[Deep] Getting started.png` + `[Deep] Getting started - Modal.png` (combined-step variation) | v1 and the layout exploration | Ready |

**Before images gap:** the only genuine "before" asset is `Old ToE.jpg`. Changes 01 to 04 have "after" screens but no matching "before" screenshots in the folder. Either present them as after-only, or **FROM PAVLOS**: source the old-flow screens if true before/after pairs are wanted.

---

## 4. Confirmed metrics (safe to render)

- Scale: 25,000 to 35,000 experts a month
- Completion: ~90% before (Jan–Apr 2025 avg) and ~90% after (May 2025–Mar 2026 avg), flat
- Availability: share submitting availability rose ~4 percentage points, ~70% to ~74%
- Profile Boost v1 to v2: conversion ~17% to ~33%; ~6.5 vendors and ~3.4 categories per expert, up from 4.2 and 2.0
- Experiment: Profile Boost +~20%, Terms signing -~10% (25% of experts, two weeks)

**Do not fabricate:** the pre-redesign rate of experts with outdated/unconfirmed current experience is unmeasured. Leave it as a qualitative claim unless a real proxy is supplied.

---

## 5. Strip before rendering

`output.md` contains scaffolding that is not case-study copy. Do not render:

- Status blockquotes (`> ✅ Done...`, `> Updated 2026-07-18...`)
- Process/parenthetical notes aimed at the writing workflow
- The `<details>` "Other proposals considered" title alternates (use the selected title only)
- The italic `*Visual: ...*` notes (these are placement instructions for you, not caption copy)

---

## 6. Open items to resolve with Pavlos

- `Old ToE.jpg` annotations (blocks the Problem-area visual)
- Project start date / design duration for the metadata timeline
- Whether before/after pairs are wanted for Changes 01 to 04 (only Old ToE exists today)
- Optional drag capture for the Availabilities visual
