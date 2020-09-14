<script>
  import { getContext } from "svelte";
  import { stores } from "@sapper/app";
  import Textfield from "@smui/textfield";
  import Select, { Option } from "@smui/select";
  import HelperText from "@smui/textfield/helper-text";
  import CharacterCounter from "@smui/textfield/character-counter/index";
  import PlusCircleOutline from "svelte-material-icons/PlusCircleOutline.svelte";
  import Dropzone from "../../components/Dropzone/Dropzone.svelte";
  import ProductService from "../../services/companies/product.service.js";
  import { CATEGORY } from "../../store/store.js";
  export let afterSubmit;
  export let ProductElement; // Pass if is an update form
  const { session } = stores();
  const isSessionUserProfile = true;
  /*getContext("isSessionUserProfile");*/
  let category = ProductElement
    ? ProductElement.category
    : CATEGORY
    ? CATEGORY[0]
    : "";
  const fields = ["name", "description"];

  const productEditData = ProductElement ? ProductElement : {};

  let name = productEditData.name ? productEditData.name : "";
  let description = productEditData.description
    ? productEditData.description
    : "";
  let media = productEditData.media ? productEditData.media : "";
  let minimum_price = productEditData.minimum_price
    ? productEditData.minimum_price
    : "";
  let maximum_price = productEditData.maximum_price
    ? productEditData.maximum_price
    : "";
  let currency_id = productEditData.currency_id
    ? productEditData.currency_id
    : "";
  let certificates = productEditData.certificates
    ? productEditData.certificates
    : "";
  let minimum_purchase = productEditData.minimum_purchase
    ? productEditData.minimum_purchase
    : "";
  let tariff_heading = productEditData.tariff_heading
    ? productEditData.tariff_heading
    : "";
  let newMediaFile;
  let formErrorMessage = null;
  let nameFeedback;
  let descriptionFeedback;

  function validateName() {
    if (name && name.length >= 2) {
      if (name.length > 50) {
        nameFeedback = "Máximo 50 caracteres";
        return false;
      }

      nameFeedback = "";
      return true;
    } else if (name && name.length > 0 && name.length < 2) {
      nameFeedback = "Mínimo 2 caracteres";
      return false;
    } else {
      nameFeedback = "El nombre es obligatorio";
      return false;
    }
  }

  function validateDescription() {
    if (description && description.length >= 2) {
      if (description.length > 155) {
        descriptionFeedback = `${description.length} caracteres - Máximo 155`;
        return false;
      }
    } else if (
      description &&
      description.length > 0 &&
      description.length < 2
    ) {
      descriptionFeedback = "Mínimo 2 caracteres";
      return false;
    }

    descriptionFeedback = "";
    return true;
  }

  function validateProductForm() {
    if (!(validateName() && validateDescription())) {
      formErrorMessage = "Los datos no son válidos";
      throw new Error();
    } else {
      formErrorMessage = "";
    }
  }

  async function submit(event) {
    const Target = event.target;
    Target.style.opacity = 0.4;
    Target.style.cursor = "not-allowed";

    try {
      if (isSessionUserProfile) {
        validateProductForm();
        let dataToSubmit = {
          category: category,
          name: name,
          minimum_price: minimum_price,
          maximum_price: maximum_price,
          tariff_heading: tariff_heading,
          minimum_purchase: minimum_purchase,
          description: description,
          currency_id: currency_id,
        };

        if (description) dataToSubmit.description = description;

        let productElement;
        if (ProductElement && ProductElement.id)
          productElement = await submitUpdate(dataToSubmit);
        else productElement = await submitCreate(dataToSubmit);

        afterSubmit(productElement);
      }
    } catch (e) {
      const error = e.message;
      fields.map((field) => {
        if (error[field]) {
          formErrorMessage += `${formErrorMessage ? "\n" : ""}${field}: ${
            error[field]
          }`;
        }
      });
    } finally {
      Target.style.opacity = 1;
      Target.style.cursor = "pointer";
    }
  }

  async function submitCreate(dataToSubmit) {
    const productService = new ProductService();

    if (newMediaFile) {
      const productData = await productService.createUserProductWithImage(
        $session.username,
        newMediaFile,
        dataToSubmit,
        $session.accessToken
      );

      return productData;
    } else {
      const productData = await productService.createUserProduct(
        $session.username,
        dataToSubmit,
        $session.accessToken
      );

      return productData;
    }
  }

  async function submitUpdate(dataToSubmit) {
    const productService = new ProductService();

    if (newMediaFile) {
      const productData = await productService.updateUserProductElementWithImage(
        $session.username,
        ProductElement.id,
        newMediaFile,
        dataToSubmit,
        $session.accessToken
      );

      return productData;
    } else {
      const productData = await productService.updateUserProductElement(
        $session.username,
        ProductElement.id,
        dataToSubmit,
        $session.accessToken
      );

      return productData;
    }
  }
