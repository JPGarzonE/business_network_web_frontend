<script>
  import { onMount, afterUpdate, onDestroy } from "svelte";
  import Pencil from "svelte-material-icons/PencilOutline.svelte";
  import AddCert from "svelte-material-icons/ImagePlus.svelte";

  export let handleCancel;
  export let handlePrev;

  afterUpdate(async () => {
    document.getElementsByTagName("body")[0].classList.add("noScroll");
  });
  onDestroy(async () => {
    document.getElementsByTagName("body")[0].classList.remove("noScroll");
  });
  onMount(async () => {
    scrollToTargetAdjusted();
  });

  function scrollToTargetAdjusted() {
    const btn = document.getElementById("RelationshipCreate");
    const arrow = document.getElementById("arrowDesktopRelationShip");
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

<img
  src="/images/chevron-right.svg"
  alt="Anterior"
  class="Chev ChevronPrev "
  on:click={handlePrev}
/>

<div class="Main-Container">
  <div class="instructions-container">
    <div class="Edit-Delete">
      <img src="/images/OB4-5_V1.svg" alt="arrow" class="Arrow First-Arrow" />
      <span class="Icon Pencil">
        <Pencil size={60} color="white" />
      </span>
      <span class="Text Pencil-Text">
        Edita y elimina
        <br />
        <span class="Text--description">
          Haz clic en el botón de edición para modificar o eliminar los datos
          que subiste previamente.<span />
        </span></span
      >
    </div>
    <div class="Add-Cert">
      <span class="Icon AddCert">
        <AddCert size={60} color="white" />
      </span>
      <div class="Text-Arrow-container">
        <span class="Text AddCert-Text">
          Agrega tus<br />
          clientes
          <br />
        </span>
        <img
          src="/images/OB3_V2.svg"
          alt="arrow"
          class="Arrow Second-Arrow"
          id="arrowDesktopRelationShip"
        />
      </div>

      <span class="Text--description">
        Adjunta la foto de tus productos con su descripción y precio.</span
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
    z-index: 20;
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
  .ChevronPrev {
    left: 10%;
    transform: rotate(180deg);
  }

  .instructions-container {
    width: 67%;
    display: flex;
    justify-content: flex-end;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .Main-Container {
    max-width: 1400px;
    padding: 25px;
    z-index: 20;
    display: flex;
    position: relative;
    justify-content: flex-end;
    height: 100%;
    margin-left: 140px;
  }
  .Arrow {
    width: fit-content;
  }

  .First-Arrow {
    position: absolute;
    left: -15px;
    bottom: 470px;
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
    margin-left: 10px;
    position: relative;
    height: 100%;
    justify-content: center;
    margin-top: 365px;
  }
  .Icon {
    margin-bottom: 10px;
  }
  .Pencil {
    margin-top: 70px;
  }
  .Add-Cert {
    display: flex;
    flex-direction: column;
    margin-right: 50px;
  }
  .Text-Arrow-container {
    display: flex;
    justify-content: space-between;
  }
</style>
