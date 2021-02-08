<script>
  import Modal from "../Modal.svelte";
  import LogoUpload from "../../containers/ProfileLogoUpload/ProfileLogoUpload.svelte";
  import { getContext } from "svelte";
  import EditButton from "../EditButton/EditButton.svelte";
  export let logo;
  export let blank = false;

  const profileAccountname = getContext("profileAccountname");
  const isEditableProfile = getContext("isEditableProfile");

  let editableMode = false;

  function toggleEditableMode() {
    editableMode = !editableMode;
  }

  function reloadComponentData(company) {
    logo = company.logo;
    editableMode = false;
  }
</script>

<div class="ProfileLogo">
  {#if editableMode && isEditableProfile}
    <Modal on:click={toggleEditableMode}>
      <LogoUpload
        actualLogo={logo}
        on:click={toggleEditableMode}
        afterSubmit={reloadComponentData}
      />
    </Modal>
  {/if}

  <figure
    class="ProfileLogo-container {logo && logo.path
      ? ''
      : 'ProfileLogo-container--default'}"
  >
    <img
      src={logo && logo.path ? logo.path : "/images/profile_icon.svg"}
      alt={profileAccountname}
      class="ProfileLogo-image {logo && logo.path
        ? ''
        : 'ProfileLogo-image--default'}"
    />
    {#if isEditableProfile}
      <div class="CertificationCard-edit-button">
        <EditButton
          disabled={blank}
          size={20}
          color="var(--light-color)"
          onEdit={toggleEditableMode}
        />
      </div>
    {/if}
  </figure>
</div>

<style>
  .ProfileLogo-container {
    width: auto;
    max-width: 150px;
    min-width: 134px;
    max-height: 135px;
    min-height: 120px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 20px auto;
    margin-bottom: 30px;
    padding: 10px;
    border: 1px solid var(--principal-color);
    background-color: white;
  }

  .ProfileLogo-container--default {
    width: 120px;
    background: white;
    border: 1px solid var(--principal-color);
  }

  .CertificationCard-edit-button {
    position: absolute;
    top: 70%;
    right: 0;
    padding: 5px;
  }

  .ProfileLogo-image {
    width: 100%;
    max-height: inherit;
    border-radius: inherit;
    object-fit: contain;
  }

  .ProfileLogo-image--default {
    padding: 20px;
  }

  @media screen and (min-width: 767px) {
    .ProfileLogo-container--default {
      width: 150px;
    }
  }

  @media screen and (min-width: 850px) {
    .ProfileLogo-container--default {
      width: 130px;
    }
  }
</style>
