<script>
  import Dropzone from 'svelte-file-dropzone';
  import CloudUploadOutline from 'svelte-material-icons/CloudUploadOutline.svelte';
  import CreateButton from '../../components/CreateButton/CreateButton.svelte';
  import ImageOutline from 'svelte-material-icons/ImageOutline.svelte';
  import DeleteCircleOutline from 'svelte-material-icons/DeleteCircleOutline.svelte';
  import { _ } from 'svelte-i18n';

  export let imagePath; // If not, isn't required
  export let multiple = false;
  export let small = false;
  export let imageFile; // For binding the value from an external component
  export let onDelete = () => {};
  export let allowDelete = false;
  let uploadedImage = '';

  let files = {
    accepted: [],
    rejected: [],
  };

  function deleteFile() {
    URL.revokeObjectURL(uploadedImage);
    uploadedImage = '';
    imageFile = undefined;
    onDelete();
  }
  function handleFilesSelect(e) {
    onDelete();
    URL.revokeObjectURL(uploadedImage);
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = multiple
      ? [...files.accepted, ...acceptedFiles]
      : acceptedFiles;
    files.rejected = multiple
      ? [...files.rejected, ...fileRejections]
      : fileRejections;
    uploadedImage = URL.createObjectURL(files.accepted[0]);
    imageFile = files.accepted[0];
  }
</script>

<div
  class="Dropzone"
  style={imagePath || uploadedImage
    ? `background-image: url(${uploadedImage ? uploadedImage : imagePath})`
    : ''}
>
  {#if allowDelete}
    <div class="delete-button" on:click={deleteFile}>
      <DeleteCircleOutline size={25} color="var(--principal-color)" />
    </div>
  {/if}
  <Dropzone
    on:drop={handleFilesSelect}
    accept={['image/*']}
    containerStyles={`width: 100%; height: 100%; padding: 0; background-color: transparent;`}
    {multiple}
  >
    <div
      class={`dropzone-content ${
        imagePath || uploadedImage ? 'image-defined' : ''
      }`}
    >
      {#if small}
        <CreateButton size={80} color="var(--extra-light-gray-transparent)" />
      {:else}
        {#if !imagePath && !uploadedImage}
          <CloudUploadOutline size={80} />
          <span class="Dropzone-title">{$_('dropZone.dragAndDropTheFile')}</span
          >
        {/if}
        {#if !imagePath && !uploadedImage}
          <span class="Dropzone-subtitle"
            >{$_('dropZone.orUploadItFromYourComputer')}</span
          >
        {/if}

        <div class="upload-card">
          <ImageOutline size={25} />
          <span>{$_('dropZone.uploadImage')}</span>
        </div>
      {/if}
    </div>
  </Dropzone>
</div>

<style>
  .Dropzone {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--extra-light-gray);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    border: 2px dashed #000000;
  }

  .Dropzone-title {
    font-size: 1rem;
    font-weight: bold;
  }
  .Dropzone-subtitle {
    font-size: 0.875rem;
    font-weight: bold;
    margin-bottom: 23px;
  }
  .delete-button {
    position: absolute;
    top: 0;
    right: 0;
    width: 25px;
    height: 25px;
    background-color: var(--white);
    border-radius: 100%;
    z-index: 10;
  }
  .delete-button:hover {
    cursor: pointer;
    box-shadow: 0px 0px 4px var(--super-extra-light-gray);
  }

  .upload-card {
    background-color: var(--success-color);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 90px;
    height: 70px;
    color: var(--white);
    font-size: 0.75rem;
  }
  .dropzone-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .dropzone-content.image-defined {
    background-color: var(--extra-light-gray-transparent);
    opacity: 0.8;
  }
  .dropzone-content.image-defined:hover {
    background-color: var(--extra-light-gray-transparent);
    opacity: 1;
  }
</style>
