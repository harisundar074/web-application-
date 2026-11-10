<script setup>
import { computed, onUnmounted, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $frontmatter, $nav, $page, $renderContext } = useSlideContext()

// Vite replaces this value when the Slidev dev server or production build starts.
const configuredUrl = (import.meta.env.VITE_DEMO_IFRAME_URL ?? '').trim()

const demoUrl = (() => {
  if (!configuredUrl) return null

  try {
    const url = new URL(configuredUrl)
    return /^https?:\/\//i.test(configuredUrl)
      && ['http:', 'https:'].includes(url.protocol)
      && url.hostname
      ? configuredUrl
      : null
  } catch {
    return null
  }
})()

const demoHost = demoUrl ? new URL(demoUrl).host : ''

const frameTitle = computed(() =>
  String($frontmatter.title || 'Live website demo').replace(/<[^>]*>/g, ''),
)

// Overview thumbnails and the presenter's next-slide preview get a static card:
// a live iframe there would open extra demo sessions and could grab focus.
const isLiveContext = computed(() => ['slide', 'presenter'].includes($renderContext.value))

// Slidev keeps visited slides mounted (hidden with v-show), so this component
// outlives navigating away — interaction state has to be reset explicitly.
const isActive = computed(() => $nav.value.currentSlideNo === $page.value)

const defaultZoom = 0.8
const minZoom = 0.3
const maxZoom = 1.1
const zoom = ref(defaultZoom)
const zoomPercent = computed(() => `${Math.round(zoom.value * 100)}%`)

function adjustZoom (amount) {
  zoom.value = Math.min(maxZoom, Math.max(minZoom, Math.round((zoom.value + amount) * 100) / 100))
}

const configurationMessage = configuredUrl
  ? 'The configured value is not a valid http: or https: URL.'
  : 'No demo URL is configured.'

// A focused cross-origin iframe never lets keydown events reach this page, so
// the iframe only accepts pointer input once armed, and is disarmed whenever
// the pointer leaves it or the slide stops being the current one.
const frameEl = ref(null)
const interactive = ref(false)

function exitInteraction () {
  if (!interactive.value) return
  interactive.value = false
  const active = document.activeElement
  if (active instanceof HTMLElement && frameEl.value?.contains(active)) active.blur()
  window.focus()
}

function armOnFrameClick () {
  interactive.value = true
}

// Only reachable while focus is still on this page (e.g. right after arming);
// once the demo itself has focus, its key events stay inside the iframe.
function handleEscape (event) {
  if (event.key === 'Escape') exitInteraction()
}

watch(interactive, (isInteractive) => {
  if (isInteractive) window.addEventListener('keydown', handleEscape)
  else window.removeEventListener('keydown', handleEscape)
})

watch(isActive, (active) => {
  if (!active) exitInteraction()
})

onUnmounted(() => window.removeEventListener('keydown', handleEscape))
</script>

<template>
  <div class="slidev-layout l-bleed live-demo-slide">
    <SlideBg />

    <div
      v-if="demoUrl && isLiveContext"
      ref="frameEl"
      class="live-demo-frame"
      @click="armOnFrameClick"
      @mouseleave="exitInteraction"
    >
      <div class="live-demo-scale" :style="{ '--live-demo-scale': zoom }">
        <iframe
          :class="{ 'is-live': interactive }"
          :src="demoUrl"
          :title="frameTitle"
          :tabindex="interactive ? 0 : -1"
          allow="clipboard-write"
          allowfullscreen
        />
      </div>

      <!-- mousedown.prevent: Slidev disables its keyboard shortcuts while a
           button or link has focus, so these controls must never keep it. -->
      <div class="live-demo-zoom" role="group" aria-label="Demo scale">
        <button type="button" aria-label="Zoom out" :disabled="zoom <= minZoom" @mousedown.prevent @pointerdown.stop @click.stop="adjustZoom(-0.1)">−</button>
        <button type="button" :aria-label="`Reset zoom to ${Math.round(defaultZoom * 100)}%`" @mousedown.prevent @pointerdown.stop @click.stop="zoom = defaultZoom">
          {{ zoomPercent }}
        </button>
        <button type="button" aria-label="Zoom in" :disabled="zoom >= maxZoom" @mousedown.prevent @pointerdown.stop @click.stop="adjustZoom(0.1)">+</button>
      </div>

      <div class="live-demo-actions">
        <button
          type="button"
          class="live-demo-pill live-demo-toggle"
          :class="{ 'is-live': interactive }"
          :aria-label="interactive ? 'Exit demo interaction, resume arrow-key navigation' : 'Interact with the demo (arrow-key navigation pauses while interacting)'"
          @mousedown.prevent
          @pointerdown.stop
          @click.stop="interactive ? exitInteraction() : (interactive = true)"
        >
          {{ interactive ? 'Exit demo' : 'Interact' }}
        </button>
        <a class="live-demo-pill live-demo-link" :href="demoUrl" target="_blank" rel="noopener noreferrer" title="Open demo in new tab" aria-label="Open demo in new tab" @mousedown.prevent @pointerdown.stop @click.stop>
          Open ↗
        </a>
      </div>
    </div>

    <div v-else-if="demoUrl" class="l-center">
      <div class="live-demo-card" role="img" :aria-label="`Live demo: ${demoHost}`">
        <div class="live-demo-card-label">Live demo</div>
        <code>{{ demoHost }}</code>
      </div>
    </div>

    <div v-else class="l-center">
      <div class="live-demo-card" role="status">
        <div class="live-demo-card-label">Live demo needs configuration</div>
        <p>{{ configurationMessage }}</p>
        <p>Set <code>VITE_DEMO_IFRAME_URL</code> to the local HTTP or HTTPS URL before starting Slidev.</p>
        <code class="live-demo-command">VITE_DEMO_IFRAME_URL=http://localhost:8080 npm run dev:template</code>
      </div>
    </div>
  </div>
