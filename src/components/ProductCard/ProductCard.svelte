<script>
  import { getContext, onMount } from 'svelte';
  import { stores } from '@sapper/app';
  import Modal from '../Modal.svelte';
  import EditButton from '../EditButton/EditButton.svelte';
  import ElementDetailOverlay from "../ElementDetailOverlay/ElementDetailOverlay.svelte";
  import ProductForm from '../../containers/ProductForm/ProductForm.svelte';
  import ProductService from '../../services/companies/product.service.js';
  import ConfirmationModal from '../ConfirmationModal/ConfirmationModal.svelte';

  export let productElement;
  export let onDelete;

  const { session } = stores();
  const isSessionUserProfile = getContext('isSessionUserProfile') ? getContext('isSessionUserProfile') : false;

  let editableMode = false;
  let confirmationMode = false;
  let displayDetailOverlay = false;

  function toggleEditableMode() {
    editableMode = !editableMode;
  }
  function toggleConfirmation() {
    confirmationMode = !confirmationMode;
  }

  function reloadComponentData(productElementData) {
    productElement = productElementData;
    editableMode = false;
  }

  async function onDeleteProduct() {
    toggleConfirmation;
    try {
      const productService = new ProductService();
      const productData = await productService.deleteUserProduct(
        $session.username,
        productElement.id,
        $session.accessToken
      );
      onDelete(productElement.id);
    } catch (e) {
      console.error(e);
    }
  }
</script>

<style>
  .ProductCard {
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
  .ProductCard-detail-overlay {
    width: 100%;
    height: 100%;
    display: none;
    position: absolute;
    top: 0;
  }
  .ProductCard:hover > .ProductCard-detail-overlay {
    display: flex;
  }
  .ProductCard-edit-button {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 18;
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

  .ProductCard-media-image {
    width: 100%;
    max-height: 100%;
    display: flex;
    object-fit: contain;
    border-radius: 10px;
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

  .ProductCard-subname {
    margin-bottom: 10px;
    padding: 0px 15px;
    color: var(--light-color);
    font-size: 1em;
  }

  @media screen and (min-width: 850px) {
    .ProductCard {
      width: 50%;
      margin: 0;
      margin-bottom: 2%;
    }
  }

  @media screen and (min-width: 1030px) {
    .ProductCard {
      width: 40%;
      margin-right: 2%;
    }
  }

  @media screen and (min-width: 1260px) {
    .ProductCard {
      width: 23%;
      padding: 2% 2%;
    }
  }
</style>

{#if confirmationMode && isSessionUserProfile}
  <ConfirmationModal
    title="Desea eliminar el producto {productElement.name}"
    onAccept={onDeleteProduct}
    onDecline={toggleConfirmation} />
{/if}

{#if editableMode && isSessionUserProfile}
  <Modal on:click={toggleEditableMode}>
    <ProductForm
      on:click={toggleEditableMode}
      afterSubmit={reloadComponentData}
      ProductElement={productElement} />
  </Modal>
{/if}

<div class="ProductCard">
  <div class="ProductCard-detail-overlay">
    <ElementDetailOverlay />
  </div>

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
        onDelete={toggleConfirmation}
        menuButton />
    </div>
  {/if}

  <h4 class="ProductCard-name">{productElement.name}</h4>

  {#if productElement.category}
    <p class="ProductCard-subname">{productElement.category}</p>
  {/if}

  {#if productElement.company && productElement.company.name}
    <p class="ProductCard-subname">{productElement.company.name}</p>
  {/if}

  {#if productElement.minimum_price != null}
    <p class="ProductCard-price">
      {productElement.minimum_price} 
      {productElement.maximum_price != null ? ` - ${productElement.maximum_price}` : ""}
      {productElement.currency.code}
    </p>
  {/if}
</div>