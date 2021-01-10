<script>
  import { onDestroy, onMount } from "svelte";
  export let opacity = 0.7;
  /* onMount(async () => {
    document.body.classList.add("no-scroll");
  });
  onDestroy(async () => {
    document.body.classList.remove("no-scroll");
  });*/
</script>

<div class="Modal">
  <div class="Modal-overlay" on:click style="--op:{opacity}" />
  <slot />
</div>

<style>
  .Modal {
    z-index: 25;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .Modal-overlay {
    background-color: rgba(0, 0, 0, var(--op));
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 15;
  }
</style>
