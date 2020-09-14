<script>
  import { getContext, onMount } from "svelte";
  import { stores } from "@sapper/app";
  import PencilOutline from "svelte-material-icons/PencilOutline.svelte";
  import Modal from "../Modal.svelte";
  import EditButton from "../EditButton/EditButton.svelte";
  import ProductForm from "../../containers/ProductForm/ProductForm.svelte";
  import ProductService from "../../services/companies/product.service.js";

  export let productElement;
  export let onDelete;

  const { session } = stores();
  const isSessionUserProfile = true;
  /*getContext("isSessionUserProfile");*/

  let editableMode = false;
  let displayStory = false;
  let willDelete = false;

  function toggleEditableMode() {
    editableMode = !editableMode;
  }

  function toggleStoryDisplay() {
    displayStory = !displayStory;
  }
  onMount(() => {
    console.log("productElement de prduct card", productElement);
  });

  function reloadComponentData(ProductElementData) {
    name = productElement.name;
    category = productElement.category ? productElement.category : null;
    media = productElement.media ? productElement.media : null;
    description = productElement.description
      ? productElement.description
      : null;
    minimum_price = productElement.minimum_price
      ? productElement.minimum_price
      : null;
    maximum_price = productElement.maximum_price
      ? productElement.maximum_price
      : null;
    currency_id = productElement.currency_id
      ? productElement.currency_id.code
      : null;
    editableMode = false;
  }
  async function onDeleteProduct() {
    try {
      const productService = new ProductService();
      const productData = await productService.deleteUserProduct(
        $session.username,
        productElement.id,
        $session.accessToken
      );
      onDelete(productElement.id);
      console.log("onDeleteProduct -> productElement.id", productElement.id);
    } catch (e) {
      console.error(e);
    }
  }
</script>

<style>
  .ProductCard {
    position: relative;
    width: 25%;
    padding: 2% 2%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
  .ProductCard-edit-button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
  }
  .ProductCard-media-container {
    position: relative;
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  .ProductCard:hover {
    background: rgba(83, 132, 201, 0.71);
  }

  .ProductCard-media-image {
    width: 100%;
    max-height: 100%;
    display: flex;
    object-fit: contain;
    border-radius: 10px;
    border-bottom-left-radius: unset;
    border-bottom-right-radius: unset;
  }

  .ProductCard-media-image--default {
    padding: 25px;
  }

  .ProductCard-name {
    width: 100%;
    margin: 15px 0px 10px 0px;
    font-size: 1em;
    padding: 0 5%;
    text-align: center;
    font-weight: bold;
    color: var(--principal-color);
    word-break: break-word;
  }

  .ProductCard-price {
    color: var(--secondary-text-color);
    font-weight: bold;
    font-size: 1em;
  }

  .ProductCard-story {
    margin-bottom: 10px;
    padding: 0px 15px;
    color: var(--light-color);
    font-size: 1em;
  }
</style>

{#if editableMode && isSessionUserProfile}
  <Modal on:click={toggleEditableMode}>
    <ProductForm
      on:click={toggleEditableMode}
      afterSubmit={reloadComponentData}
      ProductElement={productElement} />
  </Modal>
{/if}
<div class="ProductCard">
  <figure
    class="ProductCard-media-container {productElement.images[0] && productElement.images[0].path ? '' : 'ProductCard-media-container--empty'}">
    {#if productElement.images[0] && productElement.images[0].path}
      <img
        src={productElement.images[0].path}
        alt={productElement.name}
        class="ProductCard-media-image" />
    {:else}
      <img
        src="/images/profile_icon.svg"
        alt={productElement.name}
        class="ProductCard-media-image--default" />
    {/if}
  </figure>
  {#if isSessionUserProfile}
    <div class="ProductCard-edit-button">
      <EditButton
        size={25}
        color="gray"
        onEdit={toggleEditableMode}
        onDelete={onDeleteProduct}
        menuButton />
    </div>
  {/if}

  <h4 class="ProductCard-name">{productElement.name}</h4>

  {#if productElement.category}
    <p class="ProductCard-story">{productElement.category}</p>
  {/if}
  {#if productElement.minimum_price != null && productElement.maximum_price != null}
    <p class="ProductCard-price">
      {productElement.minimum_price} - {productElement.maximum_price}
      {productElement.currency.code}
    </p>
  {/if}
</div>
