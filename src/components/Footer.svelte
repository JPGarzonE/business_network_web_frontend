<script>
    import ConectyWhiteWordmark from "./Wordmarks/ConectyWhiteWordmark.svelte";
</script>

<style>
    .Footer {
        display: flex;
        height: 200px;
        background: rgb(0,180,226);
        background: linear-gradient(90deg, rgba(0,180,226,1) 0%, rgba(0,155,214,1) 30%, rgba(44,133,205,1) 79%);
    }

    .Footer-content {
        min-width: 100%;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        margin: auto;
    }

    .Footer-slogan {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .85em;
        color: white;
    }

    .Footer-wordmark {
        width: 90px;
        height: 19px;
        margin: 0px 10px;
    }

    .Footer-email-container, .Footer-tel-container {
        display: flex;
        align-items: center;
    }

    .Footer-email-content {
        display: flex;
        flex-direction: column;
        color: var(--secondary-color);
    }

    .Footer-tel-content {
        display: flex;
        color: var(--secondary-color);
    }

    @media screen and (min-width: 850px){
        .Footer {
            height: 150px;
        }

        .Footer-content {
            flex-direction: row;
            justify-content: space-around;
            min-width: 850px;
        }
    }
</style>

<footer class="Footer">
    <div class="Footer-content">
        <div class="Footer-slogan">
            <a href="/" style="display:flex;">
                <div class="Footer-wordmark">
                    <ConectyWhiteWordmark />
                </div>
            </a>
            con nosotros
        </div>
        <div class="Footer-email-container">
            <i class="icon icon-email--white"></i>
            <div class="Footer-email-content">
                <span>felipe@joinconecty.com</span>
                <span>carlos@joinconecty.com</span>
            </div>
        </div>
        <div class="Footer-tel-container">
            <i class="icon icon-tel--white"></i>
            <div class="Footer-tel-content">
                (+57) 3133800223
            </div>
        </div>
    </div>
</footer>