import RequestService from "../requests/request.service.js";

export default class LoginService extends RequestService{

    constructor(){
        super();
    }

    get loginPath(){
        return 'users/login/';
    }

    login( userData ){
        if( !userData )
            throw new Error("userData is required in LoginService.login");
        
        if( !userData.username )
            throw new Error("userData.username is required in LoginService.login");

        if( !userData.password )
            throw new Error("userData.password is required in LoginService.login");

        return this.post( this.loginPath, {'Content-Type': 'application/json'}, userData);
    }
}