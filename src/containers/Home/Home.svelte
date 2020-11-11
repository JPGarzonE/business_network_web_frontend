<script>
    import { onMount } from 'svelte';
    import LandingBanner from "../../components/MainBanners/LandingBanner.svelte";
    import AuthenticationContainer from "../AuthenticationContainer/AuthenticationContainer.svelte";
    import Close from "svelte-material-icons/Close.svelte";
    import Whatsapp from 'svelte-material-icons/Whatsapp.svelte';
    import ContactUsButton from '../../components/ContactUsButton/ContactUsButton.svelte';

    export let content = { 
        "title": "", 
        "subtitle": "",
        "features": [
            {
                "title": "",
                "description": "",
                "advice": ""
            }
        ]
    };
    export let authenticationContainerState = "signup";
    export let homeAuthenticationOpen = false;

    let homeAuthenticationMediaQuery;
    let contactLink = "https://wa.me/573133800223";

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
        if( homeAuthenticationMediaQuery.matches && window.scrollY < 370)
            homeAuthenticationOpen = true;
        else
            homeAuthenticationOpen = false;
    }
</script>

<style>
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
        background-color: var(--extra-light-gray);
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

    .Home-features {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 15% 10%;
        margin-bottom: 0;
    }

    .Home-features-content {
        width: 100%;
        max-width: 1300px;
    }

    .Home-feature {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 4em;
    }

    .Home-feature-description {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 2em;
    }

    .Home-feature-description h2 {
        font-size: 1.87em;
        font-weight: bold;
        line-height: 35px;
        letter-spacing: 0.216px;
        color: var(--principal-text-color);
    }

    .Home-feature-description p {
        width: 85%;
        margin: 20px 0;
        font-size: 1em;
        letter-spacing: 0.216px;
    }

    .Home-feature-description p b {
        font-size: 1.12em;
    }

    .Home-register {
        max-width: 475px;
        margin: 1.2em 0;
    }

    .Home-register-button {
        width: 75%;
        max-width: 250px;
        height: 42px;
        font-size: .75em;
        color: #fff;
        background-color: var(--button-color);
    }

    .Home-feature-image {
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: hidden;
    }

    .Home-feature-image figure {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .Home-feature-image-mobile {
        max-width: 332px;
    }

    .Home-feature-image-laptop {
        min-width: 488px;
        left: 25%;
    }

    .Home-feature-image-security {
        min-width: 330px
    }

    .Home-feature-image-device {
        width: 100%;
        position: relative;
        z-index: 3;
    }

    .Home-feature-image-mobile .Home-feature-image-screenshot {
        width: 66%;
    }

    .Home-feature-image-laptop .Home-feature-image-screenshot {
        width: 55%;
    }

    .Home-feature-image-screenshot {
        position: absolute;
        top: 8px;
    }

    .Home-allies {
        background-color: var(--extra-light-gray);
        padding: 4% 2%;
    }

    .Home-allies-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .Home-allies-content img {
        width: 90%;
        max-width: 270px;
        margin: 0 .5em;
    }

    @media screen and (min-width: 375px) {
        .Home-feature-image-laptop {
            min-width: 588px;
        }
    }

    @media screen and (min-width: 525px) {
        .Home-feature-image-laptop {
            min-width: 688px;
        }
    }

    @media screen and (min-width: 767px) {
        .Home-feature-image {
            width: 100%;
            overflow: visible;
        }
        .Home-feature-image-laptop .Home-feature-image-device{
            min-width: 485px;
        }
        .Home-feature-image-laptop {
            max-width: 642px;
            min-width: auto;
            left: 0;
        }
    }

    @media screen and (min-width: 850px) {
        .Home-features {
            margin: 100px 40px;
        }
        .Home-features-content {
            width: 88%;
            padding-left: 40px;
            border-left: 7px solid var(--principal-color);
        }
        .Home-feature {
            flex-direction: row;
        }
        .Home-feature-description {
            width: 50%;
        }
        .Home-feature-description h2 {
            font-size: 1.95em;
        }
        .Home-feature-description p {
            font-size: 1.2em;
        }
        .Home-feature-image {
            width: 55%;
        }
        .Home-feature-image-mobile {
            width: 70%;
        }
        .Home-allies-content {
            flex-direction: row;
        }
        .Home-allies-content img {
            width: auto;
            height: 160px;
        }
    }

    @media screen and (min-width: 1000px) {
        .Home-Authentication {
            width: calc(34%);
            min-width: 400px;
        }
        .Home-allies-content img {
            height: 175px;
        }
    }

    @media screen and (min-width: 1175px) {
        .Home-feature-image figure img {
            width: 100%;
        }
    }

    @media screen and (min-width: 1270px) {
        .Home-features-content {
            margin: 0;
            margin-left: auto;
        }
    }

    @media screen and (min-width: 1440px) {
        .Home-Authentication {
            width: calc(480px + (100vw - 1440px) / 2);
        }
    }
</style>

<div class="Home">
    <LandingBanner
        title={content.title} subtitle={content.subtitle} bind:homeAuthenticationOpen />
    
    <div class="Home-Authentication Home-Authentication--open {homeAuthenticationOpen ? "" : "Home-Authentication--closed"}"
        id="Home-Authentication">
        <span class="Home-Authentication-close" on:click={()=>homeAuthenticationOpen = false}>
            <Close size="30" color="rgba(0, 0, 0, 0.54)" />
        </span>
        <AuthenticationContainer bind:state={authenticationContainerState} />
    </div>

    <div class="Home-features">
        <div class="Home-features-content">

            <div class="Home-feature">
                <div class="Home-feature-description">
                    <h2>{content.features[0].title}</h2>
                    <p>{content.features[0].description}</p>
                    <p> 
                        <b>{content.features[0].advice}</b> 
                    </p>
                    <div class="Home-register">
                        <button class="button Home-register-button"
                            on:click={()=>homeAuthenticationOpen = true}>
                            Regístrate Gratis
                        </button>
                    </div>
                </div>
                <div class="Home-feature-image">
                    <figure class="Home-feature-image-mobile">
                        <img class="Home-feature-image-device" src="images/feature-device-1.png" alt="Device">
                        <img class="Home-feature-image-screenshot" src="images/feature-ss-1.png" alt="Screenshot">
                    </figure>
                </div>
            </div>

            <div class="Home-feature">
                <div class="Home-feature-description" style="margin-bottom: 0;">
                    <h2>{content.features[1].title}</h2>
                    <p>{content.features[1].description}</p>
                    <p> 
                        <b>{content.features[1].advice}</b> 
                    </p>
                    <div class="Home-register">
                        <button class="button Home-register-button"
                            on:click={()=>homeAuthenticationOpen = true}>
                            Regístrate Gratis
                        </button>
                    </div>
                </div>
                <div class="Home-feature-image">
                    <figure class="Home-feature-image-laptop">
                        <img class="Home-feature-image-device" src="images/feature-device-2.png" alt="Device">
                        <img class="Home-feature-image-screenshot" src="images/feature-ss-2.png" 
                            alt="Screenshot" style="top:auto;" />
                    </figure>
                </div>
            </div>

            <div class="Home-feature">
                <div class="Home-feature-description" style="margin-bottom: 0;">
                    <h2>{content.features[2].title}</h2>
                    <p>{content.features[2].description}</p>
                    <p> 
                        <b>{content.features[2].advice}</b> 
                    </p>
                    <div class="Home-register">
                        <ContactUsButton title="Contáctanos" buttonAction={() => {window.open(contactLink, "_blank")}}>
                            <span slot="main-icon">
                                <Whatsapp size={18} color="var(--whatsapp-color)" />
                            </span>
                        </ContactUsButton>
                    </div>
                </div>
                <div class="Home-feature-image">
                    <figure>
                        <img class="Home-feature-image-security" src="images/feature-security.png"
                            alt="Screenshot" style="top:auto;" />
                    </figure>
                </div>
            </div>

        </div>
    </div>

    <div class="Home-allies">
        <div class="Home-allies-content">
            <figure style="border-right:2px solid var(--light-color)">
                <img src="/images/mintic-ally.png" alt="Mintic" />
            </figure>
            <figure>
                <img src="/images/appsco-ally.png" alt="Apps.co" />
            </figure>
            <figure>
                <img src="/images/innomake-ally.png" alt="Innomake" />
            </figure>
        </div>
    </div>
</div>