<script>
  import Modal from "../Modal.svelte";
  import DNAForm from "../../containers/DNAForm/DNAForm.svelte";
  import { getContext } from "svelte";
  import { _ } from "svelte-i18n";

  export let id;
  export let media;
  export let title;
  export let category;
  export let description;

  const isEditableProfile = getContext("isEditableProfile");

  let editableMode = false;
  let displayStory = false;

  function toggleEditableMode() {
    editableMode = !editableMode;
  }

  function toggleStoryDisplay() {
    displayStory = !displayStory;
  }

  function reloadComponentData(dnaElementData) {
    title = dnaElementData.title;
    category = dnaElementData.category ? dnaElementData.category : null;
    media = dnaElementData.image ? dnaElementData.image : null;
    description = dnaElementData.description
      ? dnaElementData.description
      : null;

    editableMode = false;
  }
</script>

<div class="DNACard">
  {#if editableMode && isEditableProfile}
    <Modal on:click={toggleEditableMode}>
      <DNAForm
        on:click={toggleEditableMode}
        afterSubmit={reloadComponentData}
        DNAElement={{
          id: id,
          title: title,
          category: category,
          description: description,
          media: media,
        }}
      />
    </Modal>
  {/if}

  <figure
    class="DNACard-media-container {media && media.path
      ? ''
      : 'DNACard-media-container--empty'}"
    on:click={toggleEditableMode}
  >
    {#if isEditableProfile}
      <span class="DNACard-icon-container">
        <i class="icon icon-edit icon-edit--medium" />
      </span>
    {/if}

    {#if media && media.path}
      <img src={media.path} alt={title} class="DNACard-media-image" />
    {:else}
      <img
        src="/images/profile_icon.svg"
        alt={title}
        class="DNACard-media-image--default"
      />
    {/if}
  </figure>

  <h4 class="DNACard-title">{title}</h4>

  {#if description}
    {#if displayStory}
      <p class="DNACard-story">{description}</p>
    {/if}
  {/if}

  <div class="DNACard-bottom">
    <p class="DNACard-category">{category}</p>

    {#if description}
      <span on:click={toggleStoryDisplay}
        ><a class="DNACard-story-link" id="story-link">
          {$_("dnaCard.LookHistory")}
        </a></span
      >
    {/if}
  </div>
</div>

<style>
  .DNACard {
    max-width: 300px;
    width: auto;
    height: fit-content;
    min-width: 250px;
    /* max-height: 280px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 30px 0 0;
    padding: 0;
    border: 2px solid var(--principal-color);
    border-top: unset;
    border-radius: 10px;
    cursor: pointer;
  }

  .DNACard-media-container {
    position: relative;
    width: 101.5%;
    height: 66%;
    max-height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border-bottom-left-radius: unset;
    border-bottom-right-radius: unset;
  }

  .DNACard-media-container:hover > span {
    display: block;
  }

  .DNACard-media-container:hover > .DNACard-media-image,
  .DNACard-media-container:hover > .DNACard-media-image--default {
    opacity: 0.2;
  }

  .DNACard-media-container--empty {
    border-top: 2px solid var(--principal-color);
    border-bottom: 1px solid var(--light-color);
  }

  .DNACard-icon-container {
    display: none;
    position: absolute;
  }

  .DNACard-media-container img {
    width: 100%;
    height: 100%;
    min-height: 130px;
    max-height: inherit;
    display: flex;
  }

  .DNACard-media-image {
    width: 100%;
    height: 100%;
    display: flex;
    object-fit: cover;
    border-radius: 10px;
    border-bottom-left-radius: unset;
    border-bottom-right-radius: unset;
  }

  .DNACard-media-image--default {
    padding: 25px;
  }

  .DNACard-title {
    width: 100%;
    margin: 15px 0px 10px 0px;
    font-size: 1em;
    padding: 0 5%;
    text-align: start;
    font-weight: 100;
    color: var(--principal-color);
    word-break: break-word;
  }

  .DNACard-category {
    color: var(--principal-text-color);
  }

  .DNACard-story {
    margin-bottom: 10px;
    padding: 0px 15px;
    color: var(--principal-text-color);
    font-size: 0.9em;
  }

  .DNACard-story-link {
    background: none;
    color: var(--principal-color);
    cursor: pointer;
    text-decoration: underline;
  }

  .DNACard-bottom {
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
    .DNACard {
      min-width: 285px;
    }
  }
</style>
