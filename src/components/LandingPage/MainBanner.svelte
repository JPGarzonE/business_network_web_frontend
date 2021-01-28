<script>
    export let title = '';
    export let subtitle = '';
    export let imageSrc = '';
    export let homeAuthenticationOpen = true;

    let backgroundGradient = 'linear-gradient(90.46deg, #0050C0 0.37%, rgba(0, 80, 192, 0.28) 80.94%)';
</script>

<style>
    @import '/styles/form.css';

    .MainBanner {
        width: 100%;
        max-width: 1600px;
        height: 100%;
        min-height: 496px;
        background-position: center;
        background-size: cover;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 10%;
        padding-bottom: 10%;
        padding-right: 6%;
        background-repeat: no-repeat;
        background-position-x: 44%;
    }

    .MainBanner-title{
        width: 100%;
        margin-top: .6em;
        margin-bottom: .7em;
        font-size: 1.88em;
        line-height: 37px;
        letter-spacing: 0.22px;
        font-weight: 700;
        font-family: var(--landing-title-font);
        color: white;
    }

    .MainBanner-subtitle {
        width: 90%;
        line-height: 21px;
        font-size: 1.13em;
        letter-spacing: 0.216px;
        color: white;
    }

    .MainBanner-register {
        margin: 1.9em 0;
    }

    .MainBanner-register-button {
        width: 77%;
        max-width: 250px;
        height: 42px;
        font-size: .75em;
        text-transform: uppercase;
        color: var(--principal-text-color);
        background-color: white;
    }

    @media screen and (min-width: 425px) {
        .MainBanner-title {
            width: 100%;
            font-size: 2.3em;
        }
        .MainBanner-subtitle {
            width: 77%;
            font-size: 1.2em;
        }
    }

    @media screen and (min-width: 625px) {
        .MainBanner {
            background-position-x: 10%;
        }
    }

    @media screen and (min-width: 1000px) {
        .MainBanner {
            min-height: 492px;
            padding: 7%;
            background-position-x: 44%;
        }
        .MainBanner-title {
            width: 65%;
            max-width: 745px;
            line-height: 68px;
            font-size: 3.45em;
            margin-bottom: .73em;
        }
        .MainBanner-subtitle {
            width: 60%;
            max-width: 690px;
            line-height: 23px;
            font-size: 1.35em;
        }
        .MainBanner-register {
            display: none;
        }
    }
</style>

<div class="MainBanner"
    style="background-image:{backgroundGradient}, url({imageSrc})"
>
    <h1 class="MainBanner-title">{title}</h1>
    <p class="MainBanner-subtitle">{subtitle}</p>
    <div class="MainBanner-register">
        <button class="MainBanner-register-button button button--secondary"
            on:click={()=>homeAuthenticationOpen = true}>
            Regístrate Gratis
        </button>
    </div>
</div>