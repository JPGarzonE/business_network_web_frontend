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

    const content = {
        "title": "Conéctate con compradores calificados del exterior y asegura tus pagos.",
        "subtitle": "Se parte de la red de comercio internacional que está conectando las ofertas más competitivas del mercado con compradores previamente verificados.",
        "features": [
            {
                "title": "Visibiliza tus productos en el mundo digital",
                "description": "El perfil gratuito de Conecty permite que muestres tu portafolio de productos a los compradores internacionales de nuestra red.",
                "advice": "*Mantenemos segura tu información. Tú escoges que mostrar al comprador."
            },
            {
                "title": "Organiza la información de tu empresa",
                "description": "En cuestion de minutos, organiza tu información y muéstrale a los compradores que estan interesados en tus productos.",
                "advice": "*Todos nuestros compradores han sido verificados en diferentes listas de antecedentes internacionales"
            },
            {
                "title": "Recibe tu pago de forma segura",
                "description": "Evita procesos fraudulentos por medio de nuestro modelo fiduciario que nos permite asegurar tu pago y garantizar la transparencia de cualquier transacción.",
                "advice": "Conoce más sobre este modelo contactando a nuestros asesores de venta."
            }
        ]
    }
</script>

<style>
    .Header {
        position: fixed;
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
    />
</div>

<div class="index">
    <Home 
        bind:homeAuthenticationOpen
        bind:authenticationContainerState
        content={content}
    />
</div>

<Footer />