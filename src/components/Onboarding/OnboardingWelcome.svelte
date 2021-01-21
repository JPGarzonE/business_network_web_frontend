<script>
  import { onMount } from "svelte";
  export let handleCancel;
  export let handleNext;
  onMount(() => {
    window.scrollTo(0, 0);
  });
</script>

<div class="ModalOnboarding">
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
    font-weight: 100;
    margin-inline: 60px;
  }
  .ModalButtons {
    margin-top: 30px;
    display: inline-flex;
    width: 100%;
  }
  .button {
    height: 50px;
    font-weight: bold;
    margin: 0 50px;
    text-transform: none;
  }
  .button--secondary {
    margin-right: 7px;
  }
  .button--principal {
    margin-left: 7px;
  }
</style>
