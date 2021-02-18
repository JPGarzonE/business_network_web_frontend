import RequestService from '../requests/request.service.js';
import LocationService from './location.service.js';

export default class SuppliersService extends RequestService {

    constructor() {
        super();
        this._locationService = new LocationService();
    }

    getSuppliersPath( accountname ) {
        if( accountname )
            return `/suppliers/${accountname}/`;
        else
            return '/suppliers/';
    }

    getSuppliers( {limit = null, offset = null} ) {
        let params = {};

        if( limit ) params.limit = limit;
        if( offset ) params.offset = offset;

        return this.get({
            endpoint: this.getSuppliersPath(),
            params
        });
    }

    getSupplier( accountname ) {
        if( !accountname )
            throw new Error("accountname is required in SupplierService.getSupplier");

        return this.get({
            endpoint: this.getSuppliersPath(accountname)
        });
    }

    getSupplierSummary( accountname ) {
        if( !accountname )
            throw new Error("accountname is required in SupplierService.getSupplierSummary");

        const endpoint = this.getSuppliersPath(accountname) + 'summary/';

        return this.get({
            endpoint
        });
    }

    async updateSupplierSummary( accountname, saleLocationsToDelete, summaryData, session ) {
        if( !accountname )
            throw new Error("accountname is required in SupplierService.updateSupplierSummary");

        if( !session )
            throw new Error("session is required in SupplierService.updateSupplierSummary");

        const endpoint = this.getSuppliersPath(accountname) + 'summary/';

        for( let i = 0; i < saleLocationsToDelete.length; i++) {
            await this._locationService.deleteSupplierSaleLocation(
                accountname,
                saleLocationsToDelete[i],
                session
            )
        }

        return this.patch({
            endpoint,
            data: summaryData,
            session
        });
    }

}