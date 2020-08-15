<script>
    import Modal from "../Modal.svelte";
    import ProductForm from "../profile/forms/ProductForm.svelte";
    import { getContext } from 'svelte';

    export let id;
    export let name;
    export let category;
    export let description;
    export let media;
    const isSessionUserProfile = getContext("isSessionUserProfile");

    let editableMode = false;

    function toggleEditableMode() {
        editableMode = !editableMode;
    }


    function reloadComponentData( productElementData ) {
        name = productElementData.name;
        category = productElementData.category ? productElementData.category : null;
        media = productElementData.media ? productElementData.media : null;

        editableMode = false;
    }
</script>

<style>
    .ProductCard {
        width: auto;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin: 0 30px 0 0;
        border-radius: 5px;
        padding: 0;
        cursor: pointer;
    }

    .ProductCard-media-container {
        position: relative;
        width: 200px;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        background: #dfdfdf94;
        cursor: pointer;
    }

    .ProductCard-media-container:hover > span{
            display: block;
    }

    .ProductCard-media-container:hover > .ProductCard-media-image, 
    .ProductCard-media-container:hover > .ProductCard-media-image--default{
        opacity: 0.2;
    }

    .ProductCard-icon-container {
        position: absolute;
        display: none;
    }

    .ProductCard-media-container img {
        border-radius: 3px;
    }

    .ProductCard-media-image {
        width: 100%;
        height: 100%;
        display: flex;
        object-fit: cover;
        opacity: 1;
    }

    .ProductCard-media-image--default {
        padding: 35px;
    }

    .ProductCard-name {
        margin: 8px 0px 5px;
        margin-bottom: 5px;
        padding: 0 15px;
        font-size: 1.25em;
        font-weight: 100;
        text-align: center;
        color: var(--principal-color);
    }

    .ProductCard-category {
        font-size: 1.05em;
        text-align: center;
        color: var(--secondary-text-color);
    }
</style>

<div class="ProductCard">
    {#if editableMode && isSessionUserProfile}
        <Modal on:click={toggleEditableMode}>
            <ProductForm on:click={toggleEditableMode} 
                afterSubmit={reloadComponentData}
                product={{
                    id: id, name, category: category,
                    description: description, media: media
                }}
            />
        </Modal>
    {/if}

    <figure class="ProductCard-media-container" on:click={toggleEditableMode}>
        {#if isSessionUserProfile}
            <span class="ProductCard-icon-container">
                <i class="icon icon-edit icon-edit--medium"></i>
            </span>
        {/if}

        {#if media && media.path}
            <img src={media.path} alt={name} class="ProductCard-media-image">
        {:else}
            <img src="/images/profile_icon.svg" alt={name} class="ProductCard-media-image--default">
        {/if}
    </figure>
    <h3 class="ProductCard-name">
        {name.length > 29 ? `${name.slice(0, 25).trim()}...` : name}
    </h3>

    {#if category}
        <p class="ProductCard-category">
            {category.length > 29 ? `${category.slice(0,25).trim()}...` : category}
        </p>
    {/if}
</div>