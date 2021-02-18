import { off } from 'process';
import RequestService from '../requests/request.service.js';

export default class BuyersService extends RequestService {

    constructor() {
        super();
    }

    getBuyersPath( accountname ) {
        if( accountname )
            return `/buyers/${accountname}/`;
        else
            return '/buyers/';
    }

    getBuyers( {limit = null, offset = null} ) {
        let params = {};

        if( limit ) params.limit = limit;
        if( offset ) params.offset = offset;

        return this.get({
            endpoint: this.getBuyersPath(),
            params
        });
    }
    
    getBuyer( accountname ) {
        if( !accountname )
            throw new Error("accountname is required in SupplierService.getSupplier");

        return this.get({
            endpoint: this.getBuyersPath(accountname),
        });
    }
    
}