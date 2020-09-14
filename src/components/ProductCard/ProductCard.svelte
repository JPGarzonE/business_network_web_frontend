<script>
  import { getContext } from "svelte";
  import { stores } from "@sapper/app";
  import PencilOutline from "svelte-material-icons/PencilOutline.svelte";
  import Modal from "../Modal.svelte";
  import EditButton from "../EditButton/EditButton.svelte";
  import ProductForm from "../../containers/ProductForm/ProductForm.svelte";

  export let id;
  export let media;
  export let name;
  export let category;
  export let description;
  export let minimum_price;
  export let maximum_price;
  export let currency_id;

  const { session } = stores();
  const isSessionUserProfile = true;
  /*getContext("isSessionUserProfile");*/

  let editableMode = false;
  let displayStory = false;

  function toggleEditableMode() {
    editableMode = !editableMode;
  }

  function toggleStoryDisplay() {
    displayStory = !displayStory;
  }

  function reloadComponentData(ProductElementData) {
    name = ProductElementData.name;
    category = ProductElementData.category ? ProductElementData.category : null;
    media = ProductElementData.media ? ProductElementData.media : null;
    description = ProductElementData.description
      ? ProductElementData.description
      : null;
    minimum_price = ProductElementData.minimum_price
      ? ProductElementData.minimum_price
      : null;
    maximum_price = ProductElementData.maximum_price
      ? ProductElementData.maximum_price
      : null;
    currency_id = ProductElementData.currency_id
      ? ProductElementData.currency_id
      : null;
    editableMode = false;
  }
  async function deleteProduct() {
    try {
      const productService = new ProductService();
      const certificationData = await productService.deleteProductElement(
        $session.username,
        id,
        $session.accessToken
      );
      onDelete(id);
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
      ProductElement={{ id: id, name: name, category: category, description: description, media: media, minimum_price: minimum_price, maximum_price: maximum_price, currency_id: currency_id }} />
  </Modal>
{/if}
<div class="ProductCard">
  <figure
    class="ProductCard-media-container {media && media.path ? '' : 'ProductCard-media-container--empty'}"
    on:click={toggleEditableMode}>
    {#if media && media.path}
      <img src={media.path} alt={name} class="ProductCard-media-image" />
    {:else}
      <img
        src="/images/profile_icon.svg"
        alt={name}
        class="ProductCard-media-image--default" />
    {/if}
  </figure>
  {#if isSessionUserProfile}
    <div class="ProductCard-edit-button">
      <EditButton
        size={25}
        color="gray"
        onEdit={toggleEditableMode}
        onDelete={deleteProduct}
        menuButton />
    </div>
  {/if}

  <h4 class="ProductCard-name">{name}</h4>

  {#if category}
    <p class="ProductCard-story">{category}</p>
  {/if}
  {#if minimum_price != null && maximum_price != null}
    <p class="ProductCard-price">
      {minimum_price} - {maximum_price}
      {currency_id}
    </p>
  {/if}
</div>
