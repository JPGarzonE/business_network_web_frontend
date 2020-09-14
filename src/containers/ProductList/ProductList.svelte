<script>
  import { getContext, onMount } from "svelte";
  import ProductService from "../../services/companies/product.service.js";
  import VerticalList from "../../components/componentLists/VerticalList.svelte";
  import ProductCard from "../../components/ProductCard/ProductCard.svelte";
  import Modal from "../../components/Modal.svelte";
  import CreateButton from "../../components/CreateButton/CreateButton.svelte";
  import ProductForm from "../ProductForm/ProductForm.svelte";
  export let productList = [];

  const isSessionUserProfile = true || getContext("isSessionUserProfile");
  const profileUsername = getContext("profileUsername");
  const productService = new ProductService();

  let editableMode = false;

  function toggleEditableMode() {
    editableMode = !editableMode;
  }

  const loadMore = async () => {
    const productsData = await productService.getUserProducts(profileUsername);
    productList = productsData.results;
  };
</script>

<style>
  .Products {
    display: flex;
  }
  .ProductsList {
    position: relative;
    margin: 1px 20px;
    padding: 40px 20px 30px;
    border: 2px solid var(--principal-color);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
  }

  .ProductsList-headline {
    margin: 0 0 30px;
    color: var(--principal-text-color);
    font-size: 1em;
    font-weight: 100;
    font-family: var(--body-font);
    text-align: center;
    letter-spacing: 0.1em;
  }

  .ProductsList-card--create {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .ProductList-card--create-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }

  @media screen and (min-width: 850px) {
    .ProductsList-headline {
      margin-bottom: 15px;
      padding: 15px;
      border-bottom: 0.05em solid var(--light-color);
    }

    .ProductsList {
      border: none;
      padding: unset;
    }
    .ProdusctShowMore {
      display: flex;
      justify-content: center;
    }
    .ProdusctShowMoreText {
      color: var(--principal-color);
      cursor: pointer;
    }
  }
</style>

<div class="ProductsList">
  <h3 class="ProductsList-headline">Portafolio de productos y servicios</h3>
  {#if editableMode && isSessionUserProfile}
    <Modal on:click={toggleEditableMode}>
      <ProductForm on:click={toggleEditableMode} />
    </Modal>
  {/if}
  {#if isSessionUserProfile}
    <div
      class="ProductList-card--create-container"
      on:click={toggleEditableMode}>
      <CreateButton size={25} />
    </div>
  {/if}
  {#if productList && productList.length <= 0}
    <div class="ProductList-empty-message">
      La compañia todavía no ha agregado Productos
    </div>
  {/if}
  <div class="Products">
    {#each productList as element}
      <ProductCard
        id={element.id}
        media={element.media}
        name={element.name}
        category={element.category}
        minimum_price={element.minimum_price}
        maximum_price={element.maximum_price} />
    {:else}
      {#if productList.length >= 1}
        <p>Loading...</p>
      {/if}
    {/each}
  </div>
  {#if productList.length >= 5}
    <div class="ProdusctShowMore" on:click={loadMore}>
      <span class="ProdusctShowMoreText">Ver más productos</span>
    </div>
  {/if}
</div>
