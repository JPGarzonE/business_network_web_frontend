import RequestService from "../requests/request.service.js";
import FileService from "../multimedia/file.service.js";
import CompanyVerificationService from "../verifications/company.verification.service.js";
import { setCookie, deleteCookie } from "../../modules/cookie.js";


export default class AuthService extends RequestService {

    constructor() {
        super();
        this._fileService = new FileService();
        this._companyVerificationService = new CompanyVerificationService();
    }
    
    get signupCompanyPath() {
        return 'companies/signup/';
    }

    get loginPath(){
        return 'login/';
    }

    get mePath() {
        return 'me/';
    }

    me( session ) {
        if( !session.accessToken )
            throw new Error('session accessToken is required in AuthService.me');

        if( !session.refreshToken )
            throw new Error('refreshToken is required in AuthService.me');

        return this.get({
            endpoint: this.mePath,
            session: session
        });
    }

    async signupCompany( data ) {
        if (!data)
            throw new Error('data is required in AuthService.signupSupplier');

        return this.post({
            endpoint: this.signupCompanyPath,
            data
        });
    }
   
    login( email, password ){
        if( !email )
            throw new Error("email is required in AuthService.login");

        if( !password )
            throw new Error("password is required in AuthService.login");

        let loginData = {
            email: email,
            password: password
        }

        return this.post({
            endpoint: this.loginPath,
            data: loginData
        });
    }

    // only executes in client
    setSession({ session = {}, tokens, user = null, access_company = null, lifeTimeHours = 24 }) {
        const onlyUpdateCookieSession = session === null || 
            session === undefined || 
            Object.entries(session).length < 1;

        const expires = new Date( 
            new Date().getTime() + lifeTimeHours*60*60*1000 
        );

        setCookie(this.accessTokenCookieName, tokens.access, {expires});
        setCookie(this.refreshTokenCookieName, tokens.refresh, {expires});

        if( !onlyUpdateCookieSession ) {
            session.accessToken = tokens.access;
            session.refreshToken = tokens.refresh;
            session.authenticated = true;
            session.user = user;
            session.user_isVerified = user.is_verified;
            session.user_username = user.username;
    
            if( access_company ) {
                session.company = access_company;
                session.company_accountname = access_company.accountname;
            }
        }
    }

    // only executes in client
    closeSession( session ) {
        session = {
            authenticated: false
        };
        deleteCookie( this.accessTokenCookieName );
        deleteCookie( this.refreshTokenCookieName );
    }

    // A user could have access to many companies in the platform
    // Each user acces token is for only one company
    changeAccessCompany( session, companyAccountname ) {
        if( !session && !session.refreshToken )
            throw new Error("session refresh token is required in AuthService.changeAccessCompany");

        const params = companyAccountname ? {
            company: companyAccountname
        }
        : null;

        return this.refreshCredentials({
            session,
            params
        });
    }

}