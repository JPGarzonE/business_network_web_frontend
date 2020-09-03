<script>
    export let buttonAction = () => alert('Life has never Svelte better');
    import Headphones from 'svelte-material-icons/Headphones.svelte';
</script>


<style>
	button {
		color: #fff;
		background-color:var(--buttom-color);
		border-radius: 5px;
		padding: 11px 8px;
		border: none;
        width: 90%;
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
    <span class="iconButton-Chat-icon"><Headphones /></span>
    <span class="icon-button-chat-text">Chatea con un vendedor </span>
  </button>