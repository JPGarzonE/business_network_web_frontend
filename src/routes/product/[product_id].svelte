<script context="module">
    import ProductService from '../../services/suppliers/product.service.js';

    export async function preload(page, session) {
        const productService = new ProductService();
        const { product_id } = page.params;

        const productData = await productService.getProductById(
            product_id, session.accessToken
        );

        return productData;
    }
</script>

<script>
    import { stores } from '@sapper/app';
    import Header from '../../components/Header.svelte';
    import ProductImagesCarrousel from '../../components/ProductImagesCarrousel/ProductImagesCarrousel.svelte';
    import CompanyContact from '../../components/CompanyContact/CompanyContact.svelte';
    import QuantityInput from '../../components/QuantityInput/QuantityInput.svelte';
    import ProductCertificatesList from '../../components/ProductCertificatesList/ProductCertificatesList.svelte';
    import Footer from '../../components/Footer.svelte';

    export let name;
    export let category;
    export let minimum_price;
    export let maximum_price;
    export let price_currency;
    export let measurement_unit;
    export let tariff_heading;
    export let minimum_purchase;
    export let description;
    export let certificates;
    export let principal_image;
    export let secondary_images;
    export let company;

    const { session } = stores();
    let sessionUsername = $session.authenticated ? $session.username : null;
    
    const CompanyProfilePath = company.username ? `profile/${company.username}` : "";
    let purchaseQuantity = 1000;
    let productImages = [principal_image, ...secondary_images];
    let contact = company.principal_contact;
</script>

<style>
    .ProductDetail {
        width: 100%;
        max-width: 1230px;
        height: auto;
        min-height: 100%;
        margin: 55px auto 0px;
        padding: 0px 10px;
    }

    .ProductDetailNavigation {
        max-width: 769px;
        margin: 0 auto;
    }
    .ProductDetailNavigation-back p {
        display: flex;
        align-items: center;
        color: var(--principal-color);
        font-size: 0.9em;
        cursor: pointer;
    }
    .ProductDetailNavigation-back p:hover {
        text-decoration: underline;
    }
    .ProductDetailNavigation-back p i {
        display: flex;
        width: 12.5px;
        height: 12.5px;
        margin-right: 5px;
    }
    .ProductDetailNavigation-title p {
        margin-top: 33px;
        padding: 0px 20px;
        color: var(--light-color);
        font-weight: normal;
        letter-spacing: 0.216px;
    }
    .ProductDetailNavigation-title a {
        color: inherit;
        text-decoration: none;
    }
    .ProductDetailNavigation-title span {
        cursor: pointer;
    }
    .ProductDetailNavigation-title span:hover {
        text-decoration: underline;
    }

    .ProductDetailContent {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-top: 30px;
        padding: 0px 8px;
    }
    .ProductDetail-multimedia-action {
        width: 100%;
        max-width: 520px;
        margin: 0 auto 50px;
    }
    .ProductDetail-buttons {
        width: 100%;
        text-align: center;
        margin: auto 0 0 auto;
        margin-top: 20px;
    }
    .ProductDetail-buttons span {
        font-size: 14px;
        color: var(--light-color);
    }
    .ProductDetail-buttons-contact {
        margin-top: 12px;
    }
    
    .ProductDetail-main-info {
        width: 100%;
        text-align: center;
    }
    .ProductDetail-name {
        font-size: 1.5em;
        font-weight: bold;
        color: var(--principal-color);
        letter-spacing: 0.22px;
    }
    .ProductDetail-category {
        font-size: 0.9em;
        font-weight: normal;
        color: var(--light-color);
    }
    .ProductDetail-price {
        font-size: 1.35em;
        color: #9F9F9F;
        letter-spacing: 0.216px;
        font-weight: bold;
    }
    .ProductDetail-price, .ProductDetail-measurementUnit, .ProductDetail-tariffHeading {
        margin: 8px 0;
    }
    .ProductDetail-measurementUnit, .ProductDetail-tariffHeading {
        font-size: 1.15em;
        font-weight: normal;
        color: var(--light-color);
        letter-spacing: 0.216px;
    }
    .ProductDetail-quantityInput {
        width: 100%;
        max-width: 180px;
        height: 100%;
        max-height: 52px;
        margin: 30px auto 8px;
    }
    .ProductDetail-minimumPurchase {
        font-weight: normal;
        color: var(--light-color);
        letter-spacing: 0.216px;
        margin-bottom: 20px;
    }
    .ProductDetail-description {
        margin: 15px auto 0 auto;
    }
    .ProductDetail-description-title, .ProductDetail-description {
        max-width: 415px;
        font-weight: normal;
        font-size: 0.8em;
        letter-spacing: 0.216px;
        color: var(--light-color);
    }
    .ProductDetail-certificates {
        margin-top: 30px;
    }

    .ProductDetail-company {
        margin: 25px 0 60px;
        padding-top: 15px;
        border-top: 1px solid var(--light-color);
    }
    .ProductDetail-company-title {
        font-size: 1em;
        color: var(--light-color);
        letter-spacing: 0.216px;
    }
    .ProductDetail-company-name {
        font-size: 1em;
        margin-top: 12px;
        font-weight: bold;
        text-transform: uppercase;
    }
    .ProductDetail-company-name a {
        text-decoration: none;
        cursor: pointer;
        letter-spacing: 0.216px;
        color: #9F9F9F;
    }
    .ProductDetail-company-name a:hover {
        color: var(--secondary-text-color);
        text-decoration: underline;
    }

    @media screen and (min-width: 1000px) {
        .ProductDetail {
            padding: 0 20px;
        }
        .ProductDetailContent {
            flex-direction: row;
            padding: 0px 5px;
        }
        .ProductDetailNavigation {
            max-width: unset;
            margin: 0;
        }
        .ProductDetail-multimedia-action {
            width: 50%;
            max-width: unset;
            margin: 0;
            margin-right: 35px;
        }
        .ProductDetail-buttons {
            width: 65%;
            min-width: 350px;
            text-align: start;
        }
        .ProductDetail-main-info {
            text-align: start;
            width: 43%;
        }
        .ProductDetail-quantityInput {
            margin: 30px 0 8px;
        }
        .ProductDetail-description {
            margin: 15px 0 0 0;
        }
    }
