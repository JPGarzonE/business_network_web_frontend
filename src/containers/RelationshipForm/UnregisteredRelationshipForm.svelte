<script>
  import { getContext } from 'svelte';
  import { stores } from '@sapper/app';
  import Textfield from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text';
  import Select, { Option } from '@smui/select';
  import PlusCircleOutline from 'svelte-material-icons/PlusCircleOutline.svelte';

  import UnregisteredRelationshipService from '../../services/relationships/unregistered.relationship.service.js';
  import { INDUSTRIES } from '../../store/store.js';

  export let afterSubmit;
  export let unregisteredRelationship; // Pass if is an update form

  const editMode = unregisteredRelationship !== undefined;

  const fields = ['name', 'industry', 'country', 'type'];
  const { session } = stores();
  const isSessionUserProfile = getContext('isSessionUserProfile');
  const unregisteredRelationshipService = new UnregisteredRelationshipService();

  const { unregistered = {}, type = '', id: relationshipID } = editMode
    ? unregisteredRelationship
    : {};

  let name = editMode ? unregistered.name : '';
  let industry = editMode
    ? unregistered.industry
    : INDUSTRIES
    ? INDUSTRIES[0]
    : '';
  let otherIndustry = '';
  let country = editMode ? unregistered.country : '';
  let relationshipType = type ? type : '';

  $: industryIsOther = industry.includes('OTROS');
  let formErrorMessage = '';

  let nameFeedback = '';
  let otherIndustryFeedback = '';
  let countryFeedback = '';
  let relationshipTypeFeedback = '';

  function validateName() {
    if (name && name.length >= 2) {
      if (name.length > 60) {
        nameFeedback = 'Máximo 60 caracteres';
        return false;
      }
      nameFeedback = '';
      return true;
    } else if (name && name.length > 0 && name.length < 2) {
      nameFeedback = 'Mínimo 2 caracteres';
      return false;
    } else {
      nameFeedback = 'El nombre es obligatorio';
      return false;
    }
  }

  function validateOtherIndustry() {
    if (industryIsOther) {
      if (otherIndustry && otherIndustry.length >= 3) {
        if (otherIndustry.length > 50) {
          otherIndustryFeedback = 'Máximo 50 caracteres';
          return false;
        }
        otherIndustryFeedback = '';
        return true;
      } else if (
        otherIndustry &&
        otherIndustry.length > 0 &&
        otherIndustry.length < 3
      ) {
        otherIndustryFeedback = 'Mínimo 3 caracteres';
        return false;
      } else {
        otherIndustryFeedback = 'La industria es obligatoria';
        return false;
      }
    }

    otherIndustryFeedback = '';
    return true;
  }

  function validateCountry() {
    if (country && country.length >= 2) {
      if (country.length > 40) {
        countryFeedback = 'Máximo 40 caracteres';
        return false;
      }

      countryFeedback = '';
      return true;
    } else if (country && country.length > 0 && country.length < 2) {
      countryFeedback = 'Mínimo 2 caracteres';
      return false;
    }

    countryFeedback = '';
    return true;
  }

  function validateRelationshipType() {
    if (relationshipType && relationshipType.length > 1) {
      if (relationshipType.length > 30) {
        relationshipTypeFeedback = 'Máximo 30 caracteres';
        return false;
      }

      relationshipTypeFeedback = '';
      return true;
    } else {
      relationshipTypeFeedback = 'El tipo de relación es obligatoria';
      return false;
    }
  }

  function validateUnregisteredRelationshipForm() {
    if (!(validateName() && validateOtherIndustry())) {
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
        if (editMode) {
          const unregisteredRelationshipData = await unregisteredRelationshipService.updateUnregisteredRelationshipType(
            $session.accessToken,
            relationshipID,
            relationshipType
          );
          afterSubmit(unregisteredRelationshipData);
          console.log(
            'submit -> unregisteredRelationshipData',
            unregisteredRelationshipData
          );
        } else {
          validateUnregisteredRelationshipForm();
          let dataToSubmit = {
            name,
            country,
            industry,
          };

          const unregisteredRelationshipData = await unregisteredRelationshipService.createUnregisteredRelationship(
            $session.accessToken,
            dataToSubmit,
            relationshipType
          );

          afterSubmit(unregisteredRelationshipData);
        }
      }
    } catch (e) {
      console.error('submit -> e', e);

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
</script>

<style>
  @import '/styles/form.css';

  .UnregisteredRelationshipForm-headline {
    width: 100%;
    max-width: 400px;
    margin-bottom: 1.9em;
  }

  .UnregisteredRelationshipForm-title {
    margin: 0;
    font-size: 1.2em;
    font-weight: 400;
    font-family: var(--title-font);
    text-align: center;
    letter-spacing: 0.035em;
    color: var(--secondary-text-color);
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
  <button
    class="UnregisteredRelationshipForm-close-button ProfileForm-close-button"
    on:click>
    <span>X</span>
  </button>

  <div class="UnregisteredRelationshipForm-headline">
    <h3 class="UnregisteredRelationshipForm-title">
      {editMode ? 'Actualizar cliente' : 'Añadir cliente'}
    </h3>

    {#if formErrorMessage}
      <div class="form-banner--invalid">
        <p>{formErrorMessage}</p>
      </div>
    {/if}
  </div>

  <form class="UnregisteredRelationshipForm-form ProfileForm-form">
    <div class="form-group">
      <Textfield
        style="width: 100%;"
        variant="outlined"
        bind:value={name}
        label="Nombre del cliente*"
        input$aria-controls="company-name"
        input$aria-describedby="company-name"
        input$maxlength="60"
        on:input={validateName}
        disabled={editMode} />
      <HelperText id="company-name">{nameFeedback}</HelperText>
    </div>

    {#if !editMode}
      <div class="form-group">
        <Select variant="outlined" bind:value={industry} label="Categoría*">
          {#each INDUSTRIES as ind}
            <Option value={ind} selected={industry === ind.toLowerCase()}>
              {ind}
            </Option>
          {/each}
        </Select>
      </div>
      {#if industryIsOther}
        <div class="form-group">
          <Textfield
            style="width: 100%;"
            variant="outlined"
            bind:value={otherIndustry}
            label="¿Cuál otra?"
            input$aria-controls="company-other-industry"
            input$aria-describedby="company-other-industry"
            input$maxlength="60"
            on:input={validateOtherIndustry} />
          <HelperText id="company-other-industry">
            {otherIndustryFeedback}
          </HelperText>
        </div>
      {/if}
    {:else}
      <div class="form-group">
        <Textfield
          style="width: 100%;"
          variant="outlined"
          bind:value={industry}
          label="Categoría*"
          input$aria-controls="company-industry"
          input$aria-describedby="company-industry"
          input$maxlength="60"
          disabled={true} />
      </div>
    {/if}

    <div class="form-group">
      <Textfield
        style="width: 100%;"
        variant="outlined"
        bind:value={country}
        label="País de origen"
        input$aria-controls="company-country"
        input$aria-describedby="company-country"
        input$maxlength="40"
        on:input={validateCountry}
        disabled={editMode} />
      <HelperText id="company-country">{countryFeedback}</HelperText>
    </div>

    <div class="form-group">
      <Textfield
        style="width: 100%;"
        variant="outlined"
        bind:value={relationshipType}
        label="Tipo relación"
        input$aria-controls="company-relation"
        input$aria-describedby="company-relation"
        input$maxlength="40"
        on:input={validateRelationshipType} />
      <HelperText id="company-relation">{relationshipTypeFeedback}</HelperText>
    </div>

    <button
      on:click|preventDefault={submit}
      class="UnregisteredRelationshipForm-button button button--secondary">
      <PlusCircleOutline size={15} />
      {editMode ? 'Actualizar Cliente' : 'Añadir Cliente'}
    </button>
  </form>
</div>
