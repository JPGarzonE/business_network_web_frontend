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
        padding: 140px;
    }

    .LandingBanner-Conecty-wordmark {
        width: 220px;
        height: 45px;
        margin: 0;
        margin-bottom: 1.7em;
    }

    .LandingBanner-title{
        width: 55%;
        margin: .8em 0;
        font-size: 1.9em;
        line-height: 30px;
        letter-spacing: 0.22px;
        font-weight: 100;
        color: white;
    }

    .LandingBanner-subtitle {
        width: 40%;
        font-size: 1.13em;
        letter-spacing: 0.216px;
        color: white;
    }
</style>

<div id={landingBannerElementName} class="LandingBanner">
    <div class="LandingBanner-Conecty-wordmark">
        <ConectyWhiteWordmark />
    </div>
    <h1 class="LandingBanner-title">Conecta con compradores y vendedores calificados alrededor del mundo.</h1>
    <p class="LandingBanner-subtitle">
        Se parte de la red que está conectando las ofertas más competitivas 
        del mercado con compradores previamente verificados.
    </p>
</div>