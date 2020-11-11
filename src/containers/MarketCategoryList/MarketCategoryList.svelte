<script>
    import { goto } from '@sapper/app';
    import HorizontalScrollList from "../../components/componentLists/HorizontalScrollList.svelte";
    import ProductCard from "../../components/ProductCard/ProductCard.svelte";

    export let categoryName = "";
    export let categoryElements = [];
    export let search = false;

    console.log("Search");
    console.log(search);

    let productButtonDetailAction = async (company_username) => {
        document.body.style.cursor = "wait";
        await goto(`profile/${company_username}`);
        document.body.style.cursor = "auto";
    }
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

    .MarketCategoryList-product {
        position: relative;
        width: 100%;
        min-width: 220px;
        padding: 15px 2%;
        margin: 15px 0;
        margin-right: 2%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    @media screen and (min-width: 850px) {
    .MarketCategoryList-product {
      width: 50%;
      margin: 0;
      margin-bottom: 2%;
    }
  }

  @media screen and (min-width: 1030px) {
    .MarketCategoryList-product {
      width: 40%;
      margin-right: 2%;
    }
  }

  @media screen and (min-width: 1260px) {
    .MarketCategoryList-product {
      width: 23%;
      padding: 2% 2%;
    }
  }
</style>

{#if categoryElements.length > 0 && !search}
<div class="MarketCategoryList">
    <h3 class="MarketCategory-title">{categoryName}</h3>
    <HorizontalScrollList>
        {#each categoryElements as element}
        <div class="MarketCategoryList-product">
            <ProductCard  principalImage={element.principal_image}
                name={element.name} withDetail={true}
                subname={element.company_name}
                buttonDetailAction={async () => productButtonDetailAction(element.company_username)}
            />
        </div>
        {:else}
        <p style="margin: 0 auto;">No hay contenido para esta categoria</p>
        {/each}
    </HorizontalScrollList>
</div>
{/if}