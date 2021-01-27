<main id="main">
  <slot />
</main>

<style>
  main {
    height: 100%;
  }
  :global(.noScroll) {
    overflow-y: hidden;
  }
</style>
