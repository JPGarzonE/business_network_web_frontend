<script context="module">
    import { GetRoute as GetRootRoute } from "../index.svelte";
    import { GetRoute as GetBuyerProfileRoute } from "../profile/buyer/[accountname].svelte";
    import { GetRoute as GetSupplierProfileRoute } from "../profile/supplier/[accountname].svelte";
    import CompanyService from "../../services/companies/companies.service.js";
    import { _ } from "svelte-i18n";

    export const GetRoute = () => {
        return `/company/select-role`;
    }

    export async function preload(page, session) {
        if( session.authenticated && session.company ) {
            const company = session.company;

            if( company.is_buyer )
                return this.redirect(
                    302, 
                    GetBuyerProfileRoute(session.company_accountname) 
                );
            else if( company.is_supplier )
                return this.redirect(
                    302,
                    GetSupplierProfileRoute(session.company_accountname)
                );
        }
        else {
            this.redirect(302, GetRootRoute() );
        }
    }

</script>

<script>
    import { setContext } from "svelte";
    import { goto, stores } from "@sapper/app";
    import Header from "../../components/Header.svelte";
    import Footer from "../../components/Footer.svelte";

    const companyService = new CompanyService();
    const { session } = stores();
    let loading = false;

    setContext("activeEditProfileOption", false);
    setContext("activeMarketOption", false);

    async function selectBuyer() {
        document.body.style.cursor = "wait !important";
        loading = true;
        const buyer = await companyService.activateCompanyAsBuyer(
            $session.company_accountname, 
            $session
        );

        await goto( 
            GetBuyerProfileRoute(buyer.company.accountname) 
        );
        document.body.style.cursor = "auto !important";
        loading = false;
    }

    async function selectSupplier() {
        document.body.style.cursor = "wait !important";
        loading = true;
        const supplier = await companyService.activateCompanyAsSupplier(
            $session.company_accountname, 
            $session
        );

        await goto( 
            GetSupplierProfileRoute(supplier.company.accountname) 
        );
        document.body.style.cursor = "auto !important";
        loading = false;
    }
</script>

<svelte:head>
    <title></title>
</svelte:head>

<Header freezeRedirections />

