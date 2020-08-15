<!-- Product form for both create and update a product -->

<script>
    import ProductService from "../../../services/companies/product.service.js";
    import ServiceService from "../../../services/companies/service.service.js";
    import { stores } from "@sapper/app";
    import { getContext } from 'svelte';
    import ImageUploadInput from "../../inputs/ImageUploadInput.svelte";

    export let afterSubmit;
    export let type;
    export let product; // Pass if is an update form
    const { session } = stores();
    const isSessionUserProfile = getContext("isSessionUserProfile");
    const productService = new ProductService();
    const serviceService = new ServiceService();

    const Types = ["Producto", "Servicio"];
    const fields = ["name", "category", "description"];

    if( !type ) type = Types[0];
    let name = product ? product.name : null;
    let category = product ? product.category : null;
    let description = product ? product.description : null;
    let media = product ? product.media : null;
    let newMediaFile;

    let nameFeedback;
    let categoryFeedback;
    let descriptionFeedback;

    let formErrorMessage = "";

    function validateName() {
        if( name && name.length >= 2 ) {
            if( name.length > 50 ) {
                nameFeedback = "Máximo 50 caracteres";
            }

            nameFeedback = "";
            return true;
        }
        else if( name && name.length > 0 && name.length < 2 ){
            nameFeedback = "Mínimo 2 caracteres";
            return false;
        }else {
            nameFeedback = "El nombre es obligatorio";
            return false;
        }
    }

    
    function validateCategory() {
        if( category && category.length >= 3 ) {
            if( category.length >  60) {
                categoryFeedback = "Máximo 60 caracteres";
                return false;
            }

            categoryFeedback = "";
            return true;

        }else if( category && category.length > 0 && category.length < 3 ) {
            categoryFeedback = "Mínimo 3 caracteres";
            return false;
        }

        categoryFeedback = `No es obligatoria,
            pero la categoria incrementa las posibilidades que el producto aparezca en resultados de busqueda`;
        return true;
    }


    function validateDescription() {
        if( description && description.length >= 2 ) {
            if( description.length >  155) {
                descriptionFeedback = `${description.length} caracteres - Máximo 155`;
                return false;
            }

        }else if( description && description.length > 0 && description.length < 2 ) {
            descriptionFeedback = "Mínimo 2 caracteres";
            return false;
        }

        descriptionFeedback = "";
        return true;
    }


    function validateProductForm() {
        if( !(validateName() && validateCategory() && validateDescription()) ) {
            formErrorMessage = "Los datos no son válidos";
            throw new Error();
        }
        else{
            formErrorMessage = "";
        }
    }


    async function submit(event) {
        const Target = event.target;
        Target.style.opacity = 0.4;
        Target.style.cursor = "not-allowed";

        try {
            if( isSessionUserProfile ) {
                validateProductForm();

                let dataToSubmit = {name: name};

                if( category ) dataToSubmit.category = category;
                if( description ) dataToSubmit.description = description;

                let productElement;
                if( type.toLowerCase() === "producto" ){
                    if( product )
                        productElement = await updateProduct( dataToSubmit );
                    else
                        productElement = await createProduct( dataToSubmit );
                }
                else {
                    if( product )
                        productElement = await updateService( dataToSubmit );
                    else
                        productElement = await createService( dataToSubmit );
                }

                afterSubmit( productElement );
            }
        }
        catch(e) {
            const error = e.message;
            fields.map( field => {
                if( error[field] ) {
                    formErrorMessage += `${ formErrorMessage ? "\n" : ""}${field}: ${error[field]}`;
                }
            });
        }
        finally {
            Target.style.opacity = 1;
            Target.style.cursor = "pointer";
        }
    }

    async function createProduct( dataToSubmit ) {
        if( newMediaFile ){
            const productElementData = await productService.createUserProductWithImage( 
                $session.username, newMediaFile, dataToSubmit, $session.accessToken );

            return productElementData;
        }
        else {
            const productElementData = await productService.createUserProduct(
                $session.username, dataToSubmit, $session.accessToken);

            return productElementData;
        }
    }

    async function updateProduct( dataToSubmit ) {
        console.log("Update product");
        if( newMediaFile ){
            console.log("With image: ", newMediaFile);
            const productElementData = await productService.updateUserProductWithImage(
                $session.username, product.id, newMediaFile, dataToSubmit, $session.accessToken);
            console.log("then: ", productElementData);
            return productElementData;
        }
        else {
            console.log("Without image");
            const productElementData = await productService.updateUserProduct(
                $session.username, product.id, dataToSubmit, $session.accessToken);
            console.log("then: ", productElementData);
            return productElementData;
        }
    }

    async function createService( dataToSubmit ) {
        if( newMediaFile ){
            const serviceElementData = await serviceService.createUserServiceWithImage( 
                $session.username, newMediaFile, dataToSubmit, $session.accessToken );

            return serviceElementData;
        }
        else {
            const serviceElementData = await serviceService.createUserService(
                $session.username, dataToSubmit, $session.accessToken);

            return serviceElementData;
        }
    }

    async function updateService( dataToSubmit ) {
        if( newMediaFile ){
            const serviceElementData = await productService.updateUserServiceWithImage(
                $session.username, product.id, newMediaFile, dataToSubmit, $session.accessToken);

            return serviceElementData;
        }
        else {
            const serviceElementData = await productService.updateUserService(
                $session.username, product.id, dataToSubmit, $session.accessToken);

            return serviceElementData;
        }
    }

