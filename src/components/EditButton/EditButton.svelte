<script>
  import PencilOutline from 'svelte-material-icons/PencilOutline.svelte';
  import Menu from '@smui/menu';
  export let size;
  export let color;
  export let anchorButton;
  export let onEdit = () => {};
  export let onDelete = () => {};
  export let menuButton = false;
  let menu = false;
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
  :global(.EditButton-menu) {
    left: unset !important;
    right: 10px;
  }
</style>

<button
  class="EditButton"
  on:click={menuButton ? () => menu.setOpen(true) : onEdit}
  bind:this={anchorButton}>
  <PencilOutline {size} {color} />
</button>
<Menu
  class="EditButton-menu"
  bind:this={menu}
  anchor={false}
  bind:anchorElement={anchorButton}
  anchorCorner="BOTTOM_LEFT">
  <button
    class="button list-button"
    on:click|stopPropagation={onEdit}>Editar</button>
  <button
    class="button list-button"
    on:click|stopPropagation={onDelete}>Eliminar</button>
</Menu>
