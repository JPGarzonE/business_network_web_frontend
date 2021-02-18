<script>
  import { stores } from "@sapper/app";
  import { _ } from "svelte-i18n";

  import FileUploadInput from "../../components/FileUploadInput/FIleUploadInput.svelte";
  import CompanyVerificationService from "../../services/verifications/company.verification.service.js";

  export let afterSubmit;
  export let continueWithoutCertificate;
  const { session } = stores();
  const companyVerificationService = new CompanyVerificationService();

  let certificate = null; // File

  async function submit(event) {
    const Target = event.target;
    Target.style.opacity = 0.4;
    Target.style.cursor = "not-allowed";

    if (certificate) {
      try {
        const verificationData = await companyVerificationService.uploadCompanyCertificate(
          $session.company_accountname,
          $session,
          certificate
        );
        console.log("Aftersubmit: ", verificationData);
        afterSubmit( verificationData );

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
  }
</script>

<div class="CertificateUploadForm">
  <button class="CertificateUploadForm-close-button" on:click>
    <span>x</span>
  </button>

  <div class="CertificateUploadForm-header">
    <h4 class="CertificateUploadForm-title">
      {$_("certificateUploadForm.noVerifiedProfile")}
    </h4>
  </div>
  <div class="CertificateUploadForm-content">
    <p class="CertificateUploadForm-message">
      {$_("certificateUploadForm.rememberVerifyCOmpany")}
    </p>
    <img
      class="preview-image"
      src="images/verified-profile.png"
      alt="preview verified profile"
    />
  </div>
  <div class="CertificateUploadForm-footer">
    <div class="CertificateUploadForm-footer--actions">
      <FileUploadInput
        name="Certificate"
        message={$_("certificateUploadForm.uploadCertificate")}
        acceptFiles={["application/pdf"]}
        primary
        bind:value={certificate}
      />

      {#if certificate}
        <button
          type="button"
          on:click|preventDefault={submit}
          class="CertificateUploadForm-button button button--secondary"
          >{$_("certificateUploadForm.send")}
        </button>
      {:else}
        <button
          type="button"
          on:click|preventDefault={continueWithoutCertificate}
          class="CertificateUploadForm-button button button--secondary"
          >{$_("certificateUploadForm.continueWhitoutCertificate")}</button
        >
      {/if}
    </div>
  </div>
</div>

<style>
  @import "/styles/button.css";

  .CertificateUploadForm {
    width: 90%;
    height: auto;
    position: fixed;
    z-index: 20;
    bottom: auto;
    background-color: white;
    padding: 0 1em;
  }

  .CertificateUploadForm-close-button {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  .CertificateUploadForm-close-button span {
    font-size: 2em;
  }

  .CertificateUploadForm-header {
    display: flex;
    justify-content: center;
    padding-bottom: 1.1em;
    padding-top: 2.5em;
  }

  .CertificateUploadForm-title {
    font-size: 1.2em;
    font-weight: 100;
    font-family: var(--title-font);
    letter-spacing: 0.035em;
  }

  .CertificateUploadForm-content {
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 0 5px;
  }
  .CertificateUploadForm-content .preview-image {
    width: 60%;
    max-width: 200px;
  }

  .CertificateUploadForm-button {
    height: 50px;
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: none;
    font-size: 0.95em;
  }

  .CertificateUploadForm-message {
    text-align: center;
    font-size: 0.9em;
    max-width: 400px;
    color: var(--light-color);
  }

  .CertificateUploadForm-footer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 1.1em 0;
  }
  .CertificateUploadForm-footer--actions {
    width: 80%;
    max-width: 280px;
  }

  @media screen and (min-width: 650px) {
    .CertificateUploadForm {
      width: auto;
      min-width: 400px;
      height: auto;
      border-radius: 5px;
      padding: 0 1.5em;
    }
    .CertificateUploadForm-content {
      padding: 20px 30px 5px;
    }

    .CertificateUploadForm-content {
      height: auto;
    }
  }
</style>
