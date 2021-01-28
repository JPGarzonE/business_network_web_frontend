<script>
    import { goto } from "@sapper/app";
    import { GetRoute as GetSupplierProfileRoute } from '../../routes/profile/supplier/[accountname].svelte';
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
        validateString, validateEmailPattern,  validatePassword, validatePasswordConfirmation, validateNIT
    } from "../../validators/formValidators.js";
    import { setCookie } from "../../utils/cookie.js";

    export let loginRedirectionAction = async () => await goto('/login');
    export let backgroundColor; 
    export let activeColor;
    export let inactiveColor;
    export let formContentColor;
    export let secondaryContentColor;

    const signupService = new SignupService();

    const fields = ['full_name', 'email', 'name', 'legalIdentifier', 
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
    let legalIdentifier = '';
    let industry = '';
    let certificate = null; // File

    $: fullNameValidation = validateString(fullName, 3, 50, true, "Nombre completo válido");
    $: emailValidation = validateEmailPattern( email );
    $: passwordValidation = validatePassword( password );
    $: passwordConfirmationValidation = validatePasswordConfirmation( password, passwordConfirmation );
    $: companyNameValidation = validateString(companyName, 3, 50, true, "Nombre de la empresa válido");
    $: legalIdentifierValidation = validateNIT( legalIdentifier );
    $: industryValidation = validateString(industry, 3, 50, true, "La industria es válida");

    $: firstStepValid = fullNameValidation.isValid && emailValidation.isValid 
        && passwordValidation.isValid && passwordConfirmationValidation.isValid;
    $: validBeforeSubmit = firstStepValid && companyNameValidation.isValid && legalIdentifierValidation.isValid 
        && industryValidation.isValid && termsAndConditionsSelected;

    
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
                name: companyName, legal_identifier: legalIdentifier, industry: industry
            }

            let data;
            if( certificate ) data = await signupService.signupSupplierWithCertificate( userData, certificate );
            else data = await signupService.signupSupplier( userData );

            let accountname = data.company.accountname;

            setCookie("JPGE", data.access_token, 1);
            setCookie("access_username", accountname, 1);
            
            // Here we not use goto because the server has to render an authenticated content after login
            // With goto this not happen because the render acts only on the client
            location.href = GetSupplierProfileRoute(accountname);
        }
        catch(e) {
            console.log("error: ", e);
            const error = e.message;
            submitErrorMessage = "";
            let existErrorField = false;
            fields.map((field) => {
                let errorField = error[field];
                if( field == "legalIdentifier" || field == "name" || field == "industry" )
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
        font-size: 1em;
        color: var(--light-color);
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
    }

    .SignupForm-login p {
        margin: 5px 0px;
        text-align: center;
        color: var(--light-color);
        font-size: 15px;
    }

    .SignupForm-login input {
        margin-top: 11px;
        font-size: 16px;
        background-color: transparent;
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
        <button style="color:{formContentColor}" 
            on:click={() => actualStep--}
        >
            <span>{"<"}</span> Volver
        </button>
    </div>
    {/if}

    <StepsCarousel 
        steps={steps}
        selectedStep={actualStep}
        backgroundColor={inactiveColor}
        textColor={secondaryContentColor}
        selectedBackgroundColor={activeColor}
        selectedTextColor={backgroundColor}
        borderColor={inactiveColor == 'transparent' ? activeColor : inactiveColor}
    />

    {#if submitErrorMessage }
        <div class="form-banner--invalid">
            <p>{submitErrorMessage}</p>
        </div>
    {/if}
        
    <form class="SignupForm-form">
    {#if actualStep === 1}
        <h3 class="SignupForm-title" style="color:{formContentColor}">
            Información personal
        </h3>

        <div class="form-group">
            <Textfield style="width: 100%;height:50px;" variant="outlined"
                label="Nombre completo*" input$aria-controls="full-name" input$aria-describedby="full-name"
                input$maxlength="50" bind:value={fullName}
                invalid={fullName && !fullNameValidation.isValid} />

            <HelperText id="full-name" persistent={fullName && !fullNameValidation.isValid}>
                {fullNameValidation.message}</HelperText>
        </div>

        <div class="form-group">
            <Textfield style="width: 100%;height:50px" variant="outlined"
                label="Correo*" input$aria-controls="email" input$aria-describedby="email"
                input$maxlength="50" bind:value={email} 
                invalid={email && !emailValidation.isValid} />

            <HelperText id="email" persistent={email && !emailValidation.isValid}>
                {emailValidation.message}</HelperText>
        </div>

        <div class="form-group">
            <Textfield style="width: 100%;height:50px" variant="outlined"
                bind:value={password} label="Contraseña*" input$aria-controls="password" 
                input$aria-describedby="password" input$type="password" input$maxlength="50" 
                invalid={password && !passwordValidation.isValid} />

            <HelperText id="password" persistent={password && !passwordValidation.isValid}>
                {passwordValidation.message}</HelperText>
        </div>

        <div class="form-group">
            <Textfield style="width: 100%;height:50px" variant="outlined"
                label="Confirmar contraseña*" input$aria-controls="password-confirmation"
                input$aria-describedby="password-confirmation" input$type="password"
                input$maxlength="50" bind:value={passwordConfirmation} 
                invalid={passwordConfirmation && !passwordConfirmationValidation.isValid} />

            <HelperText persistent={passwordConfirmation && !passwordConfirmationValidation.isValid}>
                {passwordConfirmationValidation.message}</HelperText>
        </div>

        <div class="form-button-group" style="margin-top:0.8em;">
            <input disabled={!firstStepValid} type="button" class="button form-button button--principal" 
                style="color:{backgroundColor};background-color:{activeColor}"
                name="next" on:click={()=>actualStep++} value="Siguiente" />
        </div>

        <div class="SignupForm-login">
            <hr style="background-color:{formContentColor}" />
            <p style="color:{secondaryContentColor}">Si ya tienes una cuenta</p>
            <input type="button" name="login-redirect" class="button button--secondary" 
                style="color:{activeColor};border:2px solid {activeColor}"  
                value="Iniciar sesión" on:click={loginRedirectionAction} />
        </div>

    {:else if actualStep === 2}
        <h3 class="SignupForm-title" style="color:{formContentColor}">
            Datos de la empresa
        </h3>

        <div class="form-group">
            <Textfield style="width: 100%;height:50px" variant="outlined"
                label="Nombre de la empresa*" input$aria-controls="company-name"
                input$aria-describedby="company-name" input$maxlength="50" 
                bind:value={companyName} invalid={companyName && !companyNameValidation.isValid} />

            <HelperText id="company-name" persistent={companyName && !companyNameValidation.isValid}>
                {companyNameValidation.message}</HelperText>
        </div>

        <div class="form-group">
            <Textfield style="width: 100%;height:50px" variant="outlined"
                label="NIT*" input$aria-controls="legalIdentifier" input$aria-describedby="legalIdentifier"
                input$maxlength="50" bind:value={legalIdentifier} 
                invalid={legalIdentifier && !legalIdentifierValidation.isValid} />

            <HelperText id="legalIdentifier" persistent={legalIdentifier && !legalIdentifierValidation.isValid}>
                {legalIdentifierValidation.message}</HelperText>
        </div>

        <div class="form-group">
            <Select bind:value={industry} label="Industria*" variant="outlined">
                <Option value=""></Option>
                {#each INDUSTRIES as industryOption}
                    <Option value={industryOption} selected={industry == industryOption}>{industryOption}</Option>
                {/each}
            </Select>

            <SelectHelperText>{industryValidation.message}</SelectHelperText>
        </div>

        <div class="form-group" style="margin-top:1.6em;">
            <FileUploadInput name="Certificate" message="Subir certificado"
                inputColor={activeColor} acceptFiles={["application/pdf"]} 
                bind:value={certificate} 
            />
            <p class="SignupForm-certificate-helper" style="color:{activeColor}">
                Ingresa el certificado de cámara de comercio <br />
                * Si no lo tienes a la mano puedes omitir este paso
            </p>
        </div>

        <div class="SignupForm-terms">
            <CheckBox bind:checked={termsAndConditionsSelected} />
            <p style="color:{secondaryContentColor}">
                He leído, entendido y aceptado los 
                <a href="/" style="color:{activeColor}">términos y condiciones</a> y 
                <a href="/" style="color:{activeColor}">la política de protección de datos</a>
            </p>
        </div>

        <div class="form-button-group" style="margin-top:1.7em">
            <input disabled={!validBeforeSubmit} type="button" name="submit"
                class="button Signup-button button--secondary"
                style="color:{backgroundColor};background-color:{activeColor}"
                value="Aceptar y unirte" on:click={submitSignup} />
        </div>
    {/if}
    </form>
</div>