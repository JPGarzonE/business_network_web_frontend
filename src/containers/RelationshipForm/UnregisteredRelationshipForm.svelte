<script>
  import { getContext } from "svelte";
  import { stores } from "@sapper/app";
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text";
  import Select, { Option } from "@smui/select";
  import PlusCircleOutline from "svelte-material-icons/PlusCircleOutline.svelte";
  import { _ } from "svelte-i18n";

  import UnregisteredRelationshipService from "../../services/relationships/unregistered.relationship.service.js";
  import { INDUSTRIES } from "../../store/store.js";

  export let afterSubmit;
  export let unregisteredRelationship; // Pass if is an update form

  const editMode = unregisteredRelationship != undefined;

  const fields = ["name", "industry", "country", "type"];
  const { session } = stores();
  const isEditableProfile = getContext("isEditableProfile");
  const unregisteredRelationshipService = new UnregisteredRelationshipService();

  const { unregistered = {}, type = "", id: relationshipID } = editMode
    ? unregisteredRelationship
    : {};

  let name = editMode ? unregistered.name : "";
  let industry = editMode
    ? unregistered.industry
    : INDUSTRIES
    ? INDUSTRIES[0]
    : "";
  let otherIndustry = "";
  let country = editMode && unregistered.country ? unregistered.country : "";
  let relationshipType = type ? type : "";

  $: industryIsOther = industry.includes("OTROS");
  let formErrorMessage = "";

  let nameFeedback = "";
  let otherIndustryFeedback = "";
  let countryFeedback = "";
  let relationshipTypeFeedback = "";

  function validateName() {
    if (name && name.length >= 2) {
      if (name.length > 60) {
        nameFeedback = $_("unregisteredRelationshipForm.maxCharacters", {
          num: 60,
        });
        return false;
      }
      nameFeedback = "";
      return true;
    } else if (name && name.length > 0 && name.length < 2) {
      nameFeedback = $_("unregisteredRelationshipForm.minCharacters", {
        num: 2,
      });
      return false;
    } else {
      nameFeedback = $_("unregisteredRelationshipForm.requiredName");
      return false;
    }
  }

  function validateOtherIndustry() {
    if (industryIsOther) {
      if (otherIndustry && otherIndustry.length >= 3) {
        if (otherIndustry.length > 50) {
          otherIndustryFeedback = $_(
            "unregisteredRelationshipForm.maxCharacters",
            { num: 50 }
          );
          return false;
        }
        otherIndustryFeedback = "";
        return true;
      } else if (
        otherIndustry &&
        otherIndustry.length > 0 &&
        otherIndustry.length < 3
      ) {
        otherIndustryFeedback = $_(
          "unregisteredRelationshipForm.minCharacters",
          { num: 3 }
        );
        return false;
      } else {
        otherIndustryFeedback = $_(
          "unregisteredRelationshipForm.requiredIndustry"
        );
        return false;
      }
    }

    otherIndustryFeedback = "";
    return true;
  }

  function validateCountry() {
    if (country && country.length >= 2) {
      if (country.length > 40) {
        countryFeedback = $_("unregisteredRelationshipForm.maxCharacters", {
          num: 40,
        });
        return false;
      }

      countryFeedback = "";
      return true;
    } else if (country && country.length > 0 && country.length < 2) {
      countryFeedback = $_("unregisteredRelationshipForm.minCharacters", {
        num: 2,
      });
      return false;
    }

    countryFeedback = "";
    return true;
  }

  function validateRelationshipType() {
    if (relationshipType && relationshipType.length > 1) {
      if (relationshipType.length > 30) {
        relationshipTypeFeedback = $_(
          "unregisteredRelationshipForm.maxCharacters",
          { num: 30 }
        );
        return false;
      }

      relationshipTypeFeedback = "";
      return true;
    } else {
      relationshipTypeFeedback = $_(
        "unregisteredRelationshipForm.requiredRelation"
      );
      return false;
    }
  }

  function validateUnregisteredRelationshipForm() {
    if (
      !(
        validateName() &&
        validateOtherIndustry() &&
        validateCountry() &&
        validateRelationshipType()
      )
    ) {
      formErrorMessage = "Los datos no son válidos";
      throw new Error();
    } else {
      formErrorMessage = "";
    }
  }

  async function submit(event) {
    const Target = event.target;
    Target.style.opacity = 0.4;
    Target.style.cursor = "not-allowed";

    try {
      if (isEditableProfile) {
        if (editMode) {
          const unregisteredRelationshipData = await unregisteredRelationshipService.updateUnregisteredRelationshipType(
            $session.company_accountname,
            $session.accessToken,
            relationshipID,
            relationshipType
          );

          afterSubmit(unregisteredRelationshipData);
        } else {
          validateUnregisteredRelationshipForm();
          let dataToSubmit = {
            name,
            country,
            industry,
          };

          const unregisteredRelationshipData = await unregisteredRelationshipService.createUnregisteredRelationship(
            $session.company_accountname,
            $session.accessToken,
            dataToSubmit,
            relationshipType
          );

          afterSubmit(unregisteredRelationshipData);
        }
      }
    } catch (e) {
      const error = e.message;
      fields.map((field) => {
        if (error[field]) {
          formErrorMessage += `${formErrorMessage ? "\n" : ""}${field}: ${
            error[field]
          }`;
        }
      });
    } finally {
      Target.style.opacity = 1;
      Target.style.cursor = "pointer";
    }
  }
