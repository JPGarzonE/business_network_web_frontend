<script>
  import { getContext } from "svelte";
  import { stores } from "@sapper/app";
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text";
  import CharacterCounter from "@smui/textfield/character-counter/index";
  import PlusCircleOutline from "svelte-material-icons/PlusCircleOutline.svelte";
  import Dropzone from "../../components/Dropzone/Dropzone.svelte";
  import CertificationsService from "../../services/suppliers/certifications.service.js";
  import { _ } from "svelte-i18n";

  export let afterSubmit;
  export let CertificationElement; // Pass if is an update form
  const { session } = stores();
  const isEditableProfile = getContext("isEditableProfile");

  const fields = ["name", "description"];

  const certificationEditData = CertificationElement
    ? CertificationElement
    : {};

  let name = certificationEditData.name ? certificationEditData.name : "";
  let description = certificationEditData.description
    ? certificationEditData.description
    : "";
  let media = certificationEditData.media ? certificationEditData.media : "";
  let newMediaFile;
  let formErrorMessage = null;
  let nameFeedback = "";
  let descriptionFeedback = "";

  function validateName() {
    if (name && name.length >= 2) {
      if (name.length > 50) {
        nameFeedback = "Máximo 50 caracteres";
        return false;
      }

      nameFeedback = "";
      return true;
    } else if (name && name.length > 0 && name.length <= 2) {
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

  function validateCertificationForm() {
    if (!(validateName() && validateDescription())) {
      formErrorMessage = $_("certificationForm.invalidData");
      throw new Error();
    } else {
      formErrorMessage = null;
    }
  }

  async function submit(event) {
    const Target = event.target;
    Target.style.opacity = 0.4;
    Target.style.cursor = "not-allowed";

    try {
      if (isEditableProfile) {
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
          formErrorMessage += `${formErrorMessage ? "\n" : null}${field}: ${
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
    const certificationsService = new CertificationsService();

    if (newMediaFile) {
      const certificationData = await certificationsService.createSupplierCertificationElementWithImage(
        $session.company_accountname,
        newMediaFile,
        dataToSubmit,
        $session
      );

      return certificationData;
    } else {
      const certificationData = await certificationsService.createSupplierCertificationElement(
        $session.company_accountname,
        dataToSubmit,
        $session
      );

      return certificationData;
    }
  }

  async function submitUpdate(dataToSubmit) {
    const certificationsService = new CertificationsService();

    if (newMediaFile) {
      const certificationData = await certificationsService.updateSupplierCertificationElementWithImage(
        $session.company_accountname,
        certificationEditData.id,
        newMediaFile,
        dataToSubmit,
        $session
      );

      return certificationData;
    } else {
      const certificationData = await certificationsService.updateSupplierCertificationElement(
        $session.company_accountname,
        certificationEditData.id,
        dataToSubmit,
        $session
      );

      return certificationData;
    }
  }
</script>

<div class="CertificationForm ProfileForm">
  <button
    class="CertificationForm-close-button ProfileForm-close-button"
    on:click>
    <span>X</span>
  </button>

  <div class="CertificationForm-headline">
    <h3 class="CertificationForm-title">
      {CertificationElement
        ? $_("certificationForm.updateCertificate")
        : $_("certificationForm.addCertificate")}
    </h3>

    {#if formErrorMessage}
      <div class="form-banner--invalid">
        <p>{formErrorMessage}</p>
      </div>
    {:else if !CertificationElement}
      <p class="CertificationForm-subtitle">
        {$_("certificationForm.uploadTheImageOfYourCertificate")}
      </p>
    {/if}
  </div>

  <div class="CertificationForm-preview">
    <Dropzone
      id="CertificationForm"
      bind:imageFile={newMediaFile}
      imagePath={media ? media.path : null}
    />
  </div>

  <p class="CertificationForm-advice">
    {$_(
      "certificationForm.itMustBeTheImageOfTheEntityThatIssuesTheCertificate"
    )}
  </p>

  <form class="CertificationForm-form ProfileForm-form">
    <div class="form-group">
      <Textfield
        style="width: 100%;"
        variant="outlined"
        bind:value={name}
        label={$_("certificationForm.nameOfTheCertificate")}
        input$aria-controls="certificate-name"
        input$aria-describedby="certificate-name"
        input$maxlength="50"
        on:input={validateName}
      />
      <HelperText id="certificate-name">{nameFeedback}</HelperText>
    </div>

    <div class="form-group">
      <Textfield
        fullwidth
        textarea
        variant="outlined"
        bind:value={description}
        label={$_("certificationForm.addDescription")}
        input$aria-controls="certificate-description"
        input$aria-describedby="certificate-description"
        input$maxlength="155"
        on:input={validateDescription}
      >
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
      {CertificationElement
        ? $_("certificationForm.updateCertificate")
        : $_("certificationForm.addCertificate")}
    </button>
  </form>
</div>

<style>
  @import "/styles/form.css";

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
