<script context="module">
  import ProfilesService from "../../../services/buyers/profiles.service.js";

  export async function preload(page, session) {
    const profilesService = new ProfilesService();
    const { accountname } = page.params;

    const profileData = await profilesService.getBuyerProfile(
      accountname,
      session.accessToken
    );

    return {
      buyer: profileData,
    };
  }
</script>

<script>
  import { setContext } from "svelte";

  import Header from "../../../components/Header.svelte";
  import Footer from "../../../components/Footer.svelte";
  import BuyerProfileForm from "../../../containers/BuyerProfileForm/BuyerProfileForm.svelte";

  export let buyer;

  setContext("profileAccountname", buyer.display_name);
</script>

<style>
  .BuyerProfile {
    width: 100%;
    padding: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .BuyerProfile-content {
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }

  @media screen and (min-width: 850px) {
    .BuyerProfile-content {
      flex-direction: row;
      max-width: 750px;
    }
  }
</style>

<svelte:head>
  <title>{buyer.display_name} - Conecty</title>
</svelte:head>

<Header />

<div class="BuyerProfile">
  <div class="BuyerProfile-content">
    <BuyerProfileForm {buyer} />
  </div>
</div>

<Footer />
