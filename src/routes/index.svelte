<script context="module">

</script>

<script>
    import { onMount } from 'svelte';
    import Header from "../components/Header.svelte";
    import LandingBanner from "../components/MainBanners/LandingBanner.svelte";
    import AuthenticationContainer from "../containers/AuthenticationContainer/AuthenticationContainer.svelte";
    import Footer from "../components/Footer.svelte";
    import Close from "svelte-material-icons/Close.svelte";

    let homeAuthenticationOpen = false;
    let authenticationContainerState = "signup";
    let homeAuthenticationMediaQueryMatch;

    onMount( async () => {
        homeAuthenticationMediaQueryMatch = window.matchMedia("(min-width: 1000px)").matches;

        if( !homeAuthenticationMediaQueryMatch )
            homeAuthenticationOpen = false;
        else
            toggleHomeAuthenticationDisplay();

        document.onscroll = toggleHomeAuthenticationDisplay;
    });

    function toggleHomeAuthenticationDisplay() {
        if( homeAuthenticationMediaQueryMatch ) {
            if( window.scrollY > 370)
                homeAuthenticationOpen = false;
            else
                homeAuthenticationOpen = true;
        }
    }
</script>

<style>
    .Header {
        position: fixed;
        width: 100%;
        z-index: 10;
    }

    .Home {
        max-width: 1600px;
        margin: 0 auto;
    }

    .Home-Authentication {
        width: 100vw;
        min-width: 400px;
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
        margin: 100px 40px;
    }

    .Home-features-content {
        width: 100%;
        max-width: 1300px;
    }

    .Home-feature {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .Home-feature-description {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
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
        margin: 20px 0px;
        font-size: 1em;
        letter-spacing: 0.216px;
    }

    .Home-feature-description p b {
        font-size: 1.12em;
    }

    .Home-feature-image {
        display: flex;
        justify-content: center;
        align-items: center;
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
        max-width: 642px;
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

    @media screen and (min-width: 850px) {
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
        .Home-feature-image {
            width: 55%;
        }
        .Home-feature-image-mobile {
            width: 70%;
        }
        .Home-feature-image-laptop .Home-feature-image-device{
            min-width: 485px;
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

<svelte:head>
    <title>Conecty</title>
</svelte:head>

<div class="Header">
    <Header 
        signupActionButton={() => {homeAuthenticationOpen = true; authenticationContainerState = "signup"}}
        loginActionButton={() => {homeAuthenticationOpen = true; authenticationContainerState = "login"}}
    />
</div>

<div class="Home">
    <LandingBanner />
    
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
                    <h2>Busca tus productos de forma fácil</h2>
                    <p>Encuentra de manera organizada, a información relevante acerca de los productos que requieres,
                        con nuestra herramienta de busqueda y accede a la red de proveedores calificados de mayor
                        crecimiento de America latina.
                    </p>
                    <p>
                        <b>*Todos nuestros proveedores han sido verificados en diferentes listas de antecedentes internacionales</b>
                    </p>
                </div>
                <div class="Home-feature-image">
                    <figure class="Home-feature-image-mobile">
                        <img class="Home-feature-image-device" src="images/feature-device-1.png" alt="Device">
                        <img class="Home-feature-image-screenshot" src="images/feature-ss-1.png" alt="Screenshot">
                    </figure>
                </div>
            </div>

            <div class="Home-feature">
                <div class="Home-feature-description">
                    <h2>Exposición digital alrededor del mundo</h2>
                    <p>Crea tu perfil en Conecty, donde de forma fácil podrás tener una exposición digital con cientos de
                        compradores alrededor del mundo quienes han sido sometidos a verificaciones de seguridad previas.
                    </p>
                    <p>
                        <b>*Todos nuestros compradores han sido verificados en diferentes listas de antecedentes internacionales</b>
                    </p>
                </div>
                <div class="Home-feature-image">
                    <figure class="Home-feature-image-laptop">
                        <img class="Home-feature-image-device" src="images/feature-device-2.png" alt="Device">
                        <img class="Home-feature-image-screenshot" src="images/feature-ss-2.png" 
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

<Footer />