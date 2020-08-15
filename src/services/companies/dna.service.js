import RequestService from "../requests/request.service.js";
import ImageService from "../multimedia/image.service.js";

export default class DNAService extends RequestService{

    constructor(){
        super();
        this._imageService = new ImageService();
    }

    getUserDNAPath( username ){
        return `/companies/${username}/dnaelements/`;
    }

    get DNAPath(){
        return "/dnaelements/";
    }

    getUserDNA( username ){
        if( !username )
            throw new Error("Username is required in DNAService.getUserDNA");

        return this.get( this.getUserDNAPath( username ), {'Content-Type': 'application/json'}, null );
    }

    getDnaelementById( dnaelementID, accessToken ){
        if( !dnaelementID )
            throw new Error("dnaelementID is required in DNAService.getDnalementById");
    
        if( !accessToken )
            throw new Error("accessToken is required in DNAService.getDnaelementById");
        
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const RequestUrl = this.DNAPath + dnaelementID + "/";

        return this.get( RequestUrl, headers, null );
    }

    createUserDnaelement( username, dnaelementData, accessToken ){
        if( !username )
            throw new Error("Username is required in DNAService.createUserDnaelement");

        if( !accessToken )
            throw new Error("accessToken is required in DNAService.createUserDnaelement");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        return this.post(this.getUserDNAPath(username), headers, dnaelementData );
    }

    async createUserDnaelementWithImage( username, image, dnaelementData, accessToken ){
        if( !username )
            throw new Error("Username is required in DNAService.createUserDnaelementWithImage");

        if( !image )
            throw new Error("logo is required in DNAService.createUserDnaelementWithImage");

        if( !accessToken )
            throw new Error("accessToken is required in DNAService.createUserDnaelementWithImage");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const Image = await this._imageService.uploadUserImage( image, accessToken );
        dnaelementData.media_id = Image.id;

        return this.post( this.getUserDNAPath(username), headers, dnaelementData );
    }

    updateUserDnaelement( username, dnaelementID, dnaelementData, accessToken ){
        if( !username )
            throw new Error("Username is required in DNAService.updateUserDnaelement");

        if( !dnaelementID )
            throw new Error("dnaelmentID is required in DNAService.updateUserDnaelement");

        if( !accessToken )
            throw new Error("accessToken is required in DNAService.updateUserDnaelement");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const RequestUrl = this.getUserDNAPath(username) + dnaelementID + "/";

        return this.patch(RequestUrl, headers, dnaelementData );
    }

    async updateUserDnaelementWithImage( username, dnaelementID, image, dnaelementData, accessToken ){
        if( !username )
            throw new Error("Username is required in DnaelementService.updateUserDnaelementWithImage");

        if( !dnaelementID )
            throw new Error("dnaelementID is required in DnaelementService.updateUserDnaelementWithImage");

        if( !image )
            throw new Error("logo is required in DnaelementService.updateUserDnaelementWithImage");

        if( !accessToken )
            throw new Error("accessToken is required in DnaelementService.updateUserDnaelementWithImage");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const RequestUrl = this.getUserDNAPath(username) + dnaelementID + "/";

        const Image = await this._imageService.uploadUserImage( image, accessToken );
        dnaelementData.media_id = Image.id;

        return this.patch( RequestUrl, headers, dnaelementData );
    }

    deleteDnaelement(){

    }

}