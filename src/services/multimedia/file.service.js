import RequestService from "../requests/request.service.js";
import RequestError from '../requests/requestError.js';

export default class FileService extends RequestService {

    constructor(){
        super();
    }

    get filesPath(){
        return "/files/";
    }

    get filesURL(){
        const RequestURL = this.URL;
        const filesPath = this.filesPath;
        RequestURL.pathname = filesPath.startsWith("/") ? filesPath : "/" + filesPath;
        return RequestURL;
    }

    async uploadUserFile( file, accessToken ){
        if( !file )
            throw new Error("File is required in FileService.uploadUserFile");

        if( !accessToken )
            throw new Error("AccessToken is required in FileService.uploadUserFile");

        let data = new FormData();
        data.append('file', file);
        data.append('purpose', 'Company comercial certificate');

        const headers = {
            'Authorization': 'Token ' + accessToken
        }

        return fetch( this.filesURL, {
            method: 'POST',
            headers: headers,
            body: data
        })
        .then( async (response)=>{
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

    getFileById( fileID ){
        if( !fileID )
            throw new Error("File ID is required in FileService.getFileById");
        
        return this.get( this.filesPath, {'Content-Type': 'application/json'}, null );
    }

}