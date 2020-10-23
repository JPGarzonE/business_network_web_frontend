<script>
    /* Dictionary with the name of the step as key (Ej: 1, 2) and the 
    function to be executed when each step is clicked as value (if is needed) */
    export let steps;

    /* Name of the selected step */
    export let selectedStep; 
</script>

<style>
    .StepsCarousel {
        display: flex;
        width: 100%;
        max-width: 400px;
        justify-content: center;
        align-items: center;
        margin: 0px auto 30px auto;
    }

    .StepsCarousel-step {
        padding: 5px 11px;
        width: 34px;
        height: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        background: #cac8c875;
        color: var(--light-color);
        font-weight: 900;
        font-size: 0.85em;
        cursor: pointer;
    }

    .selected {
        background: #5387cc;
        color: #ffffff;
    }

    .StepsCarousel-divisor {
        width: 2.8em;
        margin: 0 4px;
        background-color: var(--principal-color);
        border: 1px solid var(--principal-color);
    }

    @media screen and (min-width: 1000px) {
        .StepsCarousel {
            margin: 0px auto;
            margin-bottom: 30px;
        }
    }
</style>

<div class="StepsCarousel">
    {#each Object.entries(steps) as [name, functionKey], idx}
        <span 
            class="StepsCarousel-step {name <= selectedStep ? "selected" : null}"
            on:click={functionKey}>
            {name}
        </span>
        {#if (idx+1) !== Object.entries(steps).length}
            <hr class="StepsCarousel-divisor" />
        {/if}
    {/each}
</div>