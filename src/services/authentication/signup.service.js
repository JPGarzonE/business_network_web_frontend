import RequestService from "../requests/request.service.js";
import FileService from "../multimedia/file.service.js";
import UserVerificationService from "../verifications/user.verification.service.js";

export default class SignupService extends RequestService {

    constructor(){
        super();
        this._fileService = new FileService();
        this._userVerificationService = new UserVerificationService();
    }

    get signupPath(){
        return "users/signup/";
    }

    async signup( userData ){

        if( !userData )
            throw new Error("user data is required in SignupService.signup");

        return this.post( this.signupPath, {'Content-Type': 'application/json'}, userData);
    }

    async signupWithCertificate( userData, certificateFile ){

        if( !userData )
            throw new Error("user data is required in SignupService.signupWithCertificate");

        if( !certificateFile )
            throw new Error("CertificateFile is required in SignupService.signupWithCertificate");

        const SignupData = await this.signup( userData );
        const AccessToken = await SignupData.access_token;

        const Verification = await this._userVerificationService.uploadUserCertificate( AccessToken, certificateFile );
        return Verification;
    }
}