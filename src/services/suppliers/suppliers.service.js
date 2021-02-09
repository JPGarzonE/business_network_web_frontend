import RequestService from '../requests/request.service.js';
import LocationService from './location.service.js';

export default class SuppliersService extends RequestService {

    constructor() {
        super();
        this._locationService = new LocationService();
    }

    get baseHeader() {
        return {
            'Content-Type': 'application/json'
        }
    }

    get authPrefix() {
        return "Token";
    }

    getSuppliersPath( accountname ) {
        return `/suppliers/${accountname}/`;
    }

    getSupplier( accountname ) {
        if( !accountname )
            throw new Error("accountname is required in SupplierService.getSupplier");

        const Headers = {...this.baseHeader};

        return this.get( 
            this.getSuppliersPath(accountname),
            Headers,
            null
        );
    }

    getSupplierSummary( accountname ) {
        if( !accountname )
            throw new Error("accountname is required in SupplierService.getSupplierSummary");

        const Headers = {...this.baseHeader};

        const RequestURL = this.getSuppliersPath(accountname) + 'summary/';

        return this.get( RequestURL, Headers, null );
    }

    async updateSupplierSummary( accountname, saleLocationsToDelete, summaryData, accessToken ) {
        if( !accountname )
            throw new Error("accountname is required in SupplierService.updateSupplierSummary");

        if( !accessToken )
            throw new Error("accessToken is required in SupplierService.updateSupplierSummary");

        const Headers = {
            ...this.baseHeader,
            Authorization: `${this.authPrefix} ${accessToken}`
        }

        const RequestURL = this.getSuppliersPath(accountname) + 'summary/';

        for( let i = 0; i < saleLocationsToDelete.length; i++) {
            await this._locationService.deleteSupplierSaleLocation(
                accountname,
                saleLocationsToDelete[i],
                accessToken
            )
        }

        return this.patch( RequestURL, Headers, summaryData );
    }

}