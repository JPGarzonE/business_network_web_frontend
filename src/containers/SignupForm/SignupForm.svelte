<script>
    import { goto } from "@sapper/app";
    import { INDUSTRIES } from "../../store/store.js";
    import SignupService from "../../services/authentication/signup.service.js";
    import StepsCarousel from "../../components/StepsCarousel/StepsCarousel.svelte";
    import Textfield from "@smui/textfield";
    import HelperText from "@smui/textfield/helper-text";
    import Select, {Option} from "@smui/select";
    import CheckBox from "@smui/checkbox";
    import FileUploadInput from "../../components/FileUploadInput/FIleUploadInput.svelte";

    const signupService = new SignupService();

    let steps = {
        1: null,
        2: null
    }
    let actualStep = 1;
    let termsAndConditionsSelected = false;

    let fullName = '';
    let email = '';  
    let password = '';
    let passwordConfirmation = '';
    let companyName = '';
    let nit = '';
    let industry = '';
    let certificate = null; // File

    let fullNameFeedback = 'Full name feedback';
    let emailFeedback = '';  
    let passwordFeedback = '';
    let passwordConfirmationFeedback = '';
    let companyNameFeedback = '';
    let nitFeedback = '';
    let industryFeedback = '';

    $: firstStepValid = validateFullName() && validateEmail() && validatePassword() && validatePasswordConfirmation();
    $: validBeforeSubmit = firstStepValid && validateCompanyName() && validateNit() && validateIndustry();

    function validateFullName() {

    }

    function validateEmail() {

    }

    function validatePassword() {

    }

    function validatePasswordConfirmation() {

    }

    function validateCompanyName() {

    }

    function validateNit() {

    }

    function validateIndustry() {

    }

    function submitSignup() {

    }
</script>

<style>
    @import '/styles/form.css';

    .form-group {
        max-width: 400px;
        margin-top: 0.4em;
    }

    .SignupForm-back {
        margin-bottom: -0.5em;
        margin-left: -1em;
    }

    .SignupForm-back button {
        border: unset;
        letter-spacing: 0.22px;
        font-size: 0.9em;
        color: var(--light-color);
        background-color: unset;
        cursor: pointer;
    }

    .SignupForm-back button:hover {
        text-decoration: underline;
    }

    .SignupForm-back button span {
        font-weight: 900;
        margin-right: 0.35em;
    }

    .SignupForm-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .SignupForm-title {
        margin: 14px 0px;
        text-align: center;
        line-height: 16px;
        letter-spacing: 0.22px;
        color: var(--light-color);
        font-size: 1em;
        font-weight: 400;
    }

    .SignupForm-login {
        width: 100%;
        max-width: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 1.2em;
    }

    .SignupForm-login hr {
        width: 100%;
        height: 2px;
        border: 1px solid transparent;
        background: var(--light-color);
    }

    .SignupForm-login p {
        margin: 5px 0px;
        color: var(--light-color);
        text-align: center;
        font-size: 15px;
    }

    .SignupForm-login input {
        margin-top: 11px;
        font-size: 14px;
        color: var(--principal-color);
        text-decoration: none;
        letter-spacing: 0.22px;
    }

    .SignupForm-certificate-helper {
        width: 100%;
        margin-left: 1em;
        margin-top: 0.5em;
        font-size: 0.8em;
        letter-spacing: 0.22px;
        color: var(--error-color);
    }

    .SignupForm-terms {
        display: flex;
        margin-top: 27px;
    }

    .SignupForm-terms p {
        margin-top: 0.7em;
        font-size: 0.8em;
        letter-spacing: 0.22px;
    }

    .SignupForm-terms p a {
        color: var(--principal-color);
    }

    .Signup-button {
        font-size: 14px;
        letter-spacing: 0.22px;
    }
</style>

