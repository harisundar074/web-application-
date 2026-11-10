<!--
  Same as the theme's default layout, but wrapped in a div so a slide's
  `class:` frontmatter actually reaches the page (the theme drops it).
-->
<template>
  <div class="deck-slide">
    <SlideFrame mode="topic"><Fit><slot /></Fit></SlideFrame>
  </div>
</template>

<style>
.deck-slide { height: 100%; }
</style>
