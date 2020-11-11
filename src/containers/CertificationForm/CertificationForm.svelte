<script>
  import { getContext } from 'svelte';
  import { stores } from '@sapper/app';
  import Textfield from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text';
  import CharacterCounter from '@smui/textfield/character-counter/index';
  import PlusCircleOutline from 'svelte-material-icons/PlusCircleOutline.svelte';
  import Dropzone from '../../components/Dropzone/Dropzone.svelte';
  import CertificationsService from '../../services/companies/certifications.service.js';

  export let afterSubmit;
  export let CertificationElement; // Pass if is an update form
  const { session } = stores();
  const isSessionUserProfile = getContext('isSessionUserProfile');

  const fields = ['name', 'description'];

  const certificationEditData = CertificationElement
    ? CertificationElement
    : {};

  let name = certificationEditData.name ? certificationEditData.name : '';
  let description = certificationEditData.description
    ? certificationEditData.description
    : '';
  let media = certificationEditData.media ? certificationEditData.media : '';
  let newMediaFile;
  let formErrorMessage = null;
  let nameFeedback = '';
  let descriptionFeedback = '';

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
    if (!(validateName() && validateDescription())) {
      formErrorMessage = 'Los datos no son válidos';
      throw new Error();
    } else {
      formErrorMessage = null;
    }
  }

  async function submit(event) {
    const Target = event.target;
    Target.style.opacity = 0.4;
    Target.style.cursor = 'not-allowed';

    try {
      if (isSessionUserProfile) {
        validateCertificationForm();
        let dataToSubmit = {
          name: name,
        };

        if (description) dataToSubmit.description = description;

        let certification;
        if (certificationEditData.id)
          certification = await submitUpdate(dataToSubmit);
        else certification = await submitCreate(dataToSubmit);

        afterSubmit(certification);
      }
    } catch (e) {
      const error = e.message;
      fields.map((field) => {
        if (error[field]) {
          formErrorMessage += `${formErrorMessage ? '\n' : null}${field}: ${
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
        certificationEditData.id,
        newMediaFile,
        dataToSubmit,
        $session.accessToken
      );

      return certificationData;
    } else {
      const certificationData = await certificationsService.updateUserCertificationElement(
        $session.username,
        certificationEditData.id,
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
    margin: 0;
    font-size: 1.2em;
    font-weight: 400;
    font-family: var(--title-font);
    text-align: center;
    letter-spacing: 0.035em;
    color: var(--secondary-text-color);
  }

  .CertificationForm-subtitle {
    text-align: center;
    font-size: 0.95em;
    color: var(--secondary-text-color);
  }

  .CertificationForm-advice {
    width: 100%;
    max-width: 400px;
    margin-bottom: 1em;
    font-size: 0.88em;
    letter-spacing: 0.22px;
    color: var(--principal-color);
  }

  .CertificationForm-preview {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 25px 0px 15px;
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
    <Dropzone
      id="CertificationForm"
      bind:imageFile={newMediaFile}
      imagePath={media ? media.path : null} />
    </div>

    <p class="CertificationForm-advice">
      * Debe ser la imagen de la entidad que emite el certificado. No la del documento.
    </p>

  <form class="CertificationForm-form ProfileForm-form">
    <div class="form-group">
      <Textfield
        style="width: 100%;"
        variant="outlined"
        bind:value={name}
        label="Nombre del certificado*"
        input$aria-controls="certificate-name"
        input$aria-describedby="certificate-name"
        input$maxlength="50"
        on:input={validateName} />
      <HelperText id="certificate-name">{nameFeedback}</HelperText>
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
        input$maxlength="155"
        on:input={validateDescription}>
        <CharacterCounter>0 / 50</CharacterCounter>
      </Textfield>
      <HelperText id="certificate-description">
        {descriptionFeedback}
      </HelperText>
    </div>

    <button
      on:click|preventDefault={submit}
      class="CertificationForm-button button button--secondary">
      <PlusCircleOutline size={15} />
      {CertificationElement ? 'Actualizar certificado' : 'Añadir certificado'}
    </button>
  </form>
</div>
