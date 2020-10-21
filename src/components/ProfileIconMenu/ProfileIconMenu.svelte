<script>
    import { goto } from '@sapper/app';
    import { stores } from "@sapper/app";
    import ProfileIcon from "../ProfileIcon/ProfileIcon.svelte";
    import ArrowCollapseRight from "svelte-material-icons/ArrowCollapseRight.svelte";
    import ChevronDown from "svelte-material-icons/ChevronDown.svelte";
    import ChevronUp from "svelte-material-icons/ChevronUp.svelte";
    import PencilOutline from "svelte-material-icons/PencilOutline.svelte";
    import { deleteCookie } from "../../utils/cookie.js";

    export let logoSrc;

    const { session, page } = stores();

    let displayMenu = false;
    let actualPath = null;
    let sessionUsername = null;
    let sessionIsAuthenticated = false;

    session.subscribe(session => {
        sessionIsAuthenticated = session.authenticated;
        if( sessionIsAuthenticated )
            sessionUsername = session.username;
    });
    page.subscribe(page => {
        actualPath = page.path;
    });

    let sessionProfilePath = `/profile/${sessionUsername}`;

    let gotoProfile = async () => {
        console.log("GOTO profile")
        document.body.style.cursor = "wait";
        await goto(sessionProfilePath);
        document.body.style.cursor = "auto";
    }
    
    async function closeSession() {
        deleteCookie("JPGE");
        deleteCookie("access_username");
        /* goto isn't used because the session has to be 
        closed from the server and goto happens on the client */
        location.href = '/login';
    }
</script>

<style>
    .ProfileIconMenu, .ProfileIconMenu-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .ProfileIconMenu {
        position: relative;
    }

    .ProfileIconMenu-dropdown {
        width: 210px;
        min-height: 40px;
        position: absolute;
        top: 65px;
        right: 0px;
        z-index: 20;
        border-radius: 0 0 8px 8px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        background-color: var(--extra-light-gray);
    }

    .hide {
        display: none;
    }

    .ProfileIconMenu-dropdown span {
        color: var(--secondary-text-color);
    }

    .ProfileIconMenu-option {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 7% 10%;
        border-top: 0.1px solid var(--light-color);
        cursor: pointer;
    }

    .ProfileIconMenu-option:hover {
        background-color: var(--lightest-gray);
    }

    .ProfileIconMenu-option span {
        font-size: 1.1em;
        letter-spacing: 0.22px;
        color: var(--light-color);
    }
</style>

<div class="ProfileIconMenu">
    <div class="ProfileIconMenu-icon" on:click={() => displayMenu = !displayMenu}>
        <ProfileIcon {logoSrc} />
        {#if displayMenu}
            <ChevronUp size=40 />
        {:else}
            <ChevronDown size=40 />
        {/if}
    </div>
    <div class="ProfileIconMenu-dropdown" class:hide={!displayMenu} >
        {#if actualPath !== sessionProfilePath}
        <div class="ProfileIconMenu-option" on:click={gotoProfile}>
            <span>Editar mi perfil</span>
            <PencilOutline size=16 color="var(--secondary-text-color)" />
        </div>    
        {/if}

        {#if sessionIsAuthenticated}
        <div class="ProfileIconMenu-option" on:click={closeSession}>
            <span>Salir</span>
            <ArrowCollapseRight size=16 color="var(--secondary-text-color)" />
        </div>
        {/if}
    </div>
</div>