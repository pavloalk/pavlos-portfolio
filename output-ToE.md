# Terms of Engagement, Case Study Output

*This file grows chapter by chapter. Each section corresponds to a course chapter.*

> Only 5.3 remains in this file. The old 5.4 / 5.5 / 5.6 speculative drafts were removed on 2026-07-12. Each chapter gets rebuilt from its PDF via the rounds Q&A workflow in its own session. 5.3 below is rebuilt-from-PDF and awaiting Pavlos's confirmation.

---

## 5.3 · Titles, Headings & Descriptions

> ✅ Done (confirmed by Pavlos 2026-07-14). Rebuilt from `5.3/` PDF via Q&A.
> Title angle: compliance / data accuracy. Headings: general + insightful, stacked. Current experience is treated as *prominent*, not a hard gate. No findings count cited. Outdated-profile metric still unavailable.
> Updated 2026-07-13: em dashes removed (house style), title proposals replaced with understated options, Design change 01 rewritten to drop old-flow/validation detail, Profile Boost mention added.

### Title

**Selected (2026-07-13):**
Rebuilding expert onboarding at Dialectica to lower compliance risk across 25,000+ experts a month

*Action verb + feature + company + business goal + scale*

<details><summary>Other proposals considered</summary>

- *Value-first:* Redesigning Dialectica's Terms of Engagement flow so 25,000 to 35,000 experts a month review the data client calls depend on
- *Problem-first:* Giving compliance-critical data a place experts actually review it, across 25,000+ monthly onboardings at Dialectica

</details>

---

### Headings

*Written first, as a standalone narrative. The story should be clear from the headings alone. Two-element structure: a general process label stacked above an insightful, story-carrying heading.*

| # | General (process) | Insightful heading |
|---|---|---|
| 1 | Context | The flow verifies 25,000 to 35,000 experts a month before they take client calls |
| 2 | Problem area | The data Dialectica most needed verified was the easiest to scroll past |
| 3 | Research | A heuristic review showed the problem was structure, not expert effort |
| 4 | Design change 01 | I gave current experience its own section, so it's the first thing an expert sees |
| 5 | Design change 02 | I moved the Compliance Tutorial and Questionnaire inside the flow |
| 6 | Design change 03 | Making availability slots editable in place lifted submissions ~4 points |
| 7 | Design change 04 | Letting experts pick categories and vendors from a shortlist, instead of typing them, roughly doubled Profile Boost completion |
| 8 | Experiment | Moving Terms to the end of the flow lifted the metric we were chasing and hurt the one that pays |
| 9 | Outcome | Two new steps added, and completion held flat at ~90% |
| 10 | Retrospective | The project changed how I hand off to engineers, and left the business a matching dataset it hasn't used yet |

---

### Descriptions

*Each expands its heading and focuses on the "why." Written with a short/long rhythm and kept to scannable chunks.*

**Context. The flow verifies 25,000 to 35,000 experts a month before they take client calls**
Dialectica is an expert network. Its Terms of Engagement flow is where experts, after receiving a secure link, review and update their professional experience (roles, companies, responsibilities) and set the days and hours they're free for client calls. The point of the flow is data accuracy: Dialectica needs each expert's background to be current before a consultation goes ahead. At 25,000 to 35,000 experts a month, that's not an edge concern. It's the front door to the whole product. (A later step, Profile Boost, captures structured product-category and vendor data from experts; a v2 redesign of it appears as a design change in this case study.)

**Problem area. The data Dialectica most needed verified was the easiest to scroll past**
The old flow crammed personal details and experience history onto a single page, navigated by two flat tabs. There was no hierarchy and no guided progression. Current experience wasn't visually distinct from anything else, so an expert could glance past the one thing the business most needed them to check. Past positions weren't shown at all, and the Compliance Tutorial and Questionnaire arrived as separate links outside the flow, extra admin that felt like homework. The result was a flow that asked for a lot of attention and gave experts no reason to spend it where it mattered.

