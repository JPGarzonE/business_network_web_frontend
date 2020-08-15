<script>
    import HorizontalScrollList from "../componentLists/HorizontalScrollList.svelte";
    import RelationshipCard from "../relationships/RelationshipCard.svelte";
    import Modal from "../Modal.svelte";
    import AddRelationship from "./forms/AddRelationship.svelte";
    import UnregisteredRelationshipForm from "./forms/UnregisteredRelationshipForm.svelte";
    import CompanyService from "../../services/companies/companies.service.js";
    import { getContext, onMount } from 'svelte';

    export let registeredRelationships = [];
    export let unregisteredRelationships = [];
    const profileUsername = getContext("profileUsername");
    const isSessionUserProfile = getContext("isSessionUserProfile");
    const companyService = new CompanyService();

    let displayUnregisteredCreateForm = false;

    function toggleUnregisteredCreateForm() {
        displayUnregisteredCreateForm = !displayUnregisteredCreateForm;
    }

    let displayAddRelationship = false;

    function toggleAddRelationshipDisplay() {
        displayAddRelationship = !displayAddRelationship;
    }

    function hideAddRelationshipAndDisplayUnregisteredCreate() {
        displayAddRelationship = false;
        displayUnregisteredCreateForm = true;
    }


    let relationships = [];
    let screenSize = 700;
    
    onMount(async () => {
        window.addEventListener("resize", ()=>{screenSize = window.innerWidth});
        screenSize = window.innerWidth;

        for( let i = 0; i < registeredRelationships.length; i++ ) {
            let relationship = registeredRelationships[i];
            let otherCompany;
            
            if( relationship.requester.username === profileUsername )
                otherCompany = relationship.addressed;
            else
                otherCompany = relationship.requester;
            
            const companyData = await companyService.getCompany( otherCompany.username );
            let company = {
                isRegisteredCompany: true,
                username: otherCompany.username,
                name: companyData.name,
                logoPath: companyData.logo ? companyData.logo.path : null,
                industry: companyData.industry,
                isVerified: true
            }

            relationships = [...relationships, company];
        }

        for( let i = 0; i < unregisteredRelationships.length; i++ ) {
            let unregisteredCompany = unregisteredRelationships.unregistered;
            let company = {
                isRegisteredCompany: false,
                username: null,
                name: unregisteredCompany.name,
                logoPath: null,
                industry: unregisteredCompany.industry,
                isVerified: false
            };

            relationships = [...relationships, company];
        }
    });
</script>

<style>
    .ProfileRelationships {
        grid-area: relationships;
        position: relative;
        margin: 0 20px;
        margin-bottom: 0px;
        padding: 40px 20px 30px;
        padding-bottom: 30px;
        border: 2px solid var(--principal-color);
        border-bottom: none;
        border-radius: 5px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    }

    .ProfileRelationships-headline {
        margin: 0 0 30px;
        color: var(--principal-text-color);
        font-size: 1.1em;
        font-weight: 100;
        font-family: var(--body-font);
        text-align: center;
        letter-spacing: 0.1em;
    }

    .ProfileRelationships-list {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .ProfileRelationships-bottom {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        bottom: 0;
        left: 0;
        right: 0;
        margin-top: 30px;
        padding: 10px 20px;
    }

    .ProfileRelationships-button {
        text-transform: uppercase;
        color: var(--principal-color);
        cursor: pointer;
    }

    @media screen and (min-width: 850px){
        .ProfileRelationships {
            margin: 20px;
            padding: unset;
            border: none;
        }
        
        .ProfileRelationships-headline {
            margin-bottom: 15px;
            padding: 15px;
            border-bottom: 0.05em solid var(--light-color);
        }
    }

    @media screen and (min-width: 700px){
        .ProfileRelationships-list {
            width: auto;
            height: auto;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            padding: 10px 0px 0px;
            white-space: wrap;
            overflow-y: hidden;
            overflow-x: auto;
        }

        .ProfileRelationships-list::-webkit-scrollbar{
            display: none;
        }
    }
</style>

<div class="ProfileRelationships">
    {#if displayAddRelationship && isSessionUserProfile}
        <Modal on:click={toggleAddRelationshipDisplay}>
            <AddRelationship on:click={toggleAddRelationshipDisplay}
                displayCreateCompany={hideAddRelationshipAndDisplayUnregisteredCreate} />
        </Modal>
    {/if}

    {#if displayUnregisteredCreateForm && isSessionUserProfile}
        <Modal on:click={toggleUnregisteredCreateForm}>
            <UnregisteredRelationshipForm on:click={toggleUnregisteredCreateForm}
                afterSubmit="Pedro" />
        </Modal>
    {/if}

    <h3 class="ProfileRelationships-headline">Con que empresas trabaja</h3>

    {#if screenSize >= 700}
        <HorizontalScrollList>
            {#each relationships as company}
                <RelationshipCard {...company} />
            {:else}
                <p>Loading...</p>
            {/each}
        </HorizontalScrollList>
    {:else}
        <div class="ProfileRelationships-list">
            {#each relationships as company}
                <RelationshipCard {...company} />
            {:else}
                <p>Loading...</p>
            {/each}
        </div>
    {/if}

    <div class="ProfileRelationships-bottom">
        <span class="ProfileRelationships-button">
            Editar
        </span>

        <span class="ProfileRelationships-button" on:click={toggleAddRelationshipDisplay}>
            Agregar
        </span>
    </div>
</div>