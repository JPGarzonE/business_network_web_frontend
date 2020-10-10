<script>
    import ButtonChat from "./ButtonChat/ButtonChat.svelte";
    import ProfileIconMenu from "./ProfileIconMenu/ProfileIconMenu.svelte";

    // export let userLogoSrc;
</script>

<style>
    Header{
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgb(0,180,226);
        background: linear-gradient(90deg, rgba(0,180,226,1) 0%, rgba(0,155,214,1) 30%, rgba(44,133,205,1) 79%);
    }

    .Header-container {
        width: 100%;
        display: flex;
        /* justify-content: space-between; */
        justify-content: center;
        align-items: center;
        padding: 0px 15em;
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
</style>

<header class="Header">
    <div class="Header-container">
        <div class="Header-wordmark">
            Stay <a href="/" style="display:flex;">
                <img class="Header-logo" src="/images/wordmark_white_logo.png" alt="Conecty" />
            </a>
        </div>
        <!-- <div class="Header-user-data">
            <div class="Header-user-data-mychat">
                <ButtonChat title="Mi chat" />
            </div>
            <ProfileIconMenu logoSrc={userLogoSrc} />
        </div> -->
    </div>
</header>