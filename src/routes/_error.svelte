<script>
    export let status;
    export let error;

    if( error.message.name === 'RequestError' )
        status = 500;
    else if( error.message.includes("404") ) 
        status = 404;

    const DEV = (process.env.NODE_ENV === 'development');
</script>

<style>
    :global(body){
        height: 100vh;
        background-color: #5387cc;
    }

    .Error {
        height: 90%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }

    .Error figure{
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .Error-image{
        width: 200px;
        position: relative;
        z-index: 10;
        margin-top: 90px;
    }
    .Error-code{
        margin: 0;
        color: white;
        position: absolute;
        font-size: 13em;
    }
    .Error-message{
        margin-bottom: 0;
        color: white;
        font-size: 30px;
        font-family: 'lato', sans-serif;
        text-align: center;
    }
    .Error-submessage{
        margin-top: 10px;
        color: white;
        font-size: 20px;
        font-family: 'lato', sans-serif;
        text-align: center;
    }
    @media screen and (min-width: 600px){
        .Error-image{
            width: 260px;
        }
        .Error-code{
            font-size: 18em;
        }
    }
    @media screen and (min-width: 769px){
        .Error-image{
            width: 300px;
        }
        .Error-code{
            font-size: 25em;
        }
    }
</style>

<div class="Error">
    {#if status === 404}
        <figure>
            <h2 class="Error-code">{status}</h2>
            <img class="Error-image" src="images/404.png" alt="Error 404">
        </figure>
        <p class="Error-message">Houston Houston tenemos un problema</p>
        <p class="Error-submessage">Lo sentimos<br>¡No encontramos lo que buscabas!</p>
    {:else}
        <figure>
            <h2 class="Error-code">{status}</h2>
            <img class="Error-image" src="images/500.png" alt="Error 500">
        </figure>
        <p class="Error-message">Estamos trabajando por ti</p>
        <p class="Error-submessage">¡Hubo un error en la aplicación!<br></p>
        <p class="Error-submessage">{error.message}</p>
    {/if}

    {#if DEV && error.stack}
        <pre style="color:white;margin-top:40px;">{error.stack}</pre>
    {/if}
</div>