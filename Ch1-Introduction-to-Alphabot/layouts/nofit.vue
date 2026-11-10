<!--
  Same as this deck's default layout, but without <Fit> (the theme's auto-shrink).
  Use `layout: nofit` for a slide whose diagram is already sized to fit the frame,
  so it is shown at full size instead of being scaled down.
-->
<template>
  <div class="deck-slide">
    <SlideFrame mode="topic"><slot /></SlideFrame>
  </div>
</template>

<style>
.deck-slide { height: 100%; }
</style>
