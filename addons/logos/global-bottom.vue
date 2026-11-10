<script setup>
import eyantraLogo from '../../assets/logo.png'
import iitbLogo from '../../assets/IITB.png'
</script>

<template>
  <img
    v-if="$nav.currentLayout !== 'live-demo'"
    :src="eyantraLogo"
    alt="e-Yantra"
    class="fixed bottom-10 right-10 h-10 z-50 pointer-events-none select-none"
    :class="$nav.currentLayout === 'cover' ? 'opacity-20' : 'opacity-60'"
  />
  <img
    v-if="$nav.currentPage === 1"
    :src="iitbLogo"
    alt="IIT Bombay"
    class="fixed top-6 right-6 h-14 z-50 opacity-70 pointer-events-none select-none"
  />
</template>
