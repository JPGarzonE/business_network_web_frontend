<script>
    export let message = '';
</script>

<style>
    .DetailButton {
        width: 100%;
        height: 100%;
        border: 2px solid white;
        border-radius: 4px;
        background-color: rgba(83, 132, 201, 0.86);
        letter-spacing: 0.22px;
        color: white;
        cursor: pointer;
    }
</style>

<button class="DetailButton" on:click>
    {message}
</button>