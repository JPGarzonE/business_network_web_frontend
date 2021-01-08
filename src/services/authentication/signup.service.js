import RequestService from "../requests/request.service.js";
import FileService from "../multimedia/file.service.js";
import CompanyVerificationService from "../verifications/company.verification.service.js";

export default class SignupService extends RequestService {

    constructor(){
        super();
        this._fileService = new FileService();
        this._companyVerificationService = new CompanyVerificationService();
    }

    get signupSupplierPath(){
        return "suppliers/signup/";
    }

    get signupBuyerPath(){
        return "buyers/signup/";
    }

    async signupSupplier( userData ){

        if( !userData )
            throw new Error("user data is required in SignupService.signupSupplier");

        return this.post( this.signupSupplierPath, {'Content-Type': 'application/json'}, userData);
    }

    async signupBuyer( userData ){

        if( !userData )
            throw new Error("user data is required in SignupService.signupBuyer");

        return this.post( this.signupBuyerPath, {'Content-Type': 'application/json'}, userData);
    }

    async signupSupplierWithCertificate( userData, certificateFile ){

        if( !userData )
            throw new Error("user data is required in SignupService.signupSupplierWithCertificate");

        if( !certificateFile )
            throw new Error("CertificateFile is required in SignupService.signupSupplierWithCertificate");

        const SignupData = await this.signup( userData );
        const AccessToken = await SignupData.access_token;

        await this._companyVerificationService.uploadCompanyCertificate( 
            SignupData.company.accountname, AccessToken, certificateFile 
        );
        return SignupData;
    }
}