</script>

<style>
  @import "/styles/form.css";

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
      bind:imageFile={newMediaFile}
      imagePath={media ? media.path : null} />
    <div class="productform-previewMini">
      <div>
        <Dropzone
          id="ProductForm"
          bind:imageFile={newMediaFile}
          imagePath={media ? media.path : null}
          small="true" />
      </div>
      <div>
        <Dropzone
          id="ProductForm"
          bind:imageFile={newMediaFile}
          imagePath={media ? media.path : null}
          small="true" />
      </div>
      <div>
        <Dropzone
          id="ProductForm"
          bind:imageFile={newMediaFile}
          imagePath={media ? media.path : null}
          small="true" />
      </div>
    </div>
  </div>

  <form class="ProductForm-form ProfileForm-form">
    <div class="form-group">
      <Textfield
        style="width: 100%;"
        variant="outlined"
        bind:value={name}
        label="Nombre del Producto"
        input$aria-controls="certificate-name"
        input$aria-describedby="certificate-name"
        input$maxlength="50" />
      <HelperText id="certificate-name">Máximo 50 caracteres</HelperText>
    </div>
    <div class="form-group">
      <HelperText id="certificate-name">Máximo 50 caracteres</HelperText>
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
          bind:value={minimum_price}
          label="Precio mínimo"
          input$aria-controls="certificate-name"
          input$aria-describedby="certificate-name"
          input$maxlength="50" />
        <Textfield
          style="width: 45%;"
          variant="outlined"
          bind:value={maximum_price}
          label="Precio máximo"
          input$aria-controls="certificate-name"
          input$aria-describedby="certificate-name"
          input$maxlength="50" />
      </div>
    </div>
    <div class="form-group">
      <Textfield
        style="width: 100%;"
        variant="outlined"
        bind:value={tariff_heading}
        label="Partida arancelaria"
        input$aria-controls="certificate-name"
        input$aria-describedby="certificate-name"
        input$maxlength="50" />
      <HelperText id="certificate-name">Máximo 50 caracteres</HelperText>
    </div>
    <div class="form-group">
      <Textfield
        style="width: 100%;"
        variant="outlined"
        bind:value={minimum_purchase}
        label="Compra mínima"
        input$aria-controls="certificate-name"
        input$aria-describedby="certificate-name"
        input$maxlength="50" />
      <HelperText id="certificate-name">Máximo 50 caracteres</HelperText>
    </div>
    <div class="form-group">
      <Textfield
        style="width: 100%;"
        variant="outlined"
        bind:value={certificates}
        label="Certificaciones"
        input$aria-controls="certificate-name"
        input$aria-describedby="certificate-name"
        input$maxlength="50" />
      <HelperText id="certificate-name">Máximo 50 caracteres</HelperText>
    </div>
    <div class="form-group">
      <Textfield
        fullwidth
        textarea
        variant="outlined"
        bind:value={description}
        label="Añadir descripción"
        input$aria-controls="certificate-description"
        input$aria-describedby="certificate-description"
        input$maxlength="155">
        <CharacterCounter>0 / 50</CharacterCounter>
      </Textfield>
    </div>

    <button
      on:click|preventDefault={submit}
      class="ProductForm-button button button--secondary">
      <PlusCircleOutline size={15} />
      Añadir Producto
    </button>
  </form>
</div>
