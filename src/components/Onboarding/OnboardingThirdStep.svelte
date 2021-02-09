<script>
  import { afterUpdate, onDestroy, onMount } from "svelte";
  import Pencil from "svelte-material-icons/PencilOutline.svelte";
  import AddCert from "svelte-material-icons/ImagePlus.svelte";
  import { _ } from "svelte-i18n";

  export let handleCancel;
  export let handleNext;
  export let handlePrev;

  afterUpdate(async () => {
    document.getElementsByTagName("body")[0].classList.add("noScroll");
  });
  onDestroy(() => {
    document.getElementsByTagName("body")[0].classList.remove("noScroll");
  });

  onMount(() => {
    window.scrollTo(0, 0);
  });
</script>

<button class="button button--secondary" on:click={handleCancel}
  >{$_("onBoardingThirdStep.endTour")}</button
>
<img
  src="/images/chevron-right.svg"
  alt="Siguiente"
  class="Chev ChevronNext"
  on:click={handleNext}
/>
<img
  src="/images/chevron-right.svg"
  alt="Anterior"
  class="Chev ChevronPrev "
  on:click={handlePrev}
/>

<div class="Main-Container">
  <div class="instructions-container">
    <div class="Edit-Delete">
      <img src="/images/OB3_V1.svg" alt="arrow" class="Arrow First-Arrow" />
      <span class="Icon Pencil">
        <Pencil size={60} color="white" />
      </span>
      <span class="Text Pencil-Text">
        {$_("onBoardingThirdStep.editAndDelete")}
        <br />
        <span class="Text--description">
          {$_("onBoardingThirdStep.clickToModifyOrDeletePreviousData")}<span />
        </span></span
      >
    </div>
    <div class="Add-Cert">
      <span class="Icon AddCert">
        <AddCert size={60} color="white" />
      </span>
      <div class="Text-Arrow-container">
        <span class="Text AddCert-Text">
          {$_("onBoardingThirdStep.addYour")}<br />
          {$_("onBoardingThirdStep.certifications")}
          <br />
        </span>
        <img
          src="/images/OB3_V2.svg"
          alt="arrow"
          class="Arrow Second-Arrow"
          id="arrow3Desktop"
        />
      </div>

      <span class="Text--description">
        {$_("onBoardingThirdStep.addCertification")}</span
      >
    </div>
  </div>
</div>

<style>
  @import "/styles/button.css";
  .button--secondary {
    position: absolute;
    top: 10%;
    right: 5%;
    z-index: 30;
    width: 138px;
    height: 38px;
    border-color: white;
    color: white;
    font-size: 14px;
    font-weight: 900;
    text-transform: none;
  }
  .Chev {
    cursor: pointer;
    z-index: 25;
    position: absolute;
    top: 35%;
  }
  .ChevronNext {
    right: 10%;
  }
  .ChevronPrev {
    left: 10%;
    transform: rotate(180deg);
  }

  .instructions-container {
    width: 60%;
    display: flex;
    justify-content: flex-end;
    height: 100%;
  }
  .Main-Container {
    align-self: flex-start;
    max-width: 1400px;
    padding: 25px;
    z-index: 20;
    display: flex;
    margin: 70px auto 0 auto;
    position: relative;
    justify-content: flex-end;
  }
  .Arrow {
    width: fit-content;
  }
  .First-Arrow {
    top: -15px;
    position: absolute;
    left: -50px;
  }
  .Second-Arrow {
    margin-right: 10px;
  }
  .Text {
    color: white;
    font-size: 24px;
    font-weight: bold;
  }
  .Text--description {
    text-align: left;
    font-size: 14px;
    font-weight: normal;
    margin-top: 10px;
    display: inline-block;
    color: white;
    width: 70%;
  }

  .Edit-Delete {
    display: flex;
    flex-direction: column;
    margin-left: 70px;
    position: relative;
    margin-top: 8%;
  }
  .Icon {
    margin-bottom: 10px;
  }
  .Pencil {
    margin-top: 130px;
  }
  .Add-Cert {
    display: flex;
    flex-direction: column;
    margin-right: 90px;
  }
  .Text-Arrow-container {
    display: flex;
    justify-content: space-between;
  }
</style>
