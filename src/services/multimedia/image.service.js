import RequestService from "../requests/request.service.js";

export default class ImageService extends RequestService {

    constructor(){
        super();
    }

    getImagesPath( id ){
        if( id )
            return `/images/${id}/`;
        else
            return "/images/";
    }

    async uploadImage( image, session ){
        if( !image )
            throw new Error("Image is required in ImageService.uploadUserImage");

        if( !session )
            throw new Error("session is required in ImageService.uploadUserImage");

        let data = new FormData()
        data.append('image', image);

        return this.post({
            endpoint: this.getImagesPath(),
            data,
            session
        });
    }

    getImageById( imageID ){
        if( !imageID )
            throw new Error("Image ID is required in ImageService.getImageById");

        return this.get({
            endpoint: this.getImagesPath( imageID )
        });
    }
}