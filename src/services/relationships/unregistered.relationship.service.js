import RequestService from '../requests/request.service.js';

export default class UnregisteredRelationshipService extends RequestService {
  constructor() {
    super();
  }

  getCompanyUnregisteredRelationshipsPath(username) {
    return `/companies/${username}/relationships/unregistered/`;
  }

  get unregisteredRelationshipsPath() {
    return '/relationships/unregistered/';
  }

  get unregisteredCompaniesPath() {
    return '/companies/unregistered/';
  }

  getCompanyUnregisteredRelationships(username) {
    if (!username)
      throw new Error(
        'username is required in UnregisteredRelationshipService.getCompanyUnregisteredRelationships'
      );

    return this.get(
      this.getCompanyUnregisteredRelationshipsPath(username),
      { 'Content-Type': 'application/json' },
      null
    );
  }

  getUnregisteredRelationshipByID(unregisteredRelationshipID) {
    if (!unregisteredRelationshipID)
      throw new Error(
        'unregisteredRelationshipID is required in UnregisteredRelationshipService.getUnregisteredRelationshipByID'
      );

    const RequestUrl =
      this.unregisteredRelationshipsPath + unregisteredRelationshipID + '/';

    return this.get(RequestUrl, { 'Content-Type': 'application/json' }, null);
  }

  createUnregisteredRelationship(
    accessToken,
    unregisteredCompanyData,
    relationshipType
  ) {
    if (!accessToken)
      throw new Error(
        'accessToken is required in UnregisteredRelationshipService.createUnregisteredRelationship'
      );

    if (!unregisteredCompanyData.name)
      throw new Error(
        'name is required in UnregisteredRelationshipService.createUnregisteredRelationship'
      );

    if (!relationshipType)
      throw new Error(
        'relationshipType is required in UnregisteredRelationshipService.createUnregisteredRelationship'
      );

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    const RelationshipData = {
      unregistered: {
        ...unregisteredCompanyData,
      },
      type: relationshipType,
    };

    return this.post(
      this.unregisteredRelationshipsPath,
      headers,
      RelationshipData
    );
  }

  async createUnregisteredRelationshipWithNestedCompany(
    accessToken,
    unregisteredCompanyData,
    relationshipType
  ) {
    if (!accessToken)
      throw new Error(
        'accessToken is required in UnregisteredRelationshipService.createUnregisteredRelationshipWithNestedCompany'
      );

    if (!unregisteredCompanyData)
      throw new Error(
        'unregisteredCompanyData is required in UnregisteredRelationshipService.createUnregisteredRelationshipWithNestedCompany'
      );

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    const UnregisteredCompany = await this.post(
      this.unregisteredCompaniesPath,
      headers,
      unregisteredCompanyData
    );

    return this.createUnregisteredRelationship(
      accessToken,
      UnregisteredCompany.id,
      relationshipType
    );
  }

  updateUnregisteredRelationshipType(
    accessToken,
    relationshipID,
    relationshipType
  ) {
    if (!accessToken)
      throw new Error(
        'accessToken is required in UnregisteredRelationshipService.updateUnregisteredRelationshipType'
      );

    if (!relationshipID)
      throw new Error(
        'relationshipID is required in UnregisteredRelationshipService.updateUnregisteredRelationshipType'
      );

    if (!relationshipType)
      throw new Error(
        'relationshipType is required in UnregisteredRelationshipService.updateUnregisteredRelationshipType'
      );

    const RequestUrl =
      this.unregisteredRelationshipsPath + relationshipID + '/';

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    const RelationshipData = {
      type: relationshipType,
    };

    return this.patch(RequestUrl, headers, RelationshipData);
  }

  deleteUnregisteredRelationship(relationshipID, accessToken) {
    if (!relationshipID)
      throw new Error(
        'relationshipID is required in CertificationsService.updateUserCertificationElementWithImage'
      );

    if (!accessToken)
      throw new Error(
        'accessToken is required in CertificationsService.updateUserCertificationElementWithImage'
      );

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    return this.delete(
      this.unregisteredRelationshipsPath + '/' + relationshipID,
      headers
    );
  }
}
