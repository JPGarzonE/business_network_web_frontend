<script context="module">
  import ProfilesService from '../../services/suppliers/profiles.service.js';

  export async function preload(page, session) {
    const profilesService = new ProfilesService();
    const { accountname } = page.params;

    const profileData = await profilesService.getSupplierProfile(
      accountname, session.accessToken
    );

    return {
      editable: profileData.editable,
      supplier: profileData.supplier,
      principalContact: profileData.principal_contact,
      principalLocation: profileData.principal_location,
      saleLocations: profileData.sale_locations,
      products: profileData.products,
      certifications: profileData.certificates,
      unregisteredRelationships: profileData.unregistered_relationships
    }
  }
</script>

<script>
  import { setContext } from 'svelte';

  import Header from '../../components/Header.svelte';
  import Footer from '../../components/Footer.svelte';
  import ProfileIdentity from '../../containers/ProfileIdentity/ProfileIdentity.svelte';
  import RelationshipsList from '../../containers/RelationshipsList/RelationshipsList.svelte';
  import CertificationsList from '../../containers/CertificationsList/CertificationsList.svelte';
  import ProductList from '../../containers/ProductList/ProductList.svelte';

  export let editable;
  export let supplier;
  export let principalContact;
  export let principalLocation;
  // export let saleLocations;
  export let products;
  export let certifications;
  export let unregisteredRelationships;

  setContext('profileAccountname', supplier.accountname);
  setContext('profileIsVerified', supplier.is_verified);
  setContext('isSessionUserProfile', editable);
</script>

<style>
  .UserProfile {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .UserProfile-content {
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }

  .UserProfile-sidebar {
    position: relative;
    z-index: 20;
  }

  @media screen and (min-width: 850px) {
    .UserProfile-content {
      padding: 25px;
      flex-direction: row;
    }
    .UserProfile-sidebar {
      width: 260px;
    }
    .UserProfile-main {
      padding: 0 30px;
      width: calc(100% - 260px);
    }
  }
</style>

<svelte:head>
  <title>{supplier.name} - Conecty</title>
</svelte:head>

<Header />

<div class="UserProfile">
  <div class="UserProfile-content">
    <section class="UserProfile-sidebar">
      <ProfileIdentity
        name={supplier.name}
        industry={supplier.industry}
        webUrl={supplier.web_url}
        logo={supplier.logo}
        contact={principalContact}
        location={principalLocation} />
    </section>
    <section class="UserProfile-main">
      <CertificationsList certificationsList={certifications} />

      <ProductList productList={products} />

      <RelationshipsList {unregisteredRelationships} />
    </section>
  </div>
</div>

<Footer />
