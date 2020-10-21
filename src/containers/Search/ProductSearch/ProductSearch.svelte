<script>
    import Magnify from "svelte-material-icons/Magnify.svelte";
    import ProductsSearchService from "../../../services/search/products.search.service.js";
    
    export let searchResults = [];
    export let searchQuery = '';

    const productsSearchService = new ProductsSearchService();

    let searchProducts = async () => {
        console.log("Search: ", searchQuery);
        if( searchQuery ) {
            let productsData = await productsSearchService.searchProducts(searchQuery, {"query_params": "tariff_heading"});
            console.log(productsData)
            searchResults = [
                {"name": "results", "section_elements": productsData.results}
            ]
        }
    }
</script>

<style>
    .ProductSearch {
        display: flex;
        width: 90%;
        height: 50px;
        margin: 20px;
    }

    .ProductSearch-icon, .ProductSearch-input {
        border: 1px solid #999999;
        background-color: #f5f5f5;
    }

    .ProductSearch-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 5em;
        border-right: unset;
    }

    .ProductSearch-input {
        width: 100%;
        border-left: unset;
        font-size: 1em;
        font-weight: bold;
        letter-spacing: 0.22px;
    }

    @media screen and (min-width: 480px) {
        .ProductSearch {
            width: 80%;
        }
    }

    @media screen and (min-width: 680px) {
        .ProductSearch {
            width: 60%;
        }
    }

    @media screen and (min-width: 950px) {
        .ProductSearch {
            width: 42%;
        }
    }
</style>

<div class="ProductSearch">
    <div class="ProductSearch-icon">
        <Magnify size="70%" color="#999999" />
    </div>
    <input type="text" name="ProductSearch-input" class="ProductSearch-input" 
        bind:value={searchQuery} on:input={searchProducts} />
</div>