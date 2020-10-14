<script context="module">
    export async function preload(page, session) {
        if( session.authenticated )
            return this.redirect(301, `profile/${session.username}`);
    }
</script>

<script>
    import LandingBanner from "../components/MainBanners/LandingBanner.svelte";
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
    <LandingBanner name="Signup" />
    <AuthContainer>
        <SignupForm />
    </AuthContainer>
</div>