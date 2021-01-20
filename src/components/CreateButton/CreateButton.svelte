<script>
  import Plus from 'svelte-material-icons/Plus.svelte';

  export let size;
  export let color;
  export let id;

  color = color ? color : 'var(--principal-color)';
</script>

{#if color == 'var(--principal-color)'}
  <button class="CreateButton" on:click {id}>
    <Plus {size} {color} />
  </button>
{:else if color == 'white'}
  <button class="CreateButton White" on:click {id}>
    <Plus {size} {color} />
  </button>
{:else}
  <button class="CreateButton-gray" on:click {id}>
    <Plus {size} {color} />
  </button>
{/if}

<style>
  .CreateButton {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3.5px solid var(--principal-color);
    border-radius: 100%;
    padding: 0px;
    cursor: pointer;
    background-color: unset;
  }
  .White {
    border: 2px solid white;
    cursor: default;
  }
  .CreateButton-gray {
    cursor: pointer;
    background-color: unset;
    border: 3.5x solid var(--extra-light-gray-transparent);
    padding: 1px 3px;
    border-radius: 100%;
  }
</style>
