<script>
  import EditButton from "../../components/EditButton/EditButton.svelte";
  import Pencil from "svelte-material-icons/PencilOutline.svelte";
  import AddCert from "svelte-material-icons/ImagePlus.svelte";

  export let handleCancel;
  export let handleNext;
  export let handlePrev;
</script>

<button class="button button--secondary" on:click={handleCancel}
  >Finalizar Tour</button
>
<img
  src="/images/chevron-right.svg"
  alt="Siguiente"
  class="Chev ChevronNext"
  on:click={handleNext}
/>
<img
  src="/images/chevron-right.svg"
  alt="Anterior"
  class="Chev ChevronPrev "
  on:click={handlePrev}
/>

<div class="Main-Container">
  <div class="Certification-Container">
    <div class="EditButtonOverride">
      <EditButton
        disabled={true}
        size={20}
        color="var(--light-color)"
        onEdit={() => undefined}
      />
    </div>
    <img
      src="/images/Example_cert.svg"
      alt="Ejemplo Certificacion"
      class="Certification-Image"
    />
    <p class="Certification-Title">Certificación de muestra</p>
    <p class="Certification-Content">Certificaciones</p>
    <p class="Certification-More">Ver mas</p>
  </div>
  <div class="instructions-container">
    <div class="Edit-Delete">
      <img src="/images/OB3_V1.svg" alt="arrow" class="Arrow First-Arrow" />
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
          certificaciones
          <br />
        </span>
        <img src="/images/OB3_V2.svg" alt="arrow" class="Arrow Second-Arrow" />
      </div>

      <span class="Text--description">
        Adjunta las cértificaciones de tu empresa, eso te dará más credibilidad
        ante tu comprador.</span
      >
    </div>
  </div>
</div>

<style>
  @import "/styles/button.css";
  @media screen and (min-width: 850px) {
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
    .Chev {
      cursor: pointer;
      z-index: 25;
      position: absolute;
      top: 35%;
    }
    .ChevronNext {
      right: 10%;
    }
    .ChevronPrev {
      left: 10%;
      transform: rotate(180deg);
    }

    .Certification-Container {
      z-index: 20;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      background-color: white;
      border-radius: 4px;
      position: relative;
      padding: 15px;
      margin-left: 300px;
      height: fit-content;
      margin-top: 60px;
      max-width: 30%;
    }
    .EditButtonOverride {
      position: absolute;
      top: 10px;
      right: 5px;
    }
    .Certification-Image {
      align-self: center;
    }
    .Certification-Title {
      font-weight: bold;
      font-size: 16px;
      color: #5384c9;
      margin: 10px 10px 10px 0;
    }
    .Certification-Content {
      font-weight: normal;
      font-size: 16px;
      color: #9e9fa0;
    }
    .Certification-More {
      font-weight: normal;
      font-size: 16px;
      align-self: flex-end;
      text-decoration: underline;
      color: #5384c9;
      margin-top: 10px;
    }
    .instructions-container {
      width: 60%;
      display: flex;
      justify-content: flex-end;
      height: 100%;
    }
    .Main-Container {
      align-self: flex-start;
      max-width: 1400px;
      padding: 25px;
      z-index: 20;
      display: flex;
      margin: 70px auto 0 auto;
      position: relative;
      justify-content: space-between;
    }
    .Arrow {
      width: fit-content;
    }
    .First-Arrow {
      top: -65px;
      position: absolute;
      left: -40px;
    }
    .Second-Arrow {
      margin-right: 10px;
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
      margin-left: 20px;
      position: relative;
      margin-top: 7%;
    }
    .Icon {
      margin-bottom: 10px;
    }
    .Pencil {
      margin-top: 130px;
    }
    .Add-Cert {
      display: flex;
      flex-direction: column;
      margin-right: 90px;
    }
    .Text-Arrow-container {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
