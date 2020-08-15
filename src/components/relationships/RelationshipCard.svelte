<script>
    import { goto } from '@sapper/app';

    export let idx;
    export let isRegisteredCompany = true;
    export let username;
    export let name;
    export let logoPath;
    export let industry;
    export let isVerified;

    isVerified; // To avoid warnings jejeje

    async function handleRelationshipClick() {
        if( isRegisteredCompany )
            await goto(`/profile/${username}`);
    }
</script>

<style>
    .RelationshipCard {
        width: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 5px;
        border-radius: 3px;
        font-size: 1.2em;
        cursor: pointer;
    }

    .RelationshipCard:hover {
        opacity: 0.7;
    }

    .RelationshipCard--pair {
        background-color: #4a4b4f1f;
    }

    .RelationshipCard--odd {
        background-color: white;
    }

    .RelationshipCard-logo-container {
        width: 20%;
        display: flex;
        justify-content: center;
        margin: 0px 10px;
        border-radius: 100%;
    }

    .RelationshipCard-logo-image {
        width: 35px;
        border: 2px solid var(--principal-color);
        border-radius: inherit;
    }

    .RelationshipCard-name {
        width: 60%;
        font-size: 1.1em;
        color: var(--secondary-text-color);
        text-transform: capitalize;
    }

    .RelationshipCard-link {
        text-decoration: none;
        color: inherit;
    }

    .RelationshipCard-industry {
        width: 30%;
        font-size: .9em;
        color: var(--principal-color);
        text-align: center;
        text-transform: capitalize;
        word-break: break-word;
        overflow-wrap: break-word;
    }

    @media screen and (min-width: 700px){
        .RelationshipCard {
            max-width: 230px;
            flex-direction: column;
        }

        .RelationshipCard--pair, .RelationshipCard--odd {
            background-color: transparent;
        }

        .RelationshipCard-logo-container {
            width: 100%;
            padding: 10px;
        }

        .RelationshipCard-logo-image {
            width: 180px;
        }

        .RelationshipCard-name {
            width: 100%;
            margin-bottom: 5px;
            text-align: center;
        }

        .RelationshipCard-industry {
            width: 100%;
            text-align: center;
        }
    }
</style>

<div class="RelationshipCard RelationshipCard--{idx % 2 == 0 ? "pair" : "odd"}" on:click={handleRelationshipClick}>
    <figure class="RelationshipCard-logo-container"> 
        <img src={ logoPath ? logoPath : "/images/profile_icon.svg" }
            alt="{name} logo" class="RelationshipCard-logo-image" />
    </figure>
    <p class="RelationshipCard-name">
        <a class="RelationshipCard-link" href={isRegisteredCompany ? `/profile/${username}` : ""} 
            target="_blank">{ name }</a>
    </p>
    <p class="RelationshipCard-industry">
        { industry ? industry : "" }
    </p>
</div>