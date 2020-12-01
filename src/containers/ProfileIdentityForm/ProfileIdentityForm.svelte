<script>
  import CompanyService from '../../services/companies/companies.service.js';
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text";
  import Select, {Option} from "@smui/select";
  import SelectHelperText from "@smui/select/helper-text";
  import Cellphone from 'svelte-material-icons/Cellphone.svelte';
  import MapMarkerOutline from 'svelte-material-icons/MapMarkerOutline.svelte';
  import Web from "svelte-material-icons/Web.svelte";
  import { validateString, validateInternationalPhoneNumber, validateAreaCodePhoneNumber } from '../../validators/formValidators.js';
  import { stores } from '@sapper/app';
  import { getContext } from 'svelte';

  export let afterSubmit;
  export let name = '';
  export let industry = '';
  export let webUrl = '';
  export let location = null;
  export let contact = null;
  const { session } = stores();
  const isSessionUserProfile = getContext('isSessionUserProfile');

  const countries = ['Colombia', 'Estados unidos'];
  const fields = ['city', 'country', 'address', 'web_url'];

  webUrl = webUrl ? webUrl : '';
  let city = location && location.city ? location.city : '';
  let country = countries[0];
  let address = location && location.address ? location.address : '';
  let contactAreaCode = contact && contact.area_code ? contact.area_code : '';
  let contactNumber = contact && contact.phone ? contact.phone : '';

  let submitErrorMessage = '';

  $: nameValidation = validateString(name, 3, 50, true, "Nombre de la empresa válido");

  $: industryValidation = validateString(industry, 3, 50, true, "Industria válida");

  $: countryValidation = validateString(country, 2, 40, true, "País de origen válido");

  $: cityValidation = validateString(city, 1, 40, false, "Ciudad válida");

  $: addressValidation = validateString(address, 2, 40, false, "Dirección válida");

  $: webUrlValidation = validateString(webUrl, 0, 70, false, "Página web válida");

  $: contactAreaCodeValidation = validateAreaCodePhoneNumber(contactAreaCode);

  $: contactNumberValidation = validateInternationalPhoneNumber(contactNumber);

  $: validBeforeSubmit = nameValidation.isValid && industryValidation.isValid && cityValidation.isValid 
    && addressValidation.isValid && webUrlValidation.isValid && contactNumberValidation.isValid 
    && contactAreaCodeValidation.isValid;


  async function submit(event) {
    const Target = event.target;
    Target.style.opacity = 0.4;
    Target.style.cursor = 'not-allowed';

    try {
      if (isSessionUserProfile) {
        if( !validBeforeSubmit ) throw new Error();
        const companySummary = await submitProfileIdentity();
        afterSubmit(companySummary);
      }
    } catch (e) { 
      const error = e.message;
      submitErrorMessage = "";
      let existErrorField = false;
      fields.map((field) => {
          let errorField = error[field];
          if( field == "nit" || field == "name" || field == "industry" )
              errorField = error["company"] ? error["company"][field] : null;

          if(errorField) {
              existErrorField = true;
              submitErrorMessage += `${submitErrorMessage ? `\n` : ''}-${field}: ${
                  errorField
              }`;
          }
      });

      if( !existErrorField && !error ) submitErrorMessage = "Los datos no son válidos";
      else if( !existErrorField ) submitErrorMessage = error;

    } finally {
      Target.style.opacity = 1;
      Target.style.cursor = 'pointer';
    }
  }

  async function submitProfileIdentity() {
    const companyService = new CompanyService();
    let dataToSubmit = {};

    if( country && country != '' ) 
      dataToSubmit.principal_location = {...dataToSubmit.principal_location, country: country};
    if( city && city != '' ) 
      dataToSubmit.principal_location = {...dataToSubmit.principal_location, city: city};
    if( address && address != '' ) 
      dataToSubmit.principal_location = {...dataToSubmit.principal_location, address: address};

    if( contactNumber && contactNumber != '' )
      dataToSubmit.principal_contact = {...dataToSubmit.principal_contact, phone: contactNumber};
    if( contactAreaCode && contactAreaCode != '' ) 
      dataToSubmit.principal_contact = {...dataToSubmit.principal_contact, area_code: contactAreaCode};

    if( webUrl && webUrl != '' ) dataToSubmit.web_url = webUrl;

    const CompanySummary = await companyService.updateCompanySummary( 
      $session.username, dataToSubmit, $session.accessToken );

    return CompanySummary;
  }
</script>

