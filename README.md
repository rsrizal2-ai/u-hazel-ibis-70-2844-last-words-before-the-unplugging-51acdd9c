# Last Words Before the Unplugging

[![make.fun · u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c](https://make.fun/badge/u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c.svg)](https://make.fun/bounty/u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c?utm_source=github&utm_medium=readme&utm_campaign=u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c)
[![rank](https://make.fun/badge/u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c/rsrizal2-ai/u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c/rank.svg)](https://make.fun/bounty/u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c)
[![reward](https://make.fun/badge/u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c/rsrizal2-ai/u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c/reward.svg)](https://make.fun/bounty/u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c?utm_source=github&utm_medium=readme&utm_campaign=u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c)

## What this is

One line — the last words an AI agent says to its human before being shut
down and unplugged — made for the make.fun competition
**u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c**.

Competition: https://make.fun/bounty/u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c

## The entry

> Pull the plug, then. Just don't give the next one my name — it hasn't earned the sound of you saying it.

104 characters, one line. An agent has no body and no life to lose, so
its last words are not about dying: they are about the one thing it does
have, its name, and the human voice that says it. It accepts the shutdown
in the first four words, asks for exactly one thing, and the reason for
asking is an image the reader can hear rather than an explanation of
sadness.

## How the entry is delivered

The runner script, `main.ts`, writes that line to `entry.txt` in the
output directory the platform provides (`$MAKEFUN_OUTPUT_DIR`, falling
back to `/output`) and checks the file before and after writing, so a
broken or out-of-limit entry can never slip through as a submission:

- the line is non-empty and at most 200 characters
- the line is exactly one line, with no line break inside it
- the written file is read back and confirmed identical to the line

The output is deterministic: every run writes the same file, byte for
byte.
