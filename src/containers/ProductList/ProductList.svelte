<script>
  import { element } from 'svelte/internal';
  import { getContext, onMount } from 'svelte';
  import ProductService from '../../services/companies/product.service.js';
  import VerticalList from '../../components/componentLists/VerticalList.svelte';
  import ProductCard from '../../components/ProductCard/ProductCard.svelte';
  import Modal from '../../components/Modal.svelte';
  import CreateButton from '../../components/CreateButton/CreateButton.svelte';
  import ProductForm from '../ProductForm/ProductForm.svelte';
  export let productList = [];

  const isSessionUserProfile = getContext('isSessionUserProfile');
  const profileUsername = getContext('profileUsername');
  const productService = new ProductService();

  let editableMode = false;
  let showedAll = false;

  function toggleEditableMode() {
    editableMode = !editableMode;
  }
  function reloadComponentData(productData) {
    productList = [...productList, productData];
    editableMode = false;
  }

  function onDeleteProduct(id) {
    productList = productList.filter((item) => item.id !== id);
  }
  const loadMore = async () => {
    const productsData = await productService.getUserProducts(profileUsername);
    productList = productsData.results;
    showedAll = true;
  };
</script>

<style>
  .Products {
    display: flex;
    flex-wrap: wrap;
  }
  .ProductsList {
    position: relative;
    margin: 1px 20px;
    padding: 40px 20px 30px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
  }

  .ProductsList-headline {
    margin: 0 0 15px;
    padding: 15px;
    color: var(--principal-text-color);
    font-size: 1.1em;
    font-weight: 100;
    font-family: var(--body-font);
    text-align: center;
    letter-spacing: 0.1em;
    border-bottom: 0.05em solid var(--light-color);
  }

  .ProductList-card--create-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }

  .ProductList-empty-message {
    max-width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    text-align: center;
    color: var(--secondary-text-color);
  }

  .ProdusctShowMore {
    display: flex;
    justify-content: center;
  }

  @media screen and (min-width: 850px) {
    .ProductsList-headline {
      margin-bottom: 15px;
      padding: 15px;
    }

    .ProductsList {
      margin: 25px 20px;
      padding: unset;
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
      <ProductForm
        on:click={toggleEditableMode}
        afterSubmit={reloadComponentData} />
    </Modal>
  {/if}
  {#if isSessionUserProfile}
    <div class="ProductList-card--create-container">
      <div on:click={toggleEditableMode}>
        <CreateButton size={25} />
      </div>
    </div>
  {/if}
  {#if productList && productList.length <= 0}
    <div class="ProductList-empty-message">
      La compañia todavía no ha agregado Productos
    </div>
  {/if}
  <div class="Products">
    {#each productList as element}
      <ProductCard productElement={element} onDelete={onDeleteProduct} />
    {:else}
      {#if productList.length >= 1}
        <p>Loading...</p>
      {/if}
    {/each}
  </div>
  {#if productList.length >= 4 && !showedAll}
    <div class="ProdusctShowMore" on:click={loadMore}>
      <span class="ProdusctShowMoreText">Ver más productos</span>
    </div>
  {/if}
</div>
