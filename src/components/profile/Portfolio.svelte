<script>
    import HorizontalScrollList from "../componentLists/HorizontalScrollList.svelte";
    import ProductCard from "../products/ProductCard.svelte";
    import Modal from "../Modal.svelte";
    import ProductForm from "./forms/ProductForm.svelte";
    import { getContext } from 'svelte';

    export let portfolioElements = [];
    const isSessionUserProfile = getContext("isSessionUserProfile");
    
    let editableMode = false;


    function toggleEditableMode() {
        editableMode = !editableMode;
    }


    function reloadComponentData( productData ) {
        portfolioElements = [...portfolioElements, productData];
        editableMode = false;
    }
</script>

<style>
    .ProfilePortfolio {
        grid-area: portfolio;
        position: relative;
        margin: 0 20px;
        padding: 40px 20px 30px;
        border: 2px solid var(--principal-color);
        border-radius: 5px;
    }

    .ProfilePortfolio-headline {
        margin: 0 0 30px;
        color: var(--principal-text-color);
        font-size: 1.1em;
        font-weight: 100;
        font-family: var(--body-font);
        text-align: center;
        letter-spacing: 0.1em;
    }

    .ProfilePortfolio-card--create {
        width: auto;
        min-width: 200px;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 30px 0 0;
        margin-right: 40px;
        padding: 20px;
        background-color: #f1f1f169;
        border: 1.5px solid var(--principal-color);
        border-radius: 5px;
        cursor: pointer;
    }

    .ProfilePortfolio-card--create span {
        margin-bottom: 10px;
    }

    .ProfilePortfolio-card--create p{
        font-size: 15px;
        color: var(--principal-color);
    }

    .ProfilePortfolio-empty-card {
        width: auto;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin: 0 30px 0 0;
        border: 2px solid var(--principal-color);
        border-radius: 5px;
        padding: 0;
        cursor: pointer;
    }

    .ProfilePortfolio-empty-card-image {
        width: 140px;
        padding: 15px 20px;
        transform: rotate(270deg);
    }

    .ProfilePortfolio-empty-message {
        max-width: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        text-align: center;
        color: var(--secondary-text-color);
    }

    @media screen and (min-width: 850px){
        .ProfilePortfolio-headline {
            margin-bottom: 15px;
            padding: 15px;
            border-bottom: 0.05em solid var(--light-color);
        }

        .ProfilePortfolio {
            border: none;
            padding: unset;
        }
    }
</style>

<div class="ProfilePortfolio">
    {#if editableMode && isSessionUserProfile}
        <Modal on:click={toggleEditableMode}>
            <ProductForm on:click={toggleEditableMode} afterSubmit={reloadComponentData} />
        </Modal>
    {/if}

    <h3 class="ProfilePortfolio-headline">Portafolio de productos y servicios</h3>
    
    <HorizontalScrollList id="Portfolio-list" beginningItemsNumber={portfolioElements ? portfolioElements.length : 0}>
        {#if isSessionUserProfile}
            <div class="ProfilePortfolio-card--create" on:click={toggleEditableMode}>
                <span>
                    <i class="icon icon-add icon-add--medium"></i>
                </span>
                <p>Crear producto</p>
            </div>
        {:else if portfolioElements && portfolioElements.length <= 0}
            <div class="ProfilePortfolio-empty-card">
                <img class="ProfilePortfolio-empty-card-image" src="/images/profile_icon.svg" alt="icon_default" />
            </div>
            <div class="ProfilePortfolio-empty-message">
                La compañia todavía no tiene productos
            </div>
        {/if}

        {#each portfolioElements as element }
            <ProductCard
                id={element.id}
                name={element.name} 
                category={element.category}
                description={element.description}
                media={element.media} 
            />
        {/each}
    </HorizontalScrollList>
</div>