</style>

<svelte:head>
    <title>{name} vendido por {company.name} - Conecty</title>
</svelte:head>

<Header />

<div class="ProductDetail">

    <div class="ProductDetailNavigation">
        <div class="ProductDetailNavigation-back">
            <p on:click={()=>history.go(-1)}>
                <i class="icon-previous-nav" /><span>Volver</span>
            </p>
        </div>
        <div class="ProductDetailNavigation-title">
            <p>
                <a href={CompanyProfilePath}><span>{company.name}</span></a>
                &gt; 
                <span>{name}</span>
            </p>
        </div>
    </div>

    <div class="ProductDetailContent">
        <section class="ProductDetail-multimedia-action">
            <div class="ProductDetail-multimedia">
                <ProductImagesCarrousel 
                    images={productImages}
                />
            </div>
            {#if sessionUsername !== company.username}
            <div class="ProductDetail-buttons">
                <span>¿Estás interesado en este producto?</span>
                <div class="ProductDetail-buttons-contact">
                    <CompanyContact {contact} />
                </div>
            </div>
            {/if}
        </section>
        <section class="ProductDetail-main-info">
            <h1 class="ProductDetail-name">{name}</h1>
            {#if category}
                <h3 class="ProductDetail-category">{category}</h3>
            {/if}
            <p class="ProductDetail-price">
                {minimum_price} {maximum_price != null ? ` - ${maximum_price}` : ""} {price_currency.code}
            </p>
            {#if measurement_unit}
                <p class="ProductDetail-measurementUnit">Presentación: {measurement_unit}</p>
            {/if}
            {#if tariff_heading}
                <p class="ProductDetail-tariffHeading">Partida arancelaria: {tariff_heading}</p>
            {/if}
            
            <div class="ProductDetail-quantityInput">
                <QuantityInput bind:quantity={purchaseQuantity} />
            </div>
            <p class="ProductDetail-minimumPurchase">Compra mínima: {minimum_purchase}</p>

            {#if description}
                <span class="ProductDetail-description-title">Características destacadas:</span>
                <p class="ProductDetail-description">{description}</p>
            {/if}

            {#if certificates && certificates.length > 0}
                <div class="ProductDetail-certificates">
                    <ProductCertificatesList {certificates} />
                </div>
            {/if}

            <div class="ProductDetail-company">
                <span class="ProductDetail-company-title">Envíado y vendido por:</span>
                <h5 class="ProductDetail-company-name">
                    <a href={CompanyProfilePath}>{company.name}</a>
                </h5>
            </div>
        </section>
    </div>
</div>

<Footer />