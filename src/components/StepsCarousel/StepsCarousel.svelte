<script>
    /* Dictionary with the name of the step as key (Ej: 1, 2) and the 
    function to be executed when each step is clicked as value (if is needed) */
    export let steps;

    /* Name of the selected step */
    export let selectedStep;

    export let backgroundColor="#E8E8E8";
    export let textColor="#9E9FA0";
    export let selectedBackgroundColor="var(--principal-color)";
    export let selectedTextColor="var(--white)";
    export let borderColor="transparent";

    const DefaultStyleList = [
        `background-color: ${backgroundColor}`,
        `color: ${textColor}`,
        `border: 2px solid ${borderColor}`
    ];
    const DefaultStyle = DefaultStyleList.join(";");

    const SelectedStyleList = [
        `background-color: ${selectedBackgroundColor}`,
        `color: ${selectedTextColor}`
    ];
    const SelectedStyle = SelectedStyleList.join(";");
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

    .StepsCarousel-divisor {
        width: 2.8em;
        margin: 0 4px;
        border: 1px solid;
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
            class="StepsCarousel-step"
            style={name <= selectedStep ? SelectedStyle : DefaultStyle}
            on:click={functionKey}
        >
            {name}
        </span>
        {#if (idx+1) !== Object.entries(steps).length}
            <hr class="StepsCarousel-divisor" 
                style="background-color:{selectedBackgroundColor};border-color:{selectedBackgroundColor}" 
            />
        {/if}
    {/each}
</div>