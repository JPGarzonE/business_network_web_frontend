<script>
  import LoginForm from "../LoginForm/LoginForm.svelte";
  import SignupForm from "../SignupForm/SignupForm.svelte";
  import SignupBuyerForm from "../SignupBuyerForm/SignupBuyerForm.svelte";
  import { _ } from "../../services/i18n";

  export let state = "signup";
</script>

<div class="AuthenticationContainer">
  {#if state === "signup"}
    <h6>{$_("authenticationContainer.signUp")}</h6>

    <div class="AuthenticationContainer-form">
      <div>
        <SignupBuyerForm loginRedirectionAction={() => (state = "login")} />
      </div>
    </div>
  {:else if state === "login"}
    <h6>{$_("authenticationContainer.signIn")}</h6>

    <div class="AuthenticationContainer-form">
      <div>
        <LoginForm signupRedirectionAction={() => (state = "signup")} />
      </div>
    </div>
  {/if}
</div>

<style>
  .AuthenticationContainer {
    width: 100%;
    max-width: 660px;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0 2.5em 2em;
    margin: 0 auto;
    overflow-y: auto;
  }

  .AuthenticationContainer-form {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .AuthenticationContainer-form div {
    margin: auto 0;
    padding: 20px;
  }

  .AuthenticationContainer h6 {
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-shrink: 0;
    margin-top: 15px;
    font-weight: bold;
    font-size: 1.13em;
    letter-spacing: 0.216px;
    color: var(--principal-color);
  }

  @media screen and (max-width: 425px) {
    .AuthenticationContainer {
      padding: 0 1em 2em;
    }
  }

  @media screen and (min-width: 1000px) {
    .AuthenticationContainer {
      margin: 0;
      padding: 0 2.5em 2em;
    }
  }

  @media screen and (min-width: 1270px) {
    .AuthenticationContainer {
      padding: 0 3.5em 2em;
    }
    .AuthenticationContainer h6 {
      right: 4.5em;
    }
  }
</style>
