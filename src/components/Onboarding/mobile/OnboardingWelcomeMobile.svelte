<script>
  import { onMount } from "svelte";
  export let handleCancel;
  export let handleNext;

  onMount(async () => {
    const module = await import("@composi/gestures");
    window.scrollTo(0, 0);
    module.gestures();
  });
</script>

<div class="ModalOnboarding" on:swipeleft={handleNext} on:swipeup={handleNext}>
  <button
    class="ProductForm-close-button ProfileForm-close-button"
    on:click={handleCancel}>
    <span>X</span>
  </button>
  <span class="ModalTitle">¡Bienvenido a Contecty!</span>
  <span class="ModalMessage"
    >¿Quieres hacer un tour por nuestra plataforma?</span
  >
  <div class="ModalButtons">
    <button class="button button--secondary" on:click={handleCancel}
      >En otra ocasión</button
    >
    <button class="button button--principal" on:click={handleNext}
      >Continuar</button
    >
  </div>
</div>

<style>
  @import "/styles/form.css";
  @import "/styles/button.css";

  .ModalOnboarding {
    align-self: flex-start;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 20;
    width: 100%;
    height: 100%;
    max-width: 525px;
    padding: 50px 30px;
    background-color: white;
    max-height: 337px;
    margin: 80px 15px;
  }
  .ModalTitle {
    font-size: 24px;
    font-weight: bold;
    color: #2885cb;
    margin-bottom: 30px;
  }
  .ModalMessage {
    text-align: center;
    color: gray;
    font-weight: normal;
    margin-bottom: 30px;
  }
  .ModalButtons {
    margin-top: 50px;
    display: inline-flex;
    width: 100%;
  }
  .button {
    height: 50px;
    margin: 0;
    text-transform: none;
    font-weight: bold;
    font-size: 15px;
  }
  .button--secondary {
    margin-right: 4px;
  }
</style>
