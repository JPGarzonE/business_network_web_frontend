import RequestService from "../requests/request.service.js";

export default class UserService extends RequestService{

    constructor() {
        super();
    }

    get userPath(){
        return '/users/';
    }

    getUser( username ){
        if( !username )
            throw new Error("username is required in UserService.getUser()");

        // Tiene que terminar en '/' por restricciones de la API
        const endpoint = this.userPath + username + "/";

        return this.get( { endpoint } );
    }

    getUsers( {limit = null, offset = null} ){
        let params = {};

        if( limit ) params.limit = limit;
        if( offset ) params.offset = offset;

        return this.get({
            endpoint: this.userPath,
            params
        });
    }
}