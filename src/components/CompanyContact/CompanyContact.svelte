<script>
  import ButtonChat from "../ButtonChat/ButtonChat.svelte";
  import ContactUsButton from "../ContactUsButton/ContactUsButton.svelte";
  import Whatsapp from "svelte-material-icons/Whatsapp.svelte";
  import { stores } from "@sapper/app";
  import { goto } from "@sapper/app";
  import { _ } from "svelte-i18n";

  export let contact;
  export let disabled;

  const { session } = stores();

  let companyContactLink =
    contact && contact.phone
      ? `https://wa.me/57${contact.phone}`
      : "https://wa.me/573133800223";
</script>

<div class="CompanyContact">
  {#if !$session.authenticated}
    <ButtonChat
      title={$_("companyContact.joinToContact")}
      buttonAction={async () => {
        await goto("");
      }}
    >
      <span slot="button-icon" style="display: flex;">
        <Whatsapp size={18} />
      </span>
    </ButtonChat>
  {:else if $session.isVerified && contact && contact.phone}
    <ButtonChat
      title="Contacta al vendedor"
      buttonAction={() => {
        window.open(companyContactLink, "_blank");
      }}
    >
      <span slot="button-icon" style="display: flex;">
        <Whatsapp size={18} />
      </span>
    </ButtonChat>
  {:else}
    {#if $session.isVerified}
      <p class="ProfileIdentity-advice">
        {$_("companyContact.thisUserDoNotHaveRegisteredContactNumber")}<br />
        {$_("companyContact.talkToOurSalesConsultantToCOntact")}
      </p>
    {:else}
      <p class="ProfileIdentity-advice">
        {$_("companyContact.cantContactDirectlyUntilVerified")}<br />
        {$_("companyContact.talkToOurSalesConsultantToCOntact")}
      </p>
    {/if}
    <ContactUsButton
      title="Contáctanos"
      buttonAction={() => {
        !disabled && window.open(companyContactLink, "_blank");
      }}
    />
  {/if}
</div>

<style>
  .CompanyContact {
    width: 100%;
    height: 100%;
  }
  .ProfileIdentity-advice {
    width: 100%;
    margin-bottom: 1em;
    font-size: 0.88em;
    letter-spacing: 0.22px;
    color: var(--principal-color);
  }
</style>
