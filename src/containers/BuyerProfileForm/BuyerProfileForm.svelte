<script>
  import { stores } from "@sapper/app";
  import ProfilesService from "../../services/buyers/profiles.service.js";
  import BuyerProfileField from "./BuyerProfileField.svelte";
  import { _ } from "svelte-i18n";
  import {
    validateString,
    validateEmailPattern,
    validateLegalIdentifier,
  } from "../../validators/formValidators.js";

  export let buyer;

  const { session } = stores();
  const profilesService = new ProfilesService();

  const formFields = {
    name: buyer.display_name || "",
    email: buyer.contact_email || "",
    phone: buyer.contact_phone || "",
    description: "",
    companyID: buyer.company_legal_identifier || "",
  };

  let currentEdit = "";
  let statusMessage = "";
  let successUpdate = false;

  async function sendForm() {
    statusMessage = "";
    const userData = {
      display_name: formFields.name,
      contact_email: formFields.email,
      contact_phone: formFields.phone,
      description: formFields.description,
      company_legal_identifier: formFields.company_legal_identifier,
    };

    const profileData = await profilesService.updateBuyerProfile(
      userData,
      $session.company_accountname,
      $session
    );
    currentEdit = "";
    if (!profileData.id) {
      statusMessage = "Los datos no son válidos";
      successUpdate = false;
    } else {
      statusMessage = "Los datos se actualizaron correctamente";
      successUpdate = true;
    }
  }
  function changeCurrentEdit(value) {
    currentEdit = currentEdit === value ? "" : value;
  }
</script>

<section class="BuyerProfileForm">
  <h3 class="BuyerProfileForm-title">Editar mi perfil</h3>
  <div class="BuyerProfileForm-fields">
    <BuyerProfileField
      name="name"
      editMode={currentEdit === "name"}
      label={$_("BuyerProfileForm.companyName")}
      bind:value={formFields.name}
      type="text"
      onEdit={changeCurrentEdit}
      validationFunc={(value) =>
        validateString(value, 3, 50, true, "Nombre válido")}
      maxLength={60}
    />
    <BuyerProfileField
      name="email"
      editMode={currentEdit === "email"}
      label={$_("BuyerProfileForm.contactEmail")}
      bind:value={formFields.email}
      type="text"
      onEdit={changeCurrentEdit}
      validationFunc={validateEmailPattern}
      maxLength={40}
    />
    <BuyerProfileField
      name="phone"
      editMode={currentEdit === "phone"}
      label={$_("BuyerProfileForm.mobilePhoneNumber")}
      bind:value={formFields.phone}
      type="phone"
      onEdit={changeCurrentEdit}
      validationFunc={(value) =>
        validateString(value, 3, 15, true, "teléfono válido")}
      maxLength={15}
    />
    <BuyerProfileField
      name="description"
      editMode={currentEdit === "description"}
      label={$_("BuyerProfileForm.companyDescription")}
      bind:value={formFields.description}
      type="text"
      onEdit={changeCurrentEdit}
      validationFunc={(value) =>
        validateString(value, 3, 150, true, "Descripción válida")}
      maxLength={150}
    />
    <BuyerProfileField
      name="companyID"
      editMode={currentEdit === "companyID"}
      label={$_("BuyerProfileForm.legalIdentifier")}
      type="text"
      bind:value={formFields.companyID}
      onEdit={changeCurrentEdit}
      validationFunc={validateLegalIdentifier}
      maxLength={15}
    />
  </div>
  {#if !successUpdate && statusMessage}
    <div class="form-banner--invalid">{statusMessage}</div>
  {/if}
  {#if successUpdate && statusMessage}
    <p class="form-message--valid">{statusMessage}</p>
  {/if}

  <div class="BuyerProfileForm-actions">
    <button
      type="button"
      on:click|preventDefault={sendForm}
      class="BuyerProfileForm-sendButton button button--orange"
      >{$_("BuyerProfileForm.finalize")}r</button
    >
  </div>
</section>

<style>
  @import "/styles/form.css";

  .BuyerProfileForm {
    width: 100%;
  }
  .BuyerProfileForm-title {
    font-size: 1.875rem;
    margin-bottom: 20px;
  }
  .BuyerProfileForm-fields {
    border-radius: 4px;
    border: 2px solid var(--principal-color);
    padding: 20px;
    margin-bottom: 25px;
  }
  .BuyerProfileForm-actions {
    display: flex;
    justify-content: flex-start;
    margin-top: 25px;
  }
  .BuyerProfileForm-sendButton {
    max-width: 140px;
  }
</style>
