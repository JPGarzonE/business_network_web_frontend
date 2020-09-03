<script>
  import { getContext } from 'svelte';
  import { stores } from '@sapper/app';
  import Textfield from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text';
  import CharacterCounter from '@smui/textfield/character-counter/index';
  import ImageUploadInput from '../../components/inputs/ImageUploadInput.svelte';
  import CertificationsService from '../../services/companies/certifications.service.js';

  export let afterSubmit;
  export let CertificationElement; // Pass if is an update form
  const { session } = stores();
  const isSessionUserProfile = getContext('isSessionUserProfile');

  const fields = ['name', 'category', 'description'];
  const categories = [
    'Equipo',
    'Procesos',
    'Capacitaciones',
    'Logros',
    'Metodologías',
    'Certificaciones',
    'Otro',
  ];
  const OptionOther = categories[categories.length - 1];

  let name = CertificationElement ? CertificationElement.name : null;
  let category = CertificationElement
    ? CertificationElement.category
    : categories[0];
  let description = CertificationElement
    ? CertificationElement.description
    : null;
  let media = CertificationElement ? CertificationElement.media : null;
  let newMediaFile;

  let formErrorMessage = '';
  $: otherCategory = category !== OptionOther ? null : otherCategory;

  let nameFeedback;
  let otherCategoryFeedback;
  let descriptionFeedback;

  function validateName() {
    if (name && name.length >= 2) {
      if (name.length > 50) {
        nameFeedback = 'Máximo 50 caracteres';
        return false;
      }

      nameFeedback = '';
      return true;
    } else if (name && name.length > 0 && name.length < 2) {
      nameFeedback = 'Mínimo 2 caracteres';
      return false;
    } else {
      nameFeedback = 'El título es obligatorio';
      return false;
    }
  }

  function validateOtherCategory() {
    if (category === OptionOther) {
      if (otherCategory && otherCategory.length >= 3) {
        if (otherCategory.length > 50) {
          otherCategoryFeedback = 'Máximo 50 caracteres';
          return false;
        }

        otherCategoryFeedback = '';
        return true;
      } else if (
        otherCategory &&
        otherCategory.length > 0 &&
        otherCategory.length < 3
      ) {
        otherCategoryFeedback = 'Mínimo 3 caracteres';
        return false;
      } else {
        otherCategoryFeedback = 'La categoria es obligatoria';
        return false;
      }
    }

    otherCategoryFeedback = '';
    return true;
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
      descriptionFeedback = 'Mínimo 2 caracteres';
      return false;
    }

    descriptionFeedback = '';
    return true;
  }

  function validateCertificationForm() {
    if (!(validateName() && validateOtherCategory() && validateDescription())) {
      formErrorMessage = 'Los datos no son válidos';
      throw new Error();
    } else {
      formErrorMessage = '';
    }
  }

  async function submit(event) {
    let categoryToSubmit = otherCategory ? otherCategory : category;

    const Target = event.target;
    Target.style.opacity = 0.4;
    Target.style.cursor = 'not-allowed';

    try {
      if (isSessionUserProfile) {
        validateCertificationForm();
        let dataToSubmit = {
          name: name,
          category: categoryToSubmit,
        };

        if (description) dataToSubmit.description = description;

        let certificationElement;
        if (CertificationElement && CertificationElement.id)
          certificationElement = await submitUpdate(dataToSubmit);
        else certificationElement = await submitCreate(dataToSubmit);

        afterSubmit(certificationElement);
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
    const certificationsService = new CertificationsService();

    if (newMediaFile) {
      const certificationData = await certificationsService.createUserCertificationElementWithImage(
        $session.username,
        newMediaFile,
        dataToSubmit,
        $session.accessToken
      );

      return certificationData;
    } else {
      const certificationData = await certificationsService.createUserCertificationElement(
        $session.username,
        dataToSubmit,
        $session.accessToken
      );

      return certificationData;
    }
  }

  async function submitUpdate(dataToSubmit) {
    const certificationsService = new CertificationsService();

    if (newMediaFile) {
      const certificationData = await certificationsService.updateUserCertificationElementWithImage(
        $session.username,
        CertificationElement.id,
        newMediaFile,
        dataToSubmit,
        $session.accessToken
      );

      return certificationData;
    } else {
      const certificationData = await certificationsService.updateUserCertificationElement(
        $session.username,
        CertificationElement.id,
        dataToSubmit,
        $session.accessToken
      );

      return certificationData;
    }
  }
</script>

<style>
  @import '/styles/form.css';

  .CertificationForm-headline {
    width: 100%;
    max-width: 400px;
  }

  .CertificationForm-title {
    margin: 25px 0px 15px;
    font-size: 1.2em;
    font-weight: 400;
    font-family: var(--title-font);
    text-align: center;
    letter-spacing: 0.035em;
  }

  .CertificationForm-subtitle {
    text-align: center;
    font-size: 0.95em;
    color: var(--secondary-text-color);
  }

  .CertificationForm-preview {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 25px 0px 15px;
  }

  .CertificationForm-preview-card {
    max-width: 300px;
    width: auto;
    height: auto;
    min-width: 250px;
    max-height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    border: 2px solid var(--principal-color);
    border-top: unset;
    border-radius: 10px;
    cursor: pointer;
  }

  .CertificationForm-preview-card--without-image {
    border-top: 2px solid var(--principal-color);
  }

  .CertificationForm-preview-media {
    position: relative;
    width: 101.5%;
    height: 66%;
    min-height: 130px;
    max-height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border-bottom: 1px solid var(--light-color);
    border-bottom-left-radius: unset;
    border-bottom-right-radius: unset;
  }

  .CertificationForm-preview-name {
    width: 100%;
    margin: 15px 0px 10px 0px;
    font-size: 1em;
    padding: 0 5%;
    text-align: start;
    font-weight: 100;
    color: var(--principal-color);
    word-break: break-word;
  }

  .CertificationForm-preview-bottom {
    width: 100%;
    min-height: 17px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 0 5%;
    font-size: 0.9em;
  }

  .CertificationForm-preview-bottom p {
    color: var(--principal-text-color);
  }

  .CertificationForm-preview-link {
    background: none;
    color: var(--principal-color);
    cursor: pointer;
    text-decoration: underline;
  }

  .CertificationForm-button {
    margin-top: 3em;
  }

  @media screen and (min-width: 400px) {
    .CertificationForm-headline {
      width: 400px;
    }
  }
</style>

<div class="CertificationForm ProfileForm">
  <button
    class="CertificationForm-close-button ProfileForm-close-button"
    on:click>
    <span>X</span>
  </button>

  <div class="CertificationForm-headline">
    <h3 class="CertificationForm-title">
      {CertificationElement ? 'Actualiza tu certificado' : 'Añadir certificado'}
    </h3>

    {#if formErrorMessage}
      <div class="form-banner--invalid">
        <p>{formErrorMessage}</p>
      </div>
    {:else if !CertificationElement}
      <p class="CertificationForm-subtitle">Sube la imagen de tu certificado</p>
    {/if}
  </div>

  <div class="CertificationForm-preview">
    <div
      class="CertificationForm-preview-card {newMediaFile || (media && media.path) ? '' : 'CertificationForm-preview-card--without-image'}">
      <div class="CertificationForm-preview-media">
        <ImageUploadInput
          id="CertificationForm"
          bind:imageFile={newMediaFile}
          imagePath={media ? media.path : null} />
      </div>
      <h4 class="CertificationForm-preview-name">{name ? name : 'Título'}</h4>
      <div class="CertificationForm-preview-bottom">
        {#if category}
          {#if category === OptionOther}
            <p>{otherCategory ? otherCategory : 'Otro'}</p>
          {:else}
            <p>{category}</p>
          {/if}
        {:else}
          <p>Categoria</p>
        {/if}
        <span class="CertificationForm-preview-link">Ver historia</span>
      </div>
    </div>
  </div>

  <form class="CertificationForm-form ProfileForm-form">

    <div class="form-group">
      <Textfield
        style="width: 100%;"
        variant="outlined"
        bind:value={name}
        label="Nombre del certificado"
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
      class="CertificationForm-button button button--principal">
      Aceptar y mostrar
    </button>

  </form>

</div>
