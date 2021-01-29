<script>
  import SuppliersService from '../../services/suppliers/suppliers.service.js';
  import Textfield from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text';
  import Select, { Option } from '@smui/select';
  import SelectHelperText from '@smui/select/helper-text';
  import MapMarkerOutline from 'svelte-material-icons/MapMarkerOutline.svelte';
  import { validateString } from '../../validators/formValidators.js';
  import { stores } from '@sapper/app';
  import { getContext } from 'svelte';
  import { _ } from 'svelte-i18n';

  export let afterSubmit;
  export let displayName = '';
  export let industry = '';
  export let location = null;
  const { session } = stores();
  const isEditableProfile = getContext("isEditableProfile");

  const countries = ['Colombia', 'Estados unidos'];
  const fields = ['city', 'country', 'address'];

  let city = location && location.city ? location.city : '';
  let country = countries[0];
  let address = location && location.address ? location.address : '';

  let submitErrorMessage = "";

  $: displayNameValidation = validateString(
    displayName,
    3,
    50,
    true,
    "Nombre de la empresa válido"
  );

  $: industryValidation = validateString(
    industry,
    3,
    50,
    true,
    "Industria válida"
  );

  $: countryValidation = validateString(
    country,
    2,
    40,
    true,
    "País de origen válido"
  );

  $: cityValidation = validateString(city, 1, 40, false, "Ciudad válida");

  $: addressValidation = validateString(
    address,
    2,
    40,
    false,
    "Dirección válida"
  );

  $: validBeforeSubmit =
    displayNameValidation.isValid &&
    industryValidation.isValid &&
    cityValidation.isValid &&
    addressValidation.isValid;

  async function submit(event) {
    const Target = event.target;
    Target.style.opacity = 0.4;
    Target.style.cursor = "not-allowed";

    try {
      if (isEditableProfile) {
        if (!validBeforeSubmit) throw new Error();
        const supplierSummary = await submitProfileIdentity();
        afterSubmit(supplierSummary);
      }
    } catch (e) {
      const error = e.message;
      submitErrorMessage = "";
      let existErrorField = false;
      fields.map((field) => {
        let errorField = error[field];
        if (field == 'display_name' || field == 'industry')
          errorField = error['company'] ? error['company'][field] : null;

        if (errorField) {
          existErrorField = true;
          submitErrorMessage += `${
            submitErrorMessage ? `\n` : ""
          }-${field}: ${errorField}`;
        }
      });

      if (!existErrorField && !error)
        submitErrorMessage = $_("profileIdentityForm.invalidData");
      else if (!existErrorField) submitErrorMessage = error;
    } finally {
      Target.style.opacity = 1;
      Target.style.cursor = "pointer";
    }
  }

  async function submitProfileIdentity() {
    const supplierService = new SuppliersService();
    let dataToSubmit = {};

    if (country && country != "")
      dataToSubmit.principal_location = {
        ...dataToSubmit.principal_location,
        country: country,
      };
    if (city && city != "")
      dataToSubmit.principal_location = {
        ...dataToSubmit.principal_location,
        city: city,
      };
    if (address && address != "")
      dataToSubmit.principal_location = {
        ...dataToSubmit.principal_location,
        address: address,
      };

    const SupplierSummary = await supplierService.updateSupplierSummary(
      $session.company_accountname,
      dataToSubmit,
      $session.accessToken
    );

    return SupplierSummary;
  }
</script>

<div class="ProfileIdentityForm ProfileForm">
  <button
    class="ProfileIdentityForm-close-button ProfileForm-close-button"
    on:click>
    <span>X</span>
  </button>

  <div class="ProfileIdentityForm-headline">
    <h2 class="ProfileIdentityForm-name">{displayName}</h2>
    <span class="ProfileIdentityForm-industry">{industry}</span>
  </div>

  <form class="ProfileIdentityForm-form ProfileForm-form">
    {#if submitErrorMessage}
      <div class="form-banner--invalid">
        <p>{submitErrorMessage}</p>
      </div>
    {/if}

    <div class="ProfileForm-group">
      <div class="form-group">
        <Select
          style="width:100%;height:45px;"
          bind:value={country}
          variant="standard"
          label={$_("profileIdentityForm.country")}
          input$style="width: 100%;height:100%"
          invalid={country && !countryValidation.isValid}
        >
          <Option value="" />
          {#each countries as country}
            <Option
              value={country}
              selected={location &&
                location.country &&
                country.toLowerCase() === location.country.toLowerCase()}
            >
              {country}
            </Option>
          {/each}
        </Select>

        <SelectHelperText persistent={country && !countryValidation.isValid}>
          {countryValidation.message}</SelectHelperText
        >
      </div>

      <div class="form-group" style="margin-left:18px">
        <Textfield
          style="width: 100%;height:45px"
          variant="standard"
          label={$_("profileIdentityForm.city")}
          input$aria-controls="city"
          input$aria-describedby="city"
          input$maxlength="50"
          bind:value={city}
          invalid={city && !cityValidation.isValid}
        />

        <HelperText persistent={city && !cityValidation.isValid}>
          {cityValidation.message}</HelperText
        >
      </div>
    </div>

    <p class="ProfileIdentityForm-message">
      {$_("profileIdentityForm.changeYourMainData")}
    </p>

    <div class="form-group">
      <div class="ProfileForm-group">
        <p class="input-icon">
          <i class="icon-wrapper"><MapMarkerOutline /></i>
        </p>

        <div class="form-group">
          <Textfield
            style="width: 100%;height:45px"
            variant="standard"
            label={$_("profileIdentityForm.adress")}
            input$aria-controls="address"
            input$aria-describedby="address"
            input$maxlength="50"
            bind:value={address}
            invalid={address && !addressValidation.isValid}
          />

          <HelperText persistent={address && !addressValidation.isValid}>
            {addressValidation.message}</HelperText
          >
        </div>
      </div>

      <button
        on:click|preventDefault={submit}
        disabled={!validBeforeSubmit}
        class="ProfileIdentityForm-button button button--principal">
        {$_("profileIdentityForm.acceptAndDisplay")}
      </button>
    </div>
  </form>
</div>

<style>
  @import "/styles/form.css";

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
