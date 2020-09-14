<script>
  export let title;
  export let onAccept;
  export let onDecline;
</script>

<style>
  .ConfirmationModal {
    position: relative;
    z-index: 15;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ConfirmationModal-overlay {
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 15;
  }
</style>

<div class="ConfirmationModal">
  <div class="ConfirmationModal-overlay" on:click />
  <section>
    <div class="ConfirmationMOdalTitle">{title}</div>
    <div>
      <button
        on:click={onAccept}
        class="ProductForm-button button button--secondary">
        Aceptar
      </button>
      <button
        on:click={onDecline}
        class="ProductForm-button button button--secondary">
        Cancelar
      </button>
    </div>
  </section>
  <slot />
</div>
