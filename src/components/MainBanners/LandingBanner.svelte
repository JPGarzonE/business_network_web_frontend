<script>
    import { onMount } from 'svelte';
    import ConectyWhiteWordmark from '../Wordmarks/ConectyWhiteWordmark.svelte';

    export let name = '1';
    export let imageSrc = '/images/landing-main-banner.jpg';

    let landingBannerElementName = `LandingBanner-${name}`;

    onMount(async () => {
        let landingBannerElement = document.getElementById(landingBannerElementName);
        landingBannerElement.style.backgroundImage = `url(${imageSrc})`;
    });
</script>

<style>
    .LandingBanner {
        width: 60%;
        height: 820px;
        background-position: center;
        background-size: cover;
        display: none;
        flex-direction: column;
        justify-content: flex-end;
        padding: 140px;
    }

    .LandingBanner-Conecty-wordmark {
        width: 220px;
        height: 45px;
        margin: 0;
        margin-bottom: 1.5em;
    }

    .LandingBanner-title{
        width: 100%;
        max-width: 500px;
        margin: 0;
        font-size: 1.65em;
        line-height: 30px;
        letter-spacing: 0.22px;
        font-weight: 100;
        color: white;
    }

    @media screen and (min-width: 1000px) {
        .LandingBanner{
            display: flex;
        }
    }

    @media screen and (min-width: 1150px) {
        .LandingBanner{
            width: 70%;
        }
    }
</style>

<div id={landingBannerElementName} class="LandingBanner">
    <div class="LandingBanner-Conecty-wordmark">
        <ConectyWhiteWordmark />
    </div>
    <h1 class="LandingBanner-title">La nueva forma de conocer clientes, proveedores y aliados.</h1>
</div>