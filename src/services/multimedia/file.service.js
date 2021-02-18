import RequestService from "../requests/request.service.js";
import RequestError from '../requests/requestError.js';

export default class FileService extends RequestService {

    constructor(){
        super();
    }

    getFilesPath( id ){
        if( id )
            return `/files/${id}/`;
        else
           return "/files/";
    }

    async uploadFile( file, session ){
        if( !file )
            throw new Error("File is required in FileService.uploadUserFile");

        if( !session )
            throw new Error("session is required in FileService.uploadUserFile");

        let data = new FormData();
        data.append('file', file);

        return this.post({
            endpoint: this.getFilesPath(),
            data,
            session
        });
    }

    getFileById( fileID ){
        if( !fileID )
            throw new Error("File ID is required in FileService.getFileById");

        return this.get({
            endpoint: this.getFilesPath( fileID )
        });
    }

}