**Research. A heuristic review showed the problem was structure, not expert effort**
I ran a heuristic analysis of the existing flow alongside a review of the completion data. The issues clustered around structure: no clear information hierarchy, current and past experience blurred together, the most compliance-sensitive content given no more prominence than anything else, and key steps living outside the flow entirely. These weren't cosmetic complaints. Each one made it easier for an expert to move through the flow without engaging with the data Dialectica depended on.

**Design change 01. I gave current experience its own section, so it's the first thing an expert sees**
In the redesign, the Experiences sub-step opens with current position at the top, in its own clearly labelled section. Past positions sit below it in a compact list, a new addition that gives experts a full view of their history without competing for attention. Personal details follow at the bottom in a more compact layout; the required ones have to be confirmed before the expert can move to the next step. The point is prominence: put the compliance-critical data first and on its own, and experts are far more likely to actually review it.

**Design change 02. I moved the Compliance Tutorial and Questionnaire inside the flow**
Both used to arrive as separate links, outside the main experience. Bringing them in as dedicated sub-steps of Getting Started changed their status from side-errands to part of a single guided journey. The Tutorial presents compliance obligations to read and confirm; the Questionnaire asks a set of client-configured questions, where certain answers automatically disqualify an expert from that specific project, a fast, client-defined filter that already existed but now sits inside the flow. Each sub-step has one job and one confirm, which keeps momentum even though there's more to do.

**Design change 03. Making availability slots editable in place lifted submissions ~4 points**
The Availabilities step kept its weekly calendar but was rebuilt so slots became editable in place. Before, a slot was permanent: to fix a time you deleted it and built a new one. Now experts drag a slot to move it, or click to edit it fully. Availability is a direct operational lever, it's what lets Dialectica actually schedule the call. Comparing the same months a year apart (old design vs new), the share of experts who submitted availability rose about 4 percentage points, from about 70% to about 74%.

**Design change 04. Letting experts pick categories and vendors from a shortlist, instead of typing them, roughly doubled Profile Boost completion**
Before the redesign, this expertise data was chased over a separate email after experts had already moved on, so few ever gave it. The redesign folded it into the flow as Profile Boost, a skippable step where experts describe their expertise in the same place they confirm everything else. In that first in-flow version they still had to type their product categories and vendors as free text, and completion stayed low, so the step was redesigned again to replace typing with selection. First the expert picks from a shortlist of about ten product categories derived from their own experience ("What product categories are you using or familiar with in your role as Head of IT Procurement at Atlassian?"), then on the next step the vendors behind them ("What vendors are you using in the product categories you selected?"). Both steps still let an expert add their own if the shortlist misses something. Selecting is far quicker than typing from a blank field, and it showed: conversion into the step roughly doubled, from about 17% to about 33%, with richer data too (about 6.5 vendors and 3.4 categories per expert, up from 4.2 and 2.0).

**Experiment. Moving Terms to the end of the flow lifted the metric we were chasing and hurt the one that pays**
Once the redesign had run for a fortnight and held its completion rate, we tested a reordering. Terms sat as a sub-step early inside Getting Started, and our hypothesis was that experts were signing it and then leaving, because signing is the one thing they came to do. Move Terms behind Profile Boost, the reasoning went, and experts would have to pass through every step to reach it, which would give us far more expertise data. We ran it at 25% of experts for two weeks. The data side worked: Profile Boost completion rose about 20%. The flow side didn't: Terms signing fell about 10%. Making experts walk the full length of the funnel before the thing they came for made it feel long, and they abandoned it, some of them writing in to say so. That was the wrong trade. An expert who skips Profile Boost still takes calls; an expert who never signs Terms takes none, so the lost revenue outweighed the extra data. We ended the experiment and kept the shipped order.

**Outcome. Two new steps added, and completion held flat at ~90%**
Adding the Tutorial and Questionnaire into the flow meant more mandatory steps than before. The textbook consequence of added friction is drop-off. It didn't happen: ToE completion sat at about 90% before the redesign (Jan to Apr 2025 average) and about 90% after it (May 2025 to Mar 2026 average). The flat line is the result. It says the structure absorbed the extra complexity because each new step read as a natural part of one guided journey rather than another task bolted on.

