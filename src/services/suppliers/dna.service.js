import RequestService from "../requests/request.service.js";
import ImageService from "../multimedia/image.service.js";

export default class DNAService extends RequestService{

    constructor(){
        super();
        this._imageService = new ImageService();
    }

    getSupplierDNAPath( accountname ){
        return `/suppliers/${accountname}/dnaelements/`;
    }

    get DNAPath(){
        return "/dnaelements/";
    }

    getSupplierDNA( accountname ){
        if( !accountname )
            throw new Error("accountname is required in DNAService.getSupplierDNA");

        return this.get( this.getSupplierDNAPath( accountname ), {'Content-Type': 'application/json'}, null );
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

    createSupplierDnaelement( accountname, dnaelementData, accessToken ){
        if( !accountname )
            throw new Error("accountname is required in DNAService.createSupplierDnaelement");

        if( !accessToken )
            throw new Error("accessToken is required in DNAService.createSupplierDnaelement");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        return this.post(this.getSupplierDNAPath(accountname), headers, dnaelementData );
    }

    async createSupplierDnaelementWithImage( accountname, image, dnaelementData, accessToken ){
        if( !accountname )
            throw new Error("accountname is required in DNAService.createSupplierDnaelementWithImage");

        if( !image )
            throw new Error("logo is required in DNAService.createSupplierDnaelementWithImage");

        if( !accessToken )
            throw new Error("accessToken is required in DNAService.createSupplierDnaelementWithImage");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const Image = await this._imageService.uploadImage( image, accessToken );
        dnaelementData.media_id = Image.id;

        return this.post( this.getSupplierDNAPath(accountname), headers, dnaelementData );
    }

    updateSupplierDnaelement( accountname, dnaelementID, dnaelementData, accessToken ){
        if( !accountname )
            throw new Error("accountname is required in DNAService.updateSupplierDnaelement");

        if( !dnaelementID )
            throw new Error("dnaelmentID is required in DNAService.updateSupplierDnaelement");

        if( !accessToken )
            throw new Error("accessToken is required in DNAService.updateSupplierDnaelement");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const RequestUrl = this.getSupplierDNAPath(accountname) + dnaelementID + "/";

        return this.patch(RequestUrl, headers, dnaelementData );
    }

    async updateSupplierDnaelementWithImage( accountname, dnaelementID, image, dnaelementData, accessToken ){
        if( !accountname )
            throw new Error("accountname is required in DnaelementService.updateSupplierDnaelementWithImage");

        if( !dnaelementID )
            throw new Error("dnaelementID is required in DnaelementService.updateSupplierDnaelementWithImage");

        if( !image )
            throw new Error("logo is required in DnaelementService.updateSupplierDnaelementWithImage");

        if( !accessToken )
            throw new Error("accessToken is required in DnaelementService.updateSupplierDnaelementWithImage");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const RequestUrl = this.getSupplierDNAPath(accountname) + dnaelementID + "/";

        const Image = await this._imageService.uploadImage( image, accessToken );
        dnaelementData.media_id = Image.id;

        return this.patch( RequestUrl, headers, dnaelementData );
    }

    deleteDnaelement(){

    }

}