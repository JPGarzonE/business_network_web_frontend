<style>
    .MainBanner {
        width: 60%;
        height: 100%;
        background-position: center;
        background-size: cover;
        display: none;
        flex-direction: column;
        justify-content: flex-end;
        padding: 140px;
        background-image: url('/images/conecty-main-banner.jpg');
    }

    .MainBanner-title{
        margin: 0;
        margin-bottom: 116px;
        font-size: 3.5em;
        font-weight: 900;
        color: white;
    }

    .MainBanner-subtitle{
        width: 100%;
        max-width: 400px;
        margin: 0;
        font-size: 1.9em;
        font-weight: 100;
        color: white;
    }

    @media screen and (min-width: 1000px) {
        .MainBanner{
            display: flex;
        }
    }

    @media screen and (min-width: 1150px) {
        .MainBanner{
            width: 70%;
        }
    }
</style>

<div class="MainBanner">
    <h1 class="MainBanner-title">Conecty</h1>
    <h3 class="MainBanner-subtitle">La nueva forma de conocer clientes, proveedores y aliados.</h3>
</div>