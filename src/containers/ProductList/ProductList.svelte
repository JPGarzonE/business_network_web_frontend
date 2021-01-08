<script>
  import { getContext } from 'svelte';
  import ProductService from '../../services/suppliers/product.service.js';
  import ProfileProductCard from '../../components/ProfileProductCard/ProfileProductCard.svelte';
  import Modal from '../../components/Modal.svelte';
  import CreateButton from '../../components/CreateButton/CreateButton.svelte';
  import ProductForm from '../ProductForm/ProductForm.svelte';

  export let productList = [];

  const isSessionUserProfile = getContext('isSessionUserProfile');
  const profileUsername = getContext('profileUsername');
  const productService = new ProductService();

  const productsPerLine = 4;
  const productPagination = {
    pageLength: 40,
    page: 1
  };

  /* loadedProducts ∩ (intersection) displayedProducts = ∅ (null) */
  let loadedProducts = productList ? productList.slice(productsPerLine) : [];
  let displayedProducts = productList ? productList.slice(0, productsPerLine) : [];

  let editableMode = false;
  let loadedAll = productList <= 6;
  $: displayedAll = loadedProducts.length <= 0 && loadedAll;

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

  const showLessGondola = () => {
    loadedProducts = [
      ...loadedProducts,
      ...displayedProducts.slice(productsPerLine)];

    displayedProducts = displayedProducts.slice(0, productsPerLine);
  };

  const showMoreGondola = async () => {
    if( !loadedAll )
      await loadMore();
    
    displayedProducts = [...displayedProducts, ...loadedProducts];
    
    loadedProducts = [];
  };

  const loadMore = async () => {
    const productsData = await productService.getUserProducts(
      profileUsername, productPagination);

    displayedProducts = productPagination.page > 1 ? displayedProducts : [];
    productPagination.page += 1;

    loadedProducts = productsData.results;
    loadedAll = productsData.next == null;
  };
</script>

<style>
  .Products {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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

  .ProductShowMoreOrLess {
    display: flex;
    justify-content: center;
  }

  .ProductShowLink-less i, .ProductShowLink-more i {
      width: 19px;
      height: 19px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0px;
      margin-right: 5px;
  }

  .ProductShowLink-more i {
    transform: rotate(90deg);
  }
  
  .ProductShowLink-less i {
    transform: rotate(-90deg);
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

    .ProductShowLink {
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--principal-color);
      cursor: pointer;
    }

    .ProductShowLink + .ProductShowLink {
      margin-left: 90px;
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
    {#each displayedProducts as element}
      <ProfileProductCard productElementOverview={element} onDelete={onDeleteProduct} />
    {:else}
      {#if displayedProducts.length >= 1}
        <p>Loading...</p>
      {/if}
    {/each}
  </div>
  {#if productList.length >= 4}
    <div class="ProductShowMoreOrLess">
      {#if displayedProducts.length > 4}
      <span class="ProductShowLink ProductShowLink-less" on:click={showLessGondola}>
        <i class="icon-next" />
        Ver menos productos
      </span>
      {/if}

      {#if !displayedAll}
      <span class="ProductShowLink ProductShowLink-more" on:click={showMoreGondola}>
        <i class="icon-next" />
        Ver más productos
      </span>
      {/if}
    </div>
  {/if}
</div>
