<script context="module">
    export async function preload(page, session) {
        if( session.authenticated )
            return this.redirect(301, `profile/${session.username}`);
    }
</script>

<script>
    import LandingBanner from "../components/MainBanners/LandingBanner.svelte";
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
</style>

<svelte:head>
    <title>Login | Conecty</title>
</svelte:head>

<div class="login">
    <LandingBanner name="Login" />
    <AuthContainer>
        <LoginForm />
    </AuthContainer>
</div>