<script>
  import PencilOutline from "svelte-material-icons/PencilOutline.svelte";
  import Menu from "@smui/menu";
  export let size;
  export let color;
  export let anchorButton;
  export let onEdit = () => {};
  export let onDelete = () => {};
  export let menuButton = false;
  export let disabled = false;

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
    background-color: unset;
    border: 2px solid transparent;
    padding: 2px 4px;
    border-radius: 100%;
  }
  .EditButton:hover:not([disabled]) {
    cursor: pointer;
    background-color: var(--white);
    box-shadow: 0px 0px 4px var(--super-extra-light-gray);
  }

  .EditButton:active:not([disabled]) {
    background-color: var(--light-orange);
  }

  :global(.EditButton:hover:not([disabled]) path) {
    fill: var(--button-color);
  }
  :global(.EditButton-menu) {
    left: unset !important;
    right: 10px;
  }
</style>

<button
  {disabled}
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
