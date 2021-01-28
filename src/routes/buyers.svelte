<script context="module">
    export async function preload(page, session) {
        if( session.authenticated ) {
            return this.redirect(301, '/market');
        }
    }
</script>

<script>
    import Header from "../components/Header.svelte";
    import Home from "../containers/Home/Home.svelte";
    import Footer from "../components/Footer.svelte";

    let homeAuthenticationOpen = false;
    let authenticationContainerState = "signup";
</script>

<style>
    .Header {
        position: relative;
        width: 100%;
        z-index: 10;
    }
</style>

<svelte:head>
    <title>Conecty</title>
</svelte:head>

<div class="Header">
    <Header 
        signupActionButton={() => {homeAuthenticationOpen = true; authenticationContainerState = "signup"}}
        loginActionButton={() => {homeAuthenticationOpen = true; authenticationContainerState = "login"}}
        background="var(--principal-orange)" textColor="#FFFFFF"
    />
</div>

<div class="index">
    <Home 
        bind:homeAuthenticationOpen
        bind:authenticationContainerState
    />
</div>

<Footer />