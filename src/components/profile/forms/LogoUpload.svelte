<script>
    import CompanyService from "../../../services/companies/companies.service.js";
    import { stores } from "@sapper/app";
    import { getContext } from 'svelte';

    export let actualLogo;
    export let afterSubmit;
    const { session } = stores();
    const profileUsername = getContext("profileUsername");
    const isSessionUserProfile = getContext("isSessionUserProfile");

    let imageUploaded = false;
    let newLogoFile;

    function handleLogoUploadChange(event) {
        const LogoUploadInput = event.target;
        newLogoFile = LogoUploadInput.files[0];

        const Reader = new FileReader();
        Reader.onload = (e)=>{
            let res = e.target.result;
            updateLogoImagePreview(res);
            imageUploaded = true;
        };
        Reader.readAsDataURL(newLogoFile);
    }

    function updateLogoImagePreview( imgValue ) {
        const LogoUploadImage = document.getElementById("LogoUpload-image");
        LogoUploadImage.src = imgValue;
    }

    async function submit(event) {
        try{
            event.target.style.opacity = 0.4;
            event.target.style.cursor = "not-allowed";
            
            const companyService = new CompanyService();
            if( isSessionUserProfile && newLogoFile) {
                const Company = await companyService.updateCompanyLogo( $session.username, newLogoFile, $session.accessToken );
                
                afterSubmit( Company );
            }

            event.target.style.opacity = 1;
            event.target.style.cursor = "pointer";
        }
        catch(e) {
            console.log("Error");
            event.target.style.opacity = 1;
            event.target.style.cursor = "pointer";
        }
    }
</script>

<style>
    @import "/styles/button.css";

    .LogoUpload {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 20;
        bottom: auto;
        background-color: white;
    }

    .LogoUpload-close-button {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 10px;
        right: 10px;
        border: none;
        background-color: transparent;
        cursor: pointer;
    }

    .LogoUpload-close-button span {
        font-size: 2em;
    }

    .LogoUpload-header {
        padding: 1.1em 1.5em;
        border-bottom: 1px solid var(--light-color);
    }

    .LogoUpload-title {
        font-size: 1.2em;
        font-weight: 100;
        font-family: var(--title-font);
        letter-spacing: 0.035em;
    }

    .LogoUpload-content {
        height: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 50px 30px 40px;
    }

    .LogoUpload-logo-container {
        width: auto;
        max-width: 150px;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin: 0 auto;
        padding: 0.1em;
        border: 2px solid var(--principal-color);
        background-color: white;
        cursor: pointer;
    }

    .LogoUpload-logo-container > span {
        position: absolute;
        bottom: 25%;
        visibility: hidden;
    }

    .LogoUpload-logo-container:hover img {
        opacity: 0.7;
    }

    .LogoUpload-logo-container:hover > span {
        visibility: visible;
    }

    .LogoUpload-logo-image {
        width: 100%;
        min-width: 130px;
        max-height: 130px;
        min-height: 100px;
        border-radius: inherit;
        object-fit: cover;
    }

    .LogoUpload-button {
        max-width: 170px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-transform: none;
        font-size: .95em;
    }

    .LogoUpload-button-label {
        width: 100%;
        max-width: 170px;
        margin: 20px 0 35px 0px;
    }

    .LogoUpload-message {
        text-align: center;
        font-size: .9em;
        max-width: 440px;
        color: var(--secondary-text-color);
    }

    .LogoUpload-footer {
        display: flex;
        justify-content: flex-end;
        padding: 1.1em 1.5em;
        border-top: 1px solid var(--light-color);
    }

    @media screen and (min-width: 650px) {
        .LogoUpload {
            width: auto;
            min-width: 600px;
            height: auto;
            border-radius: 5px;
        }

        .LogoUpload-content {
            height: auto;
        }
    }
</style>

<div class="LogoUpload">
    <button class="LogoUpload-close-button" on:click>
        <span>X</span>
    </button>

    <div class="LogoUpload-header">
        <h4 class="LogoUpload-title">Agregar logo</h4>
    </div>
    <div class="LogoUpload-content">
        <label for="LogoUpload">
            <figure class="LogoUpload-logo-container {actualLogo && actualLogo.path ? "" : "ProfileLogo-container--default"}">
                <img id="LogoUpload-image" src={actualLogo && actualLogo.path ? actualLogo.path : "/images/profile_icon.svg"}
                    alt={profileUsername} class="LogoUpload-logo-image {actualLogo && actualLogo.path ? "" : "ProfileLogo-image--default"}">
                <span>
                    <i style="width:40px;height:40px;" class="icon icon-upload"></i>
                </span>
            </figure>
        </label>

        <label for="LogoUpload" class="LogoUpload-button-label">
            <span class="LogoUpload-button button button--principal">
                {imageUploaded ? "Cambiar imagen" : "Subir imagen"}
            </span>
        </label>

        <input on:change={handleLogoUploadChange} type="file" id="LogoUpload" accept="images/*" style="display: none;" />

        {#if imageUploaded}
            <p class="LogoUpload-message">
                ¡Así va a quedar la imagen de perfil de tu empresa!
            </p>
        {:else}
            <p class="LogoUpload-message">
                ¡Sube el logo o una imagen que represente a tu empresa! <br>
                Tendrás más oportunidades de atraer nuevos aliados y cerrar negocios.
            </p>
        {/if}
    </div>
    <div class="LogoUpload-footer">
        {#if imageUploaded}
            <button type="button" on:click|preventDefault={submit} 
                class="LogoUpload-button button button--principal">Guardar logo</button>
        {/if}
    </div>
</div>