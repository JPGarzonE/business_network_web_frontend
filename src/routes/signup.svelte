<script context="module">
    import { GetRoute as GetMarketRoute } from './market.svelte';

    export const GetRoute = () => {
        return `/signup/`;
    }

    export async function preload(page, session) {
        if( session.authenticated )
            return this.redirect(301, GetMarketRoute());
    }
</script>

<script>
    import MainBanner from "../components/LandingPage/MainBanner.svelte";
    import AuthContainer from "../components/authentication/AuthContainer.svelte";
    import SignupForm from "../containers/SignupForm/SignupForm.svelte";
</script>

<style>
    .signup {
        max-width: 1600px;
        min-height: 700px;
        margin: 0 auto;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: row;
    }

    .signup-banner {
        display: none;
        height: 800px;
    }

    .signup-form {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    @media screen and (min-width: 1000px) {
        .signup-banner {
            width: 60%;
            display: flex;
        }
        .signup-form {
            width: 40%;
        }
    }
</style>

<svelte:head>
    <title>Signup | Conecty</title>
</svelte:head>

<div class="signup">
    <div class="signup-banner">
        <MainBanner name="Signup" />
    </div>
    <div class="signup-form">
        <AuthContainer>
            <SignupForm />
        </AuthContainer>
    </div>
</div>