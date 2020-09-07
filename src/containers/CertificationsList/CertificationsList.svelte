<script>
  import { getContext, onMount } from 'svelte';
  import CertificationsService from '../../services/companies/certifications.service.js';
  import HorizontalScrollList from '../../components/componentLists/HorizontalScrollList.svelte';
  import CertificationCard from '../../components/CertificationCard/CertificationCard.svelte';
  import Modal from '../../components/Modal.svelte';
  import CreateButton from '../../components/CreateButton/CreateButton.svelte';
  import CertificationForm from '../CertificationForm/CertificationForm.svelte';

  const isSessionUserProfile = getContext('isSessionUserProfile');
  const profileUsername = getContext('profileUsername');
  const certificationsService = new CertificationsService();
  let CertificationsList = [];

  let editableMode = false;

  onMount(async () => {
    const data = await certificationsService.getUserCertifications(
      profileUsername
    );
    CertificationsList = data.results;
  });

  function toggleEditableMode() {
    editableMode = !editableMode;
  }

  function reloadComponentData(certificationData) {
    CertificationsList = [...CertificationsList, certificationData];
    editableMode = false;
  }
</script>

<style>
  .CertificationsList {
    position: relative;
    margin: 0 20px;
    padding: 40px 20px 30px;
    border: 2px solid var(--principal-color);
    border-radius: 5px;
  }

  .CertificationsList-headline {
    margin: 0 0 30px;
    color: var(--principal-text-color);
    font-size: 1.1em;
    font-weight: 100;
    font-family: var(--body-font);
    text-align: center;
    letter-spacing: 0.1em;
  }

  .CertificationsList-card--create {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .CertificationsList-empty-message {
    max-width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    text-align: center;
    color: var(--secondary-text-color);
  }

  @media screen and (min-width: 420px) {
    .CertificationsList-card--create {
      min-width: 65%;
    }
  }

  @media screen and (min-width: 480px) {
    .CertificationsList-card--create {
      min-width: 280px;
      margin-right: 40px;
    }
  }

  @media screen and (min-width: 850px) {
    .CertificationsList-headline {
      margin-bottom: 15px;
      padding: 15px;
      border-bottom: 0.05em solid var(--light-color);
    }

    .CertificationsList {
      border: none;
      padding: unset;
    }
  }
</style>

<div class="CertificationsList">
  {#if editableMode && isSessionUserProfile}
    <Modal on:click={toggleEditableMode}>
      <CertificationForm
        on:click={toggleEditableMode}
        afterSubmit={reloadComponentData} />
    </Modal>
  {/if}

  <h3 class="CertificationsList-headline">Certificaciones</h3>

  {#if isSessionUserProfile}
    <div class="CertificationsList-card--create" on:click={toggleEditableMode}>
      <CreateButton size={25} />
    </div>
  {/if}
  <HorizontalScrollList
    id="DNA-list"
    beginningItemsNumber={CertificationsList ? CertificationsList.length : 0}>
    <CertificationCard
      id={123}
      name={'holas'}
      media={{ path: 'https://lh3.googleusercontent.com/proxy/-K--hSUg0WCOLegImu4fZM6-YklLSFibiWXrrypnUqgzgg1txdbkWL2lzKwN2xtbKQYnPJeoN6avqbTMTygJ-67uSkKIDgiveg' }} />
    {#each CertificationsList as element}
      <CertificationCard
        id={element.id}
        media={element.media}
        name={element.name}
        description={element.description} />
    {:else}
      <div class="CertificationsList-empty-message">
        <p>La compañia todavía no ha agregado elementos que la identifiquen</p>
      </div>
    {/each}
  </HorizontalScrollList>
</div>
