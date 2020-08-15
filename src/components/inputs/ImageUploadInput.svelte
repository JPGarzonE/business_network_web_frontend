<script>
    export let id;
    export let imagePath; // If not, isn't required
    export let imageFile; // For binding the value from an external component

    const inputID = `${id}-upload-input`;

    function handleImageUpload(event) {
        const ImageUploadInput = event.target;
        imageFile = ImageUploadInput.files[0];

        const Reader = new FileReader();
        Reader.onload = (e) => {
            let res = e.target.result;
            updateImagePreview(res);
        };

        Reader.readAsDataURL( imageFile );
    }

    
    function updateImagePreview( imgValue ) {
        imagePath = imgValue;
    }
</script>

<style>
    .ImageUploadInput, .ImageUploadInput label {
        width: 100%;
        height: 100%;
        max-height: inherit;
        min-height: inherit;
        display: flex;
        cursor: pointer;
    }

    .ImageUploadInput, .ImageUploadInput label, 
    .ImageUploadInput-image-container, .ImageUploadInput-image {
        border-radius: inherit;
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
    }

    .ImageUploadInput-image-container {
        width: 100%;
        max-height: inherit;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .ImageUploadInput-image-container:hover > img {
        opacity: 0.7;
    }

    .ImageUploadInput-image-container:hover > span {
        visibility: visible;
    }

    .ImageUploadInput-image {
        width: 100%;
        max-height: inherit;
        height: 100%;
        display: flex;
        object-fit: cover;
    }

    .ImageUploadInput-icon-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        visibility:hidden;
    }

    .ImageUploadInput-icon-container--without-image {
        visibility: visible;
    }

    .ImageUploadInput-icon-container span{
        color: var(--secondary-text-color);
        font-size: .95em;
    }
</style>

<div class="ImageUploadInput">
    <label for={inputID}>
        <figure class="ImageUploadInput-image-container">
            {#if imagePath}
                <img src={imagePath} alt="{inputID} - Conecty" class="ImageUploadInput-image" />
            {/if}

            <span class="ImageUploadInput-icon-container {imagePath ? 
                "ImageUploadInput-icon-container" : "ImageUploadInput-icon-container--without-image"}">

                <i style="width:40px;height:40px;" class="icon icon-upload"></i>
                {#if !imagePath}
                    <span>Subir imagen</span>
                {/if}
            </span>

        </figure>
    </label>

    <input on:change={handleImageUpload} type="file" id={inputID} accept="images/*" style="display:none;" >
</div>