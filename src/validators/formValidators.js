export function validateEmailPattern( email ) {
    let emailMatch = email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    
    if( emailMatch )
        return { message: "Email válido", isValid: true }
    else
        return { message: "El email no es válido", isValid: false }
}


export function validateString( value, minLength = 3, maxLength = 50, 
    required = false, successMessage = "valor válido") {

    if( value && value.length > 0 ) {
        if( value.length < minLength )
            return { 
                message: `Mínimo ${minLength} caracteres`, 
                isValid: false 
            }
        else if( value.length > maxLength )
            return { 
                message: `Máximo ${maxLength} caracteres`, 
                isValid: false 
            }

        return { 
            message: successMessage,
            isValid: true
        }
    }
    
    return required ? 
        { message: "Este valor es obligatorio", isValid: false }
        :
        { message: successMessage, isValid: true }
}


export function validatePassword( password ) {
    let passwordMatch = password.match(/^(?=.*([A-Z]|[a-z])+)(?=.*[0-9]).{8,}$/);

    if( passwordMatch )
        return { message: "Contraseña válida", isValid: true }
    else
        return { message: "Mínimo 8 caracteres y al menos un numero", isValid: false }
}


export function validatePasswordConfirmation( password, passwordConfirm ) {
    if( password !== "" && password === passwordConfirm )
        return { message: "Las contraseñas coinciden", isValid: true }
    else
        return { message: "Las contraseñas NO coinciden", isValid: false }
}


export function validateNIT( nit ) {
    let nitMatch = nit.match(/^(\d{9,9}((.)\d)?)$/);

    if( nitMatch )
        return { message: "El NIT es correcto", isValid: true }
    else
        return { message: "El NIT no cumple con el patron correcto", isValid: false }
}


export function validateInternationalPhoneNumber( phoneNumber ) {
    let phoneNumberMatch = phoneNumber.match(/^([0-9]{6,15})$/);

    if( phoneNumberMatch )
        return { message: "Numero válido", isValid: true }
    else
        return { message: "El numero no es válido", isValid: false }
}


export function validateAreaCodePhoneNumber( areaCode ) {
    let areaCodeMatch = areaCode.match(/^([0|\+[0-9]{1,4})$/);

    if( areaCodeMatch )
        return { message: "Válido", isValid: true }
    else
        return { message: "Inválido", isValid: false }
}


export function validateWebURL( webURL ) {
    let webURLMatch = webURL.match(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*)*$/);

    if( webURLMatch )
        return { message: "Página web válida", isValid: true }
    else
        return { message: "La página web no es válida", isValid: false }
}


export function validatePrice( price, required = false, successMessage = "Precio válido" ) {
    price = typeof(price) === 'number' ? price.toFixed(2) : price;

    if( price && typeof(price) === 'number' ) {
        if( price <= 0 ) 
            return { message: "Numero debe ser positivo", isValid: false }

        if( price.toString().length <= 13 )
            return { message: successMessage, isValid: true }
        else
            return { message: "Máximo 15 dígitos", isValid: false }
    }

    return required ?
        { message: "Precio requerido", isValid: false }
        :
        { message: successMessage, isValid: true }
}