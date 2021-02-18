<script>
    import { goto, stores } from "@sapper/app";
    import { getContext, hasContext } from "svelte";
    import AuthService from '../../services/authentication/auth.service.js';
    import { GetRoute as GetRootRoute } from '../../routes/index.svelte';
    import { GetRoute as GetSupplierProfileRoute } from '../../routes/profile/supplier/[accountname].svelte';
    import { GetRoute as GetBuyerProfileRoute } from '../../routes/profile/buyer/[accountname].svelte';
    import ProfileIcon from "../ProfileIcon/ProfileIcon.svelte";
    import ArrowCollapseRight from "svelte-material-icons/ArrowCollapseRight.svelte";
    import ChevronDown from "svelte-material-icons/ChevronDown.svelte";
    import ChevronUp from "svelte-material-icons/ChevronUp.svelte";
    import PencilOutline from "svelte-material-icons/PencilOutline.svelte";
    import { _ } from 'svelte-i18n';

    export let logoSrc;

    const authService = new AuthService();
    const { session, page } = stores();

    let activeEditProfileOption = true;
    if( hasContext("activeEditProfileOption") )
      activeEditProfileOption = getContext("activeEditProfileOption")

    let activeSignOutOption = true;
    if( hasContext("activeSignOutOption") )
      activeSignOutOption = getContext("activeSignOutOption");

    let displayMenu = false;
    let actualPath = null;
    let sessionCompanyAccountname = null;
    let sessionIsAuthenticated = false;
    let sessionProfilePath = '';
    let companyIsBuyer = false;
    let companyIsSupplier = false;

    session.subscribe(session => {
        sessionIsAuthenticated = session.authenticated;
        if( sessionIsAuthenticated && session.company ) {
            sessionCompanyAccountname = session.company_accountname;
            companyIsBuyer = session.company.is_buyer;
            companyIsSupplier = session.company.is_supplier;
        }
    });
    page.subscribe(page => {
        actualPath = page.path;
    });

    if( companyIsSupplier )
        sessionProfilePath = GetSupplierProfileRoute(sessionCompanyAccountname);
    else if( companyIsBuyer )
        sessionProfilePath = GetBuyerProfileRoute(sessionCompanyAccountname);

    let gotoProfile = async () => {
        if( sessionIsAuthenticated ) {
            document.body.style.cursor = "wait";
            await goto(sessionProfilePath)
            document.body.style.cursor = "auto";
        }
    }

    async function closeSession() {
        await authService.closeSession( $session );
        location.href = GetRootRoute();
    }
</script>


<div class="ProfileIconMenu">
    <div class="ProfileIconMenu-icon" 
        on:click={() => displayMenu = !displayMenu}
    >
        <ProfileIcon {logoSrc} />

        {#if displayMenu}
            <ChevronUp size=40 />
        {:else}
            <ChevronDown size=40 />
        {/if}
    </div>

    {#if sessionIsAuthenticated}
        <div class="ProfileIconMenu-dropdown" class:hide={!displayMenu} >
            {#if activeEditProfileOption && actualPath !== sessionProfilePath}
            <div class="ProfileIconMenu-option" on:click={gotoProfile}>
                <span>{$_('profileIconMenu.editProfile')}</span>
                <PencilOutline size=16 color="var(--secondary-text-color)" />
            </div>
            {/if}

            {#if activeSignOutOption}
            <div class="ProfileIconMenu-option" on:click={closeSession}>
                <span>{$_('profileIconMenu.signOut')}</span>
                <ArrowCollapseRight size=16 color="var(--secondary-text-color)" />
            </div>
            {/if}
        </div>
    {/if}
</div>


<style>
  .ProfileIconMenu,
  .ProfileIconMenu-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-left: 36px;
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
    z-index: 25;
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