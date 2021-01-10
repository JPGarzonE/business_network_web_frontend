<script>
  import ProfileLogo from "../../components/ProfileLogo/ProfileLogo.svelte";
  import ButtonChat from "../ButtonChat/ButtonChat.svelte";
  import ProfileVerification from "../../components/ProfileVerification/ProfileVerification.svelte";
  import Map from "svelte-material-icons/Map.svelte";
  import Earth from "svelte-material-icons/Earth.svelte";
  import Whatsapp from "svelte-material-icons/Whatsapp.svelte";
  import EditButton from "../EditButton/EditButton.svelte";
  import MapMarkerOutline from "svelte-material-icons/MapMarkerOutline.svelte";
  import PuzzleOutline from "svelte-material-icons/PuzzleOutline.svelte";
  import Check from "svelte-material-icons/ShieldCheckOutline.svelte";
  import Comment from "svelte-material-icons/CommentProcessingOutline.svelte";

  export let handleCancel;
  export let handleNext;
</script>

<style>
  @import "/styles/form.css";
  @import "/styles/button.css";

  .ProfileIdentity {
    z-index: 20;
    width: 260px;
    min-height: 430px;
    margin-bottom: 100px;
  }
  .ProfileIdentity-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px;
    border-radius: 7px;
    background-color: white;
  }
  .ProfileIdentity-NameContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .ProfileIdentity-content {
    width: 100%;
    min-width: 210px;
    position: relative;
    margin-top: -75px;
    padding-bottom: 20px;
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
  }
  .ChevronNext {
    cursor: pointer;
    z-index: 100;
    position: absolute;
    right: 10%;
    top: 35%;
  }
  .ProfileIdentity-text {
    font-size: 11px;
    color: #ff6600;
    font-weight: normal;
    text-align: left;
    padding: 0 30px;
  }
  .ProfileIdentity-text--clic {
    text-decoration: underline;
  }
  .instructions-container {
    width: calc(100% - 260px);
    background-color: transparent;
  }
  .container {
    max-width: 1400px;
    width: 100%;
    padding: 25px;
    z-index: 20;
    display: flex;
    margin: 0 auto;
    position: relative;
  }
  .VerifyInstructions {
    margin-left: 10px;
  }
  .Arrow {
    width: fit-content;
    position: absolute;
  }
  .First-Arrow {
    top: -105px;
    left: 235px;
  }
  .Second-Arrow {
    top: 90px;
  }
  .Third-Arrow {
    top: 335px;
    left: 300px;
  }

  .Icon {
    width: fit-content;
    position: absolute;
  }

  .Puzzle {
    transform: rotate(-45deg);
    top: -130px;
    left: 450px;
  }
  .Check {
    top: 45px;
    left: 555px;
  }
  .Whatsapp {
    top: 270px;
    left: 470px;
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
    top: -60px;
    left: 450px;
  }

  .Check-Text {
    top: 125px;
    left: 610px;
  }
  .Whatsapp-Text {
    top: 340px;
    left: 480px;
  }

  .Text--description {
    text-align: left;
    font-size: 14px;
    font-weight: normal;
    margin-top: 10px;
    display: inline-block;
  }
</style>

<button class="button button--secondary" on:click={handleCancel}>Finalizar Tour</button>
<img
  src="/images/chevron-right.svg"
  alt="Siguiente"
  class="ChevronNext"
  on:click={handleNext} />

<div class="container">
  <div class="ProfileIdentity">
    <div class="ProfileIdentity-container">
      <div class="ProfileIdentity-content">
        <ProfileLogo logo={undefined} blank />
        <ProfileVerification />
        <div class="ProfileIdentity-NameContainer">
          <p class="ProfileIdentity-text">
            Haz
            <span class="ProfileIdentity-text--clic">clic aquí</span>
            para subir el certificado de cámara y comercio, de lo contrario no
            podrás publicar tu perfíl.
          </p>
          <p class="ProfileIdentity-name">
            Nombre de la empresa
            <EditButton
              disabled
              size={20}
              color="var(--light-color)"
              anchorButton="" />
          </p>
          <p class="ProfileIdentity-sector">Nombre del sector</p>
        </div>
        <p class="ProfileIdentity-data">
          <i class="icon-wrapper"><MapMarkerOutline /></i>
          <span class="ProfileIdentity-address">-</span>
        </p>
        <p class="ProfileIdentity-data">
          <i class="icon-wrapper"><Map /></i>
          <span>-</span>
        </p>
        <p class="ProfileIdentity-data">
          <i class="icon-wrapper"><Earth /></i>
          <span>-</span>
        </p>
        <!-- Esto debe ser cambiado por el componente de agregar un numero nuevo-->
        <div class="ProfileIdentity-contact-me">
          <ButtonChat
            title="Registrate para contactar"
            buttonAction={async () => {}}>
            <span slot="button-icon" style="display: flex;">
              <Whatsapp size={18} />
            </span>
          </ButtonChat>
        </div>
      </div>
    </div>
  </div>
  <div class="instructions-container">
    <div class="AddLogoInstruciton">
      <img src="/images/OB2_V3.svg" alt="arrow" class="Arrow First-Arrow" />
      <span class="Icon Puzzle">
        <PuzzleOutline size={60} color="white" />
      </span>
      <span class="Text Puzzle-Text">
        Agrega el logo de tu empresa
        <br />
        <span class="Text--description">
          Haz clic en el ícono de edición y adjunta tu logo en formato png o
          jpg.</span>
      </span>
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
