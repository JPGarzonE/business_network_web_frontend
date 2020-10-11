<script>
    import { goto } from '@sapper/app';
    import { stores } from "@sapper/app";
    import ButtonChat from "./ButtonChat/ButtonChat.svelte";
    import ProfileIconMenu from "./ProfileIconMenu/ProfileIconMenu.svelte";

    const { session } = stores();

    let userIsAuthenticated = false;
    let company;
    session.subscribe(session => {
        userIsAuthenticated = session.authenticated;
        company = session.company;
    });

    let logoSrc = company && company.logo ? company.logo.path : null;
</script>

<style>
    @import "/styles/button.css";

    Header{
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgb(0,180,226);
        background: linear-gradient(90deg, rgba(0,180,226,1) 0%, rgba(0,155,214,1) 30%, rgba(44,133,205,1) 79%);
    }

    .Header-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 2em;
        font-size: .85em;
        color: white;
    }

    .Header-logo{
        width: 90px;
        height: 20px;
        margin: 0px 10px;
    }

    .Header-wordmark {
        display: flex;
    }

    .Header-user-data {
        width: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .Header-user-data-mychat {
        width: 138px;
        display: flex;
        align-items: center;
        margin-right: 36px;
    }

    .Header-user-authenticate {
        display: none;
        flex-direction: column;
        justify-content: space-between;
        width: 220px;
    }

    .Header-user-authenticate-signup, .Header-user-authenticate-login {
        text-transform: capitalize;
        font-size: 1.3em;
        letter-spacing: 0.22px;
        color: white;
    }

    .Header-user-authenticate-signup {
        display: none;
        margin-right: 15px;
    }

    .Header-user-authenticate-login {
        border: 1px solid white;
    }

    .Header-user-authenticate-signup:hover {
        background-color: var(--lightest-gray);
    }

    .Header-user-authenticate-login:hover {
        border: 2px solid white;
        background-color: var(--lightest-gray);
    }

    @media screen and (min-width: 360px) {
        .Header-user-authenticate {
            display: flex;
        }
    }

    @media screen and (min-width: 525px) {
        .Header-user-authenticate {
            width: 300px;
            flex-direction: row;
        }

        .Header-user-authenticate-signup {
            display: flex;
        }
    }

    @media screen and (min-width: 625px) {
        .Header-container {
            padding: 0 5em;
        }
    }

    @media screen and (min-width: 1445px) {
        .Header-container {
            padding: 0 10em;
        }
    }
</style>

<header class="Header">
    <div class="Header-container">
        <div class="Header-wordmark">
            Stay <a href="/" style="display:flex;">
                <img class="Header-logo" src="/images/wordmark_white_logo.png" alt="Conecty" />
            </a>
        </div>
        {#if userIsAuthenticated}
            <div class="Header-user-data">
                <div class="Header-user-data-mychat">
                    <ButtonChat title="Mi chat" />
                </div>
                <ProfileIconMenu {logoSrc} />
            </div>
        {:else}
            <div class="Header-user-authenticate">
                <button class="button button--variant Header-user-authenticate-signup"
                    on:click={async ()=> await goto("/signup")}>
                    Unete ahora
                </button>
                <button class="button button--variant Header-user-authenticate-login"
                    on:click={async ()=> await goto("/login")}>
                    Inicia sesión
                </button>
            </div>
        {/if}
    </div>
</header>