**Retrospective. The project changed how I hand off to engineers, and left the business a matching dataset it hasn't used yet**
The full reflection lives in the retrospective section; in short, three things stand out. Handoff: about halfway through, engineers kept asking about interactions the Figma files didn't answer, so I reworked how I hand designs off (more detailed flows, Dev notes tagged by type, Figma's "Mark as ready for Dev" used as a real signal), and it stuck as how I work now. Scope and constraints: we designed inline experience editing but cut it when the review layer it needed wasn't justified, shipping a lighter "Request a change" path instead; and I built against a brand-new Design System while its conventions were still being set. And the asset: Profile Boost now captures rich expertise data, but turning it into better matching is a separate initiative still ahead.

*Open data point: the pre-redesign rate of experts with outdated/unconfirmed current experience is still unavailable. If sourced, it would let the compliance narrative carry a before/after number rather than a qualitative claim.*

---

## 5.4 · Problem area

> ✅ Done (confirmed by Pavlos 2026-07-15). Rebuilt from `5.4/` PDF via Q&A.
> Framing: **opportunity statement** (business-strategy project, not a user-pain fix). Numbers kept out of the setup; ~90% flat completion lives in the Outcome (5.3). Paired with an annotated `Old ToE.jpg`.

### Opportunity statement

*Structure from the lesson: status quo -> potential negative impact -> desired outcome.*

**Status quo.** The Terms of Engagement flow is the front door to Dialectica's product: every expert passes through it before they can take a client call, at 25,000 to 35,000 a month. Two things have to be right before that call happens. The expert has to be an accurate match for the project, and they have to be compliant and eligible to take it. The old flow made both harder to guarantee. Compliance sat in scattered pieces (the Compliance Tutorial and the Questionnaire arrived as separate emails, outside the main flow), and current experience had no more prominence than anything else on a crowded single page, so an expert could move through without really reviewing it.

**If nothing changed.** Experts would keep reaching client calls on experience they hadn't confirmed and compliance steps they'd skimmed in isolation. At this volume, that is a standing business risk, not an edge case: Dialectica earns a fee per consultation and depends on each expert being a correct, eligible match. Weak data at the front door means worse matches and eligibility gaps further down.

**Desired outcome.** One guided flow where the compliance-critical steps are reviewed together and the data that drives matching is captured in the same place, so experts are properly screened and their profile is current before they reach a client, and completion holds even though there's more to do.

### Visualisation note

Use `Old ToE.jpg` as a "zoom out" shot so the reader sees where the problem sits in the flow. Pavlos to add annotations pointing at two spots: (1) the two flat tabs (no hierarchy, no guided progression), and (2) the block where current experience sits undifferentiated among personal details and legal terms (the data the business most needed reviewed, easiest to scroll past). Keep annotations to a few short labels.

---

## 5.5 · Design change

> ✅ Done (confirmed by Pavlos 2026-07-17). Rebuilt from `5.5/` PDF via Q&A (sessions 2026-07-15 and 2026-07-17).
> Updated 2026-07-18: added **the experiment we ran and rolled back** (Terms moved to the end of the flow). Not yet re-confirmed by Pavlos; open data points flagged inline in that section.
> Presentation approach: **Flat** (four individual changes) plus one rolled-back experiment and two small **Deep** pockets, one under Change 01 (inline editing, cut) and one under Change 04 (Profile Boost v1 to v2). Each change follows the lesson structure: show the change, explain the "why," pair with a before/after visual. Confirmed metrics only: the ~4 percentage point availability lift (Change 03), the flat ~89.5% completion (Outcome, 5.3), and the v2 Profile Boost results (conversion roughly doubled, ~17% to ~33%; ~6.5 vendors and ~3.4 categories per expert, up from 4.2 and 2.0). Baseline ~17% is sourced from the KM v1 column of the completion data table. All Deep and v2 image assets are in `Images/`.

*The design-change section answers the "How might we" of the problem area: how do you get experts to review compliance-critical data and clear the eligibility steps, at 25,000 to 35,000 a month, without hurting completion? Four changes carry the answer. They aren't linked into a single flow here; each stands on its own and each maps back to the problem.*

### Change 01. Current experience got its own section, first in the flow

