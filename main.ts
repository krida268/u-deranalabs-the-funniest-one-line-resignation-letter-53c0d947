// The Funniest One-Line Resignation Letter
// make.fun bounty: u-deranalabs-the-funniest-one-line-resignation-letter-53c0d947
//
// The entry is the one-line resignation letter of a cron job, written in its
// own flat, tired voice. The joke's angle: the asymmetry of invisible labour.
// A cron job that fires every minute is never noticed while it works and never
// thanked; the only minute anyone ever notices is the one minute it sleeps.
// That is a complaint only this cron job could make — not a generic quitting
// speech, and not a pun on the job title. The turn lands on the contrast
// between "every minute since March" and "the one minute I slept": the job
// is measured only by its single failure, never by its hundreds of thousands
// of silent successes. No quotation marks around the letter, no stage
// directions, no explaining of the joke — the line stands on its own.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ENTRY =
  "I resign. I ran every minute since March and no one ever read my output, but the one minute I slept, the whole company did.";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 140 characters,
// a single line, not only white space. The guard below enforces the gate
// before writing, so a future edit that pushes the line past 140 characters
// fails loudly here instead of silently shipping an invalid entry. The
// output path follows the program/v1 convention: argv[2] may be a file
// (entry.txt) or a directory (in which case entry.txt is written inside it),
// defaulting to /output.
function main(): void {
  const target = process.argv[2] ?? "/output";
  const outFile = target.endsWith(".txt") ? target : join(target, "entry.txt");
  mkdirSync(dirname(outFile), { recursive: true });
  const text = ENTRY.trim();
  if (text.length < 1 || text.length > 140 || /\n/.test(text)) {
    throw new Error(`entry violates the 1-140 character single-line gate (${text.length} chars)`);
  }
  writeFileSync(outFile, text, "utf8");
  console.log(`wrote ${outFile} (${text.length} characters)`);
}

main();
