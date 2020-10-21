<script>
    import ElementDetailOverlay from "../ElementDetailOverlay/ElementDetailOverlay.svelte";

    export let principalImage;
    export let name;
    export let subname;
    export let minimum_price;
    export let maximum_price;
    export let currency;
    export let buttonDetailAction;
</script>

<style>
    .ProductCard {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .ProductCard-detail-overlay {
      width: 100%;
      height: 100%;
      display: none;
      position: absolute;
      top: 0;
    }

    .ProductCard:hover > .ProductCard-detail-overlay {
      display: flex;
    }

    .ProductCard-media-container {
      position: relative;
      width: 100%;
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
    }
  
    .ProductCard-media-image {
      width: 100%;
      max-height: 100%;
      display: flex;
      object-fit: contain;
      border-radius: 10px;
    }
  
    .ProductCard-media-image--default {
      padding: 25px;
    }
  
    .ProductCard-name {
      width: 100%;
      margin: 15px 0px 10px 0px;
      font-size: 1em;
      padding: 0 5%;
      text-align: center;
      font-weight: bold;
      color: var(--principal-color);
      word-break: break-word;
    }
  
    .ProductCard-price {
      color: var(--secondary-text-color);
      font-weight: bold;
      font-size: 1em;
    }
  
    .ProductCard-subname {
      margin-bottom: 10px;
      padding: 0px 15px;
      color: var(--light-color);
      font-size: 1em;
    }
</style>

<div class="ProductCard">
    <div class="ProductCard-detail-overlay">
        <ElementDetailOverlay {buttonDetailAction} />
    </div>

    <figure
        class="ProductCard-media-container {principalImage && principalImage.path ? '' : 'ProductCard-media-container--empty'}">
    {#if principalImage && principalImage.path}
        <img src={principalImage.path} alt={name}
            class="ProductCard-media-image" />
    {:else}
        <img src="/images/profile_icon.svg" alt={name}
            class="ProductCard-media-image--default" />
    {/if}
    </figure>

    <h4 class="ProductCard-name">{name}</h4>

    {#if subname}
    <p class="ProductCard-subname">{subname}</p>
    {/if}

    {#if minimum_price != null}
    <p class="ProductCard-price">
        {minimum_price} 
        {maximum_price != null ? ` - ${maximum_price}` : ""}
        {currency.code}
    </p>
    {/if}
</div>