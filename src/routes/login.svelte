<script>
    import MainBanner from "../components/MainBanner.svelte";
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
    <MainBanner />
    <AuthContainer>
        <LoginForm />
    </AuthContainer>
</div>