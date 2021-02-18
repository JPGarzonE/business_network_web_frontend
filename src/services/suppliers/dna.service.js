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

        return this.get({
            endpoint: this.getSupplierDNAPath( accountname )
        });
    }

    getDnaelementById( dnaelementID ){
        if( !dnaelementID )
            throw new Error("dnaelementID is required in DNAService.getDnalementById");

        const endpoint = this.DNAPath + dnaelementID + "/";

        return this.get( { endpoint } );
    }

    createSupplierDnaelement( accountname, dnaelementData, session ){
        if( !accountname )
            throw new Error("accountname is required in DNAService.createSupplierDnaelement");

        if( !session )
            throw new Error("session is required in DNAService.createSupplierDnaelement");

        return this.post({
            endpoint: this.getSupplierDNAPath(accountname),
            data: dnaelementData,
            session
        });
    }

    async createSupplierDnaelementWithImage( accountname, image, dnaelementData, session ){
        if( !accountname )
            throw new Error("accountname is required in DNAService.createSupplierDnaelementWithImage");

        if( !image )
            throw new Error("logo is required in DNAService.createSupplierDnaelementWithImage");

        if( !session )
            throw new Error("session is required in DNAService.createSupplierDnaelementWithImage");

        const Image = await this._imageService.uploadImage( image, session );
        dnaelementData.image_id = Image.id;

        return this.post({
            endpoint: this.getSupplierDNAPath(accountname),
            data: dnaelementData,
            session
        });
    }

    updateSupplierDnaelement( accountname, dnaelementID, dnaelementData, session ){
        if( !accountname )
            throw new Error("accountname is required in DNAService.updateSupplierDnaelement");

        if( !dnaelementID )
            throw new Error("dnaelmentID is required in DNAService.updateSupplierDnaelement");

        if( !session )
            throw new Error("session is required in DNAService.updateSupplierDnaelement");

        const endpoint = this.getSupplierDNAPath(accountname) + dnaelementID + "/";

        return this.patch({
            endpoint,
            data: dnaelementData,
            session
        });
    }

    async updateSupplierDnaelementWithImage( accountname, dnaelementID, image, dnaelementData, session ){
        if( !accountname )
            throw new Error("accountname is required in DnaelementService.updateSupplierDnaelementWithImage");

        if( !dnaelementID )
            throw new Error("dnaelementID is required in DnaelementService.updateSupplierDnaelementWithImage");

        if( !image )
            throw new Error("logo is required in DnaelementService.updateSupplierDnaelementWithImage");

        if( !session )
            throw new Error("session is required in DnaelementService.updateSupplierDnaelementWithImage");

        const endpoint = this.getSupplierDNAPath(accountname) + dnaelementID + "/";

        const Image = await this._imageService.uploadImage( image, session );
        dnaelementData.image_id = Image.id;

        return this.patch({
            endpoint,
            data: dnaelementData,
            session
        });
    }

    deleteDnaelement(){

    }

}