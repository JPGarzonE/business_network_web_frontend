<script>
  import ProfileLogo from "../../components/ProfileLogo/ProfileLogo.svelte";
  import ProfileVerification from "../../components/ProfileVerification/ProfileVerification.svelte";
  import ProfileIdentityForm from "../ProfileIdentityForm/ProfileIdentityForm.svelte";
  import Modal from "../../components/Modal.svelte";
  import ButtonChat from "../../components/ButtonChat/ButtonChat.svelte";
  import ContactUsButton from "../../components/ContactUsButton/ContactUsButton.svelte";
  import EditButton from "../../components/EditButton/EditButton.svelte";
  import { stores } from '@sapper/app';
  import { getContext } from "svelte";
  import { goto } from '@sapper/app';
  import Web from "svelte-material-icons/Web.svelte";
  import GoogleTranslate from "svelte-material-icons/GoogleTranslate.svelte";
  import MapMarkerOutline from "svelte-material-icons/MapMarkerOutline.svelte";
  import Whatsapp from 'svelte-material-icons/Whatsapp.svelte';

  export let name;
  export let industry;
  export let webUrl;
  export let logo;
  export let location;
  export let contact;

  const { session } = stores();
  const isSessionUserProfile = getContext("isSessionUserProfile");

  let editableMode = false;

  let locationSubtitle;
  let address;
  let companyContactLink = contact && contact.phone ? 
    `https://wa.me/57${contact.phone}` : 'https://wa.me/573133800223';

  $: {
    if (location) {
      if (location.city && location.country)
        locationSubtitle = `${location.city}, ${location.country}`;
      else if (location.country) locationSubtitle = `${location.country}`;

      address = location.address ? location.address : null;
    }
  }

  function toggleEditableMode() {
    editableMode = !editableMode;
  }

  function reloadComponentData(companySummary) {
    name = companySummary.name;
    industry = companySummary.industry;
    location = companySummary.principal_location;
    webUrl = companySummary.web_url;
    contact = companySummary.contact_channel;
    editableMode = false;
  }
</script>

<style>
  @import "/styles/form.css";

  .ProfileIdentity {
    position: sticky;
    top: 100px;
  }

  .ProfileIdentity-container {
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
  .ProfileIdentity-NameContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .ProfileIdentity-content {
    width: 100%;
    min-width: 210px;
    position: relative;
    margin-top: -100px;
    margin-bottom: 20px;
  }

  .ProfileIdentity-name {
    max-width: 200px;
    text-align: center;
    text-transform: capitalize;
    font-size: 1.2em;
    font-weight: 100;
    color: var(--secondary-text-color);
  }
  .ProfileIdentity-NameEditor {
    margin: auto 0;
  }

  .ProfileIdentity-subheadline {
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

  .ProfileIdentity-industry,
  .ProfileIdentity-location,
  .ProfileIdentity-address {
    text-align: center;
  }

  .ProfileIdentity-data {
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

  .ProfileIdentity-webUrl {
    word-break: break-word;
  }

  .ProfileIdentity-contact-me {
    width: 90%;
    margin: 0 auto;
    margin-top: 15%;
  }

  .ProfileIdentity-advice {
    width: 100%;
    margin-bottom: 1em;
    font-size: 0.88em;
    letter-spacing: 0.22px;
    color: var(--principal-color);
  }

  @media screen and (min-width: 1024px) {
    .ProfileIdentity-name {
      font-size: 1.3em;
    }
  }
</style>

<div class="ProfileIdentity">

  {#if editableMode && isSessionUserProfile}
    <Modal on:click={toggleEditableMode}>
      <ProfileIdentityForm
        {name} {industry} {webUrl} 
        {location} {contact}
        on:click={toggleEditableMode}
        afterSubmit={reloadComponentData} />
    </Modal>
  {/if}

  <div class="ProfileIdentity-container">
    <div class="ProfileIdentity-content">
      <ProfileLogo {logo} />
      <ProfileVerification />

      <div class="ProfileIdentity-NameContainer">
        <p class="ProfileIdentity-name">{name}</p>
        {#if isSessionUserProfile}
          <div class="ProfileIdentity-NameEditor">
            <EditButton size={17} color="gray" onEdit={toggleEditableMode} />
          </div>
        {/if}
      </div>
  
      <div class="ProfileIdentity-subheadline">
        <p class="ProfileIdentity-industry">{industry}</p>
        {#if locationSubtitle}
          <p class="ProfileIdentity-location">{locationSubtitle}</p>
        {/if}
      </div>

      <p class="ProfileIdentity-data">
        <i class="icon-wrapper"><MapMarkerOutline /></i>
        <span
          class="ProfileIdentity-address">{address ? address : 'No tiene aún'}</span>
      </p>
      <!-- <p class="ProfileIdentity-data">
        <i class="icon-wrapper"><GoogleTranslate /></i>
        No tiene aún
      </p> -->
      <p class="ProfileIdentity-data">
        <i class="icon-wrapper"><Web /></i>
        <a class="ProfileIdentity-webUrl" href={webUrl} 
          target="_blank">{webUrl ? webUrl : 'No tiene aún'}</a>
      </p>

      <div class="ProfileIdentity-contact-me">
        {#if !$session.authenticated}
          <ButtonChat title="Registrate para contactar"
            buttonAction={async ()=>{await goto('')}}>
            <span slot="button-icon" style="display: flex;">
              <Whatsapp size={18} />
            </span>
          </ButtonChat>
        {:else if !isSessionUserProfile && contact && contact.phone}
          <ButtonChat title="Chatea con el vendedor"
            buttonAction={() => {window.open(companyContactLink, "_blank")}}>
            <span slot="button-icon" style="display: flex;">
              <Whatsapp size={18} />
            </span>
          </ButtonChat>
        {:else if !isSessionUserProfile}
          {#if $session.isVerified}
            <p class="ProfileIdentity-advice">
              Este usuario no tiene asignado un número de contacto.<br/>
              Hable con nuestros asesores de venta y lo contactaremos por usted.
            </p>
          {:else}
            <p class="ProfileIdentity-advice">
              No puede contactar directamente hasta estar verificado.<br/>
              Hable con nuestros asesores de venta y lo contactaremos por usted.
            </p>
          {/if}
          <ContactUsButton title="Contáctanos"
            buttonAction={()=>{window.open(companyContactLink, "_blank")}}>
          </ContactUsButton>
        {/if}
      </div>

    </div>
  </div>
</div>
