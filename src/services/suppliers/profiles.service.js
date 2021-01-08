import RequestService from "../requests/request.service.js";

export default class ProfilesService extends RequestService {
    
    constructor() {
        super();
    }

    getSupplierProfilePath(accountname) {
       return `suppliers/${accountname}/profile/`;
    }

    getSupplierProfile( accountname, accessToken ) {
        if( !accountname ) 
            throw new Error("accountname is required in ProfilesService.getSupplierProfile");

        let headers = {'Content-Type': 'application/json'}

        if( accessToken )
            headers['Authorization'] = 'Token ' + accessToken;

        return this.get(this.getSupplierProfilePath(accountname), headers, null, null);
    }

}