</template>

<style scoped>
.live-demo-frame {
  position: absolute;
  inset: 0.35rem;
  z-index: 1;
  overflow: clip;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: #000;
}

.live-demo-scale {
  width: calc(100% / var(--live-demo-scale));
  height: calc(100% / var(--live-demo-scale));
  transform: scale(var(--live-demo-scale));
  transform-origin: top left;
}

.live-demo-scale iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  pointer-events: none;
}

.live-demo-scale iframe.is-live {
  pointer-events: auto;
}

.live-demo-zoom {
  position: absolute;
  right: 0.7rem;
  bottom: 0.7rem;
  z-index: 4;
  display: inline-flex;
  overflow: hidden;
  background: color-mix(in oklab, var(--ink) 88%, transparent);
  border: var(--surface-border);
  border-radius: var(--radius-sm);
  box-shadow: var(--surface-shadow);
}

.live-demo-zoom button {
  min-width: 1.075rem;
  min-height: 1rem;
  padding: 0.1rem 0.225rem;
  color: var(--fg);
  font: 600 0.37rem/1 var(--font-mono);
  background: transparent;
  border: 0;
  cursor: pointer;
}

.live-demo-zoom button + button {
  border-left: 1px solid var(--line);
}

.live-demo-zoom button:disabled {
  opacity: 0.4;
  cursor: default;
}

.live-demo-zoom button:not(:disabled):hover,
.live-demo-zoom button:focus-visible {
  color: var(--on-accent);
  background: var(--accent);
  outline: none;
}

.live-demo-actions {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  z-index: 4;
  display: inline-flex;
  gap: 0.35rem;
}

.live-demo-pill {
  padding: 0.2rem 0.55rem;
  color: var(--fg);
  font: 600 0.62rem/1.2 var(--font-mono);
  letter-spacing: 0.04em;
  text-decoration: none;
  background: color-mix(in oklab, var(--ink) 82%, transparent);
  border: var(--surface-border);
  border-radius: var(--radius-sm);
  box-shadow: var(--surface-shadow);
  cursor: pointer;
}

.live-demo-pill:hover,
.live-demo-pill:focus-visible {
  color: var(--on-accent);
  background: var(--accent);
  outline: none;
}

.live-demo-toggle.is-live {
  color: var(--on-accent);
  background: var(--accent);
}

.live-demo-card {
  width: min(100%, 52rem);
  margin: auto;
  padding: var(--sp-6);
  color: var(--fg-dim);
  background: var(--surface-bg);
  border: var(--surface-border);
  border-left: 3px solid var(--accent);
  border-radius: var(--radius);
  box-shadow: var(--surface-shadow);
}

.live-demo-card-label {
  margin-bottom: var(--sp-3);
  color: var(--fg);
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: var(--w-display);
}

.live-demo-card p {
  max-width: none;
}

.live-demo-command {
  display: inline-block;
  margin-top: var(--sp-3);
  padding: 0.65rem 0.8rem;
  color: var(--fg);
  background: color-mix(in oklab, var(--accent) 10%, transparent);
  border: 1px solid color-mix(in oklab, var(--accent) 35%, transparent);
  border-radius: var(--radius-sm);
}
</style>
