<script>
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text";
  import EditButton from "../../components/EditButton/EditButton.svelte";
  import { _ } from "svelte-i18n";

  export let name;
  export let label;
  export let value;
  export let type;
  export let onEdit;
  export let editMode;
  export let validationFunc;
  export let maxLength = 100;

  $: validation = validationFunc(value || "");

  function toggleEditableMode() {
    onEdit(name);
  }
</script>

<div class="BuyerProfileForm-attribute">
  <div class="BuyerProfileForm-attribute--content">
    <label for={name}>{label}</label>
    {#if editMode}
      <Textfield
        style="width: 100%;height:50px;background: #F3F3F3;box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.25);"
        variant="outlined"
        input$aria-controls={name}
        input$aria-describedby={name}
        input$maxlength={maxLength}
        bind:value
        invalid={value && !validation.isValid}
      />
    {:else}
      <p>{value ? value : type === "password" ? "********" : ""}</p>
    {/if}
    <HelperText id="email" persistent={value && !validation.isValid}>
      {validation.message}
    </HelperText>
  </div>
  <div class="BuyerProfileForm-attribute--actions">
    <button
      type="button"
      on:click|preventDefault={toggleEditableMode}
      class="BuyerProfileForm-button button button--{editMode
        ? 'principal'
        : 'secondary'} ">{$_("buyerProfileField.edit")}</button
    >
  </div>
  <div class="BuyerProfileForm-attribute--actions-mobile">
    <EditButton
      size={17}
      color="var(--button-color)"
      onEdit={toggleEditableMode}
    />
  </div>
</div>

<style>
  .BuyerProfileForm-attribute {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    margin-bottom: 30px;
  }
  .BuyerProfileForm-attribute--content label {
    display: block;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .BuyerProfileForm-button {
    padding: 0 40px;
  }

  .BuyerProfileForm-attribute--actions {
    display: none;
  }

  @media screen and (min-width: 850px) {
    .BuyerProfileForm-attribute--actions-mobile {
      display: none;
    }
    .BuyerProfileForm-attribute--actions {
      display: block;
    }
  }
</style>
