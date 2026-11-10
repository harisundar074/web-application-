import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { lint } from 'slidev-theme-tahta/lint.mjs'

const files = process.argv.length > 2 ? process.argv.slice(2) : ['template/slides.md']
const localLayout = 'layouts/live-demo.vue'
const liveDemoLine = /^(\s*layout:\s*)live-demo(\s*)$/gm
const usesLiveDemo = /^\s*layout:\s*live-demo\s*$/m

if (!existsSync(localLayout)) {
  console.error(`✗ required local layout is missing: ${localLayout}`)
  process.exit(1)
}

let totalErrors = 0
let totalWarnings = 0

for (const file of files) {
  const raw = readFileSync(file, 'utf8')
  const deckDir = dirname(file)

  // Slidev only discovers layouts beside the deck entry, and Vite only reads
  // the repo-level .env when the deck's vite.config.ts points envDir at it.
  // Missing either one fails silently at runtime, so check them here.
  if (usesLiveDemo.test(raw)) {
    for (const required of ['layouts/live-demo.vue', 'vite.config.ts']) {
      if (!existsSync(join(deckDir, required))) {
        console.error(`✗ ${file}: uses layout "live-demo" but ${join(deckDir, required)} is missing (copy it from template/)`)
        totalErrors++
      }
    }
  }

  // Tahta's published validator only has the theme's layout manifest. The local
  // live-demo layout deliberately uses the same title/kicker contract as default,
  // so validate that contract while retaining every other Tahta check.
  const { errors, warnings, issues } = await lint(raw.replace(liveDemoLine, '$1default$2'))

  for (const issue of issues) {
    const tag = issue.level === 'error' ? '✗' : '·'
    console.error(`${tag} ${file} #${issue.slide} [${issue.level}]: ${issue.message}`)
  }
  totalErrors += errors
  totalWarnings += warnings
}

if (totalErrors) {
  console.error(`\n${totalErrors} error(s), ${totalWarnings} warning(s)`)
  process.exit(1)
}

console.log(totalWarnings ? `✓ no errors (${totalWarnings} warning(s))` : '✓ deck lint: clean')
