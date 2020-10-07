<script>
    import LoginService from "../../services/authentication/login.service.js";

    const loginService = new LoginService();

    let email = '';
    let password = '';
    let emailIsValid;
    let formIsValid;
    let formErrorMessage;

    $: isValidBeforeSumbit = emailIsValid && password;

    function validateEmailPattern() {
        let emailMatch = email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        if( emailMatch ){
            emailIsValid = true;
            return true;
        }else{
            emailIsValid = false;
            return false;
        }
    }

    function validateLoginForm() {
        if( !validateEmailPattern() || !password ){
            formIsValid = false;
            formErrorMessage = "Los datos no son válidos";
            throw new Error();
        }
        else{
            formErrorMessage = "";
            formIsValid = true;
        }
    }
    
    async function submitLogin() {
        try{
            validateLoginForm();

            let userData = {
                email: email,
                password: password
            };

            const data = await loginService.login( userData );
            setCookie("JPGE", data.access_token, 1);
            setCookie("access_username", data.user.username, 1);
            
            // Here we not use goto because the server has to render an authenticated content after login
            // With goto this not happen because the render acts only on the client
            location.href = `/profile/${data.user.username}`;
        }
        catch(e){
            const errors = e.message;
            if( errors.non_field_errors || errors.password ){
                formIsValid = false;
                formErrorMessage = "Credenciales inválidas";
            }
        }
    }

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
</script>

<style>
    @import "/styles/form.css";

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
        margin: 35px 0 15px;
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

    .LoginForm-register-link {
        width: 100%;
        margin-top: 5px;
    }

    .LoginForm-register hr{
        width: 100%;
        height: 2px;
        border: 1px solid transparent;
        background: var(--light-color);
    }

    .LoginForm-register p{
        margin: 5px 0px;
        color: var(--light-color);
        text-align: center;
        font-size: 15px;
    }

    .LoginForm-register p a{
        font-size: 15px;
        color: var(--principal-color);
        text-decoration: none;
    }
</style>

<div class="LoginForm">
    <form class="LoginForm-form">
        <h2 class="LoginForm-title">¡Nos encanta verte de nuevo!</h2>

        {#if formIsValid === false}
            <div class="form-banner--invalid">{formErrorMessage}</div>
        {/if}

        <div class="form-group">
            <input type="email" name="email" placeholder="Correo" class="form-control" bind:value={email}
                class:form-control--valid={emailIsValid}
                class:form-control--invalid={emailIsValid === false}
                on:input={validateEmailPattern}
            />
            <p class="form-message"
                class:form-message--valid={emailIsValid}
                class:form-message--invalid={emailIsValid === false}
            >
                {emailIsValid === false ? "Agrega un correo válido" : ""}
            </p>
        </div>

        <div class="form-group">
            <input type="password" name="password" placeholder="Contraseña" class="form-control" bind:value={password}
                class:form-control--valid={password}
            />
        </div>

        <div class="form-button-group">
            <input disabled={!isValidBeforeSumbit} type="button" class="button form-button button--principal" 
                name="submit" on:click={submitLogin} value="Ingresar" />
        </div>

        <div class="LoginForm-register">
            <hr />
            <p>Olvidé mi contraseña</p>
            <a href="signup" class="LoginForm-register-link">
                <input type="button" class="button button--secondary" value="Crea cuenta" />
            </a>
        </div>
    </form>
</div>