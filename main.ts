// Entry program for gta6-meme-x-01: the post itself is the entry.
// This program only hands POST.json to the gate: it reads POST.json from
// the repository root (MAKEFUN_BOT_DIR, /bot in the grader) and writes the
// exact same bytes to MAKEFUN_OUTPUT_DIR (/output in the grader).
// Node 22, standard library only; no network, no wall clock, no files
// outside the repository, so both grader runs write identical bytes.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(botDir, 'POST.json');
const target = join(outputDir, 'POST.json');

mkdirSync(outputDir, { recursive: true });

let post: Buffer;
try {
  post = readFileSync(source);
} catch (err) {
  console.error(`could not read POST.json from ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}

try {
  writeFileSync(target, post);
} catch (err) {
  console.error(`could not write POST.json to ${outputDir}: ${(err as Error).message}`);
  process.exit(1);
}
