import RequestService from "../requests/request.service.js";
import FileService from "../multimedia/file.service.js";

export default class CompanyVerificationService extends RequestService{
    
    constructor(){
        super();
        this._fileService = new FileService();
    }

    getCompanyVerificationPath( accountname ){
        return `companies/${accountname}/verification`;
    }

    get verifyCompanyPath(){
        return "/companies/verification/verify/";
    }

    getCompanyVerification( accountname, accessToken ){
        if( accountname )
            throw new Error("accountname is required in CompanyVerificationService.getCompanyVerification")

        if( !accessToken )
            throw new Error("accessToken is required in CompanyVerificationService.getCompanyVerification");

        let header = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        return this.get( this.getCompanyVerificationPath( accountname ), header, null );
    }

    addCertificateToCompanyVerification( accountname, accessToken, certificateID ){
        if( !accountname )
            throw new Error("accountname is required in CompanyVerificationService.addCertificateToCompanyVerification");

        if( !accessToken )
            throw new Error("AccessToken is required in CompanyVerificationService.addCertificateToCompanyVerification");

        if( !certificateID )
            throw new Error("CertificateID is required in CompanyVerificationService.addCertificateToCompanyVerification");

        let data = {
            "files": [certificateID]
        };

        let header = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        return this.patch( this.getCompanyVerificationPath( accountname ), header, data );
    }

    async uploadCompanyCertificate( accountname, accessToken, certificateFile ){
        /* Upload certificate file and associta to the verification of the company */

        if( !accountname )
            throw new Error("accountname is required in CompanyVerificationService.uploadCompanyCertificate");

        if( !accessToken )
            throw new Error("AccessToken is required in CompanyVerificationService.uploadCompanyCertificate");

        if( !certificateFile )
            throw new Error("CertificateFile is required in CompanyVerificationService.uploadCompanyCertificate");

        const File = await this._fileService.uploadFile( certificateFile, accessToken );
        const verification = await this.addCertificateToCompanyVerification( accessToken, File.id );

        return verification;
    }

    verifiyUserAccount( validationToken ){
        
        if( !validationToken )
            throw new Error("validationToken is required in CompanyVerificationService.verifyUserAccount");

        let data = {
            token: validationToken
        }

        return this.post(this.verifyAccountPath, {'Content-Type': 'application/json'}, data);
    }
}