<script>
    import DetailButton from "../DetailButton/DetailButton.svelte";

    export let buttonDetailAction = () => alert("Life has never svelte better")
</script>

<style>
    .ElementDetailOverlay {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 15;
        background-color: rgba(83, 132, 201, 0.71);
    }

    .ElementDetailOverlay-button {
        width: 67%;
        height: 45px;
    }
</style>

<div class="ElementDetailOverlay">
    <div class="ElementDetailOverlay-button">
        <DetailButton message="Ver detalle" on:click={buttonDetailAction} />
    </div>
</div>