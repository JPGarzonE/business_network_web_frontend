<script>
  import { getContext } from 'svelte';
  import { goto } from '@sapper/app';
  import { stores } from '@sapper/app';
  import Modal from '../Modal.svelte';
  import EditButton from '../EditButton/EditButton.svelte';
  import UnregisteredRelationshipForm from '../../containers/RelationshipForm/UnregisteredRelationshipForm.svelte';
  import UnregisteredRelationshipService from '../../services/relationships/unregistered.service.js';
  import ConfirmationModal from '../ConfirmationModal/ConfirmationModal.svelte';

  export let onDelete;
  export let isRegisteredCompany = false;
  export let username;
  export let relationshipData;
  export let isSample = false;

  let confirmationMode = false;

  const { session } = stores();

  let {
    name = '',
    city = '',
    country = '',
    logoPath = '',
    industry = '',
  } = relationshipData ? relationshipData.unregistered : {};
  let location = '';

  $: {
    const unregistered =
      relationshipData && relationshipData.unregistered
        ? relationshipData.unregistered
        : {};
    name = unregistered && unregistered.name ? unregistered.name : '';
    city = unregistered && unregistered.city ? unregistered.city : '';
    country = unregistered && unregistered.country ? unregistered.country : '';
    logoPath =
      unregistered && unregistered.logoPath ? unregistered.logoPath : '';
    industry =
      unregistered && unregistered.industry ? unregistered.industry : '';
    location = `${city ? city + '. ' : ''}${country}`;
  }

  //export let isVerified;
  //export let unregistered;
  const isEditableProfile = getContext('isEditableProfile');

  let displayUnregisteredForm = false;

  function toggleEditableMode() {
    displayUnregisteredForm = !displayUnregisteredForm;
  }
  function toggleConfirmation() {
    confirmationMode = !confirmationMode;
  }

  async function deleteRelationship() {
    toggleConfirmation();
    if( !isSample ) {

      try {
        const unregisteredServiceInstance = new UnregisteredRelationshipService();
        await unregisteredServiceInstance.deleteUnregisteredRelationship(
          $session.company_accountname,
          relationshipData.id,
          $session.accessToken
        );
        onDelete(relationshipData.id);
      } catch (e) {
        console.error(e);
      }

    }
  }

  async function handleRelationshipClick() {
    if (isRegisteredCompany) await goto(`/profile/${username}`);
  }

  function reloadComponentData(unregisteredRelationshipData) {
    relationshipData.type = unregisteredRelationshipData.type;
    displayUnregisteredForm = false;
  }
</script>

<style>
  .RelationshipCard {
    width: auto;
    display: flex;
    padding: 0 20px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px 5px;
    border-radius: 3px;
    font-size: 1.2em;
    width: 180px;
  }
  .RelationshipCard-wrapper {
    position: relative;
    width: 210px;
    margin-right: 1%;
  }

  .selectable:hover {
    opacity: 0.7;
    cursor: pointer;
  }
  .RelationshipCard-edit-button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
    z-index: 10;
  }

  .RelationshipCard-logo-container {
    width: 100%;
    max-width: 150px;
    display: flex;
    justify-content: center;
    margin: 0 10px 22px;
    border-radius: 100%;
  }

  .RelationshipCard-logo-image {
    width: 150px;
    border: 1px solid var(--secondary-text-color);
    border-radius: inherit;
  }

  .RelationshipCard-logo-image--default {
    width: 150px;
    border: 1px solid var(--light-color);
    padding: 15%;
    border-radius: inherit;
  }

  .RelationshipCard-name {
    font-size: 1rem;
    font-weight: bold;
    color: var(--secondary-text-color);
    margin-bottom: 10px;
  }
  .RelationshipCard-location {
    font-size: 1rem;
    color: var(--light-color);
    text-transform: capitalize;
    margin-bottom: 10px;
  }
  .RelationshipCard-industry {
    font-size: 1rem;
    color: var(--principal-color);
    text-align: center;
    text-transform: capitalize;
    word-break: break-word;
    overflow-wrap: break-word;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .RelationshipCard-link {
    text-decoration: none;
    color: inherit;
  }

  @media screen and (min-width: 1250px) {
    .RelationshipCard-wrapper {
      margin-right: 1%;
    }
  }
</style>

{#if confirmationMode && isEditableProfile}
  <ConfirmationModal
    title={isSample ? 
      "Agrega una relación y esta desaparecerá" :
      `Desea eliminar la relacion con ${name}`
    }
    onAccept={deleteRelationship}
    onDecline={toggleConfirmation} />
{/if}
{#if displayUnregisteredForm && isEditableProfile}
  <Modal on:click={toggleEditableMode}>
    <UnregisteredRelationshipForm
      on:click={toggleEditableMode}
      afterSubmit={reloadComponentData}
      unregisteredRelationship={isSample ? null : relationshipData} />
  </Modal>
{/if}
<div class="RelationshipCard-wrapper">
  {#if isEditableProfile}
    <div class="RelationshipCard-edit-button">
      <EditButton
        size={25}
        color="gray"
        onEdit={toggleEditableMode}
        onDelete={toggleConfirmation}
        menuButton />
    </div>
  {/if}
  <div
    class="RelationshipCard {isRegisteredCompany ? 'selectable' : ''}"
    on:click={isRegisteredCompany ? handleRelationshipClick : undefined}>
    <figure class="RelationshipCard-logo-container">
      <img
        src={logoPath ? logoPath : '/images/default_relationship.png'}
        alt="{name} logo"
        class={logoPath ? "RelationshipCard-logo-image" : "RelationshipCard-logo-image--default"} />
    </figure>
    <p class="RelationshipCard-name">
      <a
        class="RelationshipCard-link"
        href={isRegisteredCompany ? `/profile/${username}` : undefined}
        target="_blank">{name}</a>
    </p>
    {#if location}
      <span class="RelationshipCard-location">
        <a
          class="RelationshipCard-link"
          href={isRegisteredCompany ? `/profile/${username}` : undefined}
          target="_blank">{location}</a>
      </span>
    {/if}
    <span class="RelationshipCard-industry">{industry ? industry : ''}</span>
  </div>
</div>
