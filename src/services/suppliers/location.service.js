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

        return this.get( this.getSupplierLocationsPath( accountname ), {'Content-Type': 'application/json'}, null );
    }

    getLocationByAccountnameAndId( accountname, locationID, accessToken ){
        if( !accountname )
            throw new Error("accountname is required in LocationService.getLocationByAccountnameAndId");

        if( !accessToken )
            throw new Error("accessToken is required in LocationService.getLocationByAccountnameAndId");

        if( !locationID )
            throw new Error("locationID is required in LocationService.getLocationByAccountnameAndId");

        const RequestUrl = this.getSupplierLocationsPath(accountname) + locationID + "/";

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        return this.get( RequestUrl, headers, null );
    }

    createSupplierLocation( accountname, locationData, accessToken ){
        if( !accountname )
            throw new Error("accountname is required in LocationService.createSupplierLocation");

        if( !accessToken )
            throw new Error("accessToken is required in LocationService.createSupplierLocation");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        return this.post(this.getSupplierLocationsPath(accountname), headers, locationData);
    }

    updateSupplierLocation( accountname, locationID, locationData, accessToken ){
        if( !accountname )
            throw new Error("accountname is required in LocationService.updateSupplierLocation");

        if( !locationID )
            throw new Error("locationID is required in LocationService.updateSupplierLocation");

        if( !accessToken )
            throw new Error("accessToken is required in LocationService.updateSupplierLocation");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const RequestUrl = this.getSupplierLocationsPath(accountname) + locationID + "/";

        return this.patch(RequestUrl, headers, locationData );
    }

    deleteSupplierLocation(){
        
    }

    deleteSupplierSaleLocation( accountname, saleLocationID, accessToken ) {
        if( !accountname )
            throw new Error("accountname is required in LocationService.deleteSupplierSaleLocation");

        if( !saleLocationID )
            throw new Error("saleLocationID is required in LocationService.deleteSupplierSaleLocation");

        if( !accessToken )
            throw new Error("accessToken is required in LocationService.deleteSupplierSaleLocation");

        const Headers = {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + accessToken
        }

        const RequestUrl = this.getSupplierSaleLocationsPath( accountname ) + saleLocationID + '/';

        return this.delete(RequestUrl, Headers);
    }

}