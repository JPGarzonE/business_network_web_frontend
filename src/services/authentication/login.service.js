import RequestService from "../requests/request.service.js";

export default class LoginService extends RequestService{

    constructor(){
        super();
    }

    get loginPath(){
        return 'users/login/';
    }

    login( email, password ){
        if( !email )
            throw new Error("email is required in LoginService.login");

        if( !password )
            throw new Error("password is required in LoginService.login");

        let loginData = {
            email: email,
            password: password
        }

        return this.post( this.loginPath, {'Content-Type': 'application/json'}, loginData );
    }
}