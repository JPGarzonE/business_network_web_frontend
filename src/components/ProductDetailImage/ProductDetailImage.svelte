<script>
    export let imageSrc = "/images/profile_icon.svg";
</script>

<style>
    .ProductDetailImage {
        width: 100%;
        height: 100%;
        padding: 12px;
        border: 1px solid var(--principal-color);
        border-radius: 4px;
    }

    .ProductDetailImage figure, .ProductDetailImage figure img {
        max-width: 100%;
        max-height: 100%;
    }
    .ProductDetailImage figure {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<div class="ProductDetailImage">
    <figure>
        <img src={imageSrc} alt="Imagen detalle de producto" />
    </figure>
</div>