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
  let open = false;

  const editAction = () => {
    menu.setOpen(false);
    onEdit();
  };
  const deleteAction = () => {
    menu.setOpen(false);
    onDelete();
  };
</script>

<style>
  .EditButton {
    cursor: pointer;
    background-color: unset;
    border: 2px solid transparent;
    padding: 2px 4px;
    border-radius: 100%;
  }
  .EditButton:hover {
    background-color: var(--white);
    box-shadow: 0px 0px 4px var(--super-extra-light-gray);
  }

  .EditButton:active {
    background-color: var(--light-orange);
  }

  :global(.EditButton:hover path) {
    fill: var(--button-color);
  }
  :global(.EditButton-menu) {
    left: unset !important;
    right: 10px;
  }
</style>

<button
  class="EditButton {open ? 'active' : ''}"
  on:click={menuButton ? () => menu.setOpen(true) : onEdit}
  bind:this={anchorButton}>
  <PencilOutline {size} {color} />
</button>
<Menu
  class="EditButton-menu"
  bind:this={menu}
  anchor={false}
  {open}
  bind:anchorElement={anchorButton}
  anchorCorner="BOTTOM_LEFT">
  <button
    class="button list-button"
    on:click|stopPropagation={editAction}>Editar</button>
  <button
    class="button list-button"
    on:click|stopPropagation={deleteAction}>Eliminar</button>
</Menu>
