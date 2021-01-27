<script>
    import { onMount } from 'svelte';
    import MainBanner from "../../components/LandingPage/MainBanner.svelte";
    import FeatureSection from "../../components/LandingPage/FeatureSection.svelte";
    import ContactSection from "../../components/LandingPage/ContactSection.svelte";
    import AlliesSection from "../../components/LandingPage/AlliesSection.svelte";
    import Close from "svelte-material-icons/Close.svelte";
    import AuthenticationContainer from "../AuthenticationContainer/AuthenticationContainer.svelte";

    export let authenticationContainerState = "signup";
    export let homeAuthenticationOpen = false;

    let homeAuthenticationMediaQuery;

    onMount( async () => {
        homeAuthenticationMediaQuery = window.matchMedia("(min-width: 1000px)");

        if( !homeAuthenticationMediaQuery.matches )
            homeAuthenticationOpen = false;
        else
            toggleHomeAuthenticationDisplay();

        homeAuthenticationMediaQuery.addEventListener("change", toggleHomeAuthenticationDisplay)
        document.onscroll = toggleHomeAuthenticationDisplay;
    });

    function toggleHomeAuthenticationDisplay() {

        if(homeAuthenticationMediaQuery.matches) {
            if( window.scrollY < 370)
                homeAuthenticationOpen = true;
            else
                homeAuthenticationOpen = false;   
        }
    }

    $:  if( homeAuthenticationMediaQuery && 
            !homeAuthenticationMediaQuery.matches && 
            homeAuthenticationOpen 
        )
            document.body.style.overflow = "hidden";

    const closeHomeAuthentication = ()=>{
        homeAuthenticationOpen = false;
        document.body.style.overflow = "scroll";
    }
</script>

<style>
    @import '/styles/feature-online-shopping.css';
    @import '/styles/feature-container-ship.css';
    @import '/styles/feature-payment-information.css';

    .Home {
        max-width: 1600px;
        margin: 0 auto;
    }

    .Home-Authentication {
        width: 100vw;
        height: 100vh;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 15;
        transition: transform 500ms cubic-bezier(0.5, 0, 0, 1);
        transition-timing-function: cubic-bezier(0.5, 0, 0, 1);
    }

    .Home-Authentication--open {
        transform: translateX(0);
    }

    .Home-Authentication--closed {
        transform: translateX(100%);
    }

    .Home-Authentication-close {
        position: absolute;
        top: 20px;
        left: 30px;
        z-index: 5;
        cursor: pointer;
    }

    .FeatureMultimedia-online-shopping {
        width: 100%;
        max-width: 500px;
        height: 100%;
        max-height: 500px;
    }

    .FeatureMultimedia-online-shopping img {
        width: 100%;
        height: 100%;
    }

    @media screen and (min-width: 1000px) {
        .Home-Authentication {
            width: calc(35%);
            min-width: 400px;
        }
        .Home-Authentication-close {
            display: none;
        }
    }

    @media screen and (min-width: 1175px) {
        .Home-feature-image figure img {
            width: 100%;
        }
    }

    @media screen and (min-width: 1440px) {
        .Home-Authentication {
            width: calc(480px + (100vw - 1440px) / 2);
        }
    }
</style>

<div class="Home">
    <MainBanner
        imageSrc='/images/banner_logistics.png'
        title="Conéctate con compradores acreditados" 
        subtitle="Se parte de la red que está conectando las ofertas más competitivas del mercado con compradores previamente verificados." 
        bind:homeAuthenticationOpen 
    />
    
    <div class="Home-Authentication Home-Authentication--open {homeAuthenticationOpen ? "" : "Home-Authentication--closed"}"
        id="Home-Authentication">

        <span class="Home-Authentication-close" on:click={closeHomeAuthentication}>
            <Close size="30" color="var(--white)" />
        </span>

        <AuthenticationContainer darkMode bind:state={authenticationContainerState} />
    </div>

    <FeatureSection title="Ofrece tus productos por medios digitales"
        subtitle="Sube a la plataforma tu oferta de productos exportables y las certificaciones de tus productos."
        textColor="#09178D"
        background="#FFFFFF"
    >
        <figure slot="FeatureMultimedia" class="FeatureMultimedia-online-shopping">
            <img src="/images/feature-online-shopping.svg" alt="" />
        </figure>
    </FeatureSection>

    <FeatureSection title="Te conectamos con las empresas que te interesan"
        subtitle="Buscaremos la oferta comercial que se ajuste a tu modelo de negocio y te ayudaremos a construir esa relación comercial."
        textColor="#002D6B"
        background="#15B2D5"
    >
        <figure slot="FeatureMultimedia" class="FeatureMultimedia-online-shopping">
            <img src="/images/feature-container-ship.svg" alt="" />
        </figure>
    </FeatureSection>

    <FeatureSection title="Recibe tu pago de forma segura"
        subtitle="En Conecty mantenemos a salvo tu pago mientras se completa exitosamente la negociación."
        textColor="#09178D"
        background="var(--white)"
    >
        <figure slot="FeatureMultimedia" class="FeatureMultimedia-online-shopping">
            <img src="/images/feature-payment-information.svg" alt="" />
        </figure>
    </FeatureSection>

    <ContactSection message="Conoce más sobre este modelo contactándonos"
        background="#0757C6" textColor="var(--white)" contactPhone="573187541301"
    >
    </ContactSection>

    <AlliesSection></AlliesSection>
</div>