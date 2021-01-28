<script>
  import ProfileLogo from "../../components/ProfileLogo/ProfileLogo.svelte";
  import ProfileVerification from "../../components/ProfileVerification/ProfileVerification.svelte";
  import ProfileIdentityForm from "../ProfileIdentityForm/ProfileIdentityForm.svelte";
  import Modal from "../../components/Modal.svelte";
  import CompanyContact from "../../components/CompanyContact/CompanyContact.svelte";
  import EditButton from "../../components/EditButton/EditButton.svelte";
  import { getContext } from "svelte";
  import Web from "svelte-material-icons/Web.svelte";
  import MapMarkerOutline from "svelte-material-icons/MapMarkerOutline.svelte";
  import Hoverable from "../../components/Hoverable/Hoverable.svelte";

  export let name;
  export let industry;
  export let webUrl;
  export let logo;
  export let location;
  export let contact;
  export { className as class };
  let className = "";
  $: Onboarding = className == "Onboarding";

  const isEditableProfile = getContext("isEditableProfile");

  let editableMode = false;

  let locationSubtitle;
  let address;

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
    contact = companySummary.principal_contact;
    editableMode = false;
  }

  let hoverOne = false;
  let hoverTwo = false;
  let hoverThree = false;

  function HandleHoverOne(e) {
    hoverOne = true;
  }
  function handleOffOne(e) {
    hoverOne = false;
  }
  function HandleHoverTwo(e) {
    hoverTwo = true;
  }
  function handleOffTwo(e) {
    hoverTwo = false;
  }
  function HandleHoverThree(e) {
    hoverThree = true;
  }
  function handleOffThree(e) {
    hoverThree = false;
  }
</script>

<div class="ProfileIdentity">
  {#if editableMode && isEditableProfile}
    <Modal on:click={toggleEditableMode}>
      <ProfileIdentityForm
        {name}
        {industry}
        {webUrl}
        {location}
        {contact}
        on:click={toggleEditableMode}
        afterSubmit={reloadComponentData}
      />
    </Modal>
  {/if}

  <div class="ProfileIdentity-container {className}">
    <div class="ProfileIdentity-content">
      <ProfileLogo {logo} blank={Onboarding} />
      <ProfileVerification />

      <div class="ProfileIdentity-NameContainer">
        <p class="ProfileIdentity-name">{name}</p>
        {#if isEditableProfile}
          <div class="ProfileIdentity-NameEditor">
            <EditButton
              size={17}
              color="gray"
              onEdit={toggleEditableMode}
              disabled={Onboarding}
            />
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
        <span class="ProfileIdentity-address"
          >{address ? address : "No tiene aún"}</span
        >
      </p>
      <!-- <p class="ProfileIdentity-data">
        <i class="icon-wrapper"><GoogleTranslate /></i>
        No tiene aún
      </p> -->
      <p class="ProfileIdentity-data">
        <i class="icon-wrapper"><Web /></i>
        <a class="ProfileIdentity-webUrl" href={webUrl} target="_blank"
          >{webUrl ? webUrl : "No tiene aún"}</a
        >
      </p>

      <div class="ProfileIdentity-contact-me">
        {#if !isEditableProfile || Onboarding}
          <CompanyContact {contact} disabled={Onboarding} />
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  @import "/styles/form.css";

  .ProfileIdentity {
    position: sticky;
    top: 90px;
  }

  .ProfileIdentity-container {
    position: relative;
    width: auto;
    height: auto;
    max-width: 300px;
    min-height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px;
    border-radius: 7px;
    border: 1px solid var(--principal-color);
    margin: 70px auto 20px;
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
    margin-top: -80px;
    margin-bottom: 10px;
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
    position: relative;
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
  .Onboarding {
    background-color: white;
  }

  @media screen and (min-width: 1024px) {
    .ProfileIdentity-name {
      font-size: 1.3em;
    }
  }
</style>
