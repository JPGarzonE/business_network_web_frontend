<script>
  import ProfileLogo from "../../components/ProfileLogo/ProfileLogo.svelte";
  import ProfileVerification from "../../components/ProfileVerification/ProfileVerification.svelte";
  import ProfileIdentityForm from "../ProfileIdentityForm/ProfileIdentityForm.svelte";
  import Modal from "../../components/Modal.svelte";
  import CompanyContact from "../../components/CompanyContact/CompanyContact.svelte";
  import EditButton from "../../components/EditButton/EditButton.svelte";
  import { getContext } from "svelte";
  import MapMarkerOutline from "svelte-material-icons/MapMarkerOutline.svelte";
  import MapOutline from 'svelte-material-icons/MapOutline.svelte';
  import Earth from 'svelte-material-icons/Earth.svelte';
  import { _ } from "svelte-i18n";
  import Hoverable from "../../components/Hoverable/Hoverable.svelte";

  export let displayName = '';
  export let industry = '';
  export let logo = {};
  export let principalLocation = {};
  export let saleLocations = [];
  export let contact = {};
  export { className as class };

  let className = "";
  $: Onboarding = className == "Onboarding";

  const isEditableProfile = getContext("isEditableProfile");
  principalLocation = principalLocation ? principalLocation : {};

  let editableMode = false;
  $: address = principalLocation.address ? principalLocation.address : '';
  let principalLocationSubtitle;

  $: if (principalLocation.country) {
    if (principalLocation.city)
      principalLocationSubtitle = `${principalLocation.city}, ${principalLocation.country}`;
    else
      principalLocationSubtitle = `${principalLocation.country}`;
  }

  function toggleEditableMode() {
    editableMode = !editableMode;
  }

  function reloadComponentData(supplierSummary) {
    displayName = supplierSummary.display_name;
    industry = supplierSummary.industry;
    principalLocation = supplierSummary.principal_location;
    saleLocations = supplierSummary.sale_locations;
    editableMode = false;
  }

  let hoverOne = false;
  let hoverTwo = false;
  let hoverThree = false;
</script>

<div class="ProfileIdentity">
  {#if editableMode && isEditableProfile}
    <Modal on:click={toggleEditableMode}>
      <ProfileIdentityForm
        {displayName}
        {industry}
        {principalLocation}
        {saleLocations}
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
        <p class="ProfileIdentity-name">{displayName}</p>
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
      </div>

      <div class="ProfileIdentity-data">
        <i class="icon-wrapper"
          on:mouseover={() => (hoverOne = !hoverOne)}
          on:mouseout={() => (hoverOne = !hoverOne)}
        >  
          <MapMarkerOutline />
        </i>

        <p class="ProfileIdentity-address">
          {address ? address : $_("profileIdentity.itdoesnthaveyet")}
        </p>
  
        {#if hoverOne}
          <Hoverable textRight="70%" 
            message={$_("profileIdentity.address")}
          />
        {/if}
      </div>

      <div class="ProfileIdentity-data">
        <i class="icon-wrapper" 
          on:mouseover={() => hoverTwo= !hoverTwo} 
          on:mouseout={() => hoverTwo=!hoverTwo}
        >
          <MapOutline />
        </i>

        <p class="ProfileIdentity-location">
          {principalLocationSubtitle ? principalLocationSubtitle : $_("profileIdentity.itdoesnthaveyet")}
        </p>

        {#if hoverTwo}
          <Hoverable 
            message={$_("profileIdentity.principalLocation")}
          />
        {/if}
      </div>

      <div class="ProfileIdentity-data">
        <i class="icon-wrapper" 
          on:mouseover={() => hoverThree= !hoverThree} 
          on:mouseout={() => hoverThree=!hoverThree}
        >
          <Earth />
        </i>

        <p class="ProfileIdentity-salelocations">
          {#each saleLocations as saleLocation, idx}
            <span>
              {saleLocation.country}{idx+1 === saleLocations.length ? '' : ','}&nbsp;
            </span>
          {:else}
            {$_("profileIdentity.itdoesnthaveyet")}
          {/each}
        </p>

        {#if hoverThree}
          <Hoverable
            message={$_("profileIdentity.exportCountries")}
          />
        {/if}
      </div>

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

  .ProfileIdentity-industry {
    text-align: center;
  }

  .ProfileIdentity-salelocations {
    display: flex;
    flex-wrap: wrap;
    word-break: break-word;
  }

  .ProfileIdentity-data {
    position: relative;
    width: 80%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-self: flex-start;
    margin: 0 auto;
    margin-bottom: 0.9rem;
    font-size: 0.9rem;
    color: #b3b3b3;
    margin-left: 10%;
  }
  .icon-wrapper {
    display: flex;
    align-self: flex-start;
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
