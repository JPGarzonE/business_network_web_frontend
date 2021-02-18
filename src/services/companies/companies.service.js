import RequestService from "../requests/request.service.js";
import ImageService from "../multimedia/image.service.js";

export default class CompanyService extends RequestService {

    constructor(){
        super();

        this._imageService = new ImageService();
    }

    getCompaniesPath( accountname ){
        if( accountname )
            return `/companies/${accountname}/`;
        else
            return '/companies/';
    }

    getSupplierActivationPath( accountname ) {
        return `/suppliers/${accountname}/activate/`;
    }

    getBuyerActivationPath( accountname ) {
        return `/buyers/${accountname}/activate/`;
    }

    getCompanies( {limit = null, offset = null} ) {
        let params = {};

        if( limit ) params.limit = limit;
        if( offset ) params.offset = offset;

        return this.get({
            endpoint: this.getCompaniesPath(),
            params
        });
    }

    getCompany( accountname ){
        if( !accountname )
            throw new Error("accountname is required in CompanyService.getCompany");

        return this.get( this.getCompaniesPath(accountname), {'Content-Type': 'application/json'}, null );
    }

    async updateCompanyLogo( accountname, logo, session ){
        if( !accountname )
            throw new Error("accountname is required in CompanyService.updateCompanyLogo");

        if( !logo )
            throw new Error("logo is required in CompanyService.updateCompanyLogo");

        if( !session )
            throw new Error("session is required in CompanyService.updateCompanyLogo");

        const Logo = await this._imageService.uploadImage( logo, session );
        const Data = {
            "logo_id": Logo.id
        }

        return this.patch({
            endpoint: this.getCompaniesPath(accountname),
            data: Data,
            session
        });
    }

    activateCompanyAsSupplier( accountname, session ) {
        if( !accountname )
            throw new Error("accountname is required in CompanyService.activateCompanyAsSupplier");

        if( !session )
            throw new Error("session is required in CompanyService.activateCompanyAsSupplier");

        return this.post({
            endpoint: this.getSupplierActivationPath(accountname),
            session: session
        });
    }

    activateCompanyAsBuyer( accountname, session ) {
        if( !accountname )
            throw new Error("accountname is required in CompanyService.activateCompanyAsBuyer");

        if( !session )
            throw new Error("session is required in CompanyService.activateCompanyAsBuyer");

        return this.post({
            endpoint: this.getBuyerActivationPath(accountname),
            session: session
        });
    }

}