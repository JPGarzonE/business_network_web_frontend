<script context="module">
  import UserService from '../../services/users/user.service.js';
  import ContactService from '../../services/companies/contact.service.js';
  import LocationService from '../../services/companies/location.service.js';
  import CertificationsService from '../../services/companies/certifications.service.js';
  import ProductService from '../../services/companies/product.service.js';
  import RelationshipService from '../../services/relationships/relationship.service.js';
  import UnregisteredRelationshipService from '../../services/relationships/unregistered.relationship.service.js';

  export async function preload(page, session) {
    const userService = new UserService();
    const { username } = page.params;

    const data = await userService.getUser(username, session.accessToken);
    const user = data.user;
    const isSessionUserProfile = data.is_owner;

    const principalContact =
      session.authenticated && (session.isVerified || isSessionUserProfile)
        ? await loadCompanyPrincipalContact(username, session.accessToken)
        : null;

    const principalLocation = await loadCompanyPrincipalLocation(username);
    const productList = await loadPortfolio(username);
    const certificationsList = await loadCertifications(username);
    const unregisteredRelationships = await loadUnregisteredRelationships(
      username
    );
    return {
      user,
      isSessionUserProfile,
      contact: principalContact,
      location: principalLocation,
      productList,
      certificationsList,
      unregisteredRelationships,
    };
  }

  async function loadCompanyPrincipalContact(username, accessToken) {
    const contactService = new ContactService();
    const data = await contactService.getUserPrincipalContact(
      username,
      accessToken
    );
    console.log("data: ", data);
    return data.results[0];
  }

  async function loadCompanyPrincipalLocation(username) {
    const locationService = new LocationService();
    const data = await locationService.getUserPrincipalLocation(username);
    return data.results[0];
  }

  async function loadPortfolio(username) {
    const productService = new ProductService();
    const productsData = await productService.getUserProducts(username, {
      page: 0,
      pageLength: 4,
    });

    const products = productsData.results;

    return products;
  }

  async function loadCertifications(username) {
    const certificationsService = new CertificationsService();
    const data = await certificationsService.getUserCertifications(username);
    return data.results;
  }

  async function loadRelationships(userID) {
    const relationshipService = new RelationshipService();
    const relationshipData = await relationshipService.getUserRelationships(
      userID
    );
    const relationships = relationshipData.results;

    return relationships;
  }

  async function loadUnregisteredRelationships(username) {
    const unregisteredRelationshipService = new UnregisteredRelationshipService();
    const unregisteredRelationshipData = await unregisteredRelationshipService.getCompanyUnregisteredRelationships(
      username
    );
    const unregisteredRelationships = unregisteredRelationshipData.results;

    return unregisteredRelationships;
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

  export let user;
  export let isSessionUserProfile;
  export let contact;
  export let location;
  export let certificationsList;
  export let unregisteredRelationships;
  export let productList;

  let company = user.company;

  setContext('profileUsername', user.username);
  setContext('profileIsVerified', user.is_verified);
  setContext('isSessionUserProfile', isSessionUserProfile);
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
  <title>{company.name} - Conecty</title>
</svelte:head>

<Header />

<div class="UserProfile">
  <div class="UserProfile-content">
    <section class="UserProfile-sidebar">
      <ProfileIdentity
        name={company.name}
        industry={company.industry}
        webUrl={company.web_url}
        logo={company.logo}
        {contact}
        {location} />
    </section>
    <section class="UserProfile-main">
      <CertificationsList {certificationsList} />

      <ProductList {productList} />

      <RelationshipsList {unregisteredRelationships} />
    </section>
  </div>
</div>

<Footer />
