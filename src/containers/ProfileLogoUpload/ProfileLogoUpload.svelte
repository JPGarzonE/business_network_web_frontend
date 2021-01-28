<script>
  import CompanyService from '../../services/companies/companies.service.js';
  import { stores } from '@sapper/app';
  import { getContext } from 'svelte';
  import { _ } from 'svelte-i18n';

  export let actualLogo;
  export let afterSubmit;
  const { session } = stores();
  const profileUsername = getContext('profileUsername');
  const isSessionUserProfile = getContext('isSessionUserProfile');

  let imageUploaded = false;
  let newLogoFile;

  function handleProfileLogoUploadChange(event) {
    const ProfileLogoUploadInput = event.target;
    newLogoFile = ProfileLogoUploadInput.files[0];

    const Reader = new FileReader();
    Reader.onload = (e) => {
      let res = e.target.result;
      updateLogoImagePreview(res);
      imageUploaded = true;
    };
    Reader.readAsDataURL(newLogoFile);
  }

  function updateLogoImagePreview(imgValue) {
    const ProfileLogoUploadImage = document.getElementById(
      'ProfileLogoUpload-image'
    );
    ProfileLogoUploadImage.src = imgValue;
  }

  async function submit(event) {
    try {
      event.target.style.opacity = 0.4;
      event.target.style.cursor = 'not-allowed';

      const companyService = new CompanyService();
      if (isEditableProfile && newLogoFile) {
        const Company = await companyService.updateCompanyLogo(
          $session.company_accountname,
          newLogoFile,
          $session.accessToken
        );

        afterSubmit(Company);
      }

      event.target.style.opacity = 1;
      event.target.style.cursor = 'pointer';
    } catch (e) {
      event.target.style.opacity = 1;
      event.target.style.cursor = 'pointer';
    }
  }
</script>

<div class="ProfileLogoUpload">
  <button class="ProfileLogoUpload-close-button" on:click>
    <span>x</span>
  </button>

  <div class="ProfileLogoUpload-header">
    <h4 class="ProfileLogoUpload-title">{$_('profileLogoUpload.addLogo')}</h4>
  </div>
  <div class="ProfileLogoUpload-content">
    <label for="ProfileLogoUpload">
      <figure
        class="ProfileLogoUpload-logo-container {actualLogo && actualLogo.path
          ? ''
          : 'ProfileLogo-container--default'}"
      >
        <img
          id="ProfileLogoUpload-image"
          src={actualLogo && actualLogo.path
            ? actualLogo.path
            : '/images/profile_icon.svg'}
          alt={profileUsername}
          class="ProfileLogoUpload-logo-image {actualLogo && actualLogo.path
            ? ''
            : 'ProfileLogo-image--default'}"
        />
        <span>
          <i style="width:40px;height:40px;" class="icon icon-upload" />
        </span>
      </figure>
    </label>

    <label for="ProfileLogoUpload" class="ProfileLogoUpload-button-label">
      <span class="ProfileLogoUpload-button button button--principal">
        {imageUploaded
          ? $_('profileLogoUpload.changeImage')
          : $_('profileLogoUpload.uploadImage')}
      </span>
    </label>

    <input
      on:change={handleProfileLogoUploadChange}
      type="file"
      id="ProfileLogoUpload"
      accept="images/*"
      style="display: none;"
    />

    {#if imageUploaded}
      <p class="ProfileLogoUpload-message">
        {$_('profileLogoUpload.thisIsHowYourCompanyProfileImage')}
      </p>
    {:else}
      <p class="ProfileLogoUpload-message">
        {$_('profileLogoUpload.uploadTheLogoOrImageThatRepresentsYourComany')}
        <br />
        {$_(
          'profileLogoUpload.youWillHaveMoreOpportunitiesToAttractNewCostumersAndCloseDeals'
        )}
      </p>
    {/if}
  </div>
  <div class="ProfileLogoUpload-footer">
    {#if imageUploaded}
      <button
        type="button"
        on:click|preventDefault={submit}
        class="ProfileLogoUpload-button button button--principal"
        >Guardar logo</button
      >
    {/if}
  </div>
</div>

<style>
  @import '/styles/button.css';

  .ProfileLogoUpload {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 20;
    bottom: auto;
    background-color: white;
  }

  .ProfileLogoUpload-close-button {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  .ProfileLogoUpload-close-button span {
    font-size: 2em;
  }

  .ProfileLogoUpload-header {
    padding: 1.1em 1.5em;
    border-bottom: 1px solid var(--light-color);
  }

  .ProfileLogoUpload-title {
    font-size: 1.2em;
    font-weight: 100;
    font-family: var(--title-font);
    letter-spacing: 0.035em;
  }

  .ProfileLogoUpload-content {
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px 30px 40px;
  }

  .ProfileLogoUpload-logo-container {
    width: auto;
    max-width: 150px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 0 auto;
    padding: 0.1em;
    border: 2px solid var(--principal-color);
    background-color: white;
    cursor: pointer;
  }

  .ProfileLogoUpload-logo-container > span {
    position: absolute;
    bottom: 25%;
    visibility: hidden;
  }

  .ProfileLogoUpload-logo-container:hover img {
    opacity: 0.7;
  }

  .ProfileLogoUpload-logo-container:hover > span {
    visibility: visible;
  }

  .ProfileLogoUpload-logo-image {
    width: 100%;
    min-width: 130px;
    max-height: 130px;
    min-height: 100px;
    border-radius: inherit;
    object-fit: contain;
  }

  .ProfileLogoUpload-button {
    max-width: 170px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: none;
    font-size: 0.95em;
  }

  .ProfileLogoUpload-button-label {
    width: 100%;
    max-width: 170px;
    margin: 20px 0 35px 0px;
  }

  .ProfileLogoUpload-message {
    text-align: center;
    font-size: 0.9em;
    max-width: 440px;
    color: var(--secondary-text-color);
  }

  .ProfileLogoUpload-footer {
    display: flex;
    justify-content: flex-end;
    padding: 1.1em 1.5em;
    border-top: 1px solid var(--light-color);
  }

  @media screen and (min-width: 650px) {
    .ProfileLogoUpload {
      width: auto;
      min-width: 600px;
      height: auto;
      border-radius: 5px;
    }

    .ProfileLogoUpload-content {
      height: auto;
    }
  }
</style>