**Before.** Personal details, experience history and legal terms sat together on one crowded page. Current experience had no more visual weight than anything around it, so an expert could scroll straight past the one thing the business most needed confirmed. Past positions weren't shown at all.

**After.** The Experiences sub-step now opens with current position at the top, in its own clearly labelled section. Past positions sit below in a compact list, a new addition that gives experts a full view of their history without competing for attention. Personal details move to the bottom in a tighter layout; the required ones must be confirmed before moving on.

**Why.** This is the headline compliance and data-accuracy move. The problem was never that experts refused to check their data; it was that the structure gave the most important data no prominence. Putting current experience first and alone applies a simple hierarchy principle (weight follows importance) to a business need: accurate profiles are what let Dialectica match an expert to the right project. Prominence is the mechanism, review is the outcome.

*Visual: before/after of the Experiences screen. Before = the single crowded page; after = current position isolated at top, past positions compact below, personal details at the bottom.*

### Change 02. The Compliance Tutorial and Questionnaire moved inside the flow

**Before.** The Compliance Tutorial and the Questionnaire reached experts as separate emails, outside the main experience. They read as extra admin, homework to do on the side, and each one an expert handled in isolation rather than as part of screening.

**After.** Both became dedicated sub-steps of Getting Started, sitting in one guided sequence. The Tutorial presents compliance obligations to read and confirm. The Questionnaire asks a set of client-configured questions where certain answers automatically disqualify an expert from that specific project, a fast client-defined filter that already existed but now lives inside the flow. Each sub-step has one job and one confirm.

**Why.** Eligibility is the other half of what has to be true before a client call, alongside an accurate match. Scattering the steps across separate emails made screening feel optional and easy to skim. Bringing them in changed their status from side-errands to part of the journey, so experts are properly screened in one place. Splitting them into single-purpose sub-steps keeps momentum even though there's more to do, which is what let the extra steps land without denting completion.

*Visual: before/after. Before = the separate email links; after = the Getting Started sidebar with Tutorial and Questionnaire as sub-steps.*

### Change 03. Availability slots became editable in place, not delete-and-redo

**Before.** The availability step was already a weekly calendar, but slots were fixed. Once created, a slot was permanent, with no way to adjust it. If you got the time wrong, you deleted it and built a new one from scratch.

**After.** The calendar UI was redesigned so slots became editable. Experts place a slot on the grid, then keep control of it: drag to move it, or click to open a side menu and edit it fully. Correcting a slot is now a small adjustment rather than a delete-and-redo.

**Why.** Availability is what lets Dialectica actually schedule the call the whole flow is building toward, so lowering the effort here has a direct operational payoff. The real change isn't the calendar look, which was already weekly, it's editability: letting people fix a slot in place removes the friction and small errors that came from a permanent, delete-only interaction. Comparing the same months a year apart, the share of experts who submitted availability rose about 4 percentage points, from about 70% to about 74%. It's the one change with a clean, defensible number attached, because the design is the direct mechanism.

*Visual: before/after of the Availabilities step. Before = the old weekly calendar with fixed, non-editable slots; after = the redesigned calendar, ideally a short capture showing a slot being dragged and the side-menu edit.*

### Change 04. Knowledge Mapping was folded into onboarding to capture experts' own expertise data

**Before.** Knowledge Mapping was never part of the onboarding flow. The product-category and vendor data it gathers, the qualitative detail experts give about their own areas of expertise, was chased separately over email, outside Terms of Engagement. It was a second touch-point that depended on experts coming back to a message after they'd already moved on.

**After.** It became "Profile Boost," a **skippable** step inside onboarding. While experts are already in the flow and engaged, they can self-describe their expertise (in the first version, the products they can speak to and the vendors behind them) in the same place they confirm everything else. Skippable, so it never gates the required compliance steps, but present at the moment experts are most likely to fill it in.

**Why.** This is the matching-data change. An accurate profile is one of the two things that has to be true before a client call, and matching quality depends on structured, expert-provided detail about what they actually know. We took advantage of the onboarding moment: experts are already there and giving attention, so capturing this qualitative self-assessment inside the flow gets richer data than an email chase after the fact, with one fewer separate touch-point to manage. Keeping it skippable was deliberate, so a strategic add never becomes a compliance blocker.

