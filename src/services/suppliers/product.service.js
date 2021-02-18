import RequestService from '../requests/request.service.js';
import ImageService from '../multimedia/image.service.js';

export default class ProductService extends RequestService {
  constructor() {
    super();
    this._imageService = new ImageService();
  }

  getSupplierProductsPath(accountname) {
    return `/suppliers/${accountname}/products/`;
  }

  getSupplierProductImagesPath(productId) {
    return `/products/${productId}/images/`;
  }

  get productsPath() {
    return '/products/';
  }

  getSupplierProducts(accountname, pageSettings = {}) {
    if (!accountname)
      throw new Error('accountname is required in ProductService.getSupplierProducts');
    
    let queryParams;
    
    if ( pageSettings.pageLength !== undefined &&
      pageSettings.page !== undefined && pageSettings.page > 0 ) {
  
      queryParams = {
        limit: pageSettings.pageLength,
        offset: (pageSettings.page-1) * pageSettings.pageLength,
      };
    }

    const endpoint = this.getSupplierProductsPath(accountname);

    return this.get({
      endpoint,
      params: queryParams
    });
  }

  getProductById(productID) {
    if (!productID)
      throw new Error('productID is required in ProductService.getProductById');

    const endpoint = this.productsPath + productID + '/';

    return this.get({
      endpoint
    });
  }

  createSupplierProduct( accountname, productData, session ) {
    if (!accountname)
      throw new Error(
        'accountname is required in ProductService.createSupplierProduct'
      );

    if (!session)
      throw new Error(
        'session is required in ProductService.createSupplierProduct'
      );

    return this.post({
      endpoint: this.getSupplierProductsPath(accountname),
      data: productData,
      session
    });
  }

  async createSupplierProductWithImage({ accountname, principalImage, secondaryImages, productData, session }) {
    if (!accountname)
      throw new Error('accountname is required in ProductService.createSupplierProductWithImage');

    if (!principalImage && !secondaryImages)
      throw new Error('at least an image is required in ProductService.createSupplierProductWithImage');

    if (!session)
      throw new Error('session is required in ProductService.createSupplierProductWithImage');

    if( principalImage ) {
      const principalImageUploaded = await this._imageService.uploadImage(
        principalImage, session
      );
      productData.principal_image_id = principalImageUploaded.id;
    }
    
    if(secondaryImages) productData.secondary_images = [];
    for (let i = 0; i < secondaryImages.length; i++) {
      if( secondaryImages[i] ) {
        const Image = await this._imageService.uploadImage(
          secondaryImages[i],
          session
        );
        productData.secondary_images = [...productData.secondary_images, Image.id];
      }
    }

    return this.post({
      endpoint: this.getSupplierProductsPath(accountname),
      data: productData,
      session
    });
  }

  async updateSupplierProduct({ accountname, productID, imagesToDelete, productData, session }) {
    if (!accountname)
      throw new Error('accountname is required in ProductService.updateSupplierProduct');

    if (!productID)
      throw new Error('productID is required in ProductService.updateSupplierProduct');

    if (!session)
      throw new Error('session is required in ProductService.updateSupplierProduct');

    const endpoint = this.getSupplierProductsPath(accountname) + productID + '/';

    for (let i = 0; i < imagesToDelete.length; i++) {
      await this.deleteSupplierProductImage(
        productID,
        imagesToDelete[i],
        session
      );
    }

    return this.patch({
      endpoint,
      data: productData,
      session
    });
  }

  async updateSupplierProductWithImage({ accountname, productID, principalImage, secondaryImages, 
    imagesToDelete, productData, session }) {

    if (!accountname)
      throw new Error('accountname is required in ProductService.updateSupplierProductWithImage');

    if (!productID)
      throw new Error('productID is required in ProductService.updateSupplierProductWithImage');

    if (!principalImage && !secondaryImages)
      throw new Error('at least an image is required in ProductService.createSupplierProductWithImage');

    if (!session)
      throw new Error('session is required in ProductService.updateSupplierProductWithImage');

    const endpoint = this.getSupplierProductsPath(accountname) + productID + '/';

    for (let i = 0; i < imagesToDelete.length; i++) {
      await this.deleteSupplierProductImage(
        productID,
        imagesToDelete[i],
        session
      );
    }

    if( principalImage ) {
      const principalImageUploaded = await this._imageService.uploadImage(
        principalImage, session
      );
      productData.principal_image_id = principalImageUploaded.id;
    }
    
    if(secondaryImages) productData.secondary_images = [];
    for (let i = 0; i < secondaryImages.length; i++) {
      if( secondaryImages[i] ) {
        const Image = await this._imageService.uploadImage(
          secondaryImages[i],
          session
        );
        productData.secondary_images = [...productData.secondary_images, Image.id];
      }
    }

    return this.patch({
      endpoint,
      data: productData,
      session
    });
  }

  deleteSupplierProductImage(productID, imageID, session) {
    if (!productID)
      throw new Error(
        'productID is required in ProductService.deleteSupplierProductImage'
      );

    if (!imageID)
      throw new Error(
        'productID is required in ProductService.deleteSupplierProductImage'
      );

    if (!session)
      throw new Error(
        'session is required in ProductService.deleteSupplierProductImage'
      );

    const endpoint = this.getSupplierProductImagesPath(productID) + imageID + '/';

    return this.delete({
      endpoint,
      session
    });
  }

  deleteSupplierProduct(accountname, productID, session) {
    if (!accountname)
      throw new Error(
        'accountname is required in ProductService.deleteSupplierProduct'
      );

    if (!productID)
      throw new Error(
        'productID is required in ProductService.deleteSupplierProduct'
      );

    if (!session)
      throw new Error(
        'session is required in ProductService.deleteSupplierProduct'
      );

    const endpoint = this.getSupplierProductsPath(accountname) + productID + '/';

    return this.delete({
      endpoint,
      session
    });
  }
}
