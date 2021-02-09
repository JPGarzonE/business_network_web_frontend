<script>
  import SuppliersService from '../../services/suppliers/suppliers.service.js';
  import Textfield from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text';
  import Select, { Option } from '@smui/select';
  import SelectHelperText from '@smui/select/helper-text';
  import MapMarkerOutline from 'svelte-material-icons/MapMarkerOutline.svelte';
  import MapOutline from 'svelte-material-icons/MapOutline.svelte';
  import Earth from 'svelte-material-icons/Earth.svelte';
  import ChipListInput from '../../components/ChipListInput/ChipListInput.svelte';
  import { validateString, validateArray } from '../../validators/formValidators.js';
  import { stores } from '@sapper/app';
  import { getContext } from 'svelte';
  import { _ } from 'svelte-i18n';

  export let afterSubmit;
  export let displayName = '';
  export let industry = '';
  export let principalLocation = null;
  export let saleLocations = [];

  const { session } = stores();
  const isEditableProfile = getContext("isEditableProfile");

  const countries = ['Colombia', 'Estados unidos'];
  const fields = ['city', 'country', 'address'];
  
  principalLocation = principalLocation ? principalLocation : {};
  let saleLocationsToDelete = [];

  let city = principalLocation.city ? principalLocation.city : '';
  let country = principalLocation.country ? principalLocation.country : countries[0];
  let address = principalLocation.address ? principalLocation.address : '';

  let submitErrorMessage = "";

  $: displayNameValidation = validateString( displayName, 3, 50, true, "Nombre de la empresa válido" );

  $: industryValidation = validateString( industry, 3, 50, true, "Industria válida" );

  $: countryValidation = validateString( country, 2, 40, true, "País de origen válido" );

  $: cityValidation = validateString( city, 1, 40, false, "Ciudad válida" );

  $: addressValidation = validateString( address, 2, 40, false, "Dirección válida" );
  
  const SaleLocationItemValidation = (saleLocationCountry) =>
    validateString( saleLocationCountry, 2, 40, true, "" );

  $: saleLocationsValidation = validateArray( saleLocations, (location) => {
    return SaleLocationItemValidation(location.country);
  });

	$: validBeforeSubmit = displayNameValidation.isValid && industryValidation.isValid &&
		countryValidation.isValid && cityValidation.isValid && 
		addressValidation.isValid && saleLocationsValidation.isValid;
  
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
		
    let dataToSubmit = {
			display_name: displayName,
      industry: industry,
      principal_location: {
        country, city, address
			},
			sale_locations: saleLocations
    };

    const SupplierSummary = await supplierService.updateSupplierSummary(
      $session.company_accountname,
      saleLocationsToDelete,
      dataToSubmit,
      $session.accessToken
    );

    return SupplierSummary;
  }

  function deleteSaleLocation( item ) {
    if( item && item.id ){
      saleLocationsToDelete = [...saleLocationsToDelete, item.id];
    }
  }
</script>

<div class="ProfileIdentityForm ProfileForm">
  <button
    class="ProfileIdentityForm-close-button ProfileForm-close-button"
    on:click>
    <span>X</span>
  </button>

  <div class="ProfileIdentityForm-headline">
    <h3 class="ProfileIdentityForm-title">Datos principales</h3>
  </div>

  <form class="ProfileIdentityForm-form ProfileForm-form">
    {#if submitErrorMessage}
      <div class="form-banner--invalid">
        <p>{submitErrorMessage}</p>
      </div>
    {/if}

    <div class="ProfileForm-group ProfileForm-group--narrow">
      <div class="form-group">
        <Textfield
          style="width: 100%;height:50px"
          variant="outlined"
          label={$_("profileIdentityForm.name")}
          input$aria-controls="name"
          input$aria-describedby="name"
          input$maxlength="50"
          bind:value={displayName}
          invalid={displayName && !displayNameValidation.isValid}
        />

        <HelperText persistent={displayName && !displayNameValidation.isValid}>
          {displayNameValidation.message}</HelperText
        >
      </div>
    </div>

    <div class="ProfileForm-group ProfileForm-group--narrow">
      <div class="form-group">
        <Textfield
          style="width: 100%;height:50px"
          variant="outlined"
          label={$_("profileIdentityForm.industry")}
          input$aria-controls="industry"
          input$aria-describedby="industry"
          input$maxlength="50"
          bind:value={industry}
          invalid={industry && !industryValidation.isValid}
        />

        <HelperText persistent={industry && !industryValidation.isValid}>
          {industryValidation.message}</HelperText
        >
      </div>
    </div>

    <div class="ProfileForm-group">
      <p class="input-icon">
        <i class="icon-wrapper"><MapOutline /></i>
      </p>

      <div class="form-group">
        <Select
          style="width:100%;height:50px;"
          bind:value={country}
          variant="outlined"
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
          style="width: 100%;height:50px"
          variant="outlined"
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

    <div class="ProfileForm-group">
      <p class="input-icon">
        <i class="icon-wrapper"><MapMarkerOutline /></i>
      </p>

      <div class="form-group">
        <Textfield
          style="width: 100%;height:50px"
          variant="outlined"
          label={$_("profileIdentityForm.address")}
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

    <div class="ProfileForm-group">
      <ChipListInput bind:items={saleLocations} itemsAreEditable 
        placeholder={$_("profileIdentityForm.exportCountries")}
        fromItemToText={(item) => item.country}
        fromTextToItem={(text) => 
          { return {country: text} }
        }
        validateItemValue={SaleLocationItemValidation}
        onDeleteItem={deleteSaleLocation}
      >
        <p class="input-icon" slot="input-icon" >
          <i class="icon-wrapper"><Earth /></i>
        </p>
      </ChipListInput>
    </div>

    <button
      on:click|preventDefault={submit}
      disabled={!validBeforeSubmit}
      class="ProfileIdentityForm-button button button--principal">
      {$_("profileIdentityForm.acceptAndDisplay")}
    </button>

  </form>
</div>

<style>
  @import "/styles/form.css";

  .ProfileForm-group--narrow {
    width: calc(100% - 30px);
    margin-left: auto;
  }

  .form-group {
    margin-top: 0;
    margin-bottom: 10px;
  }

  .input-icon {
    width: 22px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
  }

  .ProfileIdentityForm-headline {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
  }

  .ProfileIdentityForm-title {
    margin: 0;
    font-size: 1.2em;
    font-weight: 400;
    font-family: var(--title-font);
    text-align: center;
    letter-spacing: 0.035em;
    color: var(--secondary-text-color);
  }

  .ProfileIdentityForm-button {
    width: calc(100% - 30px);
    margin-left: auto;
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

  @media screen and (min-width: 425px) {
    .ProfileIdentityForm {
      padding: 50px 50px 40px 30px;
    }
  }

</style>
