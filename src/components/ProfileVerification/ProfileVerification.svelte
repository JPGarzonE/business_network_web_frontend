<script>
  import { stores } from "@sapper/app";
  import { getContext, onMount } from "svelte";
  import CheckDecagram from "svelte-material-icons/CheckDecagram.svelte";
  import MessageAlertOutline from "svelte-material-icons/MessageAlertOutline.svelte";
  import ProgressCheck from "svelte-material-icons/ProgressCheck.svelte";
  import Modal from "../Modal.svelte";
  import CompanyVerificationService from "../../services/verifications/company.verification.service.js";
  import CertificateUpload from "../../containers/CertificateUploadForm/CertificateUploadForm.svelte";
  import { _ } from "svelte-i18n";

  const { session } = stores();
  const companyVerificationService = new CompanyVerificationService();
  let isVerifiedProfile = getContext("isVerifiedProfile");
  const isEditableProfile = getContext("isEditableProfile");

  let verification = null;
  let uploadCertificateForm = false;

  function toggleCertificateForm() {
    uploadCertificateForm = !uploadCertificateForm;
  }
  function afterUpload( verificationData ) {
    verification = verificationData;
    toggleCertificateForm();
  }

  onMount(async () => {
    if (isEditableProfile) {
      try {
        const data = await companyVerificationService.getCompanyVerification(
          $session.company_accountname,
          $session
        );
        verification = data;
      }
      catch(e) {
        console.log("Error: ", e);
      }
    }
  });
</script>

<div class="ProfileVerification">

  {#if isVerifiedProfile}

    <div class="ProfileVerification-card ProfileVerification-card--verified">
      <span class="card-icon"><CheckDecagram size="23" /></span>
      <span class="ProfileVerification-title">
        {$_("profileVerification.verifiedCompany")}
      </span>
    </div>

  {:else if isEditableProfile}

    {#if verification && verification.state.toLowerCase() == "inprogress"}
      <div
        class="ProfileVerification-card ProfileVerification-card--inprogress"
      >
        <span class="card-icon"><ProgressCheck size="20" /></span>
        <span class="ProfileVerification-title">
          {$_("profileVerification.verificationInProcess")}
        </span>
      </div>
      
      <p class="ProfileVerification-card--call-to-action inprogress">
        {$_("profileVerification.checkinTheNextFewHours")}
        <b style="text-decoration:underline;"
          >{$_("profileVerification.theMailIsFoundInTheCertificate")}
        </b>
        {$_("profileVerification.toFinishTheProcess")}
      </p>

    {:else if verification && verification.state.toLowerCase() == "none"}

      <div class="ProfileVerification-card ProfileVerification-card--none">
        <span class="card-icon"><MessageAlertOutline size="20" /></span>
        <span class="ProfileVerification-title ProfileVerification-title--none">
          {$_("profileVerification.companyNotVerified")}
        </span>
      </div>

      <p class="ProfileVerification-card--call-to-action error">
        <a href="/" on:click|preventDefault={toggleCertificateForm}>
          {$_("profileVerification.clickHere")}
        </a>
        {$_("profileVerification.toUploadTheCertificate")}
      </p>
    {/if}
    
  {/if}

  {#if uploadCertificateForm}
    <Modal on:click={toggleCertificateForm}>
      <CertificateUpload
        on:click={toggleCertificateForm}
        afterSubmit={afterUpload}
        continueWithoutCertificate={toggleCertificateForm} />
    </Modal>
  {/if}

</div>

<style>
  .error, .error a {
    color: var(--error-color);
  }

  .inprogress {
    color: var(--button-color);
  }

  .ProfileVerification {
    margin: 25px 0px 15px;
  }

  .ProfileVerification-card {
    min-height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7px;
    border-radius: 0px;
  }
  .card-icon {
    color: var(--secondary-color);
    margin-right: 10px;
    display: flex;
  }

  .ProfileVerification-card--verified {
    background-color: var(--success-color);
  }

  .ProfileVerification-card--inprogress {
    background-color: var(--button-color);
  }

  .ProfileVerification-card--none {
    background-color: var(--error-color);
  }

  .ProfileVerification-card--call-to-action {
    font-size: 0.75rem;
    margin: 12px 20px 0px;
  }
  .ProfileVerification-card--call-to-action a {
    font-weight: bold;
  }
  .ProfileVerification-title {
    color: white;
    text-align: center;
    font-size: 0.9375em;
    letter-spacing: 0.216px;
  }

  .ProfileVerification-title--none {
    font-size: 0.875em;
  }
</style>