<script>
  import PencilOutline from 'svelte-material-icons/PencilOutline.svelte';

  export let size;
  export let color;
</script>

<style>
  .EditButton {
    cursor: pointer;
    background-color: unset;
    border: 2px solid transparent;
    padding: 2px 4px;
  }
  .EditButton:hover {
    border-radius: 100%;
    border: 2px solid gray;
  }
  .EditButton:hover svg path {
    fill: orange !important;
  }
</style>

<button class="EditButton" on:click>
  <PencilOutline {size} {color} />
</button>
