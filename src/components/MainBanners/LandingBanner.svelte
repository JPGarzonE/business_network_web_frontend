<script>
    import { onMount } from 'svelte';
    import ConectyWhiteWordmark from '../Wordmarks/ConectyWhiteWordmark.svelte';

    export let name = '1';
    export let imageSrc = '/images/landing-main-banner.png';

    let landingBannerElementName = `LandingBanner-${name}`;
    let backgroundGradient = 'linear-gradient(270deg, rgba(83, 123, 201, 0.7) 0%, rgba(3, 165, 235, 0.7) 97.79%)';

    onMount(async () => {
        let landingBannerElement = document.getElementById(landingBannerElementName);
        landingBannerElement.style.backgroundImage = `${backgroundGradient}, url(${imageSrc})`;
    });
</script>

<style>
    @import '/styles/form.css';

    .LandingBanner {
        width: 100%;
        max-width: 1600px;
        height: 100%;
        min-height: 560px;
        background-position: center;
        background-size: cover;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 10%;
        padding-bottom: 15%;
        padding-right: 6%;
        background-repeat: no-repeat;
    }

    .LandingBanner-Conecty-wordmark {
        width: 55%;
        max-width: 240px;
        min-width: 170px;
        height: auto;
        margin: 0;
        margin-bottom: .8em;
    }

    .LandingBanner-title{
        width: 100%;
        margin: .8em 0;
        font-size: 1.5em;
        line-height: 28px;
        letter-spacing: 0.22px;
        font-weight: 100;
        color: white;
    }

    .LandingBanner-subtitle {
        width: 100%;
        line-height: 21px;
        font-size: 1.13em;
        letter-spacing: 0.216px;
        color: white;
    }

    .LandingBanner-register {
        margin: 1.2em 0;
    }

    .LandingBanner-register-button {
        width: 75%;
        max-width: 250px;
        height: 42px;
        font-size: .75em;
    }

    @media screen and (min-width: 625px) {
        .LandingBanner {
            padding-bottom: 5%;
        }
        .LandingBanner-title {
            width: 70%;
        }
        .LandingBanner-subtitle {
            width: 60%;
        }
    }

    @media screen and (min-width: 767px) {
        .LandingBanner-Conecty-wordmark {
            margin-bottom: 1.7em;
        }
    }

    @media screen and (min-width: 1000px) {
        .LandingBanner-title {
            width: 55%;
            font-size: 2.1em;
            line-height: 35px;
        }
        .LandingBanner-subtitle {
            width: 40%;
            font-size: 1.37em;
            line-height: 25px;
        }
        .LandingBanner-register-button {
            display: none;
        }
    }
</style>

<div id={landingBannerElementName} class="LandingBanner">
    <div class="LandingBanner-Conecty-wordmark">
        <ConectyWhiteWordmark />
    </div>
    <h1 class="LandingBanner-title">Conecta con compradores y proveedores internacionales alrededor del mundo.</h1>
    <p class="LandingBanner-subtitle">
        Se parte de la red de comercio internacional que está conectando las ofertas más competitivas 
        del mercado con compradores previamente verificados.
    </p>
    <div class="LandingBanner-register">
        <button class="LandingBanner-register-button button button--secondary">Regístrate Gratis</button>
    </div>
</div>