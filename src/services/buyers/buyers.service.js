import RequestService from '../requests/request.service.js';

export default class BuyersService extends RequestService {

    constructor() {
        super();
    }

    get baseHeader() {
        return {
            'Content-Type': 'application/json'
        }
    }

    getBuyersPath( accountname ) {
        return `/buyers/${accountname}/`;
    }
    
    getBuyer( accountname ) {
        if( !accountname )
            throw new Error("accountname is required in SupplierService.getSupplier");

        const Header = {...this.baseHeader};

        return this.get( 
            this.getBuyersPath(accountname),
            Header,
            null
        );
    }
    
}