<script>
  import Whatsapp from 'svelte-material-icons/Whatsapp.svelte';

  export let title = "¡Chatea ahora mismo!";
  export let buttonAction = () => alert('Life has never Svelte better');
</script>

<style>
  button {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    border: none;
    border-radius: 5px;
    padding: 10px 8px;
    color: #fff;
    background-color: var(--button-color);
    cursor: pointer;
  }
  .iconButton-Chat-icon {
    width: 25px;
    height: auto;
    display: flex;
  }
  .icon-button-chat-text {
    font-size: 1.05em;
  }
</style>

<button on:click={buttonAction}>
  <span class="iconButton-Chat-icon">
      <slot name="button-icon">
        <Whatsapp size={18} />
      </slot>
  </span>
  <span class="icon-button-chat-text">{title}</span>
</button>
