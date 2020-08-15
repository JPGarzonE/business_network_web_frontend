<script context="module">
    import { API_URL } from "../../store/store.js";
    import UserService from "../../services/users/user.service.js";
    import ContactService from "../../services/companies/contact.service.js";
    import LocationService from "../../services/companies/location.service.js";
    import ProductService from "../../services/companies/product.service.js";
    import ServiceService from "../../services/companies/service.service.js";
    import InterestService from "../../services/companies/interest.service.js";
    import RelationshipService from "../../services/relationships/relationship.service.js";
    import UnregisteredRelationshipService from "../../services/relationships/unregistered.relationship.service.js";

    export async function preload(page, session) {
        const userService = new UserService();
        const { username } = page.params;
        console.log("Preload session: ", session);
        
        const data = await userService.getUser( username, session.accessToken )
        const user = data.user;
        const isSessionUserProfile = data.is_owner;

        const principalContact = ( session.authenticated && (session.isVerified || isSessionUserProfile) ) ? 
            await loadCompanyPrincipalContact( username, session.accessToken ) : null;

        const interestElements = ( session.authenticated && (session.isVerified || isSessionUserProfile) ) ?
            await loadInterests( username, session.accessToken ) : null;

        const principalLocation = await loadCompanyPrincipalLocation( username );
        const portfolioElements = await loadPortfolio( username );
        const registeredRelationships = await loadRelationships( user.id );
        const unregisteredRelationships = await loadUnregisteredRelationships( username );

        return { user,
                isSessionUserProfile,
                contact: principalContact,
                location: principalLocation,
                portfolioElements,
                interestElements,
                registeredRelationships,
                unregisteredRelationships
            }
    }

    async function loadCompanyPrincipalContact( username, accessToken ){
        const contactService = new ContactService();
        const data = await contactService.getUserPrincipalContact( username, accessToken );
        return data.results[0];
    }

    async function loadCompanyPrincipalLocation( username ){
        const locationService = new LocationService();
        const data = await locationService.getUserPrincipalLocation( username );
        return data.results[0];
    }

    async function loadPortfolio( username ){
        const productService = new ProductService();
        const productsData = await productService.getUserProducts( username );
        const products = productsData.results;

        const serviceService = new ServiceService();
        const servicesData = await serviceService.getUserServices( username );
        const services = servicesData.results;

        return products.concat(services);
    }

    async function loadInterests( username, accessToken ) {
        const interestService = new InterestService();
        const data = await interestService.getUserInterests( username, accessToken );
        return data.results;
    }

    async function loadRelationships( userID ) {
        const relationshipService = new RelationshipService();
        const relationshipData = await relationshipService.getUserRelationships( userID );
        const relationships = relationshipData.results;
        
        return relationships
    }

    async function loadUnregisteredRelationships( username ) {
        const unregisteredRelationshipService = new UnregisteredRelationshipService();
        const unregisteredRelationshipData = await unregisteredRelationshipService.getCompanyUnregisteredRelationships( username );
        const unregisteredRelationships = unregisteredRelationshipData.results;

        return unregisteredRelationships;
    }
</script>

<script>
    import { setContext } from "svelte";

    import Header from "../../components/Header.svelte";
    import Footer from "../../components/Footer.svelte";
    import ProfileHeader from "../../components/profile/ProfileHeader.svelte";
    import DNA from "../../components/profile/DNA.svelte";
    import Portfolio from "../../components/profile/Portfolio.svelte";
    import Interests from "../../components/profile/Interests.svelte";
    import Relationship from "../../components/profile/Relationships.svelte";
    import Relationships from "../../components/profile/Relationships.svelte";

    export let user;
    export let isSessionUserProfile;
    export let contact;
    export let location;
    export let portfolioElements;
    export let interestElements;
    export let registeredRelationships;
    export let unregisteredRelationships;

    let company = user.company;

    setContext("profileUsername", user.username);
    setContext("profileIsVerified", user.is_verified);
    setContext("isSessionUserProfile", isSessionUserProfile);
</script>

<style>
    .UserProfile {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .UserProfile-content {
        max-width: 800px;
        width: 100%;
        margin: 0 auto;
    }

    @media screen and (min-width: 850px){
        .UserProfile-content {
            margin: 15px;
        }
    }

    /* In all the components that grid is needed the @support 
    styles are going to be at the bottom of the file */
    @supports (display: grid){
        
        .UserProfile-content{
            max-width: 1365px;
        }

        @media screen and (min-width: 850px){
            .UserProfile-content{
                display: grid;
                grid-template: 105px auto minmax(auto, 230px) auto auto/minmax(300px, 360px) minmax(65%, auto);
                grid-template-areas:
                'header dna'
                'header dna'
                'header portfolio'
                'interests portfolio'
                'interests relationships';
                margin: 10px 40px;
            }
        }
    }
</style>

<svelte:head>
	<title>{company.name} - Conecty</title>
</svelte:head>

<Header />

<div class="UserProfile">
    <div class="UserProfile-content">
        <ProfileHeader 
            name={company.name} 
            industry={company.industry} 
            logo={company.logo}
            {contact}
            {location}
        />
        
        <DNA />
        
        <Portfolio {portfolioElements} />

        <Interests {interestElements} />

        <Relationships
            {registeredRelationships}
            {unregisteredRelationships}
        />
    </div>
</div>

<Footer />