<script>
  import { goto } from "@sapper/app";
  import { stores } from "@sapper/app";
  import ButtonChat from "./ButtonChat/ButtonChat.svelte";
  import ProfileIconMenu from "./ProfileIconMenu/ProfileIconMenu.svelte";
  import ConectyWhiteWordmark from "./Wordmarks/ConectyWhiteWordmark.svelte";
  import HomeOutline from "svelte-material-icons/HomeOutline.svelte";
  import { _, locale, locales } from "svelte-i18n";

  export let background =
    "linear-gradient(90deg, rgba(0,180,226,1) 0%, rgba(0,155,214,1) 30%, rgba(44,133,205,1) 79%)";
  export let textColor = "#FFFFFF";

  const { session, page } = stores();

  let userIsAuthenticated = false;
  let actualPath = null;
  let company;

  session.subscribe((session) => {
    userIsAuthenticated = session.authenticated;
    company = session.company;
  });

  page.subscribe((page) => {
    actualPath = page.path;
  });

  let logoSrc = company && company.logo ? company.logo.path : null;

  let gotoRoot = async () => {
    document.body.style.cursor = "wait";
    await goto("/");
    document.body.style.cursor = "auto";
  };

  let gotoMarket = async () => {
    document.body.style.cursor = "wait";
    await goto("/market");
    document.body.style.cursor = "auto";
  };
</script>

<header class="Header" style="background:{background};color:{textColor};">
  <div class="Header-container">
    <div class="Header-wordmark">
      <span>Stay</span>
      <div
        class="Header-logo"
        on:click={gotoRoot}
        style="cursor:pointer;display:flex;"
      >
        <ConectyWhiteWordmark />
      </div>
    </div>
    <ul class="lang">
      <li>
        <div
          class="lang-flags"
          class:selected={$locale.includes("es")}
          href={`#!${"es"}`}
          on:click={() => ($locale = "es")}
        >
          <img class="image-Logo" src="images/lang/es.png" alt=" " />
        </div>
        <div>ESP</div>
      </li>
      <li class="line" />
      <li>
        <div
          class="lang-flags"
          class:selected={$locale.includes("en")}
          href={`#!${"en"}`}
          on:click={() => ($locale = "en")}
        >
          <img class="image-Logo" src="images/lang/en.png" alt=" " />
        </div>
        <div>ENG</div>
      </li>
    </ul>
    {#if userIsAuthenticated}
      <div class="Header-user-data">
        {#if actualPath !== `/market`}
          <div class="Header-user-data-market">
            <ButtonChat
              title={$_("header.goToTheMarket")}
              buttonAction={gotoMarket}
            >
              <span slot="button-icon" style="display: flex">
                <HomeOutline size={20} />
              </span>
            </ButtonChat>
          </div>
        {/if}
        <ProfileIconMenu {logoSrc} />
      </div>
    {/if}
  </div>
</header>

<style>
  @import "/styles/button.css";
  .Header {
    height: 67px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--principal-color);
  }
  .Header-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 2em;
    font-size: 0.85em;
    color: inherit;
  }
  .Header-logo {
    width: 87px;
    height: 18px;
    margin: 0px 5px;
  }
  .Header-wordmark {
    display: flex;
  }
  .Header-wordmark span {
    display: none;
    align-items: center;
    font-size: 16px;
    margin-right: 2px;
  }
  .Header-user-data {
    width: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .Header-user-data-market {
    width: 138px;
    display: none;
    align-items: center;
    margin-right: 36px;
  }
  .lang {
    display: flex;
    list-style-type: none;
    flex-direction: row;
    justify-content: space-between;
    color: whitesmoke;
    margin-right: 5%;
  }
  .line {
    border-left: 1px solid whitesmoke;
    margin: 0 10px 15px 10px;
  }

  .image-Logo {
    width: 33px;
    height: 22px;
  }

  @media screen and (min-width: 475px) {
    .Header {
      height: 89px;
    }
    .lang {
      margin-right: 30%;
    }
  }
  @media screen and (min-width: 625px) {
    .Header {
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.4);
    }
    .Header-wordmark span {
      display: flex;
    }
    .Header-logo {
      width: 120px;
      height: 25px;
    }
    .Header-container {
      padding: 0 5em;
    }
    .Header-user-data-market {
      display: flex;
    }
    .lang {
      margin-right: 40%;
    }
  }
  @media screen and (min-width: 1000px) {
  }
  @media screen and (min-width: 1445px) {
    .Header-container {
      padding: 0 10em;
    }
    .lang {
      margin-right: 45%;
    }
  }
</style>
