<script>
  import HorizontalScrollList from '../componentLists/HorizontalScrollList.svelte';
  import DNACard from '../DNA/DNACard.svelte';
  import Modal from '../Modal.svelte';
  import DNAForm from './forms/DNAForm.svelte';
  import { getContext, onMount } from 'svelte';
  import DNAService from '../../services/companies/dna.service.js';

  const isSessionUserProfile = getContext('isSessionUserProfile');
  const profileUsername = getContext('profileUsername');
  const dnaService = new DNAService();
  let DNAElements = [];

  let editableMode = false;

  onMount(async () => {
    const data = await dnaService.getUserDNA(profileUsername);
    DNAElements = data.results;
  });

  function toggleEditableMode() {
    editableMode = !editableMode;
  }

  function reloadComponentData(dnaElementData) {
    DNAElements = [...DNAElements, dnaElementData];
    editableMode = false;
  }
</script>

<style>
  .ProfileDNA {
    position: relative;
    margin: 0 20px;
    padding: 40px 20px 30px;
    border: 2px solid var(--principal-color);
    border-radius: 5px;
  }

  .ProfileDNA-headline {
    margin: 0 0 30px;
    color: var(--principal-text-color);
    font-size: 1.1em;
    font-weight: 100;
    font-family: var(--body-font);
    text-align: center;
    letter-spacing: 0.1em;
  }

  .ProfileDNA-empty-card {
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

  .ProfileDNA-empty-card-image {
    width: 140px;
    padding: 15px 20px;
    transform: rotate(270deg);
  }

  .ProfileDNA-card--create {
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

  .ProfileDNA-card--create span {
    margin-bottom: 10px;
  }

  .ProfileDNA-card--create p {
    font-size: 15px;
    color: var(--principal-color);
  }

  .ProfileDNA-empty-message {
    max-width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    text-align: center;
    color: var(--secondary-text-color);
  }

  @media screen and (min-width: 420px) {
    .ProfileDNA-card--create {
      min-width: 65%;
    }
  }

  @media screen and (min-width: 480px) {
    .ProfileDNA-card--create {
      min-width: 280px;
      margin-right: 40px;
    }
  }

  @media screen and (min-width: 850px) {
    .ProfileDNA-headline {
      margin-bottom: 15px;
      padding: 15px;
      border-bottom: 0.05em solid var(--light-color);
    }

    .ProfileDNA {
      border: none;
      padding: unset;
    }
  }
</style>

<div class="ProfileDNA">
  {#if editableMode && isSessionUserProfile}
    <Modal on:click={toggleEditableMode}>
      <DNAForm
        on:click={toggleEditableMode}
        afterSubmit={reloadComponentData} />
    </Modal>
  {/if}

  <h3 class="ProfileDNA-headline">ADN de la compañia</h3>

  <HorizontalScrollList
    id="DNA-list"
    beginningItemsNumber={DNAElements ? DNAElements.length : 0}>
    {#if isSessionUserProfile}
      <div class="ProfileDNA-card--create" on:click={toggleEditableMode}>
        <span> <i class="icon icon-add icon-add--medium" /> </span>
        <p>Crear ADN</p>
      </div>
    {:else if DNAElements && DNAElements.length <= 0}
      <div class="ProfileDNA-empty-card">
        <img
          class="ProfileDNA-empty-card-image"
          src="/static/images/profile_icon.svg"
          alt="icon_default" />
      </div>
      <div class="ProfileDNA-empty-message">
        La compañia todavía no ha agregado elementos que la identifiquen
      </div>
    {/if}

    {#each DNAElements as element}
      <DNACard
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
