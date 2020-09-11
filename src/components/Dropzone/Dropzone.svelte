<script>
  import Dropzone from 'svelte-file-dropzone';
  import CloudUploadOutline from 'svelte-material-icons/CloudUploadOutline.svelte';
  import ImageOutline from 'svelte-material-icons/ImageOutline.svelte';
  export let imagePath; // If not, isn't required
  export let multiple = false;
  export let imageFile; // For binding the value from an external component
  let uploadedImage = '';

  let files = {
    accepted: [],
    rejected: [],
  };

  function handleFilesSelect(e) {
    console.log('handleFilesSelect -> e', e);
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

<style>
  .Dropzone {
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

<div
  class="Dropzone"
  style={imagePath || uploadedImage ? `background-image: url(${uploadedImage ? uploadedImage : imagePath})` : ''}>
  <Dropzone
    on:drop={handleFilesSelect}
    accept={['image/*']}
    containerStyles={`width: 100%; height: 100%; padding: 0; background-color: transparent;`}
    {multiple}>
    <div
      class={`dropzone-content ${imagePath || uploadedImage ? 'image-defined' : ''}`}>
      <CloudUploadOutline size={80} />
      {#if !imagePath && !uploadedImage}
        <span class="Dropzone-title">Arrastra y suelta el archivo</span>
      {/if}
      {#if !imagePath && !uploadedImage}
        <span class="Dropzone-subtitle">o selecciona otra opción</span>
      {/if}

      <div class="upload-card">
        <ImageOutline size={25} />
        <span>Subir imagen</span>
      </div>
    </div>
  </Dropzone>
</div>
