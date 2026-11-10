<script setup>
// Deck-local copy of the theme's <Fit> (auto fit-to-frame), with one fix:
// the theme computes the available height as `frame - 2 × top`, which assumes the
// content is vertically centred. This deck starts content right under the title,
// so that formula shrank slides far more than needed. Here the available height is
// `frame - top - bottom padding` (the real space below the title).
import { ref, onMounted, onBeforeUnmount } from 'vue'
const FLOOR = 0.42
const outer = ref(null), inner = ref(null), scale = ref(1), overflow = ref(false)
let ro, warned = false

function avail () {
  let a = outer.value.clientHeight
  const frame = outer.value.closest('.slidev-layout')
  if (frame) {
    let top = 0, el = outer.value
    while (el && el !== frame) { top += el.offsetTop; el = el.offsetParent }
    const padBottom = parseFloat(getComputedStyle(frame).paddingBottom) || 0
    const framed = frame.clientHeight - top - padBottom
    if (framed > 0) a = Math.min(a, framed)
  }
  return a
}

function fit () {
  if (!outer.value || !inner.value) return
  const av = avail()
  const h = inner.value.scrollHeight
  if (!av || !h) return
  const ideal = av / h
  scale.value = h > av + 1 ? Math.max(FLOOR, ideal) : 1
  overflow.value = ideal < FLOOR
  if (overflow.value && !warned) {
    warned = true
    console.warn(`[fit] slide content overflows even at min scale (${FLOOR}) — split this slide or trim its content.`)
  }
}
onMounted(() => {
  fit()
  ro = new ResizeObserver(() => fit()); ro.observe(inner.value); ro.observe(outer.value)
  requestAnimationFrame(fit)
  if (typeof document !== 'undefined' && document.fonts) document.fonts.ready.then(fit)
})
onBeforeUnmount(() => ro?.disconnect())
</script>

<template>
  <div ref="outer" class="fit" :data-fit-overflow="overflow || null" :style="{ justifyContent: scale < 1 ? 'flex-start' : null }">
    <div ref="inner" class="fit-inner" :style="{ transform: `scale(${scale})` }"><slot /></div>
  </div>
</template>
