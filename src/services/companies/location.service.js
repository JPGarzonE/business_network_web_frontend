import RequestService from "../requests/request.service.js";

export default class LocationService extends RequestService{

    constructor(){
        super();
    }

    getUserLocationsPath( username ){
        return `/companies/${username}/locations/`;
    }

    getUserLocations( username ){
        if( !username )
            throw new Error("Username is required in LocationService.getUserLocations");

        return this.get( this.getUserLocationsPath( username ), {'Content-Type': 'application/json'}, null );
    }

    getUserPrincipalLocation( username ){
        if( !username )
            throw new Error("Username is required in LocationService.getUserPrincipalLocation");

        return this.get( this.getUserLocationsPath( username ), {'Content-Type': 'application/json'}, {principal: true} );
    }

    getLocationByUsernameAndId( username, locationID, accessToken ){
        if( !username )
            throw new Error("Username is required in LocationService.getLocationByUsernameAndId");

        if( !accessToken )
            throw new Error("accessToken is required in LocationService.getLocationByUsernameAndId");

        if( !locationID )
            throw new Error("locationID is required in LocationService.getLocationByUsernameAndId");

        const RequestUrl = this.getUserLocationsPath(username) + locationID + "/";

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        return this.get( RequestUrl, headers, null );
    }

    createUserLocation( username, locationData, accessToken ){
        if( !username )
            throw new Error("Username is required in LocationService.createUserLocation");

        if( !accessToken )
            throw new Error("accessToken is required in LocationService.createUserLocation");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        return this.post(this.getUserLocationsPath(username), headers, locationData);
    }

    updateUserLocation( username, locationID, locationData, accessToken ){
        if( !username )
            throw new Error("Username is required in LocationService.updateUserLocation");

        if( !locationID )
            throw new Error("locationID is required in LocationService.updateUserLocation");

        if( !accessToken )
            throw new Error("accessToken is required in LocationService.updateUserLocation");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const RequestUrl = this.getUserLocationsPath(username) + locationID + "/";

        return this.patch(RequestUrl, headers, locationData );
    }

    deleteUserLocation(){
        
    }

}