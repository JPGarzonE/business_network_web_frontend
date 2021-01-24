import RequestService from '../requests/request.service.js';

export default class UnregisteredCompaniesService extends RequestService {

    constructor() {
        super();
    }

    get baseHeader() {
        return {
            'Content-Type': 'application/json'
        }
    }

    get authPrefix() {
        return "Bearer";
    }

    get unregisteredPath() {
        return '/unregistered-companies/';
    }

    getUnregisteredCompany( unregisteredCompanyID ) {
        if( !unregisteredCompanyID )
            throw new Error(
                "unregisteredCompanyID is required in UnregisteredCompaniesService.getUnregisteredCompany"
            );

        const Headers = {...this.baseHeader};

        const RequestURL = `${this.unregisteredPath}${unregisteredCompanyID}/`;

        return this.get( RequestURL, Headers, null );
    }

    createUnregisteredCompany( unregisteredCompanyData, accessToken ) {
        if( !unregisteredCompanyData )
            throw new Error(
                "unregisteredCompanyData is required in UnregisteredCompaniesService.createUnregisteredCompany"
            );

        if( !accessToken )
            throw new Error(
                "accessToken is required in UnregisteredCompaniesService.createUnregisteredCompany"
            );

        const Headers = {
            ...this.baseHeader,
            Authorization: `${this.authPrefix} ${accessToken}`
        };

        return this.post( this.unregisteredPath, Headers, unregisteredCompanyData );
    }
    
}