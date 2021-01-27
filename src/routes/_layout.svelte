<main id="main">
  <slot />
</main>

<style>
  main {
    height: 100vh;
  }
  :global(.noScroll) {
    overflow-y: hidden;
  }
</style>
