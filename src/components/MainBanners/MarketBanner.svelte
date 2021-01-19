<script>
  import { onMount } from "svelte";
  import ConectyWhiteWordmark from "../Wordmarks/ConectyWhiteWordmark.svelte";
  import { _ } from "../../services/i18n";

  export let name = "1";
  export let imageSrc = "/images/market-main-banner.png";

  let marketBannerElementName = `MarketBanner-${name}`;
  let backgroundGradient =
    "linear-gradient(270deg, rgba(83, 123, 201, 0.7) 0%, rgba(3, 165, 235, 0.7) 97.79%)";

  onMount(async () => {
    let marketBannerElement = document.getElementById(marketBannerElementName);
    marketBannerElement.style.backgroundImage = `${backgroundGradient}, url(${imageSrc})`;
  });
</script>

<div id={marketBannerElementName} class="MarketBanner">
  <h3 class="MarketBanner-title">
    {$_("marketBanner.welcomToTheNewWayOfMeetingSuppliers")}
  </h3>
  <div class="MarketBanner-Conecty-wordmark">
    <ConectyWhiteWordmark />
  </div>
</div>

<style>
  .MarketBanner {
    width: 100%;
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10%;
    background-position: center;
    background-size: cover;
  }

  .MarketBanner-Conecty-wordmark {
    width: 160px;
    height: 33px;
    margin: 0;
  }

  .MarketBanner-title {
    width: 100%;
    max-width: 500px;
    margin: 0;
    font-size: 1.2em;
    line-height: 22px;
    letter-spacing: 0.22px;
    margin-bottom: 0.9em;
    text-align: center;
    font-weight: 100;
    color: white;
  }

  @media screen and (min-width: 360px) {
    .MarketBanner-Conecty-wordmark {
      width: 195px;
      height: 38px;
    }

    .MarketBanner-title {
      font-size: 1.45em;
      line-height: 30px;
    }
  }

  @media screen and (min-width: 525px) {
    .MarketBanner-title {
      font-size: 1.65em;
    }
  }
</style>
