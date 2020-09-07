import RequestService from '../requests/request.service.js';
import ImageService from '../multimedia/image.service.js';

export default class CertificationsService extends RequestService {
  constructor() {
    super();
    this._imageService = new ImageService();
  }

  getUserCertificationsPath(username) {
    return `/companies/${username}/certificates/`;
  }

  get CertificationPath() {
    return '/certificates/';
  }

  get CompaniesPath() {
    return '/companies/';
  }

  getUserCertifications(username) {
    if (!username)
      throw new Error(
        'Username is required in CertificationsService.getUserCertifications'
      );

    return this.get(
      this.getUserCertificationsPath(username),
      { 'Content-Type': 'application/json' },
      null
    );
  }

  getCertificationElementById(username, CertificationID, accessToken) {
    if (!CertificationID)
      throw new Error(
        'CertificationID is required in CertificationsService.getCertificationElementById'
      );

    if (!accessToken)
      throw new Error(
        'accessToken is required in CertificationsService.getCertificationElementById'
      );

    let headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    const RequestUrl =
      this.CompaniesPath +
      username +
      this.CertificationPath +
      certificationID +
      '/';

    return this.get(RequestUrl, headers, null);
  }

  createUserCertificationElement(username, certificationData, accessToken) {
    if (!username)
      throw new Error(
        'Username is required in CertificationsService.createUserCertificationElement'
      );

    if (!accessToken)
      throw new Error(
        'accessToken is required in CertificationsService.createUserCertificationElement'
      );

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    return this.post(
      this.getUserCertificationsPath(username),
      headers,
      certificationData
    );
  }

  async createUserCertificationElementWithImage(
    username,
    image,
    certificationData,
    accessToken
  ) {
    if (!username)
      throw new Error(
        'Username is required in CertificationsService.createUserCertificationElementWithImage'
      );

    if (!image)
      throw new Error(
        'logo is required in CertificationsService.createUserCertificationElementWithImage'
      );

    if (!accessToken)
      throw new Error(
        'accessToken is required in CertificationsService.createUserCertificationElementWithImage'
      );

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    const Image = await this._imageService.uploadUserImage(image, accessToken);
    certificationData.image_id = Image.id;

    return this.post(
      this.getUserCertificationsPath(username),
      headers,
      certificationData
    );
  }

  updateUserCertificationElement(
    username,
    certificationID,
    certificationData,
    accessToken
  ) {
    if (!username)
      throw new Error(
        'Username is required in CertificationsService.updateUserCertificationElement'
      );

    if (!certificationID)
      throw new Error(
        'certificationID is required in CertificationsService.updateUserCertificationElement'
      );

    if (!accessToken)
      throw new Error(
        'accessToken is required in CertificationsService.updateUserCertificationElement'
      );

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    const RequestUrl =
      this.getUserCertificationsPath(username) + certificationID + '/';

    return this.patch(RequestUrl, headers, certificationData);
  }

  async updateUserCertificationElementWithImage(
    username,
    certificationID,
    image,
    certificationData,
    accessToken
  ) {
    if (!username)
      throw new Error(
        'Username is required in CertificationsService.updateUserCertificationElementWithImage'
      );

    if (!certificationID)
      throw new Error(
        'certificationID is required in CertificationsService.updateUserCertificationElementWithImage'
      );

    if (!image)
      throw new Error(
        'logo is required in CertificationsService.updateUserCertificationElementWithImage'
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
      this.getUserCertificationsPath(username) + certificationID + '/';

    const Image = await this._imageService.uploadUserImage(image, accessToken);
    certificationData.media_id = Image.id;

    return this.patch(RequestUrl, headers, certificationData);
  }

  deleteCertificationElement(username, certificationID, accessToken) {
    if (!username)
      throw new Error(
        'Username is required in CertificationsService.updateUserCertificationElementWithImage'
      );

    if (!certificationID)
      throw new Error(
        'certificationID is required in CertificationsService.updateUserCertificationElementWithImage'
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
      this.getUserCertificationsPath(username) + certificationID + '/';

    return this.delete(RequestUrl, headers, certificationData);
  }
}
