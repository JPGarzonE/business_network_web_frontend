<style>
    .AlliesSection {
        background-color: var(--extra-light-gray);
        padding: 50px;
    }

    .AlliesSection-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .AlliesSection-content figure {
        display: flex;
        justify-content: center;
    }

    .AlliesSection-content img {
        width: 90%;
        max-width: 270px;
        max-height: 195px;
        margin: 0 .5em;
    }
    
    @media screen and (min-width: 850px) {
        .AlliesSection {
            padding: 40px;
            padding-bottom: 35px;
        }
        .AlliesSection-content {
            flex-direction: row;
        }
        .AlliesSection-content-1 {
            border-right:2px solid #CCCBCB;
        }
        .AlliesSection-content img {
            width: auto;
            height: 160px;
        }
    }

    @media screen and (min-width: 1000px) {
        .AlliesSection-content img {
            height: 175px;
        }
    }
</style>

<div class="AlliesSection">
    <div class="AlliesSection-content">
        <figure class="AlliesSection-content-1">
            <img src="/images/mintic-ally.png" alt="Mintic" />
        </figure>
        <figure>
            <img src="/images/appsco-ally.png" alt="Apps.co" />
        </figure>
        <figure>
            <img src="/images/colombo-china-ally.png" alt="Cámara de Comercio Colombo China" />
        </figure>
    </div>
</div>