<script>
  import ConectyWhiteWordmark from "./Wordmarks/ConectyWhiteWordmark.svelte";
  import { _ } from "svelte-i18n";

  export let background =
    "linear-gradient(90deg, rgba(0,180,226,1) 0%, rgba(0,155,214,1) 30%, rgba(44,133,205,1) 79%)";
  export let textColor = "#FFFFFF";
</script>

<footer class="Footer" style="background:{background};color:{textColor};">
  <div class="Footer-content">
    <div class="Footer-slogan">
      <a href="/" style="display:flex;">
        <div class="Footer-wordmark">
          <ConectyWhiteWordmark />
        </div>
      </a>
      {$_("footer.withUs")}
    </div>
    <div class="Footer-email-container">
      <i class="icon icon-email--white" />
      <div class="Footer-email-content">
        <span>felipe@joinconecty.com</span>
        <span>carlos@joinconecty.com</span>
      </div>
    </div>
    <div class="Footer-tel-container">
      <i class="icon icon-tel--white" />
      <div class="Footer-tel-content">(+57) (318) 754-1301</div>
    </div>
  </div>
</footer>

<style>
  .Footer {
    display: flex;
    height: 200px;
    background: rgb(0, 180, 226);
    background: linear-gradient(
      90deg,
      rgba(0, 180, 226, 1) 0%,
      rgba(0, 155, 214, 1) 30%,
      rgba(44, 133, 205, 1) 79%
    );
  }

  .Footer-content {
    min-width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin: auto;
  }

  .Footer-slogan {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.85em;
    color: inherit;
  }

  .Footer-wordmark {
    width: 90px;
    height: 19px;
    margin: 0px 10px;
  }

  .Footer-email-container,
  .Footer-tel-container {
    display: flex;
    align-items: center;
  }

  .Footer-email-content {
    display: flex;
    flex-direction: column;
    color: inherit;
  }

  .Footer-tel-content {
    display: flex;
    color: inherit;
  }

  @media screen and (min-width: 850px) {
    .Footer {
      height: 150px;
    }

    .Footer-content {
      flex-direction: row;
      justify-content: space-around;
      min-width: 850px;
    }
  }
</style>
