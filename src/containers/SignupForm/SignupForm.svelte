<script>
    import { goto } from "@sapper/app";
    import { INDUSTRIES } from "../../store/store.js";
    import SignupService from "../../services/authentication/signup.service.js";
    import StepsCarousel from "../../components/StepsCarousel/StepsCarousel.svelte";
    import Textfield from "@smui/textfield";
    import HelperText from "@smui/textfield/helper-text";
    import Select, {Option} from "@smui/select";
    import SelectHelperText from "@smui/select/helper-text";
    import CheckBox from "@smui/checkbox";
    import FileUploadInput from "../../components/FileUploadInput/FIleUploadInput.svelte";
    import { 
        validateName, validateEmailPattern,  validatePassword, validatePasswordConfirmation, validateNIT
    } from "../../validators/formValidators.js";
    import { setCookie } from "../../utils/cookie.js";

    export let loginRedirectionAction = async () => await goto('/login');
    const signupService = new SignupService();

    const fields = ['full_name', 'email', 'name', 'nit', 
        'industry', 'password', 'password_confirmation'];
    let steps = { 1: null, 2: null }
    let actualStep = 1;
    let termsAndConditionsSelected = false;
    let submitErrorMessage = "";

    let fullName = '';
    let email = '';  
    let password = '';
    let passwordConfirmation = '';
    let companyName = '';
    let nit = '';
    let industry = '';
    let certificate = null; // File

    let fullNameFeedback = '';
    let emailFeedback = '';
    let passwordFeedback = '';
    let passwordConfirmationFeedback = '';
    let companyNameFeedback = '';
    let nitFeedback = '';
    let industryFeedback = '';

    let fullNameIsValid = null;
    let emailIsValid = null;
    let passwordIsValid = null;
    let passwordConfirmationIsValid = null;
    let companyNameIsValid = null;
    let nitIsValid = null;
    let industryIsValid = null;

    $: firstStepValid = fullNameIsValid && emailIsValid && passwordIsValid && passwordConfirmationIsValid;
    $: validBeforeSubmit = firstStepValid && companyNameIsValid && nitIsValid 
        && industryIsValid && termsAndConditionsSelected;

    $: {
        let { message, isValid } = validateName(fullName);
        fullNameFeedback = message;
        fullNameIsValid = isValid;
    }

    $: {
        let { message, isValid } = validateEmailPattern(email);
        emailFeedback = message;
        emailIsValid = isValid;
    }

    $: {
        let { message, isValid } = validatePassword(password);
        passwordFeedback = message;
        passwordIsValid = isValid;
    }

    $: {
        let{ message, isValid } = validatePasswordConfirmation( password, passwordConfirmation);
        passwordConfirmationFeedback = message;
        passwordConfirmationIsValid = isValid;
    }

    $: {
        let { message, isValid } = validateName(companyName);
        companyNameFeedback = message;
        companyNameIsValid = isValid;
    }

    $: {
        let { message, isValid } = validateNIT( nit );
        nitFeedback = message;
        nitIsValid = isValid;
    }

    $: {
        let { message, isValid } = validateName( industry );
        industryFeedback = message;
        industryIsValid = isValid;
    }

    
    async function submitSignup( event ) {
        const Target = event.target;
        Target.style.opacity = 0.4;
        Target.style.cursor = 'not-allowed';

        try {
            if( !termsAndConditionsSelected ) throw new Error("Acepta los terminos y condiciones");
            else if( !validBeforeSubmit ) throw new Error();

            let userData = {
                email: email, full_name: fullName,
                password: password, password_confirmation: passwordConfirmation,
                company: {
                    name: companyName, nit: nit, industry: industry
                }
            }

            let data;
            if( certificate ) data = await signupService.signupWithCertificate( userData, certificate );
            else data = await signupService.signup( userData );

            setCookie("JPGE", data.access_token, 1);
            setCookie("access_username", data.user.username, 1);
            
            // Here we not use goto because the server has to render an authenticated content after login
            // With goto this not happen because the render acts only on the client
            location.href = `/profile/${data.user.username}`;
        }
        catch(e) {
            const error = e.message;
            submitErrorMessage = "";
            let existErrorField = false;
            fields.map((field) => {
                let errorField = error[field];
                if( field == "nit" || field == "name" || field == "industry" )
                    errorField = error["company"] ? error["company"][field] : null;

                if(errorField) {
                    existErrorField = true;
                    submitErrorMessage += `${submitErrorMessage ? `\n` : ''}-${field}: ${
                        errorField
                    }`;
                }
            });

            if( !existErrorField && !error ) submitErrorMessage = "Los datos no son válidos";
            else if( !existErrorField ) submitErrorMessage = error;

        } finally {
            Target.style.opacity = 1;
            Target.style.cursor = 'pointer';
        }
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
        margin-bottom: 14px;
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
        background-color: transparent;
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

    /* .prueba {
        color: green;
    } */
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

    {#if submitErrorMessage }
        <div class="form-banner--invalid">
            <p>{submitErrorMessage}</p>
        </div>
    {/if}
        
    <form class="SignupForm-form">
    {#if actualStep === 1}
        <h3 class="SignupForm-title">Datos básicos personales</h3>

        <div class="form-group">
            <Textfield style="width: 100%;height:50px" variant="outlined"
                label="Nombre completo*" input$aria-controls="full-name" input$aria-describedby="full-name"
                input$maxlength="50" bind:value={fullName}
                invalid={fullName && !fullNameIsValid} />

            <HelperText id="full-name" persistent={fullName && !fullNameIsValid}>
                {fullNameFeedback}</HelperText>
        </div>

        <div class="form-group">
            <Textfield style="width: 100%;height:50px" variant="outlined"
                label="Correo*" input$aria-controls="email" input$aria-describedby="email"
                input$maxlength="50" bind:value={email} 
                invalid={email && !emailIsValid} />

            <HelperText id="email" persistent={email && !emailIsValid}>
                {emailFeedback}</HelperText>
        </div>

        <div class="form-group">
            <Textfield style="width: 100%;height:50px" variant="outlined"
                bind:value={password} label="Contraseña*" input$aria-controls="password" 
                input$aria-describedby="password" input$type="password" input$maxlength="50" 
                invalid={password && !passwordIsValid} />

            <HelperText id="password" persistent={password && !passwordIsValid}>
                {passwordFeedback}</HelperText>
        </div>

        <div class="form-group">
            <Textfield style="width: 100%;height:50px" variant="outlined"
                label="Confirmar contraseña*" input$aria-controls="password-confirmation"
                input$aria-describedby="password-confirmation" input$type="password"
                input$maxlength="50" bind:value={passwordConfirmation} 
                invalid={passwordConfirmation && !passwordConfirmationIsValid} />

            <HelperText persistent={passwordConfirmation && !passwordConfirmationIsValid} 
                id="password-confirmation" >{passwordConfirmationFeedback}</HelperText>
        </div>

        <div class="form-button-group" style="margin-top:0.8em;">
            <input disabled={!firstStepValid} type="button" class="button form-button button--principal" 
                name="next" on:click={()=>actualStep++} value="Siguiente" />
        </div>

        <div class="SignupForm-login">
            <hr />
            <p>Si ya tienes cuenta</p>
            <input type="button" name="login-redirect" class="button button--secondary" 
                value="Ingresar" on:click={loginRedirectionAction} />
        </div>

    {:else if actualStep === 2}
        <h3 class="SignupForm-title">Datos de la empresa</h3>

        <div class="form-group">
            <Textfield style="width: 100%;height:50px" variant="outlined"
                label="Nombre de la empresa*" input$aria-controls="company-name"
                input$aria-describedby="company-name" input$maxlength="50" 
                bind:value={companyName} invalid={companyName && !companyNameIsValid} />

            <HelperText id="company-name" persistent={companyName && !companyNameIsValid}>
                {companyNameFeedback}</HelperText>
        </div>

        <div class="form-group">
            <Textfield style="width: 100%;height:50px" variant="outlined"
                label="NIT*" input$aria-controls="nit" input$aria-describedby="nit"
                input$maxlength="50" bind:value={nit} 
                invalid={nit && !nitIsValid} />

            <HelperText id="nit" persistent={nit && !nitIsValid}>
                {nitFeedback}</HelperText>
        </div>

        <div class="form-group">
            <Select bind:value={industry} label="Industria*" variant="outlined">
                <Option value=""></Option>
                {#each INDUSTRIES as industryOption}
                    <Option value={industryOption} selected={industry == industryOption}>{industryOption}</Option>
                {/each}
            </Select>

            <SelectHelperText>
                {industryFeedback.replace("El nombre", "La industria").replace("obligatorio", "obligatoria")}
            </SelectHelperText>
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