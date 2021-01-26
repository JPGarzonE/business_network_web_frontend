<script>
    import Whatsapp from 'svelte-material-icons/Whatsapp.svelte';

    export let title = "Contáctanos";
    export let buttonAction = () => alert("Nuestro teléfono es: ");
</script>

<style>
    button {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: .4em;
        border: 2px solid var(--whatsapp-color);
        border-radius: 4px;
        background-color: var(--whatsapp-color);
        color: var(--white);
        font-size: 1em;
        cursor: pointer;
    }

    .ContactUsButton-icon {
        width: 25px;
        height: auto;
        display: flex;
        margin-right: 3px;
    }
</style>

<button on:click={buttonAction}>
    <span class="ContactUsButton-icon">
        <slot name="main-icon">
            <Whatsapp width={50} height={28} color="var(--white)" />
        </slot>
    </span>

    <span>{title}</span>
</button>