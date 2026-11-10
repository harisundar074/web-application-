<!--
  Workaround for a version incompatibility between @slidev/cli 0.49.x and fuse.js 7.x.

  Slidev's Goto.vue (the `g` go-to-slide box) renders its autocomplete list with
  `v-if="result.length > 0"`, where `result = fuse.search(text)` and `text` is ''
  while the dialog is closed.

    - fuse.js <7  → search('') returns []      → list not rendered → nothing visible
    - fuse.js 7.x → search('') returns EVERY item → list always rendered

  A closed dialog is only shifted up by 5rem (`-top-20`). That hides the ~40px
  input, but not a list of 50+ slides (max-height: calc(100vh - 100px)), so the
  list hangs down over the deck and no keypress dismisses it — Escape closes the
  dialog, but the list does not depend on the dialog being open.

  Fix: hide the dialog whenever its input is disabled, which is exactly the
  condition Slidev uses to mean "closed". Opening it re-enables the input and
  drops the -top-20 class, so both selectors stop matching and it appears normally.
-->

<template>
  <span style="display: none" />
</template>

<style>
#slidev-goto-dialog:has(#slidev-goto-input:disabled) {
  display: none;
}

/* Fallback for engines without :has() — a closed dialog always carries this class. */
#slidev-goto-dialog.\-top-20 {
  display: none;
}
</style>
