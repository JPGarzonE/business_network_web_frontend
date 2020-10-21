<script>
  import { getContext } from 'svelte';
  import { stores } from '@sapper/app';
  import Modal from '../Modal.svelte';
  import EditButton from '../EditButton/EditButton.svelte';
  import ProductCard from '../ProductCard/ProductCard.svelte';
  import ProductForm from '../../containers/ProductForm/ProductForm.svelte';
  import ProductService from '../../services/companies/product.service.js';
  import ConfirmationModal from '../ConfirmationModal/ConfirmationModal.svelte';

  export let productElement;
  export let onDelete;

  const { session } = stores();
  const isSessionUserProfile = getContext('isSessionUserProfile') ? getContext('isSessionUserProfile') : false;

  let editableMode = false;
  let confirmationMode = false;
  let productPrincipalImage = productElement.images ? productElement.images[0] : null;

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
      await productService.deleteUserProduct(
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
  .ProfileProductCard {
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

  .ProfileProductCard-edit-button {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 18;
    padding: 5px;
  }

  @media screen and (min-width: 850px) {
    .ProfileProductCard {
      width: 50%;
      margin: 0;
      margin-bottom: 2%;
    }
  }

  @media screen and (min-width: 1030px) {
    .ProfileProductCard {
      width: 40%;
      margin-right: 2%;
    }
  }

  @media screen and (min-width: 1260px) {
    .ProfileProductCard {
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

<div class="ProfileProductCard">
  {#if isSessionUserProfile}
    <div class="ProfileProductCard-edit-button">
      <EditButton
        size={25}
        color="gray"
        onEdit={toggleEditableMode}
        onDelete={toggleConfirmation}
        menuButton />
    </div>
  {/if}

  <ProductCard  principalImage={productPrincipalImage}
    name={productElement.name}
    subname={productElement.category}
    minimum_price={productElement.minimum_price}
    maximum_price={productElement.maximum_price}
    currency={productElement.price_currency} 
  />
</div>