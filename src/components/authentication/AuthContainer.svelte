<script>
    import ConectyWhiteWordmark from "../Wordmarks/ConectyWhiteWordmark.svelte";
</script>

<style>
    .AuthContainer{
        max-width: 650px;
        min-height: 600px;
        width: 100%;
        height: auto;
        position: relative;
        top: 0;
        right: 0;
        left: 0;
        bottom: auto;
        margin: 40px 20px;
        padding: 4em 2.5em 5em;
        border: 2px solid var(--principal-color);
        border-radius: 10px;
    }

    .AuthContainer-logo-container{
        width: 100%;
        display: flex;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        margin: 0 auto;
        margin-top: -1px;
        margin-bottom: 30px;
    }

    .AuthContainer-logo-container figure{
        width: 180px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--principal-color);
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .AuthContainer-logo-wordmark {
        width: 70%;
        height: 52%;
    }

    .AuthContainer-footer{
        width: 100%;
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 0;
        left: 0;
        margin-bottom: 10px;
        text-transform: uppercase;
        color: var(--light-color);
        font-size: 15px;
    }

    @media screen and (min-width: 425px) {
        .AuthContainer {
            margin: 40px 52px;
        }
    }

    @media screen and (min-width: 1000px){
        .AuthContainer{
            position: relative;
            padding: 5em 2.5em 5em;
        }
    }

    @media screen and (min-width: 1270px){
        .AuthContainer{
            padding: 4em 4.5em 5em;
        }
    }
</style>

<div class="AuthContainer">
    <div class="AuthContainer-logo-container">
        <figure>
            <div class="AuthContainer-logo-wordmark">
                <ConectyWhiteWordmark />
            </div>
        </figure>
    </div>
    <slot />
    <div class="AuthContainer-footer">
        &copy; Conecty 2020
    </div>
</div>