import RequestService from "../requests/request.service.js";
import FileService from "../multimedia/file.service.js";

export default class UserVerificationService extends RequestService{
    
    constructor(){
        super();
        this._fileService = new FileService();
    }

    get userVerificationPath(){
        return "/me/verification/";
    }

    get verifyAccountPath(){
        return "/users/verify/";
    }

    getUserVerification( accessToken ){
        if( !accessToken )
            throw new Error("AccessToken is required in UserVerificationService.getUserVerification");

        let header = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        return this.get( this.userVerificationPath, header, null );
    }

    addCertificateToUserVerification( accessToken, certificateID ){
        if( !accessToken )
            throw new Error("AccessToken is required in UserVerificationService.addCertificateToUserVerification");

        if( !certificateID )
            throw new Error("CertificateID is required in UserVerificationService.addCertificateToUserVerification");

        let data = {
            "documents": [certificateID]
        };

        let header = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        return this.patch(this.userVerificationPath, header, data);
    }

    async uploadUserCertificate( accessToken, certificateFile ){

        if( !accessToken )
            throw new Error("AccessToken is required in UserVerificationService.addCertificateToUserVerification");

        if( !certificateFile )
            throw new Error("CertificateFile is required in UserVerificationService.addCertificateToUserVerification");

        const File = await this._fileService.uploadUserFile( certificateFile, accessToken );
        const verification = await this.addCertificateToUserVerification( accessToken, File.id );

        return verification;
    }

    verifiyUserAccount( validationToken ){
        
        if( !validationToken )
            throw new Error("validationToken is required in UserVerificationService.verifyUserAccount");

        let data = {
            token: validationToken
        }

        return this.post(this.verifyAccountPath, {'Content-Type': 'application/json'}, data);
    }
}