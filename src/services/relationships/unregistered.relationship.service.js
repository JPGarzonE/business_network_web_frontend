import RequestService from '../requests/request.service.js';

export default class UnregisteredRelationshipService extends RequestService {
  constructor() {
    super();
  }

  getCompanyUnregisteredRelationshipsPath(accountname) {
    return `/companies/${accountname}/relationships/unregistered/`;
  }

  get unregisteredRelationshipsPath() {
    return '/relationships/unregistered/';
  }

  get unregisteredCompaniesPath() {
    return '/companies/unregistered/';
  }

  getCompanyUnregisteredRelationships( accountname ) {
    if ( !accountname )
      throw new Error(
        'accountname is required in UnregisteredRelationshipService.getCompanyUnregisteredRelationships'
      );

    return this.get(
      this.getCompanyUnregisteredRelationshipsPath( accountname ),
      { 'Content-Type': 'application/json' },
      null
    );
  }

  getCompanyUnregisteredRelationshipByID( accountname, unregisteredRelationshipID ) {
    if(!accountname)
      throw new Error(
        'accountname is required in UnregisteredRelationshipService.getCompanyUnregisteredRelationshipByID'
      );

    if (!unregisteredRelationshipID)
      throw new Error(
        'unregisteredRelationshipID is required in UnregisteredRelationshipService.getCompanyUnregisteredRelationshipByID'
      );

    const RequestUrl = this.getCompanyUnregisteredRelationshipsPath( accountname ) 
      + unregisteredRelationshipID + '/';

    return this.get( RequestUrl, { 'Content-Type': 'application/json' }, null );
  }

  createUnregisteredRelationship( accountname, accessToken, unregisteredCompanyData, relationshipType ) {

    if (!accountname)
      throw new Error(
        'accessToken is required in UnregisteredRelationshipService.createUnregisteredRelationship'
      );

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
      this.getCompanyUnregisteredRelationshipsPath( accountname ) ,
      headers,
      RelationshipData
    );
  }

  updateUnregisteredRelationshipType(
    accountname,
    accessToken,
    relationshipID,
    relationshipType
  ) {
    if (!accountname)
      throw new Error(
        'accountname is required in UnregisteredRelationshipService.updateUnregisteredRelationshipType'
      );

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

    const RequestUrl = this.getCompanyUnregisteredRelationshipsPath( accountname ) + relationshipID + '/';

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    const RelationshipData = {
      type: relationshipType,
    };

    return this.patch(RequestUrl, headers, RelationshipData);
  }

  deleteUnregisteredRelationship(accountname, relationshipID, accessToken) {
    if (!accountname)
      throw new Error(
        'accountname is required in UnregisteredRelationshipService.deleteUnregisteredRelationship'
      );
    
    if (!relationshipID)
      throw new Error(
        'relationshipID is required in UnregisteredRelationshipService.deleteUnregisteredRelationship'
      );

    if (!accessToken)
      throw new Error(
        'accessToken is required in UnregisteredRelationshipService.deleteUnregisteredRelationship'
      );

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + accessToken,
    };

    return this.delete(
      this.getCompanyUnregisteredRelationshipsPath(accountname) + '/' + relationshipID,
      headers
    );
  }
}
