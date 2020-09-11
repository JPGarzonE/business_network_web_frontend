<script>
  import HorizontalScrollList from '../../components/componentLists/HorizontalScrollList.svelte';
  import RelationshipCard from '../../components/RelationshipCard/RelationshipCard.svelte';
  import Modal from '../../components/Modal.svelte';
  import RelationshipForm from '../RelationshipForm/RelationshipForm.svelte';
  import UnregisteredRelationshipForm from '../RelationshipForm/UnregisteredRelationshipForm.svelte';
  import CreateButton from '../../components/CreateButton/CreateButton.svelte';
  import CompanyService from '../../services/companies/companies.service.js';
  import { getContext, onMount } from 'svelte';

  export let registeredRelationships = [];
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

  let relationships = [];
  let screenSize = 700;

  onMount(async () => {
    window.addEventListener('resize', () => {
      screenSize = window.innerWidth;
    });
    screenSize = window.innerWidth;

    for (let i = 0; i < registeredRelationships.length; i++) {
      let relationship = registeredRelationships[i];
      let otherCompany;

      if (relationship.requester.username === profileUsername)
        otherCompany = relationship.addressed;
      else otherCompany = relationship.requester;

      const companyData = await companyService.getCompany(
        otherCompany.username
      );
      let company = {
        isRegisteredCompany: true,
        username: otherCompany.username,
        name: companyData.name,
        logoPath: companyData.logo ? companyData.logo.path : null,
        industry: companyData.industry,
        isVerified: true,
      };

      relationships = [...relationships, company];
    }

    for (let i = 0; i < unregisteredRelationships.length; i++) {
      let unregisteredCompany = unregisteredRelationships.unregistered;
      let company = {
        isRegisteredCompany: false,
        username: null,
        name: unregisteredCompany.name,
        logoPath: null,
        industry: unregisteredCompany.industry,
        isVerified: false,
      };

      relationships = [...relationships, company];
    }
  });
</script>

<style>
  .ProfileRelationships {
    grid-area: relationships;
    position: relative;
    margin: 0 20px;
    margin-bottom: 0px;
    padding: 40px 20px 30px;
    padding-bottom: 30px;
    border: 2px solid var(--principal-color);
    border-bottom: none;
    border-radius: 5px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  .ProfileRelationships-headline {
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
      border: none;
    }

    .ProfileRelationships-headline {
      margin-bottom: 15px;
      padding: 15px;
      border-bottom: 0.05em solid var(--light-color);
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
        afterSubmit=" " />
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
  <HorizontalScrollList>
    <RelationshipCard
      name="huger"
      industry="Desarrollo"
      location="Bog. Colombia" />

    {#each relationships as company}
      <RelationshipCard {...company} />
    {:else}
      <div class="ProfileRelationships-empty-message">
        <p>La compañia todavía no ha las empresas con las que trabaja</p>
      </div>
    {/each}
  </HorizontalScrollList>
</div>
