<script>
  import { goto } from "@sapper/app";
  import LoginService from "../../services/authentication/login.service.js";
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text";
  import { validateEmailPattern } from "../../validators/formValidators.js";
  import { setCookie } from "../../utils/cookie.js";
  import { _ } from "svelte-i18n";

  export let signupRedirectionAction = async () => await goto("/signup");
  export let backgroundColor;
  export let activeColor;
  export let formContentColor;
  export let secondaryContentColor;

  const loginService = new LoginService();

  let email = "";
  let password = "";
  let emailFeedback = "";
  let emailIsValid = null;
  let submitErrorMessage;

  $: isValidBeforeSumbit = emailIsValid && password;

  $: {
    let { message, isValid } = validateEmailPattern(email);
    emailFeedback = message;
    emailIsValid = isValid;
  }

  async function submitLogin(event) {
    const Target = event.target;
    Target.style.opacity = 0.4;
    Target.style.cursor = "not-allowed";

    try {
      if (!isValidBeforeSumbit) throw new Error("Invalid");

      const data = await loginService.login(email, password);
      let accountname = data.access_user.default_company.accountname;

      setCookie("JPGE", data.access_token, 1);
      setCookie("access_accountname", accountname, 1);

      // Here we not use goto because the server has to render an authenticated content after login
      // With goto this not happen because the render acts only on the client
      location.href = `/profile/suppliers/${accountname}`;
    } catch (e) {
      const errors = e.message;
      if (errors.non_field_errors || errors.password)
        submitErrorMessage = "Credenciales inválidas";
      else if (errors == "Invalid")
        submitErrorMessage = $_("loginForm.invalidData");
      else
        submitErrorMessage =
          "Hubo un error en la aplicación, intente más tarde";
    } finally {
      Target.style.opacity = 1;
      Target.style.cursor = "pointer";
    }
  }
</script>

<div class="LoginForm">
  <form class="LoginForm-form">
    <h2 class="LoginForm-title" style="color:{formContentColor}">
      {$_("loginForm.weAreGladToSeeYouAgain")}
    </h2>

    {#if submitErrorMessage}
      <div class="form-banner--invalid">{submitErrorMessage}</div>
    {/if}

    <div class="form-group">
      <Textfield
        style="width: 100%;height:50px"
        variant="outlined"
        label={$_("loginForm.mail")}
        input$aria-controls="email"
        input$aria-describedby="email"
        input$maxlength="50"
        bind:value={email}
      />
      <HelperText id="email">{emailFeedback}</HelperText>
    </div>

    <div class="form-group">
      <Textfield
        style="width: 100%;height:50px"
        variant="outlined"
        label={$_("loginForm.password")}
        input$aria-controls="password"
        input$aria-describedby="password"
        input$type="password"
        input$maxlength="50"
        bind:value={password}
      />
    </div>

    <div class="form-button-group">
      <input
        disabled={!isValidBeforeSumbit}
        type="button"
        class="button form-button button--principal"
        style="color:{backgroundColor};background-color:{activeColor}"
        name="submit"
        on:click={submitLogin}
        value={$_("loginForm.logIn")}
      />
    </div>

    <div class="LoginForm-register">
      <hr style="background-color:{formContentColor}" />
      <!-- <p>Olvidé mi contraseña</p><br/> -->
      <p style="color:{secondaryContentColor}">
        {$_("loginForm.doNotHaveAnAccount")}
      </p>
      <input
        type="button"
        class="button button--secondary"
        style="color:{activeColor};border:2px solid {activeColor}"
        value={$_("loginForm.signUp")}
        on:click={signupRedirectionAction}
      />
    </div>
  </form>
</div>

<style>
  @import "/styles/form.css";

  .form-group {
    max-width: 400px;
    margin-top: 0.4em;
  }

  .LoginForm {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }

  .LoginForm-form {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .LoginForm-title {
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: 300;
    color: #666666;
  }

  .LoginForm-register {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 35px;
  }

  .LoginForm-register hr {
    width: 100%;
    height: 2px;
    border: 1px solid transparent;
  }

  .LoginForm-register p {
    margin: 5px 0px;
    color: var(--light-color);
    text-align: center;
    font-size: 15px;
  }

  .LoginForm-register input {
    margin-top: 11px;
    font-size: 16px;
    color: var(--principal-color);
    background-color: transparent;
    text-decoration: none;
    letter-spacing: 0.22px;
  }
</style>
