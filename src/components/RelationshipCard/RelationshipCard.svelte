<script>
  import { goto } from '@sapper/app';

  export let idx;
  export let isRegisteredCompany = true;
  export let username;
  export let name;
  export let location;
  export let logoPath;
  export let industry;
  //export let isVerified;
  //export let unregistered;

  async function handleRelationshipClick() {
    if (isRegisteredCompany) await goto(`/profile/${username}`);
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
    border: 1px solid var(--secondary-text-color);
    border-radius: inherit;
  }

  .RelationshipCard-name {
    font-size: 1rem;
    font-weight: bold;
    color: var(--secondary-text-color);
    text-transform: capitalize;
    margin-bottom: 10px;
  }
  .RelationshipCard-location {
    font-size: 1rem;
    color: var(--secondary-text-color);
    text-transform: capitalize;
    margin-bottom: 10px;
  }
  .RelationshipCard-industry {
    font-size: 1rem;
    color: var(--principal-color);
    text-align: center;
    text-transform: capitalize;
    word-break: break-word;
    overflow-wrap: break-word;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .RelationshipCard-link {
    text-decoration: none;
    color: inherit;
  }

  @media screen and (min-width: 700px) {
    .RelationshipCard {
      max-width: 230px;
      flex-direction: column;
    }

    .RelationshipCard--pair,
    .RelationshipCard--odd {
      background-color: transparent;
    }

    .RelationshipCard-logo-container {
      width: 100%;
      padding: 10px;
    }

    .RelationshipCard-logo-image {
      width: 180px;
    }
  }
</style>

<div
  class="RelationshipCard RelationshipCard--{idx % 2 == 0 ? 'pair' : 'odd'}"
  on:click={handleRelationshipClick}>
  <figure class="RelationshipCard-logo-container">
    <img
      src={logoPath ? logoPath : '/images/profile_icon.svg'}
      alt="{name} logo"
      class="RelationshipCard-logo-image" />
  </figure>
  <p class="RelationshipCard-name">
    <a
      class="RelationshipCard-link"
      href={isRegisteredCompany ? `/profile/${username}` : ''}
      target="_blank">{name}</a>
  </p>
  <span class="RelationshipCard-location">
    <a
      class="RelationshipCard-link"
      href={isRegisteredCompany ? `/profile/${username}` : ''}
      target="_blank">{location}</a>
  </span>
  <span class="RelationshipCard-industry">{industry ? industry : ''}</span>
</div>
