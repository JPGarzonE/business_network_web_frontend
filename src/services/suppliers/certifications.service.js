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

  getSupplierCertifications(accountname) {
    if (!accountname)
      throw new Error(
        "accountname is required in CertificationsService.getSupplierCertifications"
      );

    return this.get(
      this.getSuppliersCertificationsPath(accountname),
      { "Content-Type": "application/json" },
      null
    );
  }

  getCertificationElementById(accountname, CertificationID, accessToken) {
    if (!accountname)
      throw new Error(
        "accountname is required in CertificationsService.getCertificationElementById"
      );
    
    if (!CertificationID)
      throw new Error(
        "CertificationID is required in CertificationsService.getCertificationElementById"
      );

    if (!accessToken)
      throw new Error(
        "accessToken is required in CertificationsService.getCertificationElementById"
      );

    let headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + accessToken,
    };

    const RequestUrl = this.getSuppliersCertificationsPath(accountname) + CertificationID + '/';

    return this.get(RequestUrl, headers, null);
  }

  createSupplierCertificationElement(accountname, certificationData, accessToken) {
    if (!accountname)
      throw new Error(
        "accountname is required in CertificationsService.createSupplierCertificationElement"
      );

    if (!accessToken)
      throw new Error(
        "accessToken is required in CertificationsService.createSupplierCertificationElement"
      );

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + accessToken,
    };

    return this.post(
      this.getSuppliersCertificationsPath(accountname),
      headers,
      certificationData
    );
  }

  async createSupplierCertificationElementWithImage(
    accountname,
    image,
    certificationData,
    accessToken
  ) {
    if (!accountname)
      throw new Error(
        "accountname is required in CertificationsService.createSupplierCertificationElementWithImage"
      );

    if (!image)
      throw new Error(
        "logo is required in CertificationsService.createSupplierCertificationElementWithImage"
      );

    if (!accessToken)
      throw new Error(
        "accessToken is required in CertificationsService.createSupplierCertificationElementWithImage"
      );

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + accessToken,
    };

    const Image = await this._imageService.uploadImage(image, accessToken);
    certificationData.logo_id = Image.id;

    return this.post(
      this.getSuppliersCertificationsPath(accountname),
      headers,
      certificationData
    );
  }

  updateSupplierCertificationElement(
    accountname,
    certificationID,
    certificationData,
    accessToken
  ) {
    if (!accountname)
      throw new Error(
        "accountname is required in CertificationsService.updateSupplierCertificationElement"
      );

    if (!certificationID)
      throw new Error(
        "certificationID is required in CertificationsService.updateSupplierCertificationElement"
      );

    if (!accessToken)
      throw new Error(
        "accessToken is required in CertificationsService.updateSupplierCertificationElement"
      );

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + accessToken,
    };

    const RequestUrl =
      this.getSuppliersCertificationsPath(accountname) + certificationID + "/";

    return this.patch(RequestUrl, headers, certificationData);
  }

  async updateSupplierCertificationElementWithImage(
    accountname,
    certificationID,
    image,
    certificationData,
    accessToken
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

    if (!accessToken)
      throw new Error(
        "accessToken is required in CertificationsService.updateSupplierCertificationElementWithImage"
      );

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + accessToken,
    };

    const RequestUrl =
      this.getSuppliersCertificationsPath(accountname) + certificationID + "/";

    const Image = await this._imageService.uploadImage(image, accessToken);
    certificationData.logo_id = Image.id;

    return this.patch(RequestUrl, headers, certificationData);
  }

  deleteCertificationElement(accountname, certificationID, accessToken) {
    if (!accountname)
      throw new Error(
        "accountname is required in CertificationsService.deleteCertificationElement"
      );

    if (!certificationID)
      throw new Error(
        "certificationID is required in CertificationsService.deleteCertificationElement"
      );

    if (!accessToken)
      throw new Error(
        "accessToken is required in CertificationsService.deleteCertificationElement"
      );

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + accessToken,
    };

    const RequestUrl =
      this.getSuppliersCertificationsPath(accountname) + certificationID + "/";

    return this.delete(RequestUrl, headers);
  }
}
