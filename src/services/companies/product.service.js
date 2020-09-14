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
    if (pageSettings.pageLength && pageSettings.page) {
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

    const imagesIdList = [];
    images.forEach(async (image) => {
      if (image) {
        const Image = await this._imageService.uploadUserImage(
          image,
          accessToken
        );
        imagesIdList.push(Image.id);
      }
    });
    productData.images = imagesIdList;

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

    const imagesIdList = [];
    images.forEach(async (image) => {
      if (image) {
        const Image = await this._imageService.uploadUserImage(
          image,
          accessToken
        );
        imagesIdList.push(Image.id);
      }
    });
    productData.images = imagesIdList;

    return this.patch(RequestUrl, headers, productData);
  }

  deleteUserProduct(username, productID, accessToken) {
    if (!username)
      throw new Error(
        'Username is required in CertificationsService.updateUserCertificationElementWithImage'
      );

    if (!productID)
      throw new Error(
        'productID is required in CertificationsService.updateUserCertificationElementWithImage'
      );

    if (!accessToken)
      throw new Error(
        'accessToken is required in CertificationsService.updateUserCertificationElementWithImage'
      );

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    const RequestUrl =
      this.this.getUserProductsPath(username) + certificationID + '/';

    return this.delete(RequestUrl, headers);
  }
}
