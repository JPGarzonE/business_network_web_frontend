<script>
  import Headphones from 'svelte-material-icons/Headphones.svelte';
import Whatsapp from 'svelte-material-icons/Whatsapp.svelte';
  import WhatsApp from  'svelte-material-icons/Whatsapp.svelte';

  export let title = "¡Chatea ahora mismo!";
  export let buttonAction = () => alert('Life has never Svelte better');
</script>

<style>
  button {
    color: #fff;
    background-color: var(--button-color);
    border-radius: 5px;
    padding: 11px 8px;
    border: none;
    width: 100%;
    margin: 0 5%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 15% 5% 0;
  }
  .iconButton-Chat-icon {
    width: 25px;
    height: auto;
    margin-left: 5%;
  }
  .icon-button-chat-text {
    margin: 0 10% 0 5%;
  }
</style>

<button on:click={buttonAction}>
  <span class="iconButton-Chat-icon"><Whatsapp size={18} /></span>
  <span class="icon-button-chat-text">{title}</span>
</button>
