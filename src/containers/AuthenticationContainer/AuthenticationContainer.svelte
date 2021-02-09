<script>
  import { onMount } from "svelte";
  import LoginForm from "../LoginForm/LoginForm.svelte";
  import SignupForm from "../SignupForm/SignupForm.svelte";
  import { _ } from "svelte-i18n";

  export let state = "signup";
  export let darkMode = false;

  let backgroundColor = darkMode ? "#00409A" : "var(--extra-light-gray)";
  let activeColor = darkMode ? "var(--white)" : "var(--principal-color)";
  let inactiveColor = darkMode ? "transparent" : "#E8E8E8";
  let formContentColor = darkMode ? "var(--white)" : "var(--light-color)";
  let secondaryContentColor = darkMode ? "var(--white)" : "#9E9FA0";
  
  onMount(async () => {
    const Head = document.getElementsByTagName("head")[0];
    const Link = document.createElement("link");
    Link.rel = "stylesheet";
    Link.type = "text/css";
    if (darkMode) Link.href = "/styles/material-inputs-dark-theme.css";
    else Link.href = "/styles/material-inputs-light-theme.css";
    Head.appendChild(Link);
  });
</script>

<div class="AuthenticationContainer" style="background-color:{backgroundColor}">
  {#if state === "signup"}
    <h6 style="color:{activeColor}">
      {$_("authenticationContainer.register")}
    </h6>

    <div class="AuthenticationContainer-form">
      <div>
        <SignupForm
          loginRedirectionAction={() => (state = "login")}
          {backgroundColor}
          {activeColor}
          {inactiveColor}
          {formContentColor}
          {secondaryContentColor}
        />
      </div>
    </div>
  {:else if state === "login"}
    <h6 style="color:{activeColor}">{$_("authenticationContainer.signIn")}</h6>

    <div class="AuthenticationContainer-form">
      <div>
        <LoginForm
          signupRedirectionAction={() => (state = "signup")}
          {backgroundColor}
          {activeColor}
          {inactiveColor}
          {formContentColor}
          {secondaryContentColor}
        />
      </div>
    </div>
  {/if}
</div>

<style>
  .AuthenticationContainer {
    width: 100%;
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
    font-size: 1.2em;
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
      max-width: 660px;
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
