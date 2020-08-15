<script>
    import Modal from "../Modal.svelte";
    import LogoUpload from "./forms/LogoUpload.svelte";
    import { getContext } from 'svelte';
    export let logo;

    const profileUsername = getContext("profileUsername");
    const isSessionUserProfile = getContext("isSessionUserProfile");

    let editableMode = false;

    function toggleEditableMode() {
        editableMode = !editableMode;
    }

    function reloadComponentData( company ) {
        logo = company.logo;
        editableMode = false;
    }
</script>

<style>
    .ProfileLogo-container {
        width: auto;
        max-width: 150px;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin: 20px auto;
        margin-bottom: 30px;
        padding: 0.1em;
        border: 2px solid var(--principal-color);
        background-color: white;
    }

    .ProfileLogo-container--default {
        width: 120px;
        background: white;
        border: 2px solid var(--principal-color);
    }

    .ProfileLogo-image {
        width: 100%;
        max-height: 130px;
        min-height: 100px;
        border-radius: inherit;
        object-fit: cover;
    }

    .ProfileLogo-image--default {
        padding: 20px;
    }

    .ProfileLogo-edit-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 4px 0px;
        border-radius: 13px;
        border-top-left-radius: unset;
        border-top-right-radius: unset;
        color: white;
        background-color: #0000004d;
        cursor: pointer;
    }

    @media screen and (min-width: 767px){
        .ProfileLogo-container--default {
            width: 150px;
        }
    }

    @media screen and (min-width: 850px){
        .ProfileLogo-container:hover > .ProfileLogo-edit-container{
            visibility: visible;
            opacity: 1;
        }

        .ProfileLogo-container--default {
            width: 130px;
        }

        .ProfileLogo-edit-container {
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s, opacity 0.3s linear;
        }
    }
</style>

<div class="ProfileLogo">
    {#if editableMode && isSessionUserProfile}
        <Modal on:click={toggleEditableMode}>
            <LogoUpload actualLogo={logo} on:click={toggleEditableMode} afterSubmit={reloadComponentData} />
        </Modal>
    {/if}

    <figure class="ProfileLogo-container {logo && logo.path ? "" : "ProfileLogo-container--default"}">
        <img src={logo && logo.path ? logo.path : "/images/profile_icon.svg"} 
            alt={profileUsername} class="ProfileLogo-image {logo && logo.path ? "" : "ProfileLogo-image--default"}">

        {#if isSessionUserProfile}
            <div class="ProfileLogo-edit-container" on:click={toggleEditableMode}>
                <span><i style="width:30px;height:30px;" class="icon icon-upload"></i></span>
                <span>{logo && logo.path ? "Actualizar" : "Agregar"}</span>
            </div>
        {/if}
    </figure>
</div>