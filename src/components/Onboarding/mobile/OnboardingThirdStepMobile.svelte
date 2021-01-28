<script>
  import { onMount, afterUpdate, onDestroy } from "svelte";
  import { _ } from "svelte-i18n";

  export let handleCancel;
  export let handleNext;
  export let handlePrev;

  afterUpdate(async () => {
    document.getElementsByTagName("body")[0].classList.add("noScroll");
  });
  onDestroy(async () => {
    document.getElementsByTagName("body")[0].classList.remove("noScroll");
  });

  onMount(async () => {
    scrollToTargetAdjusted();
    const module = await import("@composi/gestures");
    module.gestures();
  });

  function scrollToTargetAdjusted() {
    const btn = document.getElementById("CertificationsCreate");
    const arrow = document.getElementById("arrow3");
    const btnPosition = btn.getBoundingClientRect();
    const offset = arrow.getBoundingClientRect();
    const offsetPosition = btnPosition.top - offset.top;

    window.scrollBy({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
</script>

<button class="button button--secondary" on:click={handleCancel}
  >{$_("onBoardingThirdStep.endTour")}</button
>
<div
  class="Main-Container"
  on:swiperight={handlePrev}
  on:swipeleft={handleNext}
>
  <div class="Text-Container">
    <span class="Text">
      {$_("onBoardingThirdStep.editAndDelete")}
      <br />
      <span class="Text--description">
        {$_("onBoardingThirdStep.clickToModifyOrDeletePreviousData")}
      </span>
      <span class="Text">
        {$_("onBoardingThirdStep.addYour")}
        {$_("onBoardingThirdStep.certifications")}
        <br />
        <span class="Text--description">
          {$_("onBoardingThirdStep.addCertification")}
        </span>
      </span>
    </span>
  </div>
  <img src="/images/OB_Mobile.svg" alt="Arrow" class="Arrow" id="arrow3" />
</div>

<style>
  @import "/styles/button.css";
  .button--secondary {
    position: absolute;
    top: 15px;
    right: 5%;
    z-index: 40;
    width: 138px;
    height: 38px;
    border-color: white;
    color: white;
    font-size: 14px;
    font-weight: 900;
    text-transform: none;
  }
  .Main-Container {
    height: 100%;
    align-self: flex-start;
    padding: 25px;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 20;
  }

  .Text-Container {
    max-width: 300px;
    margin-inline: auto;
    margin-top: 105px;
  }
  .Text {
    color: white;
    font-size: 18px;
    font-weight: bold;
    margin-top: 25px;
    display: inline-block;
  }
  .Text--description {
    text-align: left;
    font-size: 14px;
    font-weight: normal;
    margin-top: 10px;
    display: inline-block;
  }
  .Arrow {
    width: max-content;
    margin: 25px 55px 0 0;
    align-self: flex-end;
  }
  @media screen and (max-height: 750px) {
    .Text-Container {
      margin: 0;
    }
  }
</style>
