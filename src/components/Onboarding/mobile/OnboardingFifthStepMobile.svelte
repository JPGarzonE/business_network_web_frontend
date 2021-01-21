<script>
  import { onMount } from "svelte";
  import EditButton from "../../../components/EditButton/EditButton.svelte";

  export let handleCancel;
  export let handlePrev;

  onMount(async () => {
    scrollToTargetAdjusted();
    const module = await import("@composi/gestures");
    module.gestures();
  });

  function scrollToTargetAdjusted() {
    const btn = document.getElementById("RelationshipCreate");
    const arrow = document.getElementById("arrow5");
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
  >Finalizar Tour</button
>

<div class="Main-Container" on:swiperight={handlePrev}>
  <div class="Text-Container">
    <span class="Text">
      Edita y elimina
      <br />
      <span class="Text--description">
        Haz clic en el botón de edición para modificar o eliminar los datos que
        subiste previamente.
      </span>
      <span class="Text">
        Agrega tus clientes
        <br />
        <span class="Text--description">
          Adjunta la foto de tus productos con su descripción y precio.
        </span>
      </span>
    </span>
  </div>
  <img src="/images/OB_Mobile.svg" alt="Arrow" class="Arrow" id="arrow5" />
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
    background-color: white;
    border-color: #537bc9;
    color: #537bc9;
    font-size: 14px;
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
    margin-top: 120px;
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
      margin-top: 0;
    }
  }
</style>
