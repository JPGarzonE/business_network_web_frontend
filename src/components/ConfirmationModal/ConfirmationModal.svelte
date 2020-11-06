<script>
  export let title;
  export let onAccept;
  export let onDecline;
</script>

<style>
  .ConfirmationModal {
    position: relative;
    z-index: 25;
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

  .ConfirmationModal-title {
    text-align: center;
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
  .ConfirmationModal-actions {
    padding-top: 20px;
    display: flex;
    flex-direction: row;
  }
  .ConfirmationModal-button {
    margin: 0 15px;
  }
</style>

<div class="ConfirmationModal">
  <div class="ConfirmationModal-overlay" on:click />
  <section class="ConfimationForm">
    <h4 class="ConfirmationModal-title">{title}</h4>
    <div class="ConfirmationModal-actions">
      <button
        on:click={onDecline}
        class="ConfirmationModal-button button button--primary">
        Cancelar
      </button>
      <button
        on:click={onAccept}
        class="ConfirmationModal-button button button--secondary">
        Aceptar
      </button>
    </div>
  </section>
  <slot />
</div>
