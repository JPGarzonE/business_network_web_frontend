<script>
  import HorizontalScrollList from '../../components/componentLists/HorizontalScrollList.svelte';
  import RelationshipCard from '../../components/RelationshipCard/RelationshipCard.svelte';
  import Modal from '../../components/Modal.svelte';
  import RelationshipForm from '../RelationshipForm/RelationshipForm.svelte';
  import UnregisteredRelationshipForm from '../RelationshipForm/UnregisteredRelationshipForm.svelte';
  import CreateButton from '../../components/CreateButton/CreateButton.svelte';
  import CompanyService from '../../services/companies/companies.service.js';
  import { getContext, onMount } from 'svelte';

  export let unregisteredRelationships = [];
  const profileUsername = getContext('profileUsername');
  const isSessionUserProfile = getContext('isSessionUserProfile');
  const companyService = new CompanyService();

  let displayUnregisteredCreateForm = false;

  function toggleUnregisteredCreateForm() {
    displayUnregisteredCreateForm = !displayUnregisteredCreateForm;
  }

  let displayAddRelationship = false;

  function toggleAddRelationshipDisplay() {
    displayAddRelationship = !displayAddRelationship;
  }

  function hideAddRelationshipAndDisplayUnregisteredCreate() {
    displayAddRelationship = false;
    displayUnregisteredCreateForm = true;
  }

  function reloadComponentData(unregisteredRelationshipData) {
    unregisteredRelationships = [
      ...unregisteredRelationships,
      unregisteredRelationshipData,
    ];
    displayUnregisteredCreateForm = false;
  }
  function onDeleteUnregisteredRelationship(id) {
    const newArray = unregisteredRelationships.filter((item) => item.id !== id);
    unregisteredRelationships = [];
    unregisteredRelationships = newArray;
  }
</script>

<style>
  .ProfileRelationships {
    position: relative;
    margin: 0 20px;
    margin-bottom: 0px;
    padding: 40px 20px 30px;
    padding-bottom: 30px;
    border-bottom: none;
    border-radius: 5px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  .ProfileRelationships-headline {
    border-bottom: 0.05em solid var(--light-color);
    padding: 15px;
    margin: 0 0 30px;
    color: var(--principal-text-color);
    font-size: 1.1em;
    font-weight: 100;
    font-family: var(--body-font);
    text-align: center;
    letter-spacing: 0.1em;
  }

  .ProfileRelationships-card--create {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .ProfileRelationships-empty-message {
    max-width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    text-align: center;
    color: var(--secondary-text-color);
  }

  @media screen and (min-width: 850px) {
    .ProfileRelationships {
      margin: 20px;
      padding: unset;
    }

    .ProfileRelationships-headline {
      margin-bottom: 15px;
    }
  }
</style>

<div class="ProfileRelationships">
  {#if displayAddRelationship && isSessionUserProfile}
    <Modal on:click={toggleAddRelationshipDisplay}>
      <RelationshipForm
        on:click={toggleAddRelationshipDisplay}
        displayCreateCompany={hideAddRelationshipAndDisplayUnregisteredCreate} />
    </Modal>
  {/if}

  {#if displayUnregisteredCreateForm && isSessionUserProfile}
    <Modal on:click={toggleUnregisteredCreateForm}>
      <UnregisteredRelationshipForm
        on:click={toggleUnregisteredCreateForm}
        afterSubmit={reloadComponentData} />
    </Modal>
  {/if}

  <h3 class="ProfileRelationships-headline">Con que empresas trabaja</h3>
  {#if isSessionUserProfile}
    <div
      class="ProfileRelationships-card--create"
      on:click={toggleUnregisteredCreateForm}>
      <CreateButton size={25} />
    </div>
  {/if}
  <HorizontalScrollList
    id="relationships"
    beginningItemsNumber={unregisteredRelationships.length}>
    {#each unregisteredRelationships as relationshipData}
      <RelationshipCard
        {relationshipData}
        onDelete={onDeleteUnregisteredRelationship} />
    {:else}
      <div class="ProfileRelationships-empty-message">
        <p>La compañia todavía no ha las empresas con las que trabaja</p>
      </div>
    {/each}
  </HorizontalScrollList>
</div>
