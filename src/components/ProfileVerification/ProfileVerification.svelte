<script>
  import { stores } from '@sapper/app';
  import { getContext, onMount } from 'svelte';
  import CompanyVerificationService from '../../services/verifications/company.verification.service.js';
  import CheckDecagram from 'svelte-material-icons/CheckDecagram.svelte';

  const { session } = stores();
  const companyVerificationService = new CompanyVerificationService();
  let isVerifiedProfile = getContext('isVerifiedProfile');
  const isEditableProfile = getContext('isEditableProfile');

  let verification;

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

<div class="ProfileVerification">
  {#if isVerifiedProfile}
    <div class="ProfileVerification-card ProfileVerification-card--verified">
      <span class="icon-check"><CheckDecagram size=22 /></span>
      <span class="ProfileVerification-title">Empresa verificada</span>
    </div>
  {:else if false}
    {#if verification && verification.state.toLowerCase() == 'inprogress'}
      <div
        class="ProfileVerification-card ProfileVerification-card--inprogress">
        <span class="ProfileVerification-title">
          La empresa se encuentra en proceso de verificación.<br /> En las proximas
          horas revisa <b style="color:#5387cc;text-decoration:underline;">el
            correo que se encuentra en el certificado de cámara y comercio</b> para
          finalizar el proceso.
        </span>
      </div>
    {:else if verification && verification.state.toLowerCase() == 'none'}
      <div class="ProfileVerification-card ProfileVerification-card--none">
        <span class="ProfileVerification-title">
          Tu empresa aún no esta verificada, sube tu certificado de <a id="profile-submit-certificate-link" class="ProfileVerification-submit-link"> camara
            de comercio aquí </a>
        </span>
      </div>
    {/if}
  {:else if isSessionUserProfile}
    <div class="ProfileVerification-card ProfileVerification-card--none">
      <span class="ProfileVerification-title"> Empresa no verificada </span>
    </div>
  {/if}
</div>