</script>

<style>
    @import "/styles/form.css";

    .ProductForm-headline {
        width: 100%;
        max-width: 400px;
    }

    .ProductForm-title {
        margin: 25px 0px 15px;
        font-size: 1.2em;
        font-weight: 400;
        font-family: var(--title-font);
        text-align: center;
        letter-spacing: 0.035em;
    }

    .ProductForm-subtitle {
        text-align: center;
        font-size: .95em;
        color: var(--secondary-text-color);
    }

    .ProductForm-preview {
        width: 100%;
        display: flex;
        justify-content: center;
        margin: 25px 0px 15px;
    }

    .ProductForm-preview-card {
        width: auto;
        max-width: 180px;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        border-radius: 5px;
        padding: 0;
        cursor: pointer;
    }

    .ProductForm-preview-media {
        position: relative;
        width: 180px;
        height: 180px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        background: #dfdfdf94;
        cursor: pointer;
    }

    .ProductForm-preview-name {
        margin: 8px 0px 5px;
        margin-bottom: 5px;
        padding: 0 15px;
        font-size: 1.15em;
        font-weight: 100;
        text-align: center;
        color: var(--principal-color);
    }

    .ProductForm-preview-category {
        font-size: 1em;
        text-align: center;
        color: var(--secondary-text-color);
    }

    .form-group input, .form-group input::placeholder,
    .form-group textarea, .form-group textarea::placeholder, .form-group select {
        font-size: 13.5px;
        font-family: var(--body-font);
        color: var(--secondary-text-color);
        letter-spacing: 0.04em;
    }

    .ProductForm-name, .ProductForm-category, 
    .ProductForm-description, .ProductForm-type {
        width: 100%;
        border: none;
        border-bottom: 1px solid var(--secondary-text-color);
    }

    .ProductForm-type {
        margin-bottom: 10px;
    }

    .ProductForm-description {
        max-height: 50px;
    }

    .ProductForm-button {
        margin-top: 3em;
    }

    @media screen and (min-width: 400px) {
        .ProductForm-headline {
            width: 400px;
        }
    }
</style>

<div class="ProductForm ProfileForm">
    <button class="ProductForm-close-button ProfileForm-close-button" on:click>
        <span>X</span>
    </button>

    <div class="ProductForm-headline">
        <h3 class="ProductForm-title">{product ? "Actualiza tu producto" : "¿Qué estas vendiendo?"}</h3>

        {#if formErrorMessage}
            <div class="form-banner--invalid">
                <p>{formErrorMessage}</p>
            </div>
        {:else}
            {#if !product}
                <p class="ProductForm-subtitle">
                    ¡Sube tu producto acá! <br />
                    Te recomendamos subir fotos de buena calidad para aumentar las probabilidades de venta
                </p>
            {/if}
        {/if}
    </div>

    <div class="ProductForm-preview">
        <div class="ProductForm-preview-card {newMediaFile || (media && media.path) ? "" : "DNAForm-preview-card--without-image"}">
            <div class="ProductForm-preview-media">
                <ImageUploadInput id="ProductForm"
                    bind:imageFile={newMediaFile}
                    imagePath={media ? media.path : null} 
                />
            </div>

            <h4 class="ProductForm-preview-name">{name ? name : "Nombre"}</h4>
            <p class="ProductForm-preview-category">{category ? category : "Categoria"}</p>
        </div>
    </div>

    <form class="ProductForm-form ProfileForm-form">
        <div class="form-group">
            <select name="type" bind:value={type} class="ProductForm-type" >
                {#each Types as t}
                    <option value={t}
                        selected={type.toLowerCase() == t.toLowerCase()} >
                        {t}
                    </option>
                {/each}
            </select>
        </div>

        <div class="form-group">
            <input type="text" name="name" placeholder="Nombre" class="ProductForm-name" 
                bind:value={name} on:input={validateName} />

            {#if nameFeedback}
                <p class="form-control-feedback form-control-feedback--invalid">{nameFeedback}</p>
            {:else}
                <p class="form-control-feedback">Máximo 50 caracteres</p>
            {/if}
        </div>

        <div class="form-group">
            <input type="text" name="category" placeholder="Categoria" class="ProductForm-category"
                bind:value={category} on:input={validateCategory} />

            {#if categoryFeedback}
                <p class="form-control-feedback form-control-feedback--invalid">{categoryFeedback}</p>
            {:else}
                <p class="form-control-feedback">Máximo 60 caracteres</p>
            {/if}
        </div>

        <div class="form-group">
            <textarea name="description" rows="2" placeholder="Descripción" class="ProductForm-description" 
                bind:value={description} on:input={validateDescription} ></textarea>

            {#if descriptionFeedback}
                <p class="form-control-feedback form-control-feedback--invalid">{descriptionFeedback}</p>
            {:else}
                <p class="form-control-feedback">
                    {#if description}
                        {description.length} caracteres - Máximo 155
                    {:else}
                        Máximo 155 caracteres
                    {/if}
                </p>
            {/if}
        </div>

        <button on:click|preventDefault={submit} class="ProductForm-button button button--principal">
            Aceptar y mostrar
        </button>
    </form>

</div>