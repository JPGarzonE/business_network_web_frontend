import RequestService from "../requests/request.service.js";
import ImageService from "../multimedia/image.service.js";

export default class ProductService extends RequestService{

    constructor(){
        super();
        this._imageService = new ImageService();
    }

    getUserProductsPath( username ){
        return `/companies/${username}/products/`;
    }

    get productsPath(){
        return "/products/";
    }

    getUserProducts( username ){
        if( !username )
            throw new Error("Username is required in ProductService.getUserProducts");

        return this.get( this.getUserProductsPath( username ), {'Content-Type': 'application/json'}, null );
    }

    getProductById(productID, accessToken ){
        if( !productID )
            throw new Error("productID is required in ProductService.getProductById");
    
        if( !accessToken )
            throw new Error("accessToken is required in ProductService.getProductById");
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const RequestUrl = this.productsPath + productID + "/";

        return this.get( RequestUrl, headers, null );
    }

    createUserProduct( username, productData, accessToken ){
        if( !username )
            throw new Error("Username is required in ProductService.createUserProduct");

        if( !accessToken )
            throw new Error("accessToken is required in ProductService.createUserProduct");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        return this.post(this.getUserProductsPath(username), headers, productData );
    }

    async createUserProductWithImage( username, image, productData, accessToken ){
        if( !username )
            throw new Error("Username is required in ProductService.createUserProductWithImage");

        if( !image )
            throw new Error("logo is required in ProductService.createUserProductWithImage");

        if( !accessToken )
            throw new Error("accessToken is required in ProductService.createUserProductWithImage");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const Image = await this._imageService.uploadUserImage( image, accessToken );
        productData.media_id = Image.id;

        return this.post( this.getUserProductsPath(username), headers, productData );
    }

    updateUserProduct( username, productID, productData, accessToken ){
        if( !username )
            throw new Error("Username is required in ProductService.updateUserProduct");

        if( !productID )
            throw new Error("productID is required in ProductService.updateUserProduct");

        if( !accessToken )
            throw new Error("accessToken is required in ProductService.updateUserProduct");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const RequestUrl = this.getUserProductsPath(username) + productID + "/";

        return this.patch( RequestUrl, headers, productData );
    }

    async updateUserProductWithImage( username, productID, image, productData, accessToken ){
        if( !username )
            throw new Error("Username is required in ProductService.updateUserProductWithImage");

        if( !productID )
            throw new Error("productID is required in ProductService.updateUserProductWithImage");

        if( !image )
            throw new Error("logo is required in ProductService.updateUserProductWithImage");

        if( !accessToken )
            throw new Error("accessToken is required in ProductService.updateUserProductWithImage");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const RequestUrl = this.getUserProductsPath(username) + productID + "/";

        const Image = await this._imageService.uploadUserImage( image, accessToken );
        productData.media_id = Image.id;

        return this.patch( RequestUrl, headers, productData );
    }

    deleteUserProduct(){

    }

}