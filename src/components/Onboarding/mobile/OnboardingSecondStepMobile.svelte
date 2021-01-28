<script>
  import ProfileLogo from "../../../components/ProfileLogo/ProfileLogo.svelte";
  import ProfileVerification from "../../../components/ProfileVerification/ProfileVerification.svelte";
  import { onMount, afterUpdate, onDestroy } from "svelte";
  export let handleCancel;
  export let handleNext;
  let width;
  afterUpdate(async () => {
    document.getElementsByTagName("body")[0].classList.add("noScroll");
  });
  onDestroy(() => {
    document.getElementsByTagName("body")[0].classList.remove("noScroll");
  });

  onMount(async () => {
    const module = await import("@composi/gestures");
    module.gestures();
    window.scrollTo(0, 0);
  });
</script>

<svelte:window bind:innerWidth={width} />

<button class="button button--secondary" on:click={handleCancel}
  >Finalizar Tour</button
>
<div class="Container" on:swipeleft={handleNext}>
  <div class="ProfileIdentity">
    <div class="ProfileIdentity-content">
      <ProfileLogo logo={undefined} blank />
      <ProfileVerification />
    </div>
  </div>
  <div class="Text-Container">
    <span class="Text">
      Agrega el logo de tu empresa
      <br />
      <span class="Text--description">
        Haz clic en el ícono de edición y adjunta tu logo en formato png o jpg.</span
      >
    </span>
    <span class="Text">
      Verifica tu empresa
      <br />
      <span class="Text--description">
        Adjunta tu certificado de Cámara y comercio, de esa forma podrás
        publicar tu perfíl.
      </span>
    </span>
  </div>
</div>

<style>
  @import "/styles/form.css";
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
  .Container {
    z-index: 25;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .ProfileIdentity-content {
    width: 100%;
    min-width: 210px;
    max-width: 300px;
    margin: auto;
    margin-top: 91px;
  }
  .Text-Container {
    max-width: 300px;
    margin-inline: auto;
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
  @media screen and (max-height: 750px) {
    .Text-Container {
      margin-top: 0;
    }
  }
</style>