{#if loading}
<div class="loading-container"></div>
{/if}

<div class="Company-SelectRole">
    <div class="Company-SelectRole-head">
        <h3>{$_("company:select-role.welcomeTitle")}</h3>
        <p>{$_("company:select-role.selectSubtitle")}</p>
    </div>
    <div class="Company-SelectRole-options">
        <div class="Company-SelectRole-option option-a" on:click={selectSupplier}>
            <div class="Company-SelectRole-option-content">
                <figure>
                    <img src="/images/supplier-option.svg" alt="" />
                    <img class="background-image" 
                        src="/images/supplier-option-background.svg" alt="" 
                    />
                </figure>
                <div class="Company-SelectRole-option-name">
                    <h4>{$_("company:select-role.supplierOption")}</h4>
                </div>
            </div>
        </div>

        <div class="Company-SelectRole-option-divisor">
            <hr />
            <span>O</span>
            <hr />
        </div>

        <div class="Company-SelectRole-option option-b" on:click={selectBuyer}>
            <div class="Company-SelectRole-option-content">
                <figure>
                    <img src="/images/buyer-option.svg" alt="" />
                </figure>
                <div class="Company-SelectRole-option-name">
                    <h4>{$_("company:select-role.buyerOption")}</h4>
                </div>
            </div>
        </div>
    </div>
</div>

<Footer freezeRedirections />

<style>
    .loading-container {
        position: absolute;
        background: #0000004f;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 20;
        left: 0;
        cursor: wait;
    }

    .Company-SelectRole {
        position: relative;
        padding: 70px 0px 45px;
        background-color: var(--extra-light-gray);
    }

    .Company-SelectRole-head {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 40px;
        padding-inline: 38px;
    }
    .Company-SelectRole-head h3 {
        color: #2885CB;
        font-size: 25px;
        text-align: center;
        line-height: 28px;
        letter-spacing: 0.216px;
        margin-bottom: 15px;
    }
    .Company-SelectRole-head p {
        font-size: 18px;
        letter-spacing: 0.216px;
        color: #707070;
        text-align: center;
        line-height: 21px;
    }

    .Company-SelectRole-options {
        display: flex;
        flex-direction: column;
    }

    .Company-SelectRole-option {
        width: 100%;
        position: relative;
        z-index: 10;
        cursor: pointer;
    }

    .Company-SelectRole-option-content {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
    }
    .Company-SelectRole-option-content figure {
        position: relative;
        min-width: 105px;
        max-width: 256px;
        z-index: 5;
    }
    .option-a .Company-SelectRole-option-content figure {
        width: 35%;
    }
    .option-b .Company-SelectRole-option-content figure {
        width: 38%
    }
    .Company-SelectRole-option-content img {
        width: 100%;
    }
    .option-a .Company-SelectRole-option-content .background-image {
        position: absolute;
        left: 0;
        z-index: -1;
    }
    .Company-SelectRole-option-name {
        width: 45%;
        min-width: 190px;
        height: 38px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: relative;
        padding-right: 11%;
        border-radius: 4px;
    }
    .option-a .Company-SelectRole-option-name {
        top: 9vw;
        margin-left: -13%;
        border: 2px solid var(--button-color);
        background-color: #FF891C;
    }
    .option-b .Company-SelectRole-option-name {
        top: 15vw;
        margin-left: -15%;
        border: 2px solid #A8D2F7;
        background-color: var(--principal-color);
        color: white;
    }

    .Company-SelectRole-option-name h4 {
        font-size: 0.875em;
        text-transform: uppercase;
        letter-spacing: 0.216px;
    }

    .Company-SelectRole-option-divisor {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px 0px 27px;
    }
    .Company-SelectRole-option-divisor hr {
        width: 50%;
        max-width: 126px;
        height: 1px;
        margin: 0;
        border: unset;
        background-color: #6E7072;
    }
    .Company-SelectRole-option-divisor span {
        margin-inline: 10px;
        color: #6E7072;
        font-size: 18px;
    }

    @media screen and (min-width: 625px) {
        .Company-SelectRole-head h3 {
            font-size: 38px;
        }
        .Company-SelectRole-head p {
            font-size: 22px;
            margin-bottom: 21px;
        }
        .Company-SelectRole-option-name {
            height: 45px;
        }
        .Company-SelectRole-option-name h4 {
            font-size: 1em;
        }
    }

    @media screen and (min-width: 850px) {
        .Company-SelectRole {
            max-width: 2550px;
            margin: 0 auto;
            padding: 0px;
        }
        .Company-SelectRole-head {
            align-items: flex-start;
            position: absolute;
            top: 83px;
            left: 75px;
            z-index: 15;
            margin-bottom: 55px;
        }
        .Company-SelectRole-head h3 {
            margin-bottom: 28px;
        }
        .option-a {
            background-color: white;
        }

        .Company-SelectRole-options {
            flex-direction: row;
            justify-content: center;
        }
        .Company-SelectRole-option {
            width: 50%;
        }
        .Company-SelectRole-option.option-a {
            padding: 250px 0px 60px;
        }
        .Company-SelectRole-option.option-a:hover {
            background-color: #ececec;
        }
        .Company-SelectRole-option.option-b {
            padding: 245px 0px 60px;
        }
        .Company-SelectRole-option.option-b:hover {
            background-color: #f1f1f1;
        }
        .option-a .Company-SelectRole-option-content figure,
        .option-b .Company-SelectRole-option-content figure {
            max-width: 290px;
            width: 45%;
        }
        .Company-SelectRole-option-name {
            height: 52px;
        }
        .option-a .Company-SelectRole-option-name {
            top: 90px;
            margin-left: -8%;
        }
        .option-b .Company-SelectRole-option-name {
            top: 95px;
            margin-left: -8%;
        }
        .Company-SelectRole-option-name h4 {
            font-size: 1.125em;
        }
        
        .Company-SelectRole-option-divisor {
            width: 0;
            height: 100%;
            position: absolute;
            flex-direction: column;
            z-index: 15;
        }
        .Company-SelectRole-option-divisor hr {
            display: none;
        }
        .Company-SelectRole-option-divisor span {
            font-size: 1.465em;
        }
        .Company-SelectRole-option-divisor span + hr {
            display: block;
            width: 35px;
            margin-top: 8px;
        }
    }

    @media screen and (min-width: 1160px) {
        .Company-SelectRole-head h3 {
            font-size: 48px;
        }
        .Company-SelectRole-head p {
            font-size: 24px;
        }
        .option-a .Company-SelectRole-option-name  {
            top: 110px;
            margin-left: -13%;
        }
        .option-b .Company-SelectRole-option-name {
            top: 130px;
            margin-left: -15%;
        }
        .Company-SelectRole-option.option-b {
            padding: 225px 0px 60px;
        }
    }
</style>