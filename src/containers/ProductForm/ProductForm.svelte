<script>
  import { getContext } from 'svelte';
  import { stores } from '@sapper/app';
  import Textfield from '@smui/textfield';
  import Select, { Option } from '@smui/select';
  import HelperText from '@smui/textfield/helper-text';
  import SelectHelperText from "@smui/select/helper-text";
  import CharacterCounter from '@smui/textfield/character-counter/index';
  import PlusCircleOutline from 'svelte-material-icons/PlusCircleOutline.svelte';
  import Dropzone from '../../components/Dropzone/Dropzone.svelte';
  import ProductService from '../../services/suppliers/product.service.js';
  import { validateString, validatePrice } from '../../validators/formValidators.js';
  import { CATEGORY } from '../../store/store.js';

  export let afterSubmit;
  export let ProductElement; // Pass if is an update form
  const { session } = stores();
  const isEditableProfile = getContext('isEditableProfile');

  const fields = [ 'name', 'description', 'certificates', 'minimum_purchase', 'tariff_heading', 
    'maximum_price', 'minimum_price', 'category', 'measurement_unit' ];
  const productEditData = ProductElement ? ProductElement : {};
  const editMode = ProductElement !== undefined;

  let name = productEditData.name ? productEditData.name : '';
  let category = ProductElement ? ProductElement.category : (CATEGORY ? CATEGORY[0] : '');
  let description = productEditData.description ? productEditData.description : '';

  let minimum_price = productEditData.minimum_price ? parseFloat(productEditData.minimum_price) : '';
  let maximum_price = productEditData.maximum_price ? parseFloat(productEditData.maximum_price) : '';
  let measurement_unit = productEditData.measurement_unit ? productEditData.measurement_unit : '';
  
  let currency_id = productEditData.price_currency ? productEditData.price_currency.id : 1;
  let certificates = productEditData.certificates ? productEditData.certificates : '';
  let minimum_purchase = productEditData.minimum_purchase ? productEditData.minimum_purchase : '';
  let tariff_heading = productEditData.tariff_heading ? productEditData.tariff_heading : '';

  $: minimum_price = typeof(minimum_price) === 'number' 
    ? parseFloat(minimum_price.toFixed(2)) : minimum_price;
  $: maximum_price = typeof(maximum_price) === 'number' 
    ? parseFloat(maximum_price.toFixed(2)) : maximum_price;

  let newMediaFiles = {
    main: undefined,
    secondary1: undefined,
    secondary2: undefined,
    secondary3: undefined,
  };
  let imagesToDelete = [];

  let submitErrorMessage = '';

  $: nameValidation = validateString( name, 2, 50, true, "Nombre válido" );
  
  $: categoryValidation = validateString( category, 3, 60, true, "Categoria válida" );
  
  $: descriptionValidation = validateString( description, 0, 155, false, "Descripción válida" );
  
  $: minimumPriceValidation = validatePrice( minimum_price, true, "Precio mínimo válido" );
  
  $: maximumPriceValidation = validatePrice( maximum_price, false, "Precio máximo válido" );

  $: measurementUnitValidation = validateString( measurement_unit, 0, 30, false, "Unidad de medida válida" );
  
  $: minimumPurchaseValidation = validateString( minimum_purchase, 0, 30, true, "Compra mínima válida" );

  $: tariffHeadingValidation = validateString( tariff_heading, 0, 20, false, "Partida arancelaria válida" );

  $: validBeforeSubmit = nameValidation.isValid && categoryValidation.isValid && 
    minimumPriceValidation.isValid && maximumPriceValidation.isValid && measurementUnitValidation.isValid &&
    minimumPurchaseValidation.isValid && tariffHeadingValidation.isValid && descriptionValidation.isValid;

  async function submit(event) {
    const Target = event.target;
    Target.style.opacity = 0.4;
    Target.style.cursor = 'not-allowed';

    try {
      if (isEditableProfile) {
        if( !validBeforeSubmit ) throw new Error();

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
        if( measurement_unit ) dataToSubmit.measurement_unit = measurement_unit;

        let productResult;
        if (ProductElement && ProductElement.id)
          productResult = await submitUpdate(dataToSubmit);
        else productResult = await submitCreate(dataToSubmit);
        afterSubmit(productResult);
      }
    } catch (e) {
      const error = e.message;
      submitErrorMessage = "";
      let existErrorField = false;

      fields.map((field) => {
        if (error[field]) {
          submitErrorMessage += `${submitErrorMessage ? '\n' : ''}${field}: ${
            error[field]
          }`;
        }
      });

      if( !existErrorField && !error ) submitErrorMessage = "Los datos no son válidos";
      else if( !existErrorField ) submitErrorMessage = error;
      
      document.getElementById("ProductForm").scroll(0,1);

    } finally {
      Target.style.opacity = 1;
      Target.style.cursor = 'pointer';
    }
  }

  async function submitCreate(dataToSubmit) {
    const productService = new ProductService();

    if (newMediaFiles.main ||
      newMediaFiles.secondary1 ||
      newMediaFiles.secondary2 ||
      newMediaFiles.secondary3) {
      
      const productData = await productService.createSupplierProductWithImage({
        accountname: $session.company_accountname,
        principalImage: newMediaFiles.main,
        secondaryImages: [newMediaFiles.secondary1, newMediaFiles.secondary2, newMediaFiles.secondary3],
        productData: dataToSubmit,
        accessToken: $session.accessToken,
      });

      return productData;
    } else {
      const productData = await productService.createSupplierProduct({
        accountname: $session.company_accountname,
        productData: dataToSubmit,
        accessToken: $session.accessToken,
      });

      return productData;
    }
  }

  async function submitUpdate(dataToSubmit) {
    const productService = new ProductService();

    if ( newMediaFiles.main || newMediaFiles.secondary1 ||
      newMediaFiles.secondary2 || newMediaFiles.secondary3 ) {
  
      const productData = await productService.updateSupplierProductWithImage({
        accountname: $session.company_accountname,
        productID: ProductElement.id,
        principalImage: newMediaFiles.main,
        secondaryImages: [newMediaFiles.secondary1, newMediaFiles.secondary2, newMediaFiles.secondary3],
        imagesToDelete: imagesToDelete,
        productData: dataToSubmit,
        accessToken: $session.accessToken,
      });
      return productData;
    } else {
      const productData = await productService.updateSupplierProduct({
        accountname: $session.company_accountname,
        productID: ProductElement.id,
        imagesToDelete: imagesToDelete,
        productData: dataToSubmit,
        accessToken: $session.accessToken,
      });

      return productData;
    }
  }
  function deleteImage(id) {
    if( !imagesToDelete.includes(id) )
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

<div class="ProductForm ProfileForm" id="ProductForm">
  <button class="ProductForm-close-button ProfileForm-close-button" on:click>
    <span>X</span>
  </button>

  <div class="ProductForm-headline">
    <h3 class="ProductForm-title">
      {ProductElement ? 'Actualiza tu producto' : 'Añadir producto'}
    </h3>

    {#if submitErrorMessage}
      <div class="form-banner--invalid">
        <p>{submitErrorMessage}</p>
      </div>
    {:else if !editMode}
      <p class="ProductForm-subtitle">Sube la imagen de tu producto</p>
    {/if}
  </div>

  <div class="ProductForm-preview">
    <Dropzone
      id="ProductForm"
      bind:imageFile={newMediaFiles.main}
      imagePath={editMode && ProductElement.principal_image && 
        !imagesToDelete.includes(ProductElement.principal_image.id) ? ProductElement.principal_image.path : null}
      allowDelete
      onDelete={() => {
        editMode && ProductElement.principal_image ? deleteImage(ProductElement.principal_image.id) : '';
      }} />
    <div class="productform-previewMini">
      <div>
        <Dropzone
          id="ProductForm"
          bind:imageFile={newMediaFiles.secondary1}
          imagePath={editMode && ProductElement.secondary_images[0] && 
            !imagesToDelete.includes(ProductElement.secondary_images[0].id) ? ProductElement.secondary_images[0].path : null}
          small="true"
          allowDelete
          onDelete={() => {
            editMode && ProductElement.secondary_images[0] ? deleteImage(ProductElement.secondary_images[0].id) : '';
          }} />
      </div>
      <div>
        <Dropzone
          id="ProductForm"
          bind:imageFile={newMediaFiles.secondary2}
          imagePath={editMode && ProductElement.secondary_images[1] && 
            !imagesToDelete.includes(ProductElement.secondary_images[1].id) ? ProductElement.secondary_images[1].path : null}
          small="true"
          allowDelete
          onDelete={() => {
            editMode && ProductElement.secondary_images[1] ? deleteImage(ProductElement.secondary_images[1].id) : '';
          }} />
      </div>
      <div>
        <Dropzone
          id="ProductForm"
          bind:imageFile={newMediaFiles.secondary3}
          imagePath={editMode && ProductElement.secondary_images[2] && 
            !imagesToDelete.includes(ProductElement.secondary_images[2].id) ? ProductElement.secondary_images[2].path : null}
          small="true"
          allowDelete
          onDelete={() => {
            editMode && ProductElement.secondary_images[2] ? deleteImage(ProductElement.secondary_images[2].id) : '';
          }} />
      </div>
    </div>
  </div>

  <form class="ProductForm-form ProfileForm-form">
    <div class="form-group">
      <Textfield style="width: 100%;" variant="outlined"
        bind:value={name} label="Nombre del Producto*"
        input$aria-controls="product-name"
        input$aria-describedby="product-name"
        input$maxlength="50"
        invalid={name && !nameValidation.isValid} />
        
      <HelperText id="product-name" persistent={name && !nameValidation.isValid}>
        {nameValidation.message}</HelperText>
    </div>

    <div class="form-group">
      <Select style="width: 100%;" variant="outlined" bind:value={category} 
        label="Categoria del producto*" invalid={category && !categoryValidation.isValid}>

        <Option value=""></Option>
        {#each CATEGORY as cat}
          <Option value={cat} selected={category === cat.toLowerCase()}>
            {cat}
          </Option>
        {/each}
      </Select>

      <SelectHelperText persistent={category && !categoryValidation.isValid}>
        {categoryValidation.message}</SelectHelperText>
    </div>

    <div class="form-group">
      <div class="form-group-two">
        <Textfield style="width: 45%;" variant="outlined" type="number"
          bind:value={minimum_price} label="Precio mínimo*"
          input$aria-controls="product-min-price"
          input$aria-describedby="product-min-price"
          input$maxlength="50" input$step="any"
          invalid={minimum_price && !minimumPriceValidation.isValid} />

        <Textfield style="width: 45%;" variant="outlined" type="number"
          bind:value={maximum_price} label="Precio máximo"
          input$aria-controls="product-max-price"
          input$aria-describedby="product-max-price"
          input$maxlength="50" input$step="any"
          invalid={maximum_price && !maximumPriceValidation.isValid} />
      </div>
    </div>

    <div class="form-group">
      <Textfield style="width: 100%;" variant="outlined"
        bind:value={tariff_heading} label="Partida arancelaria"
        input$aria-controls="product-tariff-heading"
        input$aria-describedby="product-tariff-heading"
        input$maxlength="50"
        invalid={tariff_heading && !tariffHeadingValidation.isValid} />

      <HelperText persistent={tariff_heading && !tariffHeadingValidation.isValid}>
        {tariffHeadingValidation.message}</HelperText>
    </div>

    <div class="form-group">
      <Textfield style="width: 100%;" variant="outlined"
        bind:value={measurement_unit} label="Unidad de medida"
        input$aria-controls="product-measurement-unit"
        input$aria-describedby="product-measurement-unit"
        input$maxlength="30"
        invalid={measurement_unit && !measurementUnitValidation.isValid} />

      <HelperText persistent={measurement_unit && !measurementUnitValidation.isValid}>
        {measurementUnitValidation.message}</HelperText>
    </div>

    <div class="form-group">
      <Textfield style="width: 100%;" variant="outlined"
        bind:value={minimum_purchase} label="Compra mínima*"
        input$aria-controls="product-min-purchase"
        input$aria-describedby="product-min-purchase"
        input$maxlength="50"
        invalid={minimum_purchase && !minimumPurchaseValidation.isValid} />

      <HelperText persistent={minimum_purchase && !minimumPurchaseValidation.isValid}>
        {minimumPurchaseValidation.message}</HelperText>
    </div>

    <div class="form-group">
      <Textfield style="width: 100%;" variant="outlined"
        bind:value={certificates} label="Certificaciones"
        input$aria-controls="product-name"
        input$aria-describedby="product-name"
        input$maxlength="50" />

      <HelperText id="product-name">Máximo 50 caracteres</HelperText>
    </div>

    <div class="form-group">
      <Textfield fullwidth textarea variant="outlined"
        bind:value={description} label="Añadir descripción"
        input$aria-controls="product-description"
        input$aria-describedby="product-description"
        input$maxlength="155"
        invalid={description && !descriptionValidation.isValid}>

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
