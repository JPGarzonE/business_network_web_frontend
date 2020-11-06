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
        "title": "Conecta con compradores y proveedores internacionales alrededor del mundo.",
        "subtitle": "Se parte de la red de comercio internacional que está conectando las ofertas más competitivas del mercado con compradores previamente verificados.",
        "features": [
            {
                "title": "Busca tus productos de forma fácil",
                "description": "Encuentra de manera organizada, la información relevante acerca de los productos que requieres, con nuestra herramienta de busqueda y accede a una de las redes de proveedores calificados de America latina.",
                "advice": "*Todos nuestros proveedores han sido verificados en diferentes listas de antecedentes internacionales."
            },
            {
                "title": "Exposición digital con compradores internacionales",
                "description": "Crea tu perfil en Conecty, donde de forma fácil podrás tener una exposición digital con cientos de compradores internacionales quienes han sido sometidos a verificaciones de seguridad previas.",
                "advice": "*Todos nuestros compradores han sido verificados en diferentes listas de antecedentes internacionales"
            },
            {
                "title": "Asegura tus pagos con nosotros",
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