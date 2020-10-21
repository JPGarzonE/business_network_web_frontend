<script>
  import { getContext } from 'svelte';
  import { stores } from '@sapper/app';
  import Textfield from '@smui/textfield';
  import Select, { Option } from '@smui/select';
  import HelperText from '@smui/textfield/helper-text';
  import CharacterCounter from '@smui/textfield/character-counter/index';
  import PlusCircleOutline from 'svelte-material-icons/PlusCircleOutline.svelte';
  import Dropzone from '../../components/Dropzone/Dropzone.svelte';
  import ProductService from '../../services/companies/product.service.js';
  import { CATEGORY } from '../../store/store.js';
  export let afterSubmit;
  export let ProductElement; // Pass if is an update form
  const { session } = stores();
  const isSessionUserProfile = getContext('isSessionUserProfile');

  const fields = [
    'name',
    'description',
    'certificates',
    'minimum_purchase',
    'tariff_heading',
    'maximum_price',
    'minimum_price',
    'category',
  ];

  const productEditData = ProductElement ? ProductElement : {};
  const editMode = ProductElement !== undefined;

  let name = productEditData.name ? productEditData.name : '';
  let category = ProductElement
    ? ProductElement.category
    : CATEGORY
    ? CATEGORY[0]
    : '';
  let description = productEditData.description
    ? productEditData.description
    : '';

  let media = productEditData.media ? productEditData.media : {};

  let minimum_price = productEditData.minimum_price
    ? productEditData.minimum_price
    : '';
  let maximum_price = productEditData.maximum_price
    ? productEditData.maximum_price
    : '';
  let currency_id = productEditData.currency ? productEditData.currency.id : 1;
  let certificates = productEditData.certificates
    ? productEditData.certificates
    : '';
  let minimum_purchase = productEditData.minimum_purchase
    ? productEditData.minimum_purchase
    : '';
  let tariff_heading = productEditData.tariff_heading
    ? productEditData.tariff_heading
    : '';
  let newMediaFiles = {
    main: undefined,
    secondary1: undefined,
    secondary2: undefined,
    secondary3: undefined,
  };
  let imagesToDelete = [];

  let formErrorMessage = null;
  let nameFeedback = '';
  let minimumPriceFeedback = '';
  let maximumPriceFeedback = '';
  let minimumPurchaseFeedback = '';

  function validateName() {
    if (name && name.length >= 2) {
      if (name.length > 50) {
        nameFeedback = 'Máximo 50 caracteres';
        return false;
      }

      nameFeedback = '';
      return true;
    } else if (name && name.length > 0 && name.length <= 2) {
      nameFeedback = 'Mínimo 2 caracteres';
      return false;
    } else {
      nameFeedback = 'El nombre es obligatorio';
      return false;
    }
  }

  function validateMinPrice() {
    if (minimum_price && minimum_price.toLocaleString().length >= 1) {
      if (minimum_price.length > 10) {
        minimumPriceFeedback = `${minimum_price.length} caracteres - Máximo 10`;
        return false;
      }
      
      minimumPriceFeedback = '';
      return true;
    } else {
      minimumPriceFeedback = 'El precio mínimo es obligatorio';
      return false;
    }
  }
  function validateMaxPrice() {
    if (maximum_price && maximum_price.length >= 1) {
      if (maximum_price.length > 10) {
        maximumPriceFeedback = `${maximum_price.length} caracteres - Máximo 10`;
        return false;
      }
    }

    maximumPriceFeedback = '';
    return true;
  }

  function validateMinimumPurchase() {
    if(minimum_purchase && minimum_purchase.length >= 1) {
      if (minimum_purchase.length > 20) {
        minimumPurchaseFeedback = `${minimum_purchase.length} caracteres - Máximo 20`;
        return false;
      }

      minimumPriceFeedback = '';
      return true;
    } else {
      minimumPurchaseFeedback = 'La compra mínima es obligatoria';
      return false;
    }
  }

  function validateProductForm() {
    if (!(validateName() && validateMinPrice() && validateMaxPrice() && validateMinimumPurchase())) {
      formErrorMessage = 'Los datos no son válidos';
      throw new Error();
    } else {
      formErrorMessage = '';
    }
  }

  async function submit(event) {
    const Target = event.target;
    Target.style.opacity = 0.4;
    Target.style.cursor = 'not-allowed';

    try {
      if (isSessionUserProfile) {
        validateProductForm();
        let dataToSubmit = {
          category: category,
          name: name,
          minimum_price: minimum_price,
          tariff_heading: tariff_heading,
          minimum_purchase: minimum_purchase,
          description: description,
          currency_id: currency_id,
        };

        if( maximum_price ) dataToSubmit.maximum_price = maximum_price;

        let productResult;
        if (ProductElement && ProductElement.id)
          productResult = await submitUpdate(dataToSubmit);
        else productResult = await submitCreate(dataToSubmit);
        afterSubmit(productResult);
      }
    } catch (e) {
      const error = e.message;
      fields.map((field) => {
        if (error[field]) {
          formErrorMessage += `${formErrorMessage ? '\n' : ''}${field}: ${
            error[field]
          }`;
        }
      });
    } finally {
      Target.style.opacity = 1;
      Target.style.cursor = 'pointer';
    }
  }

  async function submitCreate(dataToSubmit) {
    const productService = new ProductService();

    if (newMediaFiles.main) {
      const imagesList = Object.values(newMediaFiles);
      const productData = await productService.createUserProductWithImage({
        username: $session.username,
        images: imagesList,
        productData: dataToSubmit,
        accessToken: $session.accessToken,
      });

      return productData;
    } else {
      const productData = await productService.createUserProduct({
        username: $session.username,
        productData: dataToSubmit,
        accessToken: $session.accessToken,
      });

      return productData;
    }
  }

  async function submitUpdate(dataToSubmit) {
    const productService = new ProductService();
    const imagesToDeleteList = imagesToDelete.map(
      (item) => ProductElement.images[item]
    );

    if (
      newMediaFiles.main ||
      newMediaFiles.secondary1 ||
      newMediaFiles.secondary2 ||
      newMediaFiles.secondary3
    ) {
      const imagesList = Object.values(newMediaFiles);
      const productData = await productService.updateUserProductWithImage({
        username: $session.username,
        productID: ProductElement.id,
        images: imagesList,
        imagesToDelete: imagesToDeleteList,
        productData: dataToSubmit,
        accessToken: $session.accessToken,
      });
      return productData;
    } else {
      const productData = await productService.updateUserProduct({
        username: $session.username,
        productID: ProductElement.id,
        imagesToDelete: imagesToDeleteList,
        productData: dataToSubmit,
        accessToken: $session.accessToken,
      });

      return productData;
    }
  }
  function deleteImage(id) {
    imagesToDelete = [...imagesToDelete, id];
  }
