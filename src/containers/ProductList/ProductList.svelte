<script>
  import { getContext, onMount } from "svelte";
  import ProductService from "../../services/suppliers/product.service.js";
  import ProfileProductCard from "../../components/ProfileProductCard/ProfileProductCard.svelte";
  import HorizontalScrollList from "../../components/componentLists/HorizontalScrollList.svelte";
  import Modal from "../../components/Modal.svelte";
  import CreateButton from "../../components/CreateButton/CreateButton.svelte";
  import ProductForm from "../ProductForm/ProductForm.svelte";
  import { _ } from "svelte-i18n";

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
    mobile = !mediaQuery.matches;
    mediaQuery.addEventListener("change", handleWindowChange);
  });

  const handleWindowChange = (e) => {
    mobile = !e.matches;
  };

  function toggleEditableMode() {
    editableMode = !editableMode;
  }
  function reloadComponentData(productData) {
    displayedProducts = [productData, ...displayedProducts];
    editableMode = false;
  }

  function onDeleteProduct(id) {
    displayedProducts = displayedProducts.filter((item) => item.id !== id);
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
  <h3 class="ProductsList-headline">
    {$_("productList.productsAndServicesPortfolio")}
  </h3>
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
        class:Productlist-card-create-button={onBoarding}
      >
        <CreateButton
          size={25}
          color={onBoarding ? "white" : "var(--principal-color)"}
          id="ProductCreate"
        />
      </div>
    </div>
  {/if}

  {#if mobile}
    <HorizontalScrollList
      id="product-list"
      beginningItemsNumber={displayedProducts.length}
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
            {onBoarding}
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

  {#if displayedProducts.length >= 4}
    <div class="ProductShowMoreOrLess">
      {#if displayedProducts.length > 4}
        <span
          class="ProductShowLink ProductShowLink-less"
          on:click={showLessGondola}>
          <i class="icon-next" />
          {$_("productList.lessProducts")}
        </span>
      {/if}

      {#if !displayedAll}
        <span
          class="ProductShowLink ProductShowLink-more"
          on:click={showMoreGondola}>
          <i class="icon-next" />
          {$_("productList.moreProducts")}
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
    color: var(--secondary-text-color);
    font-size: 1.1em;
    font-family: var(--body-font);
    text-align: center;
    font-weight: bold;
    line-height: 19px;
    letter-spacing: 0.216px;
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

  .ProductShowLink {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--principal-color);
    cursor: pointer;
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

    .ProductShowLink + .ProductShowLink {
      margin-left: 90px;
    }
  }
</style>
