<script>
  import { stores } from "@sapper/app";
  import { getContext, onMount } from "svelte";
  import CheckDecagram from "svelte-material-icons/CheckDecagram.svelte";

  import Modal from "../Modal.svelte";
  import CompanyVerificationService from "../../services/verifications/company.verification.service.js";
  import CertificateUpload from "../../containers/CertificateUploadForm/CertificateUploadForm.svelte";
  import { _ } from "svelte-i18n";

  const { session } = stores();
  const companyVerificationService = new CompanyVerificationService();
  let isVerifiedProfile = getContext("isVerifiedProfile");
  const isEditableProfile = getContext("isEditableProfile");

  let verification;
  let uploadCertificateForm = false;

  function toggleCertificateForm() {
    uploadCertificateForm = !uploadCertificateForm;
  }
  function profileVerified() {
    isVerifiedProfile = true;
    toggleCertificateForm();
  }

  // onMount(async () => {
  //   if (isEditableProfile) {
  //     const data = await companyVerificationService.getCompanyVerification(
  //       $session.company_accountname,
  //       $session.accessToken
  //     );
  //     verification = data;
  //   }
  // });
</script>

<div class="ProfileVerification">
  {#if isVerifiedProfile}
    <div class="ProfileVerification-card ProfileVerification-card--verified">
      <span class="icon-check"><CheckDecagram size="22" /></span>
      <span class="ProfileVerification-title"
        >{$_("profileVerification.verifiedCompany")}</span
      >
    </div>
  {:else if false}
    {#if verification && verification.state.toLowerCase() == "inprogress"}
      <div
        class="ProfileVerification-card ProfileVerification-card--inprogress"
      >
        <span class="ProfileVerification-title">
          {$_("profileVerification.theCompanyIsInTheProcessOfVerification")}<br
          />
          {$_("profileVerification.CheckinTheNextFewHours")}
          <b style="color:#5387cc;text-decoration:underline;"
            >{$_("profileVerification.theMailIsFoundInTheCertificate")}</b
          >
          {$_("profileVerification.toFinishTheProcess")}
        </span>
      </div>
    {:else if verification && verification.state.toLowerCase() == "none"}
      <div class="ProfileVerification-card ProfileVerification-card--none">
        <span class="ProfileVerification-title">
          {$_("profileVerification.yourCompanyIsNotYetVerified")}
          <a
            id="profile-submit-certificate-link"
            class="ProfileVerification-submit-link">
            {$_("profileVerification.chamberOfCommerceHere")}
          </a>
        </span>
      </div>
    {/if}
  {:else if isEditableProfile}
    <div class="ProfileVerification-card ProfileVerification-card--none">
      <span class="ProfileVerification-title"
        >{$_("profileVerification.companyNotVerified")}</span
      >
    </div>

    <p class="ProfileVerification-card--call-to-action">
      {$_("profileVerification.haz")}
      <a href="/" on:click|preventDefault={toggleCertificateForm}
        >{$_("profileVerification.clickHere")}</a
      >
      {$_("profileVerification.toUploadTheCertificate")}
    </p>
  {/if}
  {#if uploadCertificateForm}
    <Modal on:click={toggleCertificateForm}>
      <CertificateUpload
        on:click={toggleCertificateForm}
        afterSubmit={profileVerified}
        continueWithoutCertificate={toggleCertificateForm}
      />
    </Modal>
  {/if}
</div>

<style>
  .ProfileVerification-card {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px 0px;
    padding: 7px;
    border-radius: 0px;
  }
  .icon-check {
    color: var(--secondary-color);
    margin-right: 3%;
    display: flex;
  }

  .ProfileVerification-card--verified {
    background-color: var(--success-color);
  }

  .ProfileVerification-card--inprogress {
    padding: 15px 20px;
    background-color: var(--light-color);
  }

  .ProfileVerification-card--none {
    background-color: var(--error-color);
  }

  .ProfileVerification-card--none span {
    padding: 5px 40px;
  }

  .ProfileVerification-card--call-to-action {
    color: var(--error-color);
    font-size: 0.7rem;
    margin: 0 20px 10px;
  }
  .ProfileVerification-card--call-to-action a {
    color: var(--error-color);
    font-weight: bold;
  }
  .ProfileVerification-title {
    color: white;
    text-align: center;
    font-size: 0.9rem;
  }

  .ProfileVerification-submit-link {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
