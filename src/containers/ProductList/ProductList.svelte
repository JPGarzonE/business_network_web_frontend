<script>
  import { getContext, onMount } from "svelte";
  import ProductService from "../../services/suppliers/product.service.js";
  import ProfileProductCard from "../../components/ProfileProductCard/ProfileProductCard.svelte";
  import HorizontalScrollList from "../../components/componentLists/HorizontalScrollList.svelte";
  import Modal from "../../components/Modal.svelte";
  import CreateButton from "../../components/CreateButton/CreateButton.svelte";
  import ProductForm from "../ProductForm/ProductForm.svelte";

  export let productList = [];
  export let onBoarding = false;

  const isEditableProfile = getContext("isEditableProfile");
  const profileAccountname = getContext("profileAccountname");
  const productService = new ProductService();

  const productsPerLine = 4;
  const productPagination = {
    pageLength: 40,
    page: 1,
  };

  /* loadedProducts ∩ (intersection) displayedProducts = ∅ (null) */
  let loadedProducts = productList ? productList.slice(productsPerLine) : [];
  let displayedProducts = productList
    ? productList.slice(0, productsPerLine)
    : [];

  let editableMode = false;
  let loadedAll = productList <= 6;
  $: displayedAll = loadedProducts.length <= 0 && loadedAll;

  let mobile = true;

  onMount(() => {
    let mediaQuery = window.matchMedia("(min-width: 850px)");

    mediaQuery.addEventListener("change", handleWindowChange);
  });

  const handleWindowChange = (e) => {
    console.log("SS: ", e.matches);
    mobile = !e.matches;
    console.log("SSS: ", mobile);
  };

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
      ...displayedProducts.slice(productsPerLine),
    ];

    displayedProducts = displayedProducts.slice(0, productsPerLine);
  };

  const showMoreGondola = async () => {
    if (!loadedAll) await loadMore();

    displayedProducts = [...displayedProducts, ...loadedProducts];

    loadedProducts = [];
  };

  const loadMore = async () => {
    const productsData = await productService.getSupplierProducts(
      profileAccountname,
      productPagination
    );

    displayedProducts = productPagination.page > 1 ? displayedProducts : [];
    productPagination.page += 1;

    loadedProducts = productsData.results;
    loadedAll = productsData.next == null;
  };
</script>

<div class="ProductsList" id="ProductsList">
  <h3 class="ProductsList-headline">Portafolio de productos y servicios</h3>
  {#if editableMode && isEditableProfile}
    <Modal on:click={toggleEditableMode}>
      <ProductForm
        on:click={toggleEditableMode}
        afterSubmit={reloadComponentData}
      />
    </Modal>
  {/if}
  {#if isEditableProfile}
    <div class="ProductList-card--create-container">
      <div
        on:click={!onBoarding && toggleEditableMode}
        class={onBoarding ? "Productlist-card-create-button" : ""}
      />
      <CreateButton
        size={25}
        color={onBoarding ? "white" : "var(--principal-color)"}
        id="ProductCreate"
      />
    </div>
  {/if}

  {#if mobile}
    <HorizontalScrollList
      id="product-list"
      beginningItemsNumber={productList.length}
    >
      {#each displayedProducts as element}
        <ProfileProductCard
          productElementOverview={element}
          onDelete={onDeleteProduct}
        />
      {:else}
        {#if displayedProducts.length >= 1}
          <p>Loading...</p>
        {:else}
          <ProfileProductCard
            productElementOverview={{
              name: "Producto de muestra",
              category: "Categoría",
              minimum_price: "Precio",
            }}
            isSample
          />
        {/if}
      {/each}
    </HorizontalScrollList>
  {:else}
    <div class="Products">
      {#each displayedProducts as element}
        <ProfileProductCard
          productElementOverview={element}
          onDelete={onDeleteProduct}
        />
      {:else}
        {#if displayedProducts.length >= 1}
          <p>Loading...</p>
        {:else}
          <ProfileProductCard
            productElementOverview={{
              name: "Producto de muestra",
              category: "Categoría",
              minimum_price: "Precio",
            }}
            isSample
          />
        {/if}
      {/each}
    </div>
  {/if}

  {#if productList.length >= 4}
    <div class="ProductShowMoreOrLess">
      {#if displayedProducts.length > 4}
        <span
          class="ProductShowLink ProductShowLink-less"
          on:click={showLessGondola}>
          <i class="icon-next" />
          Ver menos productos
        </span>
      {/if}

      {#if !displayedAll}
        <span
          class="ProductShowLink ProductShowLink-more"
          on:click={showMoreGondola}>
          <i class="icon-next" />
          Ver más productos
        </span>
      {/if}
    </div>
  {/if}
</div>

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

  .ProductShowMoreOrLess {
    display: flex;
    justify-content: center;
  }

  .ProductShowLink-less i,
  .ProductShowLink-more i {
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
  .Productlist-card-create-button {
    z-index: 40;
    border-color: white;
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
