import RequestService from "../requests/request.service.js";
import ImageService from "../multimedia/image.service.js";

export default class CompanyService extends RequestService {

    constructor(){
        super();

        this._imageService = new ImageService();
    }

    getCompaniesPath( accountname ){
        return `/companies/${accountname}/`;
    }

    getCompanySummaryPath( accountname ){
        return this.getCompaniesPath( accountname ) + "summary/"
    }

    getCompany( accountname ){
        if( !accountname )
            throw new Error("Username is required in CompanyService.getCompany");

        return this.get( this.getCompaniesPath(accountname), {'Content-Type': 'application/json'}, null );
    }

    async updateCompanyLogo( username, logo, accessToken ){
        if( !username )
            throw new Error("Username is required in CompanyService.updateCompanyLogo");

        if( !logo )
            throw new Error("logo is required in CompanyService.updateCompanyLogo");

        if( !accessToken )
            throw new Error("accessToken is required in CompanyService.updateCompanyLogo");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const Logo = await this._imageService.uploadUserImage( logo, accessToken );
        const Data = {
            "logo_id": Logo.id
        }

        const Company = await this.patch( this.getCompaniesPath(username), headers, Data );
        return Company;
    }

}