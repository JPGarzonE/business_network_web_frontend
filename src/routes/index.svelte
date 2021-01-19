<script context="module">
  import { _ } from "../services/i18n";

  export async function preload(page, session) {
    if (session.authenticated) {
      return this.redirect(301, "/market");
    }
  }
</script>

<script>
  import Header from "../components/Header.svelte";
  import Home from "../containers/Home/Home.svelte";
  import Footer from "../components/Footer.svelte";

  let homeAuthenticationOpen = false;
  let authenticationContainerState = "signup";

  const content = {
    title: $_("index.connectWithInternationalBuyersAndSuppliersAroundTheWorld"),
    subtitle: $_(
      "index.bePartOfTheInternationalTradeNetworkThatIsConnectingTheMostCompetitive"
    ),
    features: [
      {
        title: $_("index.searchYourProductsTheEasyWay"),
        description: $_(
          "index.findInAnOrganizedWayTheRelevantInformationAboutTheProductsYou"
        ),
        advice: $_(
          "index.allOfOurSuppliersHaveBeenVerifiedAgainstDifferentInternational"
        ),
      },
      {
        title: $_("index.digitalExposureWithInternationalBuyers"),
        description: $_(
          "index.createYourProfileInConectyWhereYouCanEasilyHaveADigitalExposure"
        ),
        advice: $_(
          "index.allOfOurSuppliersHaveBeenVerifiedAgainstDifferentInternational"
        ),
      },
      {
        title: $_("index.secureYourPaymentsWithUs"),
        description: $_(
          "index.avoidFraudulentProcessesThroughOurModelThatAllowsUsToSecureYourPayment"
        ),
        advice: $_(
          "index.learnMoreAboutThisModelByContactingOurSalesConsultants"
        ),
      },
    ],
  };
</script>

<svelte:head>
  <!-- Hotjar Tracking Code for joinconecty.com --><script>
    (function (h, o, t, j, a, r) {
      h.hj =
        h.hj ||
        function () {
          (h.hj.q = h.hj.q || []).push(arguments);
        };
      h._hjSettings = { hjid: 2111995, hjsv: 6 };
      a = o.getElementsByTagName("head")[0];
      r = o.createElement("script");
      r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
  </script><title>Conecty</title>
</svelte:head>

<div class="Header">
  <Header
    signupActionButton={() => {
      homeAuthenticationOpen = true;
      authenticationContainerState = "signup";
    }}
    loginActionButton={() => {
      homeAuthenticationOpen = true;
      authenticationContainerState = "login";
    }}
  />
</div>

<div class="index">
  <Home
    bind:homeAuthenticationOpen
    bind:authenticationContainerState
    {content}
  />
</div>

<Footer />

<style>
  .Header {
    position: fixed;
    width: 100%;
    z-index: 10;
  }
</style>
