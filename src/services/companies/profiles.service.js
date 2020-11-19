import RequestService from "../requests/request.service.js";

export default class ProfilesService extends RequestService {
    
    constructor() {
        super();
    }

    getCompanyProfilePath(username) {
       return `companies/${username}/profile/`;
    }

    getSupplierProfile( username, accessToken ) {
        if( !username ) 
            throw new Error("username is required in ProfilesService.getSupplierProfile");

        let headers = {'Content-Type': 'application/json'}

        if( accessToken )
            headers['Authorization'] = 'Token ' + accessToken;

        return this.get(this.getCompanyProfilePath(username), headers, null, null);
    }

}