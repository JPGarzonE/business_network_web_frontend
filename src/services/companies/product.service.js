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

  get productsPath() {
    return '/products/';
  }

  getUserProducts(username, pageSettings = {}) {
    if (!username)
      throw new Error('Username is required in ProductService.getUserProducts');
    let qSP;
    if (
      pageSettings.pageLength !== undefined &&
      pageSettings.page !== undefined
    ) {
      qSP = {
        limit: pageSettings.pageLength,
        offset: pageSettings.page * pageSettings.pageLength,
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

    if (!accessToken)
      throw new Error(
        'accessToken is required in ProductService.getProductById'
      );

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    const RequestUrl = this.productsPath + productID + '/';

    return this.get(RequestUrl, headers, null);
  }

  createUserProduct(username, productData, accessToken) {
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

  async createUserProductWithImage(username, images, productData, accessToken) {
    if (!username)
      throw new Error(
        'Username is required in ProductService.createUserProductWithImage'
      );

    if (!images)
      throw new Error(
        'images is required in ProductService.createUserProductWithImage'
      );

    if (!accessToken)
      throw new Error(
        'accessToken is required in ProductService.createUserProductWithImage'
      );

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };
    let filteredAgainImageList = [];
    let filteredImageList = images.filter((item) => item);
    for (let i = 0; i < filteredImageList.length; i++) {
      const Image = await this._imageService.uploadUserImage(
        filteredImageList[i],
        accessToken
      );
      filteredAgainImageList = [...filteredAgainImageList, Image.id];
    }
    productData.images = filteredAgainImageList;
    return this.post(this.getUserProductsPath(username), headers, productData);
  }

  updateUserProduct(username, productID, productData, accessToken) {
    if (!username)
      throw new Error(
        'Username is required in ProductService.updateUserProduct'
      );

    if (!productID)
      throw new Error(
        'productID is required in ProductService.updateUserProduct'
      );

    if (!accessToken)
      throw new Error(
        'accessToken is required in ProductService.updateUserProduct'
      );

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    const RequestUrl = this.getUserProductsPath(username) + productID + '/';

    return this.patch(RequestUrl, headers, productData);
  }

  async updateUserProductWithImage(
    username,
    productID,
    images,
    productData,
    accessToken
  ) {
    console.log('images', images);
    console.log('productData', productData);
    if (!username)
      throw new Error(
        'Username is required in ProductService.updateUserProductWithImage'
      );

    if (!productID)
      throw new Error(
        'productID is required in ProductService.updateUserProductWithImage'
      );

    if (!images)
      throw new Error(
        'images is required in ProductService.updateUserProductWithImage'
      );

    if (!accessToken)
      throw new Error(
        'accessToken is required in ProductService.updateUserProductWithImage'
      );

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    const RequestUrl = this.getUserProductsPath(username) + productID + '/';

    let filteredAgainImageList = [];
    let filteredImageList = images.filter((item) => item !== undefined);
    for (let i = 0; i < filteredImageList.length; i++) {
      if (typeof filteredImageList[i] === 'object') {
        const Image = await this._imageService.uploadUserImage(
          filteredImageList[i],
          accessToken
        );
        filteredAgainImageList = [...filteredAgainImageList, Image.id];
      } else if (typeof filteredImageList[i] === 'number') {
        console.log('entramos aqui tambien');
        filteredAgainImageList = [
          ...filteredAgainImageList,
          filteredImageList[i],
        ];
      }
    }
    productData.images = filteredAgainImageList;

    return this.patch(RequestUrl, headers, productData);
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
