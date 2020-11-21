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
        "subtitle": "Cuéntanos qué tipo de cliente estás buscando y nosotros lo encontramos por ti. Conecty es tu área comercial GRATIS.",
        "features": [
            {
                "title": "Organiza la información de tu empresa.",
                "description": "Sube a la plataforma tu oferta de productos exportables y las certificaciones que te respaldan.",
                "advice": "*Mantenemos segura tu información. Tú escoges que mostrar al comprador."
            },
            {
                "title": "Te conectamos con las empresas que te interesan.",
                "description": "Buscaremos la oferta comercial que se ajuste a tu modelo de negocio y te ayudaremos a construir esa relación comercial.",
                "advice": "*Todos nuestros compradores han sido verificados en diferentes listas de antecedentes internacionales"
            },
            {
                "title": "Recibe tu pago de forma segura",
                "description": "En Conecty mantenemos a salvo tu pago mientras se completa exitosamente la negociación.",
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
    <!-- Hotjar Tracking Code for joinconecty.com -->
    <script>
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:2111995,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    </script>

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