<style>
  @import '/styles/form.css';

  .form-group {
    margin-top: 0;
  }

  .input-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  }

  .ProfileIdentityForm-headline {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
  }

  .ProfileIdentityForm-name {
    margin: 0;
    margin-top: 25px;
    font-size: 1.3em;
    font-weight: 400;
    text-align: center;
    text-transform: capitalize;
  }

  .ProfileIdentityForm-industry {
    width: 400px;
    margin-bottom: 15px;
    font-size: 0.9em;
    text-align: center;
    color: var(--secondary-text-color);
  }

  .ProfileIdentityForm-message {
    margin: 15px 0px 10px;
    font-size: 0.95em;
    text-align: center;
    color: var(--secondary-text-color);
  }

  .ProfileIdentity-advice {
    width: 100%;
    margin-left: 1em;
    margin-top: 0.5em;
    font-size: 0.8em;
    letter-spacing: 0.22px;
    color: var(--principal-color);
  }

  .ProfileIdentityForm-button {
    margin-top: 2em;
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

<div class="ProfileIdentityForm ProfileForm">
  <button class="ProfileIdentityForm-close-button ProfileForm-close-button" on:click>
    <span>X</span>
  </button>

  <div class="ProfileIdentityForm-headline">
    <h2 class="ProfileIdentityForm-name">{name}</h2>
    <span class="ProfileIdentityForm-industry">{industry}</span>
  </div>

  <form class="ProfileIdentityForm-form ProfileForm-form">
    {#if submitErrorMessage}
      <div class="form-banner--invalid">
        <p>{submitErrorMessage}</p>
      </div>
    {/if}

    <div class="ProfileForm-group">
      <div class="form-group" >
        <Select style="width:100%;height:45px;" bind:value={country} variant="standard"
          label="País*" input$style="width: 100%;height:100%"
          invalid={country && !countryValidation.isValid} >

          <Option value=""></Option>
          {#each countries as country}
              <Option value={country} 
                selected={location && location.country && country.toLowerCase() === location.country.toLowerCase()}>
                {country}
              </Option>
          {/each}
        </Select>
        
        <SelectHelperText persistent={country && !countryValidation.isValid}>
          {countryValidation.message}</SelectHelperText>
      </div>

      <div class="form-group" style="margin-left:18px">
        <Textfield style="width: 100%;height:45px" variant="standard"
          label="Ciudad*" input$aria-controls="city" input$aria-describedby="city"
          input$maxlength="50" bind:value={city}
          invalid={city && !cityValidation.isValid} />
          
        <HelperText persistent={city && !cityValidation.isValid}>
          {cityValidation.message}</HelperText>
      </div>
    </div>

    <p class="ProfileIdentityForm-message">Cambia tus datos principales</p>

    <div class="form-group">
      <div class="ProfileForm-group">
        <p class="input-icon">
          <i class="icon-wrapper"><MapMarkerOutline /></i>
        </p>
        
        <div class="form-group">
          <Textfield style="width: 100%;height:45px" variant="standard"
            label="Dirección" input$aria-controls="address" input$aria-describedby="address"
            input$maxlength="50" bind:value={address}
            invalid={address && !addressValidation.isValid} />
            
          <HelperText persistent={address && !addressValidation.isValid}>
            {addressValidation.message}</HelperText>
        </div>
      </div>

      <div class="ProfileForm-group">
        <p class="input-icon">
          <i class="icon-wrapper"><Web /></i>
        </p>
        
        <div class="form-group">
          <Textfield style="width: 100%;height:45px" variant="standard"
            label="Página web" input$aria-controls="web-url" input$aria-describedby="web-url"
            input$maxlength="50" bind:value={webUrl}
            invalid={webUrl && !webUrlValidation.isValid} />
          
          <HelperText persistent={webUrl && !webUrlValidation.isValid}>
            {webUrlValidation.message}</HelperText>
        </div>
      </div>

      <div class="ProfileForm-group">
        <p class="input-icon">
          <i class="icon-wrapper"><Cellphone /></i>
        </p>
        
        <div class="form-group" style="width:20%;margin-right:15px;">
          <Textfield style="width:100%;height:45px" variant="standard"
            label="Código" input$aria-controls="contact-area-code" input$aria-describedby="contact-area-code"
            input$maxlength="5" bind:value={contactAreaCode}
            invalid={contactAreaCode && !contactAreaCodeValidation.isValid} />

          <HelperText persistent={contactAreaCode && !contactAreaCodeValidation.isValid}>
            {contactAreaCodeValidation.message}</HelperText>
        </div>

        <div class="form-group" style="width:80%;">
          <Textfield style="width:100%;height:45px" variant="standard"
            label="Celular de contacto" input$aria-controls="contact-number" input$aria-describedby="contact-number"
            input$maxlength="50" bind:value={contactNumber}
            invalid={contactNumber && !contactNumberValidation.isValid} />
          
          <HelperText persistent={contactNumber && !contactNumberValidation.isValid}>
            {contactNumberValidation.message}</HelperText>
        </div>
      </div>

      <p class="ProfileIdentity-advice">
        * Por medio de este numero los compradores verificados de Conecty te van a poder contactar. <br />
        Con un click lo conectamos directamente a whatsapp para que contactarte ¡sea cuestión de segundos!.
      </p>

      <button on:click|preventDefault={submit}
        disabled={!validBeforeSubmit}
        class="ProfileIdentityForm-button button button--principal">
        Aceptar y mostrar
      </button>
    </div>
  </form>
</div>
