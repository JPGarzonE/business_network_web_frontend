import RequestService from "../requests/request.service.js";

export default class LocationService extends RequestService{

    constructor(){
        super();
    }

    getSupplierLocationsPath( accountname ){
        return `/suppliers/${accountname}/locations/`;
    }

    getSupplierSaleLocationsPath( accountname ) {
        return `/suppliers/${accountname}/sale-locations/`;
    }

    getSupplierLocations( accountname ){
        if( !accountname )
            throw new Error("accountname is required in LocationService.getSupplierLocations");

        return this.get({
            endpoint: this.getSupplierLocationsPath(accountname)
        });
    }

    getSupplierLocationById( accountname, locationID ){
        if( !accountname )
            throw new Error("accountname is required in LocationService.getLocationByAccountnameAndId");

        if( !locationID )
            throw new Error("locationID is required in LocationService.getLocationByAccountnameAndId");

        const endpoint = this.getSupplierLocationsPath(accountname) + locationID + "/";

        return this.get( { endpoint } );
    }

    createSupplierLocation( accountname, locationData, session ){
        if( !accountname )
            throw new Error("accountname is required in LocationService.createSupplierLocation");

        if( !session )
            throw new Error("session is required in LocationService.createSupplierLocation");

        return this.post({
            endpoint: this.getSupplierLocationsPath(accountname),
            data: locationData,
            session
        });
    }

    updateSupplierLocation( accountname, locationID, locationData, session ){
        if( !accountname )
            throw new Error("accountname is required in LocationService.updateSupplierLocation");

        if( !locationID )
            throw new Error("locationID is required in LocationService.updateSupplierLocation");

        if( !session )
            throw new Error("session is required in LocationService.updateSupplierLocation");

        const endpoint = this.getSupplierLocationsPath(accountname) + locationID + "/";

        return this.patch({
            endpoint,
            data: locationData,
            session
        });
    }

    deleteSupplierLocation(){
        
    }

    deleteSupplierSaleLocation( accountname, saleLocationID, session ) {
        if( !accountname )
            throw new Error("accountname is required in LocationService.deleteSupplierSaleLocation");

        if( !saleLocationID )
            throw new Error("saleLocationID is required in LocationService.deleteSupplierSaleLocation");

        if( !session )
            throw new Error("session is required in LocationService.deleteSupplierSaleLocation");

        const endpoint = this.getSupplierSaleLocationsPath( accountname ) + saleLocationID + '/';

        return this.delete({
            endpoint,
            session
        });
    }

}