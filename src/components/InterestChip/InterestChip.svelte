<script>
    import { editableMode } from "../profile/Interests.svelte";

    export let id;
    export let interest;
</script>

<style>
    .InterestChip {
        position: relative;
        min-height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 0.125em solid var(--principal-color);
        border-radius: 5px;
        margin: 5px;
        padding: 6px 25px;
        color: var(--principal-color);
        background-color: var(--secondary-color);
        font-size: 1.15em;
    }

    .InterestChip-icon-delete, .InterestChip-icon-edit {
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        background-color: white;
        cursor: pointer;
    }

    .InterestChip-icon-delete {
        right: -15px;
        top: -10px;
    }

    .InterestChip-icon-edit {
        bottom: -8px;
        right: -15px;
    }

    .InterestChip-interest {
        max-width: 280px;
        text-align: center;
        font-size: .85em;
    }

    @media screen and (min-width: 850px){
        .InterestChip {
            width: 100%;
        }
    }
</style>

<div class="InterestChip">
    {#if $editableMode}
        <span id="{id}-delete" class="icon icon-delete InterestChip-icon-delete"></span>
    {/if}
    
    <p class="InterestChip-interest">{interest}</p>

    {#if $editableMode}
        <span id="{id}-edit" class="icon icon-edit InterestChip-icon-edit"></span>
    {/if}
</div>