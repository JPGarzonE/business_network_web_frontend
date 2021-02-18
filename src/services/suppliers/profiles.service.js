import RequestService from "../requests/request.service.js";

export default class ProfilesService extends RequestService {
    
    constructor() {
        super();
    }

    getSupplierProfilePath(accountname) {
       return `suppliers/${accountname}/profile/`;
    }

    getSupplierProfile( accountname, session = {} ) {
        if( !accountname ) 
            throw new Error("accountname is required in ProfilesService.getSupplierProfile");

        return this.get({
            endpoint: this.getSupplierProfilePath(accountname),
            session
        });
    }

}