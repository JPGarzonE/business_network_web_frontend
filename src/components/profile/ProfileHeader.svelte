<script>
  import ProfileLogo from "./ProfileLogo.svelte";
  import Verification from "./Verification.svelte";
  import HeaderForm from "./forms/HeaderForm.svelte";
  import Modal from "../Modal.svelte";
  import ButtonChat from "../ButtonChat/ButtonChat.svelte";
  import EditButton from "../EditButton/EditButton.svelte";
  import { stores } from "@sapper/app";
  import { getContext } from "svelte";
  import Web from "svelte-material-icons/Web.svelte";
  import GoogleTranslate from "svelte-material-icons/GoogleTranslate.svelte";
  import MapMarkerOutline from "svelte-material-icons/MapMarkerOutline.svelte";

  export let name;
  export let industry;
  export let logo;
  export let contact;
  export let location;
  const { session } = stores();
  const isSessionUserProfile = getContext("isSessionUserProfile");

  let editableMode = false;

  let locationSubtitle;
  let address;
  let contactPhone;
  let contactEmail;

  $: {
    if (location) {
      if (location.city && location.country)
        locationSubtitle = `${location.city}, ${location.country}`;
      else if (location.country) locationSubtitle = `${location.country}`;

      address = location.address ? location.address : null;
    }
  }

  $: {
    if (contact) {
      if (contact.phone)
        contactPhone = `${contact.ext_phone ? contact.ext_phone : ""} ${
          contact.phone
        }`;

      if (contact.email) contactEmail = contact.email;
    }
  }

  function toggleEditableMode() {
    editableMode = !editableMode;
  }

  function reloadComponentData(contactData, locationData) {
    contact = contactData;
    location = locationData;
    editableMode = false;
  }
</script>

<style>
  @import "/styles/form.css";

  .ProfileHeader-container {
    position: relative;
    width: auto;
    height: auto;
    max-width: 300px;
    min-height: 430px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px;
    border-radius: 7px;
    border: 1px solid var(--principal-color);
    margin: 90px auto 20px;
  }
  .ProfileHeader-NameContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .ProfileHeader-content {
    width: 100%;
    min-width: 210px;
    position: relative;
    margin-top: -100px;
    margin-bottom: 20px;
  }

  .ProfileHeader-name {
    max-width: 200px;
    text-align: center;
    text-transform: capitalize;
    font-size: 1.2em;
    font-weight: 100;
    color: var(--secondary-text-color);
  }
  .ProfileHeader-NameEditor {
    margin: auto 0;
  }

  .ProfileHeader-subheadline {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 30px;
    padding: 0px 25px;
    color: var(--light-color);
    font-size: 15px;
    text-transform: capitalize;
  }

  .ProfileHeader-industry,
  .ProfileHeader-location,
  .ProfileHeader-address {
    text-align: center;
  }

  .ProfileHeader-data {
    width: 75%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-self: flex-start;
    margin-bottom: 0.9rem;
    font-size: 0.9rem;
    color: #b3b3b3;
    margin-left: 10%;
  }
  .icon-wrapper {
    display: flex;
    border: 1px solid var(--principal-color);
    border-radius: 100%;
    color: var(--principal-color);
    margin-right: 5%;
    padding: 2px;
  }

  @media screen and (min-width: 1024px) {
    .ProfileHeader-name {
      font-size: 1.3em;
    }
  }
</style>

<div class="ProfileHeader">
  {#if editableMode && isSessionUserProfile}
    <Modal on:click={toggleEditableMode}>
      <HeaderForm
        {name}
        {industry}
        {contact}
        {location}
        on:click={toggleEditableMode}
        afterSubmit={reloadComponentData} />
    </Modal>
  {/if}

  <div class="ProfileHeader-container">
    <div class="ProfileHeader-content">
      <ProfileLogo {logo} />
      <Verification />
      <div class="ProfileHeader-NameContainer">
        <p class="ProfileHeader-name">{name}</p>
        {#if isSessionUserProfile}
          <div class="ProfileHeader-NameEditor">
            <EditButton size={17} color="gray" onEdit={toggleEditableMode} />
          </div>
        {/if}
      </div>
      <div class="ProfileHeader-subheadline">
        <p class="ProfileHeader-industry">{industry}</p>
        {#if locationSubtitle}
          <p class="ProfileHeader-location">{locationSubtitle}</p>
        {/if}
      </div>
      <p class="ProfileHeader-data">
        <i class="icon-wrapper"><MapMarkerOutline /></i>
        <span
          class="ProfileHeader-address">{address ? address : 'No tiene aún'}</span>
      </p>
      <p class="ProfileHeader-data">
        <i class="icon-wrapper"><GoogleTranslate /></i>
        {locationSubtitle ? locationSubtitle : 'Medellin'}
      </p>
      <p class="ProfileHeader-data">
        <i class="icon-wrapper"><Web /></i>
        {locationSubtitle ? locationSubtitle : 'Colombia, Chile, Peru'}
      </p>
      <ButtonChat />
    </div>
  </div>
</div>
