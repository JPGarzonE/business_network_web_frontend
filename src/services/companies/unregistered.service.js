import RequestService from '../requests/request.service.js';

export default class UnregisteredCompaniesService extends RequestService {

    constructor() {
        super();
    }

    get unregisteredPath() {
        return '/unregistered-companies/';
    }

    getUnregisteredCompanies( {limit = null, offset = null} ) {
        let params = {};

        if( limit ) params.limit = limit;
        if( offset ) params.offset = offset;

        return this.get({
            endpoint: this.unregisteredPath,
            params
        });
    }

    getUnregisteredCompany( unregisteredCompanyID ) {
        if( !unregisteredCompanyID )
            throw new Error(
                "unregisteredCompanyID is required in UnregisteredCompaniesService.getUnregisteredCompany"
            );

        const endpoint = `${this.unregisteredPath}${unregisteredCompanyID}/`;

        return this.get( { endpoint } );
    }

    createUnregisteredCompany( unregisteredCompanyData, session ) {
        if( !unregisteredCompanyData )
            throw new Error(
                "unregisteredCompanyData is required in UnregisteredCompaniesService.createUnregisteredCompany"
            );

        if( !session )
            throw new Error(
                "session is required in UnregisteredCompaniesService.createUnregisteredCompany"
            );

        return this.post({
            endpoint: this.unregisteredPath,
            data: unregisteredCompanyData,
            session
        });
    }
    
}