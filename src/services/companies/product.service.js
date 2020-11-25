import RequestService from '../requests/request.service.js';
import ImageService from '../multimedia/image.service.js';

export default class ProductService extends RequestService {
  constructor() {
    super();
    this._imageService = new ImageService();
  }

  getUserProductsPath(username) {
    return `/companies/${username}/products/`;
  }

  getUserProductImagesPath(productId) {
    return `/products/${productId}/images/`;
  }

  get productsPath() {
    return '/products/';
  }

  getUserProducts(username, pageSettings = {}) {
    if (!username)
      throw new Error('Username is required in ProductService.getUserProducts');
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
    let requestURL = this.getUserProductsPath(username);
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

  createUserProduct({ username, productData, accessToken }) {
    if (!username)
      throw new Error(
        'Username is required in ProductService.createUserProduct'
      );

    if (!accessToken)
      throw new Error(
        'accessToken is required in ProductService.createUserProduct'
      );

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    return this.post(this.getUserProductsPath(username), headers, productData);
  }

  async createUserProductWithImage({ username, principalImage, secondaryImages, productData, accessToken }) {
    if (!username)
      throw new Error('Username is required in ProductService.createUserProductWithImage');

    if (!principalImage || !secondaryImages)
      throw new Error('at least an image is required in ProductService.createUserProductWithImage');

    if (!accessToken)
      throw new Error('accessToken is required in ProductService.createUserProductWithImage');

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    if( principalImage ) {
      const principalImageUploaded = await this._imageService.uploadUserImage(
        principalImage, accessToken
      );
      productData.principal_image_id = principalImageUploaded.id;
    }
    
    if(secondaryImages) productData.secondary_images = [];
    for (let i = 0; i < secondaryImages.length; i++) {
      if( secondaryImages[i] ) {
        const Image = await this._imageService.uploadUserImage(
          secondaryImages[i],
          accessToken
        );
        productData.secondary_images = [...productData.secondary_images, Image.id];
      }
    }

    return this.post(this.getUserProductsPath(username), headers, productData);
  }

  async updateUserProduct({ username, productID, imagesToDelete, productData, accessToken }) {
    if (!username)
      throw new Error('Username is required in ProductService.updateUserProduct');

    if (!productID)
      throw new Error('productID is required in ProductService.updateUserProduct');

    if (!accessToken)
      throw new Error('accessToken is required in ProductService.updateUserProduct');

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    const RequestUrl = this.getUserProductsPath(username) + productID + '/';

    for (let i = 0; i < imagesToDelete.length; i++) {
      await this.deleteUserProductImage(
        productID,
        imagesToDelete[i].id,
        accessToken
      );
    }

    return this.patch(RequestUrl, headers, productData);
  }

  async updateUserProductWithImage({ username, productID, principalImage, secondaryImages, 
    imagesToDelete, productData, accessToken }) {
    
      if (!username)
      throw new Error('Username is required in ProductService.updateUserProductWithImage');

    if (!productID)
      throw new Error('productID is required in ProductService.updateUserProductWithImage');

    if (!principalImage || !secondaryImages)
      throw new Error('at least an image is required in ProductService.createUserProductWithImage');

    if (!accessToken)
      throw new Error('accessToken is required in ProductService.updateUserProductWithImage');

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    const RequestUrl = this.getUserProductsPath(username) + productID + '/';

    for (let i = 0; i < imagesToDelete.length; i++) {
      await this.deleteUserProductImage(
        productID,
        imagesToDelete[i].id,
        accessToken
      );
    }

    if( principalImage ) {
      const principalImageUploaded = await this._imageService.uploadUserImage(
        principalImage, accessToken
      );
      productData.principal_image_id = principalImageUploaded.id;
    }
    
    if(secondaryImages) productData.secondary_images = [];
    for (let i = 0; i < secondaryImages.length; i++) {
      if( secondaryImages[i] ) {
        const Image = await this._imageService.uploadUserImage(
          secondaryImages[i],
          accessToken
        );
        productData.secondary_images = [...productData.secondary_images, Image.id];
      }
    }

    return this.patch(RequestUrl, headers, productData);
  }

  deleteUserProductImage(productID, imageID, accessToken) {
    if (!productID)
      throw new Error(
        'productID is required in ProductService.deleteUserProduct'
      );

    if (!imageID)
      throw new Error(
        'productID is required in ProductService.deleteUserProduct'
      );

    if (!accessToken)
      throw new Error(
        'accessToken is required in ProductService.deleteUserProduct'
      );

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    const RequestUrl = this.getUserProductImagesPath(productID) + imageID + '/';

    return this.delete(RequestUrl, headers);
  }

  deleteUserProduct(username, productID, accessToken) {
    if (!username)
      throw new Error(
        'Username is required in ProductService.deleteUserProduct'
      );

    if (!productID)
      throw new Error(
        'productID is required in ProductService.deleteUserProduct'
      );

    if (!accessToken)
      throw new Error(
        'accessToken is required in ProductService.deleteUserProduct'
      );

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    const RequestUrl = this.getUserProductsPath(username) + productID + '/';

    return this.delete(RequestUrl, headers);
  }
}
