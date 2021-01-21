<script>
  import { onMount, beforeUpdate, afterUpdate, onDestroy } from "svelte";
  import PuzzleOutline from "svelte-material-icons/PuzzleOutline.svelte";
  import Check from "svelte-material-icons/ShieldCheckOutline.svelte";
  import Comment from "svelte-material-icons/CommentProcessingOutline.svelte";

  export let handleCancel;
  export let handleNext;

  onMount(async () => {
    window.scrollTo(0, 0);
  });
  afterUpdate(async () => {
    document.getElementsByTagName("body")[0].classList.add("noScroll");
  });
  onDestroy(async () => {
    document.getElementsByTagName("body")[0].classList.remove("noScroll");
  });
</script>

<button class="button button--secondary" on:click={handleCancel}
  >Finalizar Tour</button
>
<img
  src="/images/chevron-right.svg"
  alt="Siguiente"
  class="ChevronNext"
  on:click={handleNext}
/>

<div class="container">
  <div class="instructions-container">
    <div class="AddLogoInstruciton">
      <img src="/images/OB2_V3.svg" alt="arrow" class="Arrow First-Arrow" />
      <div>
        <span class="Icon Puzzle">
          <PuzzleOutline size={60} color="white" />
        </span>
        <span class="Text Puzzle-Text">
          Agrega el logo de tu empresa
          <br />
          <span class="Text--description">
            Haz clic en el ícono de edición y adjunta tu logo en formato png o
            jpg.</span
          >
        </span>
      </div>
    </div>
    <div class="VerifyInstructions">
      <img src="/images/OB2_V2.svg" alt="arrow" class="Arrow Second-Arrow" />
      <span class="Icon Check">
        <Check size={60} color="white" />
      </span>
      <span class="Text Check-Text">
        Verifica tu empresa
        <br />
        <span class="Text--description">
          Adjunta tu certificado de Cámara y comercio, de esa forma podrás
          publicar tu perfíl.
        </span>
      </span>
    </div>
    <div class="AddWhatsapp">
      <img src="/images/OB2_V1.svg" alt="arrow" class="Arrow Third-Arrow" />
      <span class="Icon Whatsapp">
        <Comment size={60} color="white" />
      </span>
      <span class="Text Whatsapp-Text">
        Añade tu whatsapp
        <br />
        <span class="Text--description">
          Agrega tu teléfono de whatsapp, para que tus compradores se comuniquen
          contigo de forma fácil y rápida.
        </span>
      </span>
    </div>
  </div>
</div>

<style>
  @import "/styles/form.css";
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
  }
  .ChevronNext {
    cursor: pointer;
    z-index: 100;
    position: absolute;
    right: 10%;
    top: 35%;
  }

  .instructions-container {
    width: calc(100% - 290px);
    background-color: transparent;
    position: relative;
  }
  .container {
    max-width: 1400px;
    width: 100%;
    padding: 0 25px;
    z-index: 20;
    position: relative;
    align-self: flex-start;
    margin-top: 100px;
    display: flex;
    justify-content: flex-end;
  }
  .VerifyInstructions {
    margin-left: 10px;
  }
  .Arrow {
    width: fit-content;
    position: absolute;
  }
  .First-Arrow {
    top: -60px;
    left: -55px;
  }
  .Second-Arrow {
    top: 145px;
  }
  .Third-Arrow {
    top: 425px;
    left: 10px;
  }
  .Icon {
    width: fit-content;
    position: absolute;
  }

  .Puzzle {
    transform: rotate(-45deg);
    top: -80px;
    left: 155px;
  }
  .Check {
    top: 110px;
    left: 290px;
  }
  .Whatsapp {
    top: 350px;
    left: 190px;
  }
  .Text {
    min-width: 270px;
    max-width: 330px;
    color: white;
    font-size: 18px;
    font-weight: bold;
    position: absolute;
  }
  .Puzzle-Text {
    top: -5px;
    left: 155px;
  }

  .Check-Text {
    top: 160px;
    left: 340px;
  }
  .Whatsapp-Text {
    top: 415px;
    left: 195px;
  }

  .Text--description {
    text-align: left;
    font-size: 14px;
    font-weight: normal;
    margin-top: 10px;
    display: inline-block;
  }
</style>
