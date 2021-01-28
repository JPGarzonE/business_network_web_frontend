<script>
  import EditButton from "../../EditButton/EditButton.svelte";
  import { onMount, afterUpdate, onDestroy } from "svelte";
  import ButtonChat from "../../ButtonChat/ButtonChat.svelte";
  import Map from "svelte-material-icons/Map.svelte";
  import Earth from "svelte-material-icons/Earth.svelte";
  import Whatsapp from "svelte-material-icons/Whatsapp.svelte";
  import MapMarkerOutline from "svelte-material-icons/MapMarkerOutline.svelte";
  export let handleCancel;
  export let handleNext;
  export let handlePrev;

  afterUpdate(async () => {
    document.getElementsByTagName("body")[0].classList.add("noScroll");
  });
  onDestroy(() => {
    document.getElementsByTagName("body")[0].classList.remove("noScroll");
  });

  onMount(async () => {
    const module = await import("@composi/gestures");
    module.gestures();
    window.scrollTo(0, 50);
  });
</script>

<button class="button button--secondary" on:click={handleCancel}
  >Finalizar Tour</button
>
<div
  class="Container Container--2"
  on:swipeleft={handleNext}
  on:swiperight={handlePrev}
>
  <div class="Text-Container Text-Container--2">
    <span class="Text">
      Agrega los datos de tu empresa
      <br />
      <span class="Text--description">
        Ingresa el nombre de tu empresa, sector económico, dirección, ciudad de
        ubicación y países donde exportas tus productos.
      </span>
      <span class="Text">
        Añade tu whatsapp
        <br />
        <span class="Text--description">
          Agrega tu teléfono de whatsapp, para que tus compradores se comuniquen
          contigo de forma fácil y rápida..
        </span>
      </span>
    </span>
  </div>
  <div class="Company-Contact">
    <p class="ProfileIdentity-name">
      Nombre de la empresa
      <EditButton
        disabled
        size={20}
        color="var(--light-color)"
        anchorButton=""
      />
    </p>
    <p class="ProfileIdentity-sector">Nombre del sector</p>
    <p class="ProfileIdentity-data">
      <i class="icon-wrapper"><MapMarkerOutline /></i>
      <span class="ProfileIdentity-address">Calle 150 #15 - 26</span>
    </p>
    <p class="ProfileIdentity-data">
      <i class="icon-wrapper"><Map /></i>
      <span>Meddelín</span>
    </p>
    <p class="ProfileIdentity-data">
      <i class="icon-wrapper"><Earth /></i>
      <span>Colombia, Chile, Perú</span>
    </p>
    <!-- Esto debe ser cambiado por el componente de agregar un numero nuevo-->
    <div class="ProfileIdentity-contact-me">
      <ButtonChat
        title="Registrate para contactar"
        buttonAction={async () => {}}
      >
        <span slot="button-icon" style="display: flex;">
          <Whatsapp size={18} />
        </span>
      </ButtonChat>
    </div>
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

  .Text-Container {
    max-width: 300px;
    margin-inline: auto;
  }
  .Text-Container--2 {
    margin-top: 90px;
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

  .ProfileIdentity-name {
    display: flex;
    align-items: center;
    text-align: center;
    font-size: 1.2em;
    font-weight: 100;
    color: var(--secondary-text-color);
  }
  .ProfileIdentity-sector {
    margin: 25px 0;
    color: var(--secondary-text-color);
  }

  .ProfileIdentity-data {
    width: 75%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-self: flex-start;
    margin-bottom: 0.9rem;
    font-size: 0.9rem;
    color: #b3b3b3;
    margin-left: 10%;
  }
  .icon-wrapper {
    display: flex;
    border: 1px solid var(--principal-color);
    border-radius: 100%;
    color: var(--principal-color);
    margin-right: 5%;
    padding: 2px;
  }

  .ProfileIdentity-contact-me {
    width: 90%;
    margin: 0 auto;
    margin-top: 15%;
  }
  .Company-Contact {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-inline: auto;
    background-color: white;
    padding: 25px;
    border: 1px solid white;
    border-radius: 4px;
    margin-top: 20px;
  }
  @media screen and (max-height: 750px) {
    .Text-Container {
      margin-top: 30px;
    }
  }
</style>