<div class="SignupForm">
    {#if actualStep === 2}
    <div class="SignupForm-back">
        <button on:click={() => actualStep--}>
            <span>{"<"}</span> Volver
        </button>
    </div>
    {/if}

    <StepsCarousel 
        steps={steps}
        selectedStep={actualStep} />
        
    <form class="SignupForm-form">
    {#if actualStep === 1}
        <h3 class="SignupForm-title">Datos básicos personales</h3>

        <div class="form-group">
            <Textfield style="width: 100%;height:50px" variant="outlined"
                label="Nombre completo*" input$aria-controls="full-name"
                input$aria-describedby="full-name"
                input$maxlength="50" bind:value={fullName}
                on:input={validateFullName} />
            <HelperText id="full-name">{fullNameFeedback}</HelperText>
        </div>

        <div class="form-group">
            <Textfield style="width: 100%;height:50px" variant="outlined"
                label="Correo*" input$aria-controls="email"
                input$aria-describedby="email"
                input$maxlength="50" bind:value={email}
                on:input={validateEmail} />
            <HelperText id="email">{emailFeedback}</HelperText>
        </div>

        <div class="form-group">
            <Textfield style="width: 100%;height:50px" variant="outlined"
                label="Contraseña*" input$aria-controls="password"
                input$aria-describedby="password"
                input$maxlength="50" bind:value={password}
                on:input={validatePassword} />
            <HelperText id="password">{passwordFeedback}</HelperText>
        </div>

        <div class="form-group">
            <Textfield style="width: 100%;height:50px" variant="outlined"
                label="Confirmar contraseña*" input$aria-controls="password-confirmation"
                input$aria-describedby="password-confirmation"
                input$maxlength="50" bind:value={passwordConfirmation}
                on:input={validatePasswordConfirmation} />
            <HelperText id="password-confirmation">{passwordConfirmationFeedback}</HelperText>
        </div>

        <div class="form-button-group" style="margin-top:0.8em;">
            <input disabled={!firstStepValid} type="button" class="button form-button button--principal" 
                name="next" on:click={()=>actualStep++} value="Siguiente" />
        </div>

        <div class="SignupForm-login">
            <hr />
            <p>Si ya tienes cuenta</p>
            <input type="button" name="login-redirect" class="button button--secondary" 
                value="Ingresar" on:click={async () => await goto('/login')} />
        </div>

    {:else if actualStep === 2}
        <h3 class="SignupForm-title">Datos de la empresa</h3>

        <div class="form-group">
            <Textfield style="width: 100%;height:50px" variant="outlined"
                label="Nombre de la empresa*" input$aria-controls="company-name"
                input$aria-describedby="company-name"
                input$maxlength="50" bind:value={companyName}
                on:input={validateCompanyName} />
            <HelperText id="company-name">{companyNameFeedback}</HelperText>
        </div>

        <div class="form-group">
            <Textfield style="width: 100%;height:50px" variant="outlined"
                label="NIT*" input$aria-controls="nit"
                input$aria-describedby="nit"
                input$maxlength="50" bind:value={nit}
                on:input={validateNit} />
            <HelperText id="nit">{nitFeedback}</HelperText>
        </div>

        <div class="form-group">
            <Select bind:value={industry} label="Industria" variant="outlined">
                <Option value=""></Option>
                {#each INDUSTRIES as industryOption}
                    <Option value={industryOption} selected={industry == industryOption}>{industryOption}</Option>
                {/each}
            </Select>
        </div>

        <div class="form-group" style="margin-top:1.6em;">
            <FileUploadInput name="Certificate" message="Subir certificado"
                acceptFiles={["application/pdf"]} bind:value={certificate} />
            <p class="SignupForm-certificate-helper">
                Ingresa el certificado de cámara de comercio <br />
                * Si no lo tienes a la mano puedes omitir este paso
            </p>
        </div>

        <div class="SignupForm-terms">
            <CheckBox bind:checked={termsAndConditionsSelected} />
            <p>
                He leído, entendido y aceptado los 
                <a href="/">términos y condiciones</a> y <a href="/">la política de protección de datos</a>
            </p>
        </div>

        <div class="form-button-group" style="margin-top:1.7em">
            <input disabled={!validBeforeSubmit} type="button" name="submit" class="button Signup-button button--secondary" 
                value="Aceptar y unirte" on:click={submitSignup} />
        </div>
    {/if}
    </form>
</div>