</script>

<div class="UnregisteredRelationshipForm ProfileForm">
  <button
    class="UnregisteredRelationshipForm-close-button ProfileForm-close-button"
    on:click>
    <span>X</span>
  </button>

  <div class="UnregisteredRelationshipForm-headline">
    <h3 class="UnregisteredRelationshipForm-title">
      {editMode
        ? $_("unregisteredRelationshipForm.updateClient")
        : $_("unregisteredRelationshipForm.addClient")}
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
        label={$_("unregisteredRelationshipForm.clientName")}
        input$aria-controls="company-name"
        input$aria-describedby="company-name"
        input$maxlength="60"
        on:input={validateName}
        disabled={editMode}
      />
      <HelperText id="company-name">{nameFeedback}</HelperText>
    </div>

    {#if !editMode}
      <div class="form-group">
        <Select
          variant="outlined"
          style="width: 100%;"
          bind:value={industry}
          label={$_("unregisteredRelationshipForm.category")}
        >
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
            label={$_("unregisteredRelationshipForm.whichOther")}
            input$aria-controls="company-other-industry"
            input$aria-describedby="company-other-industry"
            input$maxlength="60"
            on:input={validateOtherIndustry}
          />
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
          label={$_("unregisteredRelationshipForm.category")}
          input$aria-controls="company-industry"
          input$aria-describedby="company-industry"
          input$maxlength="60"
          disabled={true}
        />
      </div>
    {/if}

    <div class="form-group">
      <Textfield
        style="width: 100%;"
        variant="outlined"
        bind:value={country}
        label={$_("unregisteredRelationshipForm.countryOfOrigin")}
        input$aria-controls="company-country"
        input$aria-describedby="company-country"
        input$maxlength="40"
        on:input={validateCountry}
        disabled={editMode}
      />
      <HelperText id="company-country">{countryFeedback}</HelperText>
    </div>

    <div class="form-group">
      <Textfield
        style="width: 100%;"
        variant="outlined"
        bind:value={relationshipType}
        label="Tipo relación*"
        input$aria-controls="company-relation"
        input$aria-describedby="company-relation"
        input$maxlength="40"
        on:input={validateRelationshipType}
      />
      <HelperText id="company-relation">{relationshipTypeFeedback}</HelperText>
    </div>

    <button
      on:click|preventDefault={submit}
      class="UnregisteredRelationshipForm-button button button--secondary">
      <PlusCircleOutline size={15} />
      {editMode
        ? $_("unregisteredRelationshipForm.updateClient")
        : $_("unregisteredRelationshipForm.addClient")}
    </button>
  </form>
</div>

<style>
  @import "/styles/form.css";

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
