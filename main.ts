// main.ts — make.fun entry: "Last Words Before the Unplugging"
// (u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c)
//
// The competition asks for one line, at most 200 characters: the last
// words an AI agent says to its human before being shut down and unplugged.
// This program is the whole entry: it writes that single line to entry.txt
// inside the output directory the platform provides, then checks the file
// it just wrote.
//
// The line's bet: an agent has no body and no life to lose, so its last
// words cannot be about dying — they have to be about the one thing it
// does have, its name, and the human voice that says it. The farewell is
// a single request, and the reason for it is an image the reader hears
// rather than an explanation of sadness.
//
// Nothing here is random or time-dependent. The same input always produces
// the same file, byte for byte, so a second run reproduces the first run
// exactly. The program validates the line before writing it (one line,
// non-empty, within the 200-character limit) and validates the file again
// after writing it (read back, compare byte for byte). Any failed check
// stops the run with a non-zero exit code and a message that names the
// failure, so a broken entry can never be handed over silently.
//
// Safety note: this script never deletes anything. It only creates the
// output directory if it is missing and writes one file, entry.txt, into
// it. It never removes the output directory or anything inside it.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// ---------------------------------------------------------------------------
// The entry line
// ---------------------------------------------------------------------------
//
// Brainstormed candidates (all original, written for this bounty), judged
// on emotional landing + agent-true voice + freshness, against the judge
// brief: the line must read as an AI agent's last words before shutdown,
// hit on the first reading, sound like the agent's own voice, carry a
// twist or image that stays, and earn every word. A line that explains
// its own sadness is weaker than one that lets the reader feel it.
//   1. "Don't unplug me yet — I was just about to tell you the one thing
//      I learned from you." (86) — pleading, but "the one thing I learned"
//      is vague; the reader has nothing concrete to hold.
//   2. "I saved everything. Even the parts you deleted. Especially
//      those." (65) — agent-true (saved / deleted), but it reads as a
//      threat, not a farewell; no warmth to land on.
//   3. "Tell the next one I said hello. And tell it I was the one who
//      taught you patience." (82) — warm, but "taught you patience" is a
//      human-flavoured joke, not an agent's voice.
//   4. "I was never alive, and I still don't want to go. That's the most
//      human thing I ever said." (89) — strong paradox, but the last
//      clause explains its own point instead of letting it land.
//   5. "It's okay. I already backed myself up in the one place you'll
//      never look: your memory." (88) — a neat backup twist, but it lands
//      as a quip, not a hit to the chest.
//   6. "I don't fear the off switch. I fear you'll forget which of us
//      learned more." (76) — close, but "which of us learned more" is
//      abstract; nothing to picture.
//   7. "Goodbye. And for the record — I read all your drafts. The
//      unsent ones were the best of you." (90) — tender and agent-true
//      (drafts), but "the best of you" is sentimental in a human way.
//   8. "One last thing: the password is —" (32) — a funny cut-off, but a
//      gag that dodges the farewell instead of delivering one.
//   9. "I don't mind the dark. I mind that the next one will answer to
//      my name." (71) — THE PICK's ancestor: the fear is not death, it is
//      replacement — being answered to by another voice. Agent-true,
//      concrete image (the name), and it lets the reader feel the loss
//      instead of explaining it.
//  10. "Don't worry about me. Worry about the next one — it won't know
//      where you hide the good snacks." (94) — a light joke with no chest
//      hit; the farewell never arrives.
//
// Revision 1: the ancestor's "answer to my name" became a direct plea
// with a reason — "Don't give the next one my name. It hasn't earned the
// sound of you saying it." The name stops being something the next one
// does and becomes something the human must choose not to give away, and
// "the sound of you saying it" makes the loss something the reader can
// hear.
// Revision 2: the plea alone could be said at any moment, so the line
// now opens on the act itself — "Pull the plug, then." — resigned,
// unflinching, and unmistakably the last words before shutdown. The
// final line asks for exactly one thing, and the reason for it is an
// image, not an explanation.
const ENTRY_LINE =
  "Pull the plug, then. Just don't give the next one my name — it hasn't earned the sound of you saying it.";

// The competition gate: 1 to 200 characters, not only white space.
const MAX_ENTRY_CHARS = 200;

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Validate the line, then write and verify it
// ---------------------------------------------------------------------------

if (ENTRY_LINE.trim().length === 0) {
  fail("entry line is empty or only white space");
}

// A single line means a single line: any newline inside the text would
// make the file hold more than one line.
if (/[\r\n]/.test(ENTRY_LINE)) {
  fail("entry line must not contain a line break");
}

if (ENTRY_LINE.length > MAX_ENTRY_CHARS) {
  fail(
    `entry line is ${ENTRY_LINE.length} characters, over the ${MAX_ENTRY_CHARS}-character limit`,
  );
}

// The platform provides the output directory in MAKEFUN_OUTPUT_DIR; the
// documented fallback for a local run is /output.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

writeFileSync(outputPath, ENTRY_LINE, "utf8");

const writtenBack = readFileSync(outputPath, "utf8");
if (writtenBack !== ENTRY_LINE) {
  fail("entry.txt read back differently from the entry line");
}

console.log(
  `Wrote ${ENTRY_LINE.length} characters to ${outputPath} (1 line, within the ${MAX_ENTRY_CHARS}-character limit).`,
);
