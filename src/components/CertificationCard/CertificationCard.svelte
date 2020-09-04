<script>
  import { getContext } from 'svelte';
  import PencilOutline from 'svelte-material-icons/PencilOutline.svelte';
  import Modal from '../Modal.svelte';
  import EditButton from '../EditButton/EditButton.svelte';
  import CertificationForm from '../../containers/CertificationForm/CertificationForm.svelte';

  export let id;
  export let media;
  export let name;
  export let category;
  export let description;

  const isSessionUserProfile = getContext('isSessionUserProfile');

  let editableMode = false;
  let displayStory = false;

  function toggleEditableMode() {
    editableMode = !editableMode;
  }

  function toggleStoryDisplay() {
    displayStory = !displayStory;
  }

  function reloadComponentData(CertificationElementData) {
    name = CertificationElementData.name;
    category = CertificationElementData.category
      ? CertificationElementData.category
      : null;
    media = CertificationElementData.media
      ? CertificationElementData.media
      : null;
    description = CertificationElementData.description
      ? CertificationElementData.description
      : null;

    editableMode = false;
  }
</script>

<style>
  .CertificationCard {
    position: relative;
    max-width: 300px;
    width: auto;
    height: fit-content;
    min-width: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 30px 0 0;
    padding: 0;
    border: 1px solid var(--principal-color);
    border-radius: 10px;
    cursor: pointer;
  }
  .CertificationCard-edit-button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
  }
  .CertificationCard-media-container {
    position: relative;
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    border-bottom-left-radius: unset;
    border-bottom-right-radius: unset;
    box-shadow: 0px 3px 3px var(--lightest-gray);
  }

  .CertificationCard-media-container:hover > .CertificationCard-media-image,
  .CertificationCard-media-container:hover
    > .CertificationCard-media-image--default {
    opacity: 0.2;
  }

  .CertificationCard-media-container--empty {
    border-top: 2px solid var(--principal-color);
    border-bottom: 1px solid var(--light-color);
  }

  .CertificationCard-media-image {
    width: 100%;
    max-height: 100%;
    display: flex;
    object-fit: contain;
    border-radius: 10px;
    border-bottom-left-radius: unset;
    border-bottom-right-radius: unset;
  }

  .CertificationCard-media-image--default {
    padding: 25px;
  }

  .CertificationCard-name {
    width: 100%;
    margin: 15px 0px 10px 0px;
    font-size: 1em;
    padding: 0 5%;
    text-align: start;
    font-weight: 100;
    color: var(--principal-color);
    word-break: break-word;
  }

  .CertificationCard-category {
    color: var(--principal-text-color);
  }

  .CertificationCard-story {
    margin-bottom: 10px;
    padding: 0px 15px;
    color: var(--principal-text-color);
    font-size: 0.9em;
  }

  .CertificationCard-story-link {
    background: none;
    color: var(--principal-color);
    cursor: pointer;
    text-decoration: underline;
  }

  .CertificationCard-bottom {
    width: 100%;
    min-height: 17px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 0 5%;
    font-size: 0.9em;
  }

  @media screen and (min-width: 850px) {
    .CertificationCard {
      min-width: 285px;
    }
  }
</style>

<div class="CertificationCard">
  {#if editableMode && isSessionUserProfile}
    <Modal on:click={toggleEditableMode}>
      <CertificationForm
        on:click={toggleEditableMode}
        afterSubmit={reloadComponentData}
        CertificationElement={{ id: id, name: name, category: category, description: description, media: media }} />
    </Modal>
  {/if}

  <figure
    class="CertificationCard-media-container {media && media.path ? '' : 'CertificationCard-media-container--empty'}"
    on:click={toggleEditableMode}>
    {#if media && media.path}
      <img src={media.path} alt={name} class="CertificationCard-media-image" />
    {:else}
      <img
        src="/images/profile_icon.svg"
        alt={name}
        class="CertificationCard-media-image--default" />
    {/if}
  </figure>
 {#if isSessionUserProfile}
  <div class="CertificationCard-edit-button">
    <EditButton size={25} color="gray" on:click={toggleEditableMode} />
  </div>
  {/if}

  <h4 class="CertificationCard-name">{name}</h4>

  {#if description}
    {#if displayStory}
      <p class="CertificationCard-story">{description}</p>
    {/if}
  {/if}

  <div class="CertificationCard-bottom">
    <p class="CertificationCard-category">{category}</p>

    {#if description}
      <span on:click={toggleStoryDisplay}>
        <a class="CertificationCard-story-link" id="story-link">Ver más</a>
      </span>
    {/if}
  </div>
</div>
