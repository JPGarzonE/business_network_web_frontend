import RequestService from '../requests/request.service.js';
import FileService from '../multimedia/file.service.js';

export default class CompanyVerificationService extends RequestService {
  constructor() {
    super();
    this._fileService = new FileService();
  }

  getCompanyVerificationPath(accountname) {
    return `companies/${accountname}/verification/`;
  }

  get verifyCompanyPath() {
    return '/companies/verification/verify/';
  }

  getCompanyVerification(accountname, session) {
    if (!accountname)
      throw new Error(
        'accountname is required in CompanyVerificationService.getCompanyVerification'
      );

    if (!session)
      throw new Error(
        'session is required in CompanyVerificationService.getCompanyVerification'
      );

    return this.get({
      endpoint: this.getCompanyVerificationPath(accountname),
      session
    });
  }

  _addCertificateToCompanyVerification(accountname, session, certificateID) {
    if (!accountname)
      throw new Error(
        'accountname is required in CompanyVerificationService._addCertificateToCompanyVerification'
      );

    if (!session)
      throw new Error(
        'session is required in CompanyVerificationService._addCertificateToCompanyVerification'
      );

    if (!certificateID)
      throw new Error(
        'CertificateID is required in CompanyVerificationService._addCertificateToCompanyVerification'
      );

    let data = {
      files: [certificateID],
    };

    return this.patch({
      endpoint: this.getCompanyVerificationPath(accountname),
      data,
      session
    });
  }

  async uploadCompanyCertificate(accountname, session, certificateFile) {
    /* Upload certificate file and associate to the verification of the company */

    if (!accountname)
      throw new Error(
        'accountname is required in CompanyVerificationService.uploadCompanyCertificate'
      );

    if (!session)
      throw new Error(
        'session is required in CompanyVerificationService.uploadCompanyCertificate'
      );

    if (!certificateFile)
      throw new Error(
        'CertificateFile is required in CompanyVerificationService.uploadCompanyCertificate'
      );

    const File = await this._fileService.uploadFile(
      certificateFile,
      session
    );

    return this._addCertificateToCompanyVerification(
      accountname,
      session,
      File.id
    );
  }

  verifiyUserAccount(validationToken) {
    if (!validationToken)
      throw new Error(
        'validationToken is required in CompanyVerificationService.verifyUserAccount'
      );

    let data = {
      token: validationToken,
    };

    return this.post({
      endpoint: this.verifyAccountPath,
      data
    });
  }
}
