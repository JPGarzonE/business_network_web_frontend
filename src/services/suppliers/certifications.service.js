import RequestService from "../requests/request.service.js";
import ImageService from "../multimedia/image.service.js";

export default class CertificationsService extends RequestService {
  constructor() {
    super();
    this._imageService = new ImageService();
  }

  getSuppliersCertificationsPath(accountname) {
    return `/suppliers/${accountname}/certificates/`;
  }

  getSupplierCertifications(accountname, {limit = null, offset = null}) {
    if (!accountname)
      throw new Error(
        "accountname is required in CertificationsService.getSupplierCertifications"
      );

    let params = {};

    if( limit ) params.limit = limit;
    if( offset ) params.offset = offset;

    return this.get({
      endpoint: this.getSuppliersCertificationsPath(accountname),
      params
    });
  }

  getCertificationElementById(accountname, CertificationID, session) {
    if (!accountname)
      throw new Error(
        "accountname is required in CertificationsService.getCertificationElementById"
      );
    
    if (!CertificationID)
      throw new Error(
        "CertificationID is required in CertificationsService.getCertificationElementById"
      );

    if (!session)
      throw new Error(
        "session is required in CertificationsService.getCertificationElementById"
      );

    const endpoint = this.getSuppliersCertificationsPath(accountname) + CertificationID + '/';

    return this.get({
      endpoint,
      session
    });
  }

  createSupplierCertificationElement(accountname, certificationData, session) {
    if (!accountname)
      throw new Error(
        "accountname is required in CertificationsService.createSupplierCertificationElement"
      );

    if (!session)
      throw new Error(
        "session is required in CertificationsService.createSupplierCertificationElement"
      );

    return this.post({
      endpoint: this.getSuppliersCertificationsPath(accountname),
      data: certificationData,
      session
    });
  }

  async createSupplierCertificationElementWithImage(
    accountname,
    image,
    certificationData,
    session
  ) {
    if (!accountname)
      throw new Error(
        "accountname is required in CertificationsService.createSupplierCertificationElementWithImage"
      );

    if (!image)
      throw new Error(
        "logo is required in CertificationsService.createSupplierCertificationElementWithImage"
      );

    if (!session)
      throw new Error(
        "session is required in CertificationsService.createSupplierCertificationElementWithImage"
      );

    const Image = await this._imageService.uploadImage(image, session);
    certificationData.logo_id = Image.id;

    return this.post({
      endpoint: this.getSuppliersCertificationsPath(accountname),
      data: certificationData,
      session
    });
  }

  updateSupplierCertificationElement(
    accountname,
    certificationID,
    certificationData,
    session
  ) {
    if (!accountname)
      throw new Error(
        "accountname is required in CertificationsService.updateSupplierCertificationElement"
      );

    if (!certificationID)
      throw new Error(
        "certificationID is required in CertificationsService.updateSupplierCertificationElement"
      );

    if (!session)
      throw new Error(
        "session is required in CertificationsService.updateSupplierCertificationElement"
      );

    const endpoint = this.getSuppliersCertificationsPath(accountname) 
      + certificationID + "/";

    return this.patch({
      endpoint,
      data: certificationData,
      session
    });
  }

  async updateSupplierCertificationElementWithImage(
    accountname,
    certificationID,
    image,
    certificationData,
    session
  ) {
    if (!accountname)
      throw new Error(
        "accountname is required in CertificationsService.updateSupplierCertificationElementWithImage"
      );

    if (!certificationID)
      throw new Error(
        "certificationID is required in CertificationsService.updateSupplierCertificationElementWithImage"
      );

    if (!image)
      throw new Error(
        "logo is required in CertificationsService.updateSupplierCertificationElementWithImage"
      );

    if (!session)
      throw new Error(
        "session is required in CertificationsService.updateSupplierCertificationElementWithImage"
      );

    const endpoint = this.getSuppliersCertificationsPath(accountname) 
      + certificationID + "/";

    const Image = await this._imageService.uploadImage(image, session);
    certificationData.logo_id = Image.id;

    return this.patch({
      endpoint,
      data: certificationData,
      session
    });
  }

  deleteCertificationElement(accountname, certificationID, session) {
    if (!accountname)
      throw new Error(
        "accountname is required in CertificationsService.deleteCertificationElement"
      );

    if (!certificationID)
      throw new Error(
        "certificationID is required in CertificationsService.deleteCertificationElement"
      );

    if (!session)
      throw new Error(
        "session is required in CertificationsService.deleteCertificationElement"
      );

    const endpoint = this.getSuppliersCertificationsPath(accountname)
      + certificationID + "/";

    return this.delete({
      endpoint,
      session
    });
  }
}
