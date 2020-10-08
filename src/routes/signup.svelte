<script>
    import MainBanner from "../components/MainBanner.svelte";
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
</style>

<svelte:head>
    <title>Signup | Conecty</title>
</svelte:head>

<div class="signup">
    <MainBanner />
    <AuthContainer>
        <SignupForm />
    </AuthContainer>
</div>