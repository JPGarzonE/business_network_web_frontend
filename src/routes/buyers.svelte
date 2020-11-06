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
        "title": "Conecta con exportadores calificados de latino ámerica y asegura tus pagos.",
        "subtitle": "Encuentra los productos que necesites para las importaciones de tu empresa dentro de una variedad de opciones, de manera fácil y organizada.",
        "features": [
            {
                "title": "Busca proveedores internacionales",
                "description": "Encuentra empresas exportadoras de tu interés previamente verificadas, junto con su información relevante: certificados y otros productos.",
                "advice": "*Todos los proveedores de nuestra plataforma han sido verificados en diferentes listas de antecedentes internacionales."
            },
            {
                "title": "Conéctate fácilmente",
                "description": "Establece un canal de comunicación directa a tráves del perfil del proveedor.",
                "advice": ""
            },
            {
                "title": "Realiza tus pagos de forma segura",
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