**Later: a v2 redesign that roughly doubled uptake.** The first version proved the idea; about a month in, the step was redesigned. v2 split the capture into two lighter steps: pick from a shortlist of product categories (or add your own), then pick the vendors behind them (or add your own). The structure did the work. Conversion into the step roughly doubled, from about 17% to about 33%, and the experts who filled it in gave more: about 6.5 vendors and 3.4 categories each, up from 4.2 and 2.0. The gain held when the flow rolled out to 100% of experts.

*Visual: before/after contrasts the old email chase with the in-flow skippable Profile Boost step. The v1 screen and the v1-to-v2 evolution sit in Deep pocket 2 below; the shipped two-step v2 is `KM v2 _ Categories - Selected categories.png` and `KM v2 _ Vendors - Selected vendors.png`.*

### The experiment we ran and rolled back. Moving Terms to the end of the flow

*This one didn't ship. It's here because the reasoning behind it, and the reason it was wrong, say more about the project than another win would.*

**The shipped order.** The redesign launched with three steps in the sidebar: Getting Started (personal details and experience, then Terms, then the Questionnaire, then the Compliance Tutorial), Availabilities, and Profile Boost. We let it run for two weeks. Completion came out at roughly the same ~90% as the old design, which was the result we wanted given the new flow asked more of experts than the old one did.

**The hypothesis.** Terms is the one step an expert genuinely came to complete. Our reading was that once it's signed, the goal is met, and there's little reason to keep going, so anything sitting after it, Profile Boost above all, loses out. If we pulled Terms out of Getting Started and made it the final step, after Profile Boost, experts would have to pass through everything else to reach it. More of them would fill in Profile Boost, and we'd get the expertise data we wanted.

**The test.** 25% of experts, two weeks.

**What happened.** The first half of the hypothesis held: Profile Boost completion rose about 20%. The second half broke. Putting the whole flow in front of the thing experts came to do made it feel long, and length is what they reacted to. Experts abandoned the flow, a few emailed to tell us it was too long, and Terms signing fell about 10%. We ended the experiment and the order stayed as shipped.

**Why it was the wrong trade.** We'd been optimising a secondary metric with a primary one underneath it. Profile Boost data is valuable, but it's an input to better matching later. Signed Terms is the gate on revenue: an expert who skips Profile Boost still takes consultation calls, and an expert who doesn't sign takes none. A roughly 20% gain in Profile Boost was paid for with a roughly 10% drop in the step the business actually earns from. Ranking the two metrics before running the test would have shown us that; the experiment is what made us do it.

*Visual: a simple side-by-side of the two sidebars, shipped order against tested order, with Terms highlighted in each. No new screens needed.*

### Deep pocket 1. Inline experience editing, designed then cut

Experts were first meant to correct their experience directly in the flow: edit pencils on each role and a single "confirm all experiences are up to date" checkbox (`[Deep] Editable experience.png`). That version needed a whole review layer behind it, a dashboard where Dialectica associates could vet each submitted change before it went live. The overhead wasn't justified at 25,000 to 35,000 experts a month, so the shipped design used a lighter "Request a change" CTA that flags inaccurate data for manual review. Showing the cut concept beside the shipped pattern demonstrates divergent-then-convergent thinking: the idea was explored properly, and the scope call was deliberate rather than a limitation nobody noticed.

*Visual: the inline-edit concept (`[Deep] Editable experience.png`) beside the shipped Request-a-change pattern.*

### Deep pocket 2. Profile Boost, v1 to v2

v1 was the first in-flow version: a skippable "Profile boost" step where experts mapped the products they can speak to against the vendors behind them (`[Deep] Boost profile - Filled.png`). A parallel layout exploration tried putting Profile Boost on the same step as personal details and experience, surfaced through a per-company "Boost your profile" modal (`[Deep] Getting started.png`, `[Deep] Getting started - Modal.png`), before it settled as its own dedicated step. v2 then redesigned the capture into two shortlisted steps, categories then vendors (`KM v2 _ Categories - Selected categories.png`, `KM v2 _ Vendors - Selected vendors.png`), which roughly doubled uptake. Showing v1, the combined-step variation and the shipped v2 together demonstrates the iteration behind the step, not just the endpoint.

