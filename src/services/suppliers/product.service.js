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
    let qSP;
    if (
      pageSettings.pageLength !== undefined &&
      pageSettings.page !== undefined && pageSettings.page > 0
    ) {
      qSP = {
        limit: pageSettings.pageLength,
        offset: (pageSettings.page-1) * pageSettings.pageLength,
      };
    }
    let requestURL = this.getSupplierProductsPath(accountname);
    return this.get(
      requestURL,
      { 'Content-Type': 'application/json' },
      qSP ? qSP : null
    );
  }

  getProductById(productID, accessToken) {
    if (!productID)
      throw new Error('productID is required in ProductService.getProductById');

    const headers = {
      'Content-Type': 'application/json',
    };

    if( accessToken )
      headers['Authorization'] = 'Token ' + accessToken;

    const RequestUrl = this.productsPath + productID + '/';

    return this.get(RequestUrl, headers, null);
  }

  createSupplierProduct({ accountname, productData, accessToken }) {
    if (!accountname)
      throw new Error(
        'accountname is required in ProductService.createSupplierProduct'
      );

    if (!accessToken)
      throw new Error(
        'accessToken is required in ProductService.createSupplierProduct'
      );

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    return this.post(this.getSupplierProductsPath(accountname), headers, productData);
  }

  async createSupplierProductWithImage({ accountname, principalImage, secondaryImages, productData, accessToken }) {
    if (!accountname)
      throw new Error('accountname is required in ProductService.createSupplierProductWithImage');

    if (!principalImage || !secondaryImages)
      throw new Error('at least an image is required in ProductService.createSupplierProductWithImage');

    if (!accessToken)
      throw new Error('accessToken is required in ProductService.createSupplierProductWithImage');

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    if( principalImage ) {
      const principalImageUploaded = await this._imageService.uploadImage(
        principalImage, accessToken
      );
      productData.principal_image_id = principalImageUploaded.id;
    }
    
    if(secondaryImages) productData.secondary_images = [];
    for (let i = 0; i < secondaryImages.length; i++) {
      if( secondaryImages[i] ) {
        const Image = await this._imageService.uploadImage(
          secondaryImages[i],
          accessToken
        );
        productData.secondary_images = [...productData.secondary_images, Image.id];
      }
    }

    return this.post(this.getSupplierProductsPath(accountname), headers, productData);
  }

  async updateSupplierProduct({ accountname, productID, imagesToDelete, productData, accessToken }) {
    if (!accountname)
      throw new Error('accountname is required in ProductService.updateSupplierProduct');

    if (!productID)
      throw new Error('productID is required in ProductService.updateSupplierProduct');

    if (!accessToken)
      throw new Error('accessToken is required in ProductService.updateSupplierProduct');

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    const RequestUrl = this.getSupplierProductsPath(accountname) + productID + '/';

    for (let i = 0; i < imagesToDelete.length; i++) {
      await this.deleteSupplierProductImage(
        productID,
        imagesToDelete[i],
        accessToken
      );
    }

    return this.patch(RequestUrl, headers, productData);
  }

  async updateSupplierProductWithImage({ accountname, productID, principalImage, secondaryImages, 
    imagesToDelete, productData, accessToken }) {
    
      if (!accountname)
      throw new Error('accountname is required in ProductService.updateSupplierProductWithImage');

    if (!productID)
      throw new Error('productID is required in ProductService.updateSupplierProductWithImage');

    if (!principalImage || !secondaryImages)
      throw new Error('at least an image is required in ProductService.createSupplierProductWithImage');

    if (!accessToken)
      throw new Error('accessToken is required in ProductService.updateSupplierProductWithImage');

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    const RequestUrl = this.getSupplierProductsPath(accountname) + productID + '/';

    for (let i = 0; i < imagesToDelete.length; i++) {
      await this.deleteSupplierProductImage(
        productID,
        imagesToDelete[i],
        accessToken
      );
    }

    if( principalImage ) {
      const principalImageUploaded = await this._imageService.uploadImage(
        principalImage, accessToken
      );
      productData.principal_image_id = principalImageUploaded.id;
    }
    
    if(secondaryImages) productData.secondary_images = [];
    for (let i = 0; i < secondaryImages.length; i++) {
      if( secondaryImages[i] ) {
        const Image = await this._imageService.uploadImage(
          secondaryImages[i],
          accessToken
        );
        productData.secondary_images = [...productData.secondary_images, Image.id];
      }
    }

    return this.patch(RequestUrl, headers, productData);
  }

  deleteSupplierProductImage(productID, imageID, accessToken) {
    if (!productID)
      throw new Error(
        'productID is required in ProductService.deleteSupplierProductImage'
      );

    if (!imageID)
      throw new Error(
        'productID is required in ProductService.deleteSupplierProductImage'
      );

    if (!accessToken)
      throw new Error(
        'accessToken is required in ProductService.deleteSupplierProductImage'
      );

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    const RequestUrl = this.getSupplierProductImagesPath(productID) + imageID + '/';

    return this.delete(RequestUrl, headers);
  }

  deleteSupplierProduct(accountname, productID, accessToken) {
    if (!accountname)
      throw new Error(
        'accountname is required in ProductService.deleteSupplierProduct'
      );

    if (!productID)
      throw new Error(
        'productID is required in ProductService.deleteSupplierProduct'
      );

    if (!accessToken)
      throw new Error(
        'accessToken is required in ProductService.deleteSupplierProduct'
      );

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    const RequestUrl = this.getSupplierProductsPath(accountname) + productID + '/';

    return this.delete(RequestUrl, headers);
  }
}
