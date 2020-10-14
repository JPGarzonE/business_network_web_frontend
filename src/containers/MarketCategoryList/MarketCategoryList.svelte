<script>
    import HorizontalScrollList from "../../components/componentLists/HorizontalScrollList.svelte";
    import ProductCard from "../../components/ProductCard/ProductCard.svelte";

    export let categoryName = "";
    export let categoryElements = [];
</script>

<style>
    .MarketCategoryList {
        margin-bottom: 3.5em;
    }

    .MarketCategory-title {
        margin-bottom: 2.8em;
        padding-bottom: 1em;
        border-bottom: 1px solid var(--light-color);
        text-align: center;
        letter-spacing: 0.22px;
        font-weight: bold;
        font-size: 1em;
        color: var(--light-color);
    }
</style>

<div class="MarketCategoryList">
    <h3 class="MarketCategory-title">{categoryName}</h3>
    <HorizontalScrollList>
        {#each categoryElements as element}
            <ProductCard productElement={element} />
        {/each}
    </HorizontalScrollList>
</div>