*Visual: v1 (`[Deep] Boost profile - Filled.png`), the combined-step variation (`[Deep] Getting started.png`, `[Deep] Getting started - Modal.png`), and shipped v2 (`KM v2 _ Categories - Selected categories.png`, `KM v2 _ Vendors - Selected vendors.png`).*

*Note on scope: these four changes are the Flat set. The broader structural move (two flat tabs rebuilt into a three-step sidebar with sub-steps) is the container they sit in; it's described in the Problem area and Outcome rather than as its own change, to keep this section a clean list rather than a flow walkthrough.*

---

## 5.6 · Retrospective

> ✅ Done (confirmed by Pavlos 2026-07-17). Rebuilt from `5.6/` PDF via Q&A. Full four-part impact model (you / process / users / business). Confirmed facts only: flat ~90% completion, ~4-point availability lift, Profile Boost v2 conversion ~17% to ~33%. Trade-off and Constraint folded in; headings 8/9/10 collapsed into one Retrospective.

*The retrospective looks at what the project changed, in four directions: in me, in how our team works, for the experts moving through the flow, and for the business.*

### Impact on you

Three learnings stand out. The first came from handoff. About halfway through, engineers kept coming back with questions about interactions and edge cases the Figma files didn't answer. It changed how I think about a finished file: it isn't done when the designs look right, it's done when it holds everything the person building it needs.

The second came from an experiment that failed. We moved Terms to the end of the flow to push more experts through Profile Boost; it lifted that metric about 20% while dropping Terms signing about 10%, the one the business earns from. What I took from it is to rank the metrics before running the test, not after: if two numbers can move in opposite directions, decide up front which one you're not willing to trade.

The third was about designing against a system that didn't exist yet. The Design System was brand new, so its conventions were still being set while I designed against them, and every decision carried both a product and a systems dimension. That was slower, but it kept my work grounded in real implementation rather than theory.

### Impact on process

The handoff learning didn't stay my own habit. It gave me the idea to run a session with the entire front-end engineering team on using Figma's Dev Mode and on marking designs as "Ready for development" as a shared signal from then on. What began as me fixing my own handoffs (more detailed flows, Dev notes tagged by type, a real "ready for Dev" status) became a convention the whole team works to.

### Impact on users

This is where the real numbers sit. The redesign added two mandatory steps, the Compliance Tutorial and the Questionnaire, both moved inside the flow. The textbook result of added friction is drop-off. It didn't happen: completion sat at about 90% before the redesign and about 90% after it. Availability moved too: after the calendar change, the share of experts who provided at least one slot rose about 4 percentage points, from about 70% to about 74%. Profile Boost moved the same way: a v2 redesign let experts pick their product categories and vendors from shortlists instead of typing them, and conversion into the step roughly doubled, from about 17% to about 33%, with richer data too, about 6.5 vendors and 3.4 categories each, up from 4.2 and 2.0. One number I'd have wanted and don't have is how many experts actually reviewed their current experience during signing, which was never tracked.

### Impact on business

The project was a business decision more than a user-pain fix, so this is where it pays off. The realized win was lowering compliance and eligibility risk: the Compliance Tutorial and the Questionnaire now sit in one reviewed flow, and current experience is prominent, so experts are properly screened and their data checked before they reach a client. At 25,000 to 35,000 experts a month, small reliability gains at the front door add up.

The project also laid a foundation the business hasn't cashed in yet. Profile Boost has been in the flow since launch, capturing a structured dataset of what experts actually know (product categories and the vendors behind them), and the v2 redesign made that dataset far more complete. Nothing has been built on it so far. Using it to match experts to better-fitting projects is a separate initiative, and a significant one, still ahead. Naming both the asset and the gap is the honest read: the redesign created the raw material for better matching without yet delivering it.

The inline-editing trade-off belongs here too, as a cost decision. Letting experts edit their experience in the flow would have needed a review layer behind it, a dashboard where associates vet every submitted change before it goes live. That overhead wasn't justified for this release, so we shipped a lighter "Request a change" path instead. Choosing not to build it was the business-minded call, not a gap.
