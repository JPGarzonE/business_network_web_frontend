<script context="module">
  import ProfilesService from "../../../services/suppliers/profiles.service.js";

  export async function preload(page, session) {
    const profilesService = new ProfilesService();
    const { accountname } = page.params;

    const profileData = await profilesService.getSupplierProfile(
      accountname,
      session.accessToken
    );
    return {
      editable: profileData.editable,
      supplier: profileData.supplier,
      principalLocation: profileData.principal_location,
      saleLocations: profileData.sale_locations,
      products: profileData.products,
      certifications: profileData.certificates,
      unregisteredRelationships: profileData.unregistered_relationships,
      tutorial: profileData.display_tutorial,
    };
  }
</script>

<script>
  import { setContext } from "svelte";

  import Header from "../../../components/Header.svelte";
  import Footer from "../../../components/Footer.svelte";
  import ProfileIdentity from "../../../containers/ProfileIdentity/ProfileIdentity.svelte";
  import RelationshipsList from "../../../containers/RelationshipsList/RelationshipsList.svelte";
  import CertificationsList from "../../../containers/CertificationsList/CertificationsList.svelte";
  import ProductList from "../../../containers/ProductList/ProductList.svelte";
  import Onboarding from "../../../components/Onboarding/OnBoarding.svelte";
  export let editable;
  export let supplier;
  export let principalLocation;
  export let tutorial;
  let width;
  // export let saleLocations;
  export let products;
  export let certifications;
  export let unregisteredRelationships;
  let onboardingOn = true;
  let onboardingStep = 0;
  let onboardingStepMobile = 0;

  const handleCancel = () => {
    onboardingOn = false;
  };

  const handleNext = () => {
    onboardingStep += 1;
    onboardingStepMobile += 1;
  };

  const handlePrev = () => {
    if (onboardingStep > 0) {
      onboardingStep -= 1;
      onboardingStepMobile -= 1;
    }
  };

  const changeStep = (e) => {
    onboardingStep = e + 1;
    onboardingStepMobile = e + 1;
  };

  setContext("profileAccountname", supplier.accountname);
  setContext("isVerifiedProfile", supplier.is_verified);
  setContext("isEditableProfile", editable);
</script>

<svelte:head>
  <title>{supplier.display_name} - Conecty</title>
</svelte:head>

<svelte:window bind:innerWidth={width} />
<Header />

{#if !tutorial}
  <Onboarding
    {onboardingOn}
    {onboardingStep}
    {handleCancel}
    {handleNext}
    {handlePrev}
    {changeStep}
    {onboardingStepMobile}
    data={{ ...supplier, location: principalLocation }}
  />
{/if}
<div class="SupplierProfile">
  <div class="SupplierProfile-content">
    <section class="SupplierProfile-sidebar">
      <ProfileIdentity
        name={supplier.display_name}
        industry={supplier.industry}
        webUrl={supplier.web_url}
        logo={supplier.logo}
        contact={null}
        location={principalLocation}
        onboarding={onboardingOn}
      />
    </section>
    <section class="SupplierProfile-main">
      <CertificationsList
        certificationsList={certifications}
        onBoarding={onboardingOn &&
          (width > 850 ? onboardingStep == 2 : onboardingStepMobile == 3)}
      />

      <ProductList
        productList={products}
        onBoarding={onboardingOn &&
          (width > 850 ? onboardingStep == 3 : onboardingStepMobile == 4)}
      />

      <RelationshipsList
        {unregisteredRelationships}
        onBoarding={onboardingOn &&
          (width > 850 ? onboardingStep == 4 : onboardingStepMobile == 5)}
      />
    </section>
  </div>
</div>

<Footer />

<style>
  .SupplierProfile {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .SupplierProfile-content {
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }

  .SupplierProfile-sidebar {
    position: relative;
    z-index: 20;
  }

  @media screen and (min-width: 850px) {
    .SupplierProfile-content {
      padding: 25px;
      flex-direction: row;
    }
    .SupplierProfile-sidebar {
      width: 260px;
    }
    .SupplierProfile-main {
      padding: 0 30px;
      width: calc(100% - 260px);
    }
  }
</style>
