<script>
  import { getContext } from "svelte";
  import { stores, goto } from "@sapper/app";
  import { GetRoute as GetProductDetailRoute } from '../../routes/product/[product_id].svelte';
  import Modal from "../Modal.svelte";
  import EditButton from "../EditButton/EditButton.svelte";
  import ProductCard from "../ProductCard/ProductCard.svelte";
  import ProductForm from "../../containers/ProductForm/ProductForm.svelte";
  import ProductService from "../../services/suppliers/product.service.js";
  import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.svelte";

  export let productElementOverview;
  export let isSample = false;
  export let onDelete;
  export let onBoarding;

  const { session } = stores();
  const isEditableProfile = getContext("isEditableProfile")
    ? getContext("isEditableProfile")
    : false;
  const ProductID =
    productElementOverview && !isSample ? productElementOverview.id : null;
  const ProductDetailPath =
    ProductID && !isSample ? GetProductDetailRoute(ProductID) : null;

  let productElementDetail = null;
  let editableMode = false;
  let confirmationMode = false;
  $: productPrincipalImage = productElementOverview
    ? productElementOverview.principal_image
    : null;

  async function toggleEditableMode() {
    if (isEditableProfile && productElementDetail == null && !isSample) {
      await retrieveProductDetail(productElementOverview.id);
    }

    editableMode = !editableMode;
  }
  function toggleConfirmation() {
    confirmationMode = !confirmationMode;
  }

  function reloadComponentData(productElementData) {
    console.log("Reload: ", productElementData);
    productElementOverview = productElementData;
    productElementDetail = null;
    editableMode = false;
  }

  async function onDeleteProduct() {
    try {
      if (!isSample) {
        const productService = new ProductService();
        await productService.deleteSupplierProduct(
          $session.company_accountname,
          productElementOverview.id,
          $session.accessToken
        );
        onDelete(productElementOverview.id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      toggleConfirmation();
    }
  }

  async function retrieveProductDetail(productID) {
    if (!isSample) {
      try {
        const productService = new ProductService();
        productElementDetail = await productService.getProductById(
          productID,
          $session.accessToken
        );
      } catch (e) {
        console.error(e);
      }
    }
  }

  async function productButtonDetailAction() {
    document.body.style.cursor = "wait";
    await goto(ProductDetailPath);
    document.body.style.cursor = "auto";
  }
</script>

{#if confirmationMode && isEditableProfile}
  <ConfirmationModal
    title={isSample
      ? "Crea un producto y este desaparacerá"
      : `Desea eliminar el producto ${productElementOverview.name}`}
    onAccept={onDeleteProduct}
    onDecline={toggleConfirmation}
  />
{/if}

{#if editableMode && isEditableProfile}
  <Modal on:click={toggleEditableMode}>
    <ProductForm
      on:click={toggleEditableMode}
      afterSubmit={reloadComponentData}
      ProductElement={isSample ? null : productElementDetail}
    />
  </Modal>
{/if}

<div
  class="ProfileProductCard {onBoarding
    ? 'ProfileProductCard--Onboarding'
    : ''}"
>
  {#if isEditableProfile}
    <div class="ProfileProductCard-edit-button">
      <EditButton
        size={25}
        color="gray"
        onEdit={toggleEditableMode}
        onDelete={toggleConfirmation}
        disabled={onBoarding}
        menuButton
      />
    </div>
  {/if}

  <ProductCard
    principalImage={productPrincipalImage}
    name={productElementOverview.name}
    withDetail
    buttonDetailAction={ProductDetailPath ? productButtonDetailAction : ""}
    subname={productElementOverview.category}
    minimum_price={productElementOverview.minimum_price}
    maximum_price={productElementOverview.maximum_price}
    currency={productElementOverview.price_currency}
  />
</div>

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
  .ProfileProductCard--Onboarding {
    z-index: 30;
    background-color: white;
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
