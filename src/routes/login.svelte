<script context="module">
    import { GetRoute as GetMarketRoute } from './market.svelte';

    export const GetRoute = () => {
        return `/login/`;
    }

    export async function preload(page, session) {
        if( session.authenticated )
            return this.redirect(301, GetMarketRoute());
    }
</script>

<script>
    import MainBanner from "../components/LandingPage/MainBanner.svelte";
    import AuthContainer from "../components/authentication/AuthContainer.svelte";
    import LoginForm from "../containers/LoginForm/LoginForm.svelte";
</script>

<style>
    .login {
        max-width: 1600px;
        min-height: 700px;
        margin: 0 auto;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: row;
    }

    .login-banner {
        display: none;
        height: 725px;
    }

    .login-form {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    @media screen and (min-width: 1000px) {
        .login-banner {
            width: 60%;
            display: flex;
        }
        .login-form {
            width: 40%;
        }
    }
</style>

<svelte:head>
    <title>Login | Conecty</title>
</svelte:head>

<div class="login">
    <div class="login-banner">
        <MainBanner name="Login" />
    </div>
    <div class="login-form">
        <AuthContainer>
            <LoginForm />
        </AuthContainer>
    </div>
</div>