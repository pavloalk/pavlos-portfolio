# Present mode copy — ToE case study

This file holds all the text shown in **Present mode** for `case-study-toe.html`, one section per slide, in the order they appear.

## How to use this file

Edit the copy here freely. **Do not touch the HTML yourself.** When you want the changes to go live, tell me explicitly:

- **"Update the HTML from the MD"** → I copy this file's copy into `case-study-toe.html`.
- **"Check the MD and make [change]"** → I edit this file only, and wait. I will **not** update the HTML until you separately say to update it.

**Rule for Claude:** Never edit `case-study-toe.html` from this file until Pavlos explicitly asks to update the HTML. A change to the MD is not permission to touch the HTML.

## How the fields map (for reference)

- **Title** and **Eyebrow** are shared with the live page (they come from the heading and its label). Changing them here will change the visible page too when synced.
- **Bullets** and **Card summaries** are present-only (they live in `data-present-bullets` and `data-present` attributes), so editing them only affects Present mode.
- **Card labels** are shared with the live page card headings.

---

## Slide 1 · Dialectica · Expert network

**Title:** Rebuilding expert onboarding at Dialectica to lower compliance risk across 25,000+ experts a month

**Bullets:**

- (say that we kept 90% completion rate with a more complex flow)
- Its whole purpose is data accuracy: an expert's background must be current before a consultation goes ahead
- At 25,000+ experts a month it's the front door to the product; I led the redesign end to end and built the design system from scratch

---

## Slide 2 · Context

**Title:** The flow verifies 25,000 to 35,000 experts a month before they take client calls

**Bullets:**

- Experts arrive by secure link to review their experience and set the hours they're free for calls
- The flow exists for one reason: keeping each expert's background current before a consultation
- A later step, Profile Boost, also captures structured category and vendor data, redesigned in v2 below

---

## Slide 3 · Problem area

**Title:** The data Dialectica most needed verified was the easiest to scroll past

**Cards:**

- **Status quo:** Every expert passes through before a client call, but the Tutorial and Questionnaire arrived as separate emails and current experience blended into a crowded page.
- **If nothing changed:** Experts keep reaching calls on unconfirmed experience and compliance steps they skimmed in isolation. At this volume that is a standing business risk.
- **Desired outcome:** One guided flow where compliance steps are reviewed together and matching data is captured in the same place, so completion holds.

---

## Slide 4 · Research

**Title:** Walking through the flow showed the problem was structure, not expert effort

**Bullets:**

- Completion data showed where experts dropped off; walking the flow with my researcher showed why
- The issues clustered around structure: no clear hierarchy, blurred experience, key steps outside the flow
- The effect: an expert could finish without ever engaging with the data the business depended on

---

## Slide 5 · Design decisions

**Title:** Four changes to get compliance-critical data reviewed, without hurting completion

**Bullets:**

- Four changes, each standing on its own and mapping back to the problem
- All sit inside one structural move: two flat tabs rebuilt into a three-step sidebar with sub-steps

---

## Slide 6 · Decision 1

**Title:** Current experience got its own section, first in the flow

**Cards:**

- **Before:** Personal details, experience and legal terms shared one crowded page, so current experience had no more weight than anything around it.
- **After:** The Experiences sub-step opens with current position first, past positions below, and personal details moved to the bottom.
- **Why:** The headline compliance move. Weight follows importance, and accurate profiles are what let Dialectica match experts to the right project.

---

## Slide 7 · Decision 2

**Title:** The Compliance Tutorial and Questionnaire moved inside the flow

**Cards:**

- **Before:** The Tutorial and Questionnaire reached experts as separate emails, read as side admin and handled in isolation.
- **After:** Both became dedicated sub-steps of Getting Started, each with one job and one confirm, in a single guided sequence.
- **Why:** Eligibility is the other half of what must be true before a call. Single-purpose steps kept momentum without denting completion.

---

## Slide 8 · Decision 3

**Title:** Availability slots became editable in place, not delete-and-redo

**Cards:**

- **Before:** Availability was already a weekly calendar, but slots were fixed. Fixing a time meant deleting it and rebuilding from scratch.
- **After:** Slots became editable in place. Experts drag to move a slot, or click to open a side menu and edit it fully.
- **Why:** Availability is what lets Dialectica schedule the call, so lowering effort here has a direct operational payoff.

---

## Slide 9 · Decision 4

**Title:** Experts pick categories and vendors from a shortlist instead of typing them

**Cards:**

- **Before:** Category and vendor data was chased over email after experts had moved on, so few ever gave it.
- **After:** It became Profile Boost, a skippable in-flow step: pick product categories from a shortlist, then the vendors behind them.
- **Why:** Matching depends on structured detail. Capturing it while experts are engaged, by selecting not typing, got richer data.

---

## Slide 10 · Outcome

**Title:** HotJar recordings and associate feedback confirmed the flow held up

**Visual:** `[Present] Outcome.png` — the five outcome cards.

**Bullets:**

- ~90% completion, maintained even with more mandatory steps
- Less bad calls: experts spent longer on the experience page and sent more requests to update it, seen in HotJar
- Lowered operational cost: associates gave positive feedback, no more juggling separate emails for terms, compliance, questionnaire and Profile Boost
- +4% availabilities: more experts set the hours they're free for calls
- ~33% Profile Boost conversion: richer category and vendor data for Dialectica's future projects

---

## Slide 11 · Experiment

**Title:** Moving Terms to the end lifted the metric we were chasing and hurt the one that pays

**Visual:** `[Present] Experiment.png` — the shipped and tested orders compared, with the +20% / -10% deltas.

**Cards:**

- **+20%:** Profile Boost completion in the test
- **-10%:** Terms signing, the step the business earns from

---

## Slide 12 · Earlier exploration

**Title:** Inline experience editing, designed then cut

**Bullets:**

- Experts were first meant to edit their experience inline, with a single confirm checkbox
- That needed a full review layer for associates to vet every change, not justified at this volume
- The shipped flow used a lighter "Request a change" path; showing the cut concept makes the scope call visible

---

## Slide 13 · Profile Boost from v1 to v2

**Title:** A ready list of categories and vendors meant experts never started from zero, and conversion roughly doubled

**Bullets:**

- v1 was the first in-flow version: experts typed products and vendors as free text
- An exploration folded it into the same step through a per-company "Boost your profile" modal
- v2 became the two shortlisted steps, picking not typing, which roughly doubled uptake
