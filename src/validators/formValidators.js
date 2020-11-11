export function validateEmailPattern( email ) {
    let emailMatch = email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    
    if( emailMatch )
        return { message: "Email válido", isValid: true }
    else
        return { message: "El email no es válido", isValid: false }
}


export function validateName( name ) {
    if (name && name.length >= 2) {
        if (name.length > 50)
            return { 
                message: "Máximo 50 caracteres", 
                isValid: false 
            }

        return { 
            message: "Nombre correcto", 
            isValid: true 
        }
    } else if (name && name.length > 0 && name.length <= 2){
        return { 
            message: "Mínimo 2 caracteres", 
            isValid: false 
        } 
    } else {
        return {
            message: "El nombre es obligatorio",
            isValid: false
        }
    }
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


export function validateCity( city ) {
    if (city && city.length >= 1) {
        if (city.length > 40)
            return { message: "Máximo 40 caracteres", isValid: false }

        return { message: "La ciudad es correcta", isValid: true }
    } else
        return { message: "La ciudad es obligatoria", isValid: false };
}


export function validateAddress( address ) {
    if (address.length > 0 && address.length < 2)
        return { message: "Mínimo 2 caracteres", isValid: false }
    else if (address.length > 40)
        return { message: "Máximo 40 caracteres", isValid: false }

    return { message: "La dirección es correcta", isValid: true }
}


export function validateInternationalPhoneNumber( phoneNumber ) {
    let phoneNumberMatch = phoneNumber.match(/^([0|\+[0-9]{1,4})?([0-9]{6,10})$/);

    if( phoneNumberMatch )
        return { message: "Numero válido", isValid: true }
    else
        return { message: "El numero no es válido", isValid: false }
}


export function validateWebURL( webURL ) {
    let webURLMatch = webURL.match(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*)*$/);

    if( webURLMatch )
        return { message: "Página web válida", isValid: true }
    else
        return { message: "La página web no es válida", isValid: false }
}