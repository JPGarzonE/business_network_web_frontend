<script>
  import HorizontalScrollList from "../../components/componentLists/HorizontalScrollList.svelte";
  import RelationshipCard from "../../components/RelationshipCard/RelationshipCard.svelte";
  import Modal from "../../components/Modal.svelte";
  import RelationshipForm from "../RelationshipForm/RelationshipForm.svelte";
  import UnregisteredRelationshipForm from "../RelationshipForm/UnregisteredRelationshipForm.svelte";
  import CreateButton from "../../components/CreateButton/CreateButton.svelte";
  import { getContext } from "svelte";
  import { _ } from "../../services/i18n";

  export let unregisteredRelationships = [];
  const isEditableProfile = getContext("isEditableProfile");

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

<div class="RelationshipsList">
  {#if displayAddRelationship && isEditableProfile}
    <Modal on:click={toggleAddRelationshipDisplay}>
      <RelationshipForm
        on:click={toggleAddRelationshipDisplay}
        displayCreateCompany={hideAddRelationshipAndDisplayUnregisteredCreate}
      />
    </Modal>
  {/if}

  {#if displayUnregisteredCreateForm && isEditableProfile}
    <Modal on:click={toggleUnregisteredCreateForm}>
      <UnregisteredRelationshipForm
        on:click={toggleUnregisteredCreateForm}
        afterSubmit={reloadComponentData}
      />
    </Modal>
  {/if}

  <h3 class="RelationshipsList-headline">
    {$_("relationshipList.whoWorksWithUs")}
  </h3>
  {#if isEditableProfile}
    <div class="RelationshipsList-card--create">
      <div on:click={toggleUnregisteredCreateForm}>
        <CreateButton size={25} />
      </div>
    </div>
  {/if}
  <HorizontalScrollList
    id="relationships"
    beginningItemsNumber={unregisteredRelationships.length}
  >
    {#each unregisteredRelationships as relationshipData}
      <RelationshipCard
        {relationshipData}
        onDelete={onDeleteUnregisteredRelationship}
      />
    {:else}
      <div class="RelationshipsList-empty-message">
        <p>{$_("relationshipList.theCompanyHasNotAddeAnyClientsYet")}</p>
      </div>
    {/each}
  </HorizontalScrollList>
</div>

<style>
  .RelationshipsList {
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

  .RelationshipsList-headline {
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

  .RelationshipsList-card--create {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .RelationshipsList-empty-message {
    max-width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    text-align: center;
    color: var(--secondary-text-color);
  }

  @media screen and (min-width: 850px) {
    .RelationshipsList {
      margin: 25px 20px;
      padding: unset;
    }

    .RelationshipsList-headline {
      margin-bottom: 15px;
    }
  }
</style>
