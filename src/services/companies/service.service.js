import RequestService from "../requests/request.service.js";
import ImageService from "../multimedia/image.service.js";

export default class ServiceService extends RequestService{

    constructor(){
        super();
        this._imageService = new ImageService();
    }

    getUserServicesPath( username ){
        return `/companies/${username}/services/`;
    }

    get servicesPath(){
        return "/services/";
    }

    getUserServices( username ){
        if( !username )
            throw new Error("Username is required in ServiceService.getUserServices");

        return this.get( this.getUserServicesPath( username ), {'Content-Type': 'application/json'}, null );
    }

    getServiceById( serviceID, accessToken ){
        if( !serviceID )
            throw new Error("serviceID is required in ServiceService.getServiceById");
    
        if( !accessToken )
            throw new Error("accessToken is required in ServiceService.getServiceById");
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const RequestUrl = this.servicesPath + serviceID + "/";

        return this.get( RequestUrl, headers, null );
    }

    createUserService( username, serviceData, accessToken ){
        if( !username )
            throw new Error("Username is required in ServiceService.createUserService");

        if( !accessToken )
            throw new Error("accessToken is required in ServiceService.createUserService");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        return this.post( this.getUserServicesPath(username), headers, serviceData );
    }

    async createUserServiceWithImage( username, image, serviceData, accessToken ){
        if( !username )
            throw new Error("Username is required in ServiceService.createUserServiceWithImage");

        if( !image )
            throw new Error("logo is required in ServiceService.createUserServiceWithImage");

        if( !accessToken )
            throw new Error("accessToken is required in ServiceService.createUserServiceWithImage");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const Image = await this._imageService.uploadUserImage( image, accessToken );
        serviceData.media_id = Image.id;

        return this.post( this.getUserServicesPath(username), headers, serviceData );
    }

    updateUserService( username, serviceID, serviceData, accessToken ){
        if( !username )
            throw new Error("Username is required in ServiceService.updateUserService");

        if( !serviceID )
            throw new Error("serviceID is required in ServiceService.updateUserService");

        if( !accessToken )
            throw new Error("accessToken is required in ServiceService.updateUserService");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const RequestUrl = this.getUserServicesPath(username) + serviceID + "/";

        return this.patch( RequestUrl, headers, serviceData );
    }

    async updateUserServiceWithImage( username, serviceID, image, serviceData, accessToken ){
        if( !username )
            throw new Error("Username is required in ServiceService.updateUserServiceWithImage");

        if( !serviceID )
            throw new Error("serviceID is required in ServiceService.updateUserServiceWithImage");

        if( !image )
            throw new Error("logo is required in ServiceService.updateUserServiceWithImage");

        if( !accessToken )
            throw new Error("accessToken is required in ServiceService.updateUserServiceWithImage");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const RequestUrl = this.getUserServicesPath(username) + serviceID + "/";

        const Image = await this._imageService.uploadUserImage( image, accessToken );
        serviceData.media_id = Image.id;

        return this.patch( RequestUrl, headers, serviceData );
    }

    deleteUserService(){

    }

}