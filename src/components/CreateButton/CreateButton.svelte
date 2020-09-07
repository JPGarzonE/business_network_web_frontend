<script>
  import Plus from 'svelte-material-icons/Plus.svelte';

  export let size;
</script>

<style>
  .CreateButton {
    cursor: pointer;
    background-color: unset;
    border: 2px solid var(--principal-color);
    padding: 1px 3px;
    border-radius: 100%;
  }
</style>

<button class="CreateButton" on:click>
  <Plus {size} color="var(--principal-color)" />
</button>
