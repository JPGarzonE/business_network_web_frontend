<script>
    import ProductDetailImage from '../ProductDetailImage/ProductDetailImage.svelte';

    const DefaultImages = [
        {path: "/images/profile_icon.svg"}
    ];
    export let images = DefaultImages;
    images = images.length == 0 ? DefaultImages : images;

    let actualImage = images[0];

    function refreshImage( idx ) {
        if( idx < images.length )
            actualImage = images[idx];
    }
</script>

<style>
    .ProductImagesCarrousel {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
    }
    .ProductImagesCarrousel-sidebar {
        width: 100%;
        max-width: 390px;
        max-height: 390px;
        display: flex;
        flex-direction: column;
        margin-top: 15px;
    }
    .ProductImagesCarrousel-sidebar ul {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        margin: 0;
        padding: 0;
        list-style: none;
        overflow-x: auto;
        overflow-y: hidden;
    }
    /* Hide scrollbar for Chrome, Safari and Opera */
    .ProductImagesCarrousel-sidebar ul::-webkit-scrollbar {
        display: none;
    }
    /* Hide scrollbar for IE, Edge and Firefox */
    .ProductImagesCarrousel-sidebar ul {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
    .ProductImagesCarrousel-sidebar li {
        width: 108px;
        min-width: 108px;
        height: 108px;
        margin-top: 15px;
        padding: 7px;
        border: 1px solid var(--principal-color);
        border-radius: 4px;
        cursor: pointer;
    }
    .ProductImagesCarrousel-sidebar ul li + li {
        margin-left: 30px;
    }
    .ProductImagesCarrousel-sidebar li:hover {
        border: 2px solid var(--principal-color);
    }
    .ProductImageCarrousel-subimage {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
    .ProductImageCarrousel-subimage, .ProductImageCarrousel-subimage img {
        max-width: 100%;
        max-height: 100%;
    }
    .ProductImagesCarrousel-main {
        width: 100%;
        max-width: 390px;
        max-height: 390px;
    }

    @media screen and (min-width: 1000px) {
        .ProductImagesCarrousel {
            flex-direction: row;
            align-items: normal;
            justify-content: space-between;
        }
        .ProductImagesCarrousel-main {
            width: 65%;
            min-width: 350px;
            min-height: 350px;
        }
        .ProductImagesCarrousel-sidebar {
            width: 20%;
            min-width: unset;
            margin-top: 0;
        }
        .ProductImagesCarrousel-sidebar ul {
            flex-direction: column;
            overflow-y: auto;
        }
        .ProductImagesCarrousel-sidebar li {
            width: 100%;
            min-width: unset;
            min-height: 108px;
            margin-top: 0;
        }
        .ProductImagesCarrousel-sidebar ul li + li {
            margin-left: 0px;
            margin-top: 20px;
        }
    }
</style>

<div class="ProductImagesCarrousel">
    <div class="ProductImagesCarrousel-sidebar">
        <ul>
            {#each images as image, idx}
            <li on:mouseover={() => refreshImage(idx)}>
                <figure class="ProductImageCarrousel-subimage">
                    <img src={image.path} alt={`Subimagen ${idx}`} />
                </figure>
            </li>
            {/each}
        </ul>
    </div>
    <div class="ProductImagesCarrousel-main">
        <ProductDetailImage
            imageSrc={actualImage ? actualImage.path : ''} />
    </div>
</div>