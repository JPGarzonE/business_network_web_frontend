import RequestService from "../requests/request.service.js";

export default class ImageService extends RequestService {

    constructor(){
        super();
    }

    get imagesPath(){
        return "/images/";
    }

    get imagesURL(){
        const RequestURL = this.URL;
        const imagesPath = this.imagesPath;
        RequestURL.pathname = imagesPath.startsWith("/") ? imagesPath : "/" + imagesPath;
        return RequestURL;
    }

    async uploadImage( image, accessToken ){
        if( !image )
            throw new Error("Image is required in ImageService.uploadUserImage");

        if( !accessToken )
            throw new Error("AccessToken is required in ImageService.uploadUserImage");

        let data = new FormData()
        data.append('image', image);

        const headers = {
            'Authorization': 'Token ' + accessToken
        }

        return fetch( this.imagesURL, {
            method: 'POST',
            headers: headers,
            body: data
        })
        .then( (response)=>{
            return response.json().then( data => {
                if( response.ok )
                    return data
                else
                    throw new RequestError({
                        status: response.status,
                        message: data
                    });
            })
        });
    }

    getImageById( imageID ){
        if( !imageID )
            throw new Error("Image ID is required in ImageService.getImageById");
        
        return this.get( this.imagesPath, {'Content-Type': 'application/json'}, null );
    }
}