</script>

<style>
  @import '/styles/form.css';

  .ProductForm-headline {
    width: 100%;
    max-width: 400px;
  }

  .ProductForm-title {
    margin: 0;
    font-size: 1.2em;
    font-weight: 400;
    font-family: var(--title-font);
    text-align: center;
    letter-spacing: 0.035em;
    color: var(--secondary-text-color);
  }

  .ProductForm-subtitle {
    text-align: center;
    font-size: 0.95em;
    color: var(--secondary-text-color);
  }

  .ProductForm-preview {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: row;
    flex-grow: 5;
    justify-content: center;
    margin: 25px 0px 15px;
  }
  .productform-previewMini {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
    margin-left: 1.2em;
  }

  .ProductForm-button {
    margin-top: 3em;
  }
  .form-group-two {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  @media screen and (min-width: 400px) {
    .ProductForm-headline {
      width: 400px;
    }
  }
</style>

<div class="ProductForm ProfileForm">
  <button class="ProductForm-close-button ProfileForm-close-button" on:click>
    <span>X</span>
  </button>

  <div class="ProductForm-headline">
    <h3 class="ProductForm-title">
      {ProductElement ? 'Actualiza tu producto' : 'Añadir producto'}
    </h3>

    {#if formErrorMessage}
      <div class="form-banner--invalid">
        <p>{formErrorMessage}</p>
      </div>
    {:else if !ProductElement}
      <p class="ProductForm-subtitle">Sube la imagen de tu producto</p>
    {/if}
  </div>

  <div class="ProductForm-preview">
    <Dropzone
      id="ProductForm"
      bind:imageFile={newMediaFiles.main}
      imagePath={editMode && ProductElement.images[0] && !imagesToDelete.includes(0) ? ProductElement.images[0].path : null}
      allowDelete
      onDelete={() => {
        editMode && ProductElement.images[0] && !imagesToDelete.includes(0) ? deleteImage(0) : '';
      }} />
    <div class="productform-previewMini">
      <div>
        <Dropzone
          id="ProductForm"
          bind:imageFile={newMediaFiles.secondary1}
          imagePath={editMode && ProductElement.images[1] && !imagesToDelete.includes(1) ? ProductElement.images[1].path : null}
          small="true"
          allowDelete
          onDelete={() => {
            editMode && ProductElement.images[1] && !imagesToDelete.includes(1) ? deleteImage(1) : '';
          }} />
      </div>
      <div>
        <Dropzone
          id="ProductForm"
          bind:imageFile={newMediaFiles.secondary2}
          imagePath={editMode && ProductElement.images[2] && !imagesToDelete.includes(2) ? ProductElement.images[2].path : null}
          small="true"
          allowDelete
          onDelete={() => {
            editMode && ProductElement.images[2] && !imagesToDelete.includes(2) ? deleteImage(2) : '';
          }} />
      </div>
      <div>
        <Dropzone
          id="ProductForm"
          bind:imageFile={newMediaFiles.secondary3}
          imagePath={editMode && ProductElement.images[3] && !imagesToDelete.includes(3) ? ProductElement.images[3].path : null}
          small="true"
          allowDelete
          onDelete={() => {
            editMode && ProductElement.images[3] && !imagesToDelete.includes(3) ? deleteImage(3) : '';
          }} />
      </div>
    </div>
  </div>

  <form class="ProductForm-form ProfileForm-form">
    <div class="form-group">
      <Textfield
        style="width: 100%;"
        variant="outlined"
        bind:value={name}
        label="Nombre del Producto*"
        input$aria-controls="product-name"
        input$aria-describedby="product-name"
        input$maxlength="50"
        on:input={validateName} />
      <HelperText id="product-name">{nameFeedback}</HelperText>
    </div>
    <div class="form-group">
      <Select
        style="width: 100%;"
        variant="outlined"
        bind:value={category}
        label="Categoria del producto*">
        {#each CATEGORY as cat}
          <Option value={cat} selected={category === cat.toLowerCase()}>
            {cat}
          </Option>
        {/each}
      </Select>
    </div>
    <div class="form-group">
      <div class="form-group-two">
        <Textfield
          style="width: 45%;"
          variant="outlined"
          type="number"
          bind:value={minimum_price}
          label="Precio mínimo*"
          input$aria-controls="product-min-price"
          input$aria-describedby="product-min-price"
          input$maxlength="50"
          input$step="any"
          on:input={validateMinPrice} />
        <Textfield
          style="width: 45%;"
          variant="outlined"
          type="number"
          bind:value={maximum_price}
          label="Precio máximo"
          input$aria-controls="product-max-price"
          input$aria-describedby="product-max-price"
          input$maxlength="50"
          input$step="any"
          on:input={validateMaxPrice} />
      </div>
    </div>
    <div class="form-group">
      <Textfield
        style="width: 100%;"
        variant="outlined"
        bind:value={tariff_heading}
        label="Partida arancelaria"
        input$aria-controls="product-tariff-heading"
        input$aria-describedby="product-tariff-heading"
        input$maxlength="50" />
      <HelperText id="product-tariff-heading">Máximo 50 caracteres</HelperText>
    </div>
    <div class="form-group">
      <Textfield
        style="width: 100%;"
        variant="outlined"
        bind:value={minimum_purchase}
        label="Compra mínima*"
        input$aria-controls="product-min-purchase"
        input$aria-describedby="product-min-purchase"
        input$maxlength="50"
        on:input={validateMinimumPurchase} />
      <HelperText id="product-min-purchase">{minimumPurchaseFeedback}</HelperText>
    </div>
    <div class="form-group">
      <Textfield
        style="width: 100%;"
        variant="outlined"
        bind:value={certificates}
        label="Certificaciones"
        input$aria-controls="product-name"
        input$aria-describedby="product-name"
        input$maxlength="50" />
      <HelperText id="product-name">Máximo 50 caracteres</HelperText>
    </div>
    <div class="form-group">
      <Textfield
        fullwidth
        textarea
        variant="outlined"
        bind:value={description}
        label="Añadir descripción"
        input$aria-controls="product-description"
        input$aria-describedby="product-description"
        input$maxlength="155">
        <CharacterCounter>0 / 50</CharacterCounter>
      </Textfield>
    </div>

    <button
      on:click|preventDefault={submit}
      class="ProductForm-button button button--secondary">
      <PlusCircleOutline size={15} />
      {ProductElement ? 'Actualizar producto' : 'Añadir producto'}
    </button>
  </form>
</div>
