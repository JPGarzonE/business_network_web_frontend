<script context="module">
    import ShowcaseService from "../services/market/showcase.service.js";

    export async function preload(page, session) {
        if( session.authenticated ) {
            // return this.redirect(301, `profile/${session.username}`);
            const showcaseService = new ShowcaseService();

            const data = await showcaseService.getShowcase(session.accessToken);
            return {
                showcase: data
            }
        }else {
            return this.redirect(301, 'login');
        }
    }
</script>

<script>
    import Header from "../components/Header.svelte";
    import MarketBanner from "../components/MainBanners/MarketBanner.svelte";
    import ProductSearch from "../containers/Search/ProductSearch/ProductSearch.svelte";
    import MarketCategoryList from "../containers/MarketCategoryList/MarketCategoryList.svelte";
    import Footer from "../components/Footer.svelte";
    
    export let showcase;

    let showcaseResults = [];
    let searchQuery = '';
    $: {
        if( !searchQuery )
            showcaseResults = showcase ? showcase.results : [];
    }
</script>

<style>
    .Market-search {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 4.4em 1.5em;
    }

    .Market-search-title {
        font-size: 1em;
        font-weight: bold;
        letter-spacing: 0.22px;
        color: var(--light-color);
    }

    .Market-showcase {
        width: 75%;
        margin: 0 auto;
        margin-bottom: 75px;
    }

    @media screen and (min-width: 480px) {
        .Market-search {
            padding: 4.4em;
        }
    }
</style>

<svelte:head>
    <title>Conecty</title>
</svelte:head>

<Header />

<div class="index">
    <MarketBanner name="Market" />
    
    <div class="Market-search">
        <h5 class="Market-search-title">
            Ingresa la subpartida arancelaria
        </h5>
        <ProductSearch bind:searchResults={showcaseResults} bind:searchQuery />
    </div>

    <div class="Market-showcase">
        {#each showcaseResults as section}
            <MarketCategoryList
                categoryName={section.name}
                bind:categoryElements={section.section_elements} />
        {:else}
            <p>No hay contenido para mostrar</p>
        {/each}
    </div>
</div>

<Footer />