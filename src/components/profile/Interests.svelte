<script context="module">
  import { writable } from 'svelte/store';
  export const editableMode = writable(false);
</script>

<script>
  import { stores } from '@sapper/app';
  import { getContext } from 'svelte';
  import ProfileInterestChip from '../interests/ProfileInterestChip.svelte';

  export let interestElements;

  const isSessionUserProfile = getContext('isSessionUserProfile');
  const { session } = stores();

  function toggleEditableMode() {
    editableMode.update((mode) => !mode);
    console.log('edit click');
  }
</script>

<style>
  .ProfileInterests-divisor {
    margin: 0px 40px;
    border: 0.01em solid var(--light-color);
    background-color: var(--light-color);
  }

  .ProfileInterests {
    position: relative;
    margin: 0 20px;
    margin-top: 0px;
    padding: 60px 20px 30px 20px;
    border: 2px solid var(--principal-color);
    border-top: none;
    border-radius: 5px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }

  .ProfileInterests-headline {
    margin: 0 0 30px;
    border-bottom: none;
    color: var(--principal-text-color);
    font-size: 1.1em;
    font-weight: 100;
    font-family: var(--body-font);
    text-align: center;
    letter-spacing: 0.1em;
  }

  .ProfileInterests-subheadline {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    padding: 0px 5px;
    color: var(--secondary-text-color);
    text-align: start;
    text-transform: none;
    font-size: 15px;
  }

  .ProfileInterests-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .ProfileInterests-bottom {
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

  .ProfileInterests-button--variant {
    text-transform: uppercase;
    color: var(--principal-color);
    cursor: pointer;
  }

  @media screen and (min-width: 850px) {
    .ProfileInterests-divisor {
      display: none;
    }

    .ProfileInterests {
      margin: 20px;
      padding: 0px 0px 60px 0px;
      border: none;
    }

    .ProfileInterests-headline {
      margin-bottom: 0px;
      padding: 15px;
    }
  }
</style>

<hr class="ProfileInterests-divisor" />

<div class="ProfileInterests">
  <h3 class="ProfileInterests-headline">
    {isSessionUserProfile ? 'Dile al mundo que estás buscando' : '¿Qué estas buscando?'}
  </h3>

  {#if $session.authenticated || isSessionUserProfile}
    <!-- The conditionals aren't in a single statement for understandability -->
    {#if isSessionUserProfile}
      {#if interestElements && interestElements.length <= 0}
        <p class="ProfileInterests-subheadline">
          ¿No has agregado intereses aún? <br /> Comunicale a tus potenciales aliados
          que es lo que estas buscando
        </p>
      {/if}
    {:else if interestElements && interestElements.length > 0}
      <p class="ProfileInterests-subheadline">
        Parece que esta empresa necesita apoyo en algunas áreas, si eres quien
        puede ayudarlo contactalo
      </p>
    {:else}
      <p class="ProfileInterests-subheadline">
        La empresa no ha agregado intereses aún
      </p>
    {/if}

    {#if interestElements && interestElements.length > 0}
      <div class="ProfileInterests-list">
        {#each interestElements as interest, idx}
          <ProfileInterestChip
            id={`interest-chip-${idx + 1}`}
            interest={interest.name} />
        {/each}
      </div>
    {/if}
  {:else}
    <div class="profile__interests__register-now profile__register-now">
      <a href="/">Registrate</a> para ver este contenido
    </div>
  {/if}

  {#if isSessionUserProfile}
    <div class="ProfileInterests-bottom">
      <span
        class="ProfileInterests-button--variant"
        on:click={toggleEditableMode}>
        <!-- editableMode.update(mode => {console.log("click"); return !mode}) -->
        {$editableMode ? 'Dejar de editar' : 'Editar'}
      </span>
      <span
        class="ProfileInterests-button--variant"
        on:click={() => {}}>Crear</span>
    </div>
  {/if}
</div>
