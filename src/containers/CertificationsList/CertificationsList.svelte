<script>
  import { getContext } from 'svelte';
  import HorizontalScrollList from '../../components/componentLists/HorizontalScrollList.svelte';
  import CertificationCard from '../../components/CertificationCard/CertificationCard.svelte';
  import Modal from '../../components/Modal.svelte';
  import CreateButton from '../../components/CreateButton/CreateButton.svelte';
  import CertificationForm from '../CertificationForm/CertificationForm.svelte';

  const isEditableProfile = getContext('isEditableProfile');

  export let certificationsList = [];

  let editableMode = false;

  function toggleEditableMode() {
    editableMode = !editableMode;
  }

  function reloadComponentData(certificationData) {
    certificationsList = [...certificationsList, certificationData];
    editableMode = false;
  }

  function onDeleteCertification(id) {
    certificationsList = certificationsList.filter((item) => item.id !== id);
  }
</script>

<style>
  .CertificationsList {
    position: relative;
    margin: 0 20px;
    padding: 40px 20px 30px;
    border-radius: 5px;
  }

  .CertificationsList-headline {
    padding: 15px;
    margin: 0 0 30px;
    border-bottom: 0.05em solid var(--light-color);
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

  @media screen and (min-width: 850px) {
    .CertificationsList-headline {
      margin-bottom: 15px;
      padding: 15px;
    }

    .CertificationsList {
      padding: unset;
    }
  }
</style>

<div class="CertificationsList">
  {#if editableMode && isEditableProfile}
    <Modal on:click={toggleEditableMode}>
      <CertificationForm
        on:click={toggleEditableMode}
        afterSubmit={reloadComponentData} />
    </Modal>
  {/if}

  <h3 class="CertificationsList-headline">Certificaciones</h3>

  {#if isEditableProfile}
    <div class="CertificationsList-card--create">
      <div on:click={toggleEditableMode}>
        <CreateButton size={25} />
      </div>
    </div>
  {/if}
  <HorizontalScrollList
    id="certifications-list"
    beginningItemsNumber={certificationsList.length}>
    {#each certificationsList as element}
      <CertificationCard
        id={element.certificate.id}
        media={element.certificate.logo}
        name={element.certificate.name}
        description={element.certificate.description}
        onDelete={onDeleteCertification} />
    {:else}
      <CertificationCard
        name="Certificación de muestra"
        description="Descripción de la certificación de muestra"
        isSample
      />
    {/each}
  </HorizontalScrollList>
</div>
