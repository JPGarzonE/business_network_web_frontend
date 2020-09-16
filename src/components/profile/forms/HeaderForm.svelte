<script>
  import LocationService from '../../../services/companies/location.service.js';
  import ContactService from '../../../services/companies/contact.service.js';
  import GoogleTranslate from 'svelte-material-icons/GoogleTranslate.svelte';
  import MapMarkerOutline from 'svelte-material-icons/MapMarkerOutline.svelte';
  import { stores } from '@sapper/app';
  import { getContext } from 'svelte';

  export let afterSubmit;
  export let name;
  export let industry = '';
  export let contact;
  export let location;
  const { session } = stores();
  const isSessionUserProfile = getContext('isSessionUserProfile');

  const countries = ['Colombia', 'Estados unidos'];
  const fields = ['city', 'country', 'address', 'ext', 'phone', 'email'];

  let city = location && location.city ? location.city : '';
  let country;
  let address = location && location.address ? location.address : '';
  let ext = contact && contact.ext_phone ? contact.ext_phone : '';
  let phone = contact && contact.phone ? contact.phone : '';
  let email = contact && contact.email ? contact.email : '';

  let formErrorMessage = '';

  let cityFeedback;
  let addressFeedback;
  let extFeedback;
  let phoneFeedback;
  let emailFeedback;

  function validateEmailPattern() {
    let emailMatch = email.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (emailMatch) {
      emailFeedback = '';
      return true;
    } else {
      emailFeedback = 'Correo inválido';
      return false;
    }
  }

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

  function validateExt() {
    if (ext.length > 5) {
      extFeedback = 'Máximo 5 caracteres';
      return false;
    }

    extFeedback = '';
    return true;
  }

  function validatePhone() {
    if (phone.length > 0 && phone.length < 6) {
      phoneFeedback = 'Mínimo 6 caracteres';
      return false;
    } else if (phone.length > 15) {
      phoneFeedback = 'Máximo 15 caracteres';
      return false;
    }

    phoneFeedback = '';
    return true;
  }

  function validateHeaderForm() {
    if (!(validateCity() && validateAddress())) {
      formErrorMessage = 'Los datos no son válidos';
      throw new Error();
    } else if (!(validateExt() && validatePhone() && validateEmailPattern())) {
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

        const contactData = await submitContact();
        const locationData = await submitLocation();

        afterSubmit(contactData, locationData);
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

  async function submitContact() {
    const contactService = new ContactService();
    let dataToSubmit = {};

    if (contact) {
      contact.ext_phone = contact.ext_phone ? contact.ext_phone : '';
      contact.phone = contact.phone ? contact.phone : '';
      contact.email = contact.email ? contact.email : '';

      if (ext != contact.ext_phone) dataToSubmit.ext_phone = ext;
      if (phone != contact.phone) dataToSubmit.phone = phone;
      if (email != contact.email) dataToSubmit.email = email;

      const dataToSubmitIsEmpty = Object.keys(dataToSubmit).length === 0;
      if (!dataToSubmitIsEmpty) {
        const contactData = await contactService.updateUserContact(
          $session.username,
          contact.id,
          dataToSubmit,
          $session.accessToken
        );

        return contactData;
      }
    } else {
      if (ext != '') dataToSubmit.ext_phone = ext;
      if (phone != '') dataToSubmit.phone = phone;
      if (email != '') dataToSubmit.email = email;

      const dataToSubmitIsEmpty = Object.keys(dataToSubmit).length === 0;
      if (!dataToSubmitIsEmpty) {
        const contactData = await contactService.createUserContact(
          $session.username,
          dataToSubmit,
          $session.accessToken
        );

        return contactData;
      }
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
