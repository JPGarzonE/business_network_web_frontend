import RequestService from "../requests/request.service.js";
import UserVerificationService from "../verifications/user.verification.service.js";

export default class UserService extends RequestService{

    constructor() {
        super();

        this._userVerificationService = new UserVerificationService();
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

    async getUserWithVerification( username, accessToken ){
        const User = await this.getUser( username, accessToken );

        if( accessToken ){
            const Verification = await this._userVerificationService.getUserVerification( accessToken );
            let data = user;
            data["Verification"] = Verification;

            return data;
        }
        else{
            return User;
        }
    }

    getUsers(){
        return this.getUser(null, null);
    }
}