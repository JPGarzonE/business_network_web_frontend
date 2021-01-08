import RequestService from "../requests/request.service.js";

export default class UserService extends RequestService{

    constructor() {
        super();
    }

    get userPath(){
        return '/users/';
    }

    getUser( username, accessToken ){
        // Tiene que terminar en '/' por restricciones de la API
        let requestPath = username ? this.userPath + username + "/" : this.userPath;

        let headers = {'Content-Type': 'application/json'}
    
        if( accessToken && accessToken.length >= 16 )
            headers["Authorization"] = 'Token ' + accessToken;

        return this.get( requestPath, headers, null);
    }

    getUsers(){
        return this.getUser(null, null);
    }
}