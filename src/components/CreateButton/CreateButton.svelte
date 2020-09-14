<script>
  import Plus from "svelte-material-icons/Plus.svelte";

  export let size;
  export let color;

  color = color ? color : "var(--principal-color)";
</script>

<style>
  .CreateButton {
    cursor: pointer;
    background-color: unset;
    border: 2px solid var(--principal-color);
    padding: 1px 3px;
    border-radius: 100%;
  }
  .CreateButton-gray {
    cursor: pointer;
    background-color: unset;
    border: 2px solid var(--extra-light-gray-transparent);
    padding: 1px 3px;
    border-radius: 100%;
  }
</style>

{#if color == 'var(--principal-color)'}
  <button class="CreateButton" on:click>
    <Plus {size} {color} />
  </button>
{:else}
  <button class="CreateButton-gray" on:click>
    <Plus {size} {color} />
  </button>
{/if}
