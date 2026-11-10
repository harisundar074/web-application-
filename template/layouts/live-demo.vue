<script setup>
// Slidev discovers layouts beside the deck entry. Keep the implementation in
// the repository-level layouts directory so other decks can reuse it.
import LiveDemo from '../../layouts/live-demo.vue'
</script>

<template>
  <LiveDemo><slot /></LiveDemo>
</template>
