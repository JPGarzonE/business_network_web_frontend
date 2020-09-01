<script>
  import { getContext, onMount } from 'svelte';
  import CertificationsService from '../../services/companies/certifications.service.js';
  import HorizontalScrollList from '../../components/componentLists/HorizontalScrollList.svelte';
  import CertificationCard from '../../components/CertificationCard/CertificationCard.svelte';
  import Modal from '../../components/Modal.svelte';
  import CertificationForm from '../CertificationForm/CertificationForm.svelte';

  const isSessionUserProfile = true || getContext('isSessionUserProfile');
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

  .CertificationsList-empty-card {
    width: 260px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 30px 0 0;
    border: 2px solid var(--principal-color);
    border-radius: 5px;
    padding: 0;
    cursor: pointer;
  }

  .CertificationsList-empty-card-image {
    width: 140px;
    padding: 15px 20px;
    transform: rotate(270deg);
  }

  .CertificationsList-card--create {
    width: auto;
    min-width: 80%;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 30px 0 0;
    border-radius: 5px;
    margin-right: 30px;
    padding: 20px;
    background-color: #f1f1f169;
    border: 1.5px solid var(--principal-color);
    cursor: pointer;
  }

  .CertificationsList-card--create span {
    margin-bottom: 10px;
  }

  .CertificationsList-card--create p {
    font-size: 15px;
    color: var(--principal-color);
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

  <HorizontalScrollList
    id="DNA-list"
    beginningItemsNumber={CertificationsList ? CertificationsList.length : 0}>
    {#if isSessionUserProfile}
      <div
        class="CertificationsList-card--create"
        on:click={toggleEditableMode}>
        <span>
          <i class="icon icon-add icon-add--medium" />
        </span>
        <p>Crear ADN</p>
      </div>
    {:else if CertificationsList && CertificationsList.length <= 0}
      <div class="CertificationsList-empty-card">
        <img
          class="CertificationsList-empty-card-image"
          src="/images/profile_icon.svg"
          alt="icon_default" />
      </div>
      <div class="CertificationsList-empty-message">
        La compañia todavía no ha agregado elementos que la identifiquen
      </div>
    {/if}

    {#each CertificationsList as element}
      <CertificationCard
        id={element.id}
        media={element.media}
        name={element.name}
        category={element.category}
        description={element.description} />
    {:else}
      <p>Loading...</p>
    {/each}
  </HorizontalScrollList>
</div>
