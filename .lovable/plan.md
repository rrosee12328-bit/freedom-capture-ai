# Make the copy pop with color (Wynbrooke-style, on light)

Borrow the reference page's technique — one saturated accent doing all the emphasis work — but keep the current light Vektiss look. Accent stays Vektiss Blue (#2563eb).

## What changes

**Emphasis system (new, reusable)**
- `<Hl>` — key words in accent blue, bold.
- `<Mark>` — marker highlight: soft blue block behind a phrase with slight rounding and a tiny rotation, like a real highlighter swipe.
- `<Uline>` — thick accent underline swipe sitting behind the text baseline.
Each is a small text component so any phrase in the copy can be wrapped.

**Applied across the funnel**
- Hero headline: the core promise phrase in accent blue instead of flat black.
- Sub-headline and opening story: one marker-highlighted phrase per block, not more — the pop only works if it's rare.
- Problem / Why This Is Different: the contrast lines get colored key words; the single sharpest claim per section gets the underline swipe.
- Benefits checklist: outcome numbers and result words in accent.
- Guarantee + closing urgency: marker highlight on the promise line.
- FAQ answers: key words colored, no highlights (keeps the page from getting noisy).

**CTA buttons**
- Every "Apply Now" gets the glowing treatment: accent fill, soft blue glow ring beneath, subtle lift on hover — same energy as the reference button, in blue.

**Rhythm**
- Alternating section backgrounds (near-white / white) so highlighted text sits on varied surfaces and blocks read as distinct.

## Technical notes

- New tokens in `src/styles.css`: `--highlight` (translucent accent wash), `--underline-accent`, and a `--shadow-glow` for the CTA. New `@utility` rules `mark-hl`, `uline-hl`, and `btn-glow`.
- New `src/components/Emphasis.tsx` exporting `Hl`, `Mark`, `Uline`.
- `src/routes/index.tsx` updated to wrap chosen phrases — copy text itself is unchanged, only markup around it.
- CTA styling applied to the existing Apply buttons in `index.tsx`; `ApplyDialog.tsx` submit button gets the same glow.
- No changes to form logic, scoring, Calendly routing, or the VSL embed.
