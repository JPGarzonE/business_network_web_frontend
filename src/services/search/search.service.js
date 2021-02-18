import RequestService from "../requests/request.service.js";

export default class SearchService extends RequestService{

    constructor(){
        super();
    }

    get searchPath(){
        return '/search/';
    }

    get userSearchPath(){
        return "/users/";
    }

    getUserByEmail( email ){
        this.customSearch( this.userSearchPath, {email: email} );
    }

    search( params ){
        return this.customSearch( this.searchPath, params );
    }

    customSearch( endpoint, params ){
        if( !endpoint )
            throw new Error("Endpoint is required in SearchService.customSearch");

        return this.get({
            endpoint,
            params
        });
    }

}