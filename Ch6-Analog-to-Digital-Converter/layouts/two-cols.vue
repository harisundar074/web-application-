<!--
  Same as the theme's two-cols layout, but wrapped in a div so a slide's
  `class:` frontmatter actually reaches the page (the theme drops it).
-->
<template>
  <div class="deck-slide">
    <SlideFrame mode="topic">
      <Fit>
        <div class="two-cols">
          <div class="col"><slot /></div>
          <div class="col"><slot name="right" /></div>
        </div>
      </Fit>
    </SlideFrame>
  </div>
</template>
