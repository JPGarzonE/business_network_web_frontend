<script>
    import UnregisteredRelationshipService from "../../../services/relationships/unregistered.relationship.service.js";
    import { stores } from "@sapper/app";
    import { getContext } from 'svelte';
    import { INDUSTRIES } from "../../../store/store.js";
    
    export let afterSubmit;
    const fields = ["name", "industry", "country", "type"];
    const { session } = stores();
    const isSessionUserProfile = getContext("isSessionUserProfile");
    const unregisteredRelationshipService = new UnregisteredRelationshipService();

    let name;
    let industry = INDUSTRIES ? INDUSTRIES[0] : null;
    let otherIndustry;
    let country;
    let relationshipType;

    $: industryIsOther = industry.includes("OTROS");
    let formErrorMessage = "";

    let nameFeedback = "";
    let otherIndustryFeedback = "";
    let countryFeedback = "";
    let relationshipTypeFeedback = "";


    function validateName() {
        if( name && name.length >= 2 ) {
            if( name.length >  60) {
                nameFeedback = "Máximo 60 caracteres";
                return false;
            }

            nameFeedback = "";
            return true;

        }else if( name && name.length > 0 && name.length < 2 ) {
            nameFeedback = "Mínimo 2 caracteres";
            return false;
        }else {
            nameFeedback = "El nombre es obligatorio";
            return false;
        }
    }

    function validateOtherIndustry() {
        if( industryIsOther ){
            if( otherIndustry && otherIndustry.length >= 3 ) {
                if( otherIndustry.length >  50) {
                    otherIndustryFeedback = "Máximo 50 caracteres";
                    return false;
                }
    
                otherIndustryFeedback = "";
                return true;
    
            }else if( otherIndustry && otherIndustry.length > 0 && otherIndustry.length < 3 ) {
                otherIndustryFeedback = "Mínimo 3 caracteres";
                return false;
            }else {
                otherIndustryFeedback = "La industria es obligatoria";
                return false;
            }
        }
        
        otherIndustryFeedback = "";
        return true;
    }

    function validateCountry() {
        if( country && country.length >= 2 ) {
            if( name.length >  40) {
                countryFeedback = "Máximo 40 caracteres";
                return false;
            }

            countryFeedback = "";
            return true;

        }else if( country && country.length > 0 && country.length < 2 ) {
            countryFeedback = "Mínimo 2 caracteres";
            return false;
        }
        
        countryFeedback = "";
        return true;
    }

    function validateRelationshipType() {
        if( relationshipType && relationshipType.length > 1 ) {
            if( relationshipType.length >  30) {
                relationshipTypeFeedback = "Máximo 30 caracteres";
                return false;
            }

            relationshipTypeFeedback = "";
            return true;

        }else {
            relationshipTypeFeedback = "El tipo de relación es obligatoria";
            return false;
        }
    }

    function validateUnregisteredRelationshipForm() {
        if( !(validateName() && validateOtherIndustry()) ) {
            formErrorMessage = "Los datos no son válidos";
            throw new Error();
        }
        else if( !(validateCountry() && validateRelationshipType()) ){
            formErrorMessage = "Los datos no son válidos";
            throw new Error();
        }
        else {
            formErrorMessage ="";
        }
    }

    async function submit(event) {
        const Target = event.target;
        Target.style.opacity = 0.4;
        Target.style.cursor = "not-allowed";

        try {
            if( isSessionUserProfile ){
                validateUnregisteredRelationshipForm();
                let dataToSubmit = {
                    name: name, industry: industry
                }

                if( country ) dataToSubmit.country = country;

                const unregisteredRelationshipData = await unregisteredRelationshipService.createUnregisteredRelationshipWithNestedCompany(
                    $session.accessToken, dataToSubmit, relationshipType);

                afterSubmit( unregisteredRelationshipData );
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
</script>

<style>
    @import "/styles/form.css";

    .UnregisteredRelationshipForm-headline {
        width: 100%;
        max-width: 400px;
        margin-bottom: 1.9em;
    }

    .UnregisteredRelationshipForm-title {
        margin: 25px 0px 20px;
        font-size: 1.2em;
        font-weight: 400;
        font-family: var(--title-font);
        text-align: center;
        letter-spacing: 0.035em;
    }

    .UnregisteredRelationshipForm-subtitle {
        text-align: center;
        font-size: .95em;
        color: var(--secondary-text-color);
    }

    .form-group input, .form-group input::placeholder, .form-group select {
        font-size: 13.5px;
        font-family: var(--body-font);
        color: var(--secondary-text-color);
        letter-spacing: 0.04em;
    }

    .UnregisteredRelationshipForm-name, .UnregisteredRelationshipForm-industry, 
    .UnregisteredRelationshipForm-industry--other, .UnregisteredRelationshipForm-country,
    .UnregisteredRelationshipForm-type {
        width: 100%;
        border: none;
        border-bottom: 1px solid var(--secondary-text-color);
    }

    .UnregisteredRelationshipForm-industry--left {
        width: 40%;
    }

    .UnregisteredRelationshipForm-industry--other {
        width: 70%;
        margin-left: 15px;
    }

    .UnregisteredRelationshipForm-button {
        margin-top: 3em;
    }

    @media screen and (min-width: 400px) {
        .UnregisteredRelationshipForm-headline {
            width: 400px;
        }
    }
</style>

<div class="UnregisteredRelationshipForm ProfileForm">
    <button class="UnregisteredRelationshipForm-close-button ProfileForm-close-button" on:click>
        <span>X</span>
    </button>

    <div class="UnregisteredRelationshipForm-headline">
        <h3 class="UnregisteredRelationshipForm-title">Agrega una relación</h3>
    
        {#if formErrorMessage}
            <div class="form-banner--invalid">
                <p>{formErrorMessage}</p>
            </div>
        {:else}
            <p class="UnregisteredRelationshipForm-subtitle">
                Busca la empresa en la plataforma, si no la encuentras, ¡la puedes agregar tu mismo!
            </p>
        {/if}
    </div>

    <form class="UnregisteredRelationshipForm-form ProfileForm-form">
        <div class="form-group">
            <input type="text" name="name" placeholder="Nombre de la empresa" 
                class="UnregisteredRelationshipForm-name" on:click={validateName} />

            {#if nameFeedback}
                <p class="form-control-feedback form-control-feedback--invalid">{nameFeedback}</p>
            {:else}
                <p class="form-control-feedback">Máximo 60 caracteres</p>
            {/if}
        </div>

        <div class="form-group">
            <div class="ProfileForm-group">
                <select name="industry" bind:value={industry}
                    class="UnregisteredRelationshipForm-industry {industryIsOther ? 
                        "UnregisteredRelationshipForm-industry--left" : ""}" >

                    {#each INDUSTRIES as ind}
                        <option value={ind}
                            selected={ind.toLowerCase() == ind.toLowerCase()}>
                            {ind}
                        </option>
                    {/each}
                </select>

                {#if industryIsOther}
                    <input type="text" name="other-industry" placeholder="¿Cuál?" bind:value={otherIndustry}
                        class="UnregisteredRelationshipForm-industry--other" on:input={validateOtherIndustry} />
                {/if}
            </div>

            {#if otherIndustryFeedback}
                <p class="form-control-feedback form-control-feedback--invalid">{otherIndustryFeedback}</p>
            {:else if industryIsOther}
                <p class="form-control-feedback">Máximo 60 caracteres</p>
            {/if}
        </div>

        <div class="form-group">
            <input type="text" name="country" placeholder="País de origen" bind:value={country} 
                class="UnregisteredRelationshipForm-country" on:input={validateCountry} />

            {#if countryFeedback}
                <p class="form-control-feedback form-control-feedback--invalid">{countryFeedback}</p>
            {:else}
                <p class="form-control-feedback">Máximo 40 caracteres</p>
            {/if}
        </div>

        <div class="form-group">
            <input type="text" name="relationshipType" placeholder="Tipo relación" bind:value={relationshipType} 
                class="UnregisteredRelationshipForm-type" on:input={validateRelationshipType} />

            {#if relationshipTypeFeedback}
                <p class="form-control-feedback form-control-feedback--invalid">{relationshipTypeFeedback}</p>
            {:else}
                <p class="form-control-feedback">Máximo 40 caracteres</p>
            {/if}
        </div>

        <button on:click|preventDefault={submit} class="UnregisteredRelationshipForm-button button button--principal">
            Aceptar y mostrar
        </button>
    </form>
</div>