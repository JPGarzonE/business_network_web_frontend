<script>
  import HorizontalScrollList from "../../components/componentLists/HorizontalScrollList.svelte";
  import RelationshipCard from "../../components/RelationshipCard/RelationshipCard.svelte";
  import Modal from "../../components/Modal.svelte";
  import UnregisteredRelationshipForm from "../RelationshipForm/UnregisteredRelationshipForm.svelte";
  import CreateButton from "../../components/CreateButton/CreateButton.svelte";
  import { getContext } from "svelte";
  import { _ } from "svelte-i18n";

  export let unregisteredRelationships = [];
  export let onBoarding = false;

  const isEditableProfile = getContext("isEditableProfile");

  let displayUnregisteredCreateForm = false;

  function toggleUnregisteredCreateForm() {
    displayUnregisteredCreateForm = !displayUnregisteredCreateForm;
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

<div class="RelationshipsList" id="RelationshipsList">
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
      <div
        on:click={!onBoarding && toggleUnregisteredCreateForm}
        class:Productlist-card-create-button={onBoarding}
      >
        <CreateButton
          size={25}
          color={onBoarding ? "white" : "var(--principal-color)"}
          id="RelationshipCreate"
        />
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
      <RelationshipCard
        relationshipData={{
          unregistered: {
            name: "Logo de muestra",
            city: "Bog",
            country: "Colombia",
            industry: "Cervecería",
          },
        }}
        isSample
        {onBoarding}
      />
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
    color: var(--secondary-text-color);
    font-size: 1.1em;
    font-family: var(--body-font);
    text-align: center;
    font-weight: bold;
    line-height: 19px;
    letter-spacing: 0.216px;
  }

  .RelationshipsList-card--create {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .Productlist-card-create-button {
    z-index: 40;
    border-color: white;
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
