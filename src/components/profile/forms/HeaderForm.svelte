<script>
  import LocationService from '../../../services/companies/location.service.js';
  import GoogleTranslate from 'svelte-material-icons/GoogleTranslate.svelte';
  import MapMarkerOutline from 'svelte-material-icons/MapMarkerOutline.svelte';
  import { stores } from '@sapper/app';
  import { getContext } from 'svelte';

  export let afterSubmit;
  export let name;
  export let industry = '';
  export let location;
  const { session } = stores();
  const isSessionUserProfile = getContext('isSessionUserProfile');

  const countries = ['Colombia', 'Estados unidos'];
  const fields = ['city', 'country', 'address'];

  let city = location && location.city ? location.city : '';
  let country;
  let address = location && location.address ? location.address : '';

  let formErrorMessage = '';

  let cityFeedback;
  let addressFeedback;

  function validateCity() {
    if (city && city.length >= 1) {
      if (city.length > 40) {
        cityFeedback = 'Máximo 40 caracteres';
        return false;
      }

      cityFeedback = '';
      return true;
    } else {
      cityFeedback = 'La ciudad es obligatoria';
      return false;
    }
  }

  function validateAddress() {
    if (address.length > 0 && address.length < 2) {
      addressFeedback = 'Mínimo 2 caracteres';
      return false;
    } else if (address.length > 40) {
      addressFeedback = 'Máximo 40 caracteres';
      return false;
    }

    addressFeedback = '';
    return true;
  }

  function validateHeaderForm() {
    if (!(validateCity() && validateAddress())) {
      formErrorMessage = 'Los datos no son válidos';
      throw new Error();
    } else {
      formErrorMessage = '';
    }
  }

  async function submit(event) {
    const Target = event.target;
    Target.style.opacity = 0.4;
    Target.style.cursor = 'not-allowed';

    try {
      if (isSessionUserProfile) {
        validateHeaderForm();
        const locationData = await submitLocation();
        afterSubmit(locationData);
      }
    } catch (e) {
      const error = e.message;
      fields.map((field) => {
        if (error[field]) {
          formErrorMessage += `${formErrorMessage ? '\n' : ''}${field}: ${
            error[field]
          }`;
        }
      });
    } finally {
      Target.style.opacity = 1;
      Target.style.cursor = 'pointer';
    }
  }

  async function submitLocation() {
    const locationService = new LocationService();
    let dataToSubmit = {};

    if (location) {
      location.city = location.city ? location.city : '';
      location.country = location.country ? location.country : '';
      location.address = location.address ? location.address : '';

      if (city != location.city) dataToSubmit.city = city;
      if (country != location.country) dataToSubmit.country = country;
      if (address != location.address) dataToSubmit.address = address;

      const dataToSubmitIsEmpty = Object.keys(dataToSubmit).length === 0;
      if (!dataToSubmitIsEmpty) {
        const locationData = await locationService.updateUserLocation(
          $session.username,
          location.id,
          dataToSubmit,
          $session.accessToken
        );

        return locationData;
      }
    } else {
      if (city != '') dataToSubmit.city = city;
      if (country != '') dataToSubmit.country = country;
      if (address != '') dataToSubmit.address = address;

      const dataToSubmitIsEmpty = Object.keys(dataToSubmit).length === 0;
      if (!dataToSubmitIsEmpty) {
        const locationData = await locationService.createUserLocation(
          $session.username,
          dataToSubmit,
          $session.accessToken
        );

        return locationData;
      }
    }
  }
</script>

<style>
  @import '/styles/form.css';

  .HeaderForm-headline {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
  }

  .HeaderForm-name {
    margin: 0;
    margin-top: 25px;
    font-size: 1.3em;
    font-weight: 400;
    text-align: center;
    text-transform: capitalize;
  }

  .HeaderForm-industry {
    width: 400px;
    margin-bottom: 15px;
    font-size: 0.9em;
    text-align: center;
    color: var(--secondary-text-color);
  }

  .HeaderForm-message {
    margin: 40px 0px 10px;
    font-size: 0.95em;
    text-align: center;
    color: var(--secondary-text-color);
  }

  .HeaderForm-country,
  .HeaderForm-city,
  .HeaderForm-address {
    border: none;
    border-bottom: 1px solid var(--secondary-text-color);
  }

  .HeaderForm-country {
    width: 45%;
    margin-right: 15px;
  }

  .HeaderForm-city,
  .HeaderForm-address {
    width: 100%;
  }

  .HeaderForm-button {
    margin-top: 3.5em;
  }

  .icon-wrapper {
    display: flex;
    border: 1px solid var(--principal-color);
    border-radius: 100%;
    color: var(--principal-color);
    margin-right: 5%;
    padding: 2px;
  }
</style>

<div class="HeaderForm ProfileForm">
  <button class="HeaderForm-close-button ProfileForm-close-button" on:click>
    <span>X</span>
  </button>

  <div class="HeaderForm-headline">
    <h2 class="HeaderForm-name">{name}</h2>
    <span class="HeaderForm-industry">{industry}</span>
  </div>

  <form class="HeaderForm-form ProfileForm-form">
    {#if formErrorMessage}
      <div class="form-banner--invalid">
        <p>{formErrorMessage}</p>
      </div>
    {/if}

    <div class="form-group">
      <div class="ProfileForm-group">
        <select name="country" bind:value={country} class="HeaderForm-country">
          {#each countries as country}
            <option
              value={country}
              selected={location && location.country && country && country.toLowerCase() === location.country.toLowerCase()}>
              {country}
            </option>
          {/each}
        </select>

        <input
          type="text"
          name="city"
          placeholder="Ciudad"
          class="HeaderForm-city"
          on:input={validateCity}
          bind:value={city} />
      </div>

      {#if cityFeedback}
        <p class="form-control-feedback form-control-feedback--invalid">
          {cityFeedback}
        </p>
      {/if}
    </div>

    <p class="HeaderForm-message">Cambia tus datos principales</p>

    <div class="form-group">
      <div class="ProfileForm-group">
        <p class="ProfileHeader-data">
          <i class="icon-wrapper"><GoogleTranslate /></i>
        </p>
        <input
          type="text"
          name="city"
          placeholder="Ciudad"
          class="HeaderForm-city"
          on:input={validateCity}
          bind:value={city} />
      </div>

      <div class="form-group">
        <div class="ProfileForm-group">
          <p class="ProfileHeader-data">
            <i class="icon-wrapper"><MapMarkerOutline /></i>
          </p>
          <input
            type="text"
            name="address"
            placeholder="Dirección"
            class="HeaderForm-address"
            bind:value={address}
            on:input={validateAddress} />
        </div>

        {#if addressFeedback}
          <p class="form-control-feedback form-control-feedback--invalid">
            {addressFeedback}
          </p>
        {/if}
      </div>

      <button
        on:click|preventDefault={submit}
        class="HeaderForm-button button button--principal">
        Aceptar y mostrar
      </button>
    </div>
  </form>
</div>
