import RequestService from '../requests/request.service.js';

export default class UnregisteredRelationshipService extends RequestService {
  
  constructor() {
    super();
  }

  get baseHeader() {
    return {
      'Content-Type': 'application/json'
    }
  }

  get authPrefix() {
    return "Bearer";
  }

  getCompanyUnregisteredRelationshipsPath(accountname) {
    return `/companies/${accountname}/unregistered-relationships/`;
  }

  getCompanyUnregisteredRelationships( accountname ) {
    if ( !accountname )
      throw new Error(
        'accountname is required in UnregisteredRelationshipService.getCompanyUnregisteredRelationships'
      );

    const Headers = {...this.baseHeader};

    return this.get(
      this.getCompanyUnregisteredRelationshipsPath( accountname ),
      Headers,
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

    const Headers = {...this.baseHeader}

    const RequestUrl = this.getCompanyUnregisteredRelationshipsPath( accountname ) 
      + unregisteredRelationshipID + '/';

    return this.get( RequestUrl, Headers, null );
  }

  createUnregisteredRelationship( companyAccountname, accessToken, unregisteredCompanyData, relationshipType ) {

    if (!companyAccountname)
      throw new Error(
        'companyAccountname is required in UnregisteredRelationshipService.createUnregisteredRelationship'
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
      ...this.baseHeader,
      Authorization: `${this.authPrefix} ${accessToken}`,
    };

    const RelationshipData = {
      unregistered: {
        ...unregisteredCompanyData,
      },
      type: relationshipType,
    };

    return this.post(
      this.getCompanyUnregisteredRelationshipsPath( companyAccountname ) ,
      headers,
      RelationshipData
    );
  }

  updateUnregisteredRelationshipType(
    companyAccountname,
    accessToken,
    relationshipID,
    relationshipType
  ) {
    if (!companyAccountname)
      throw new Error(
        'companyAccountname is required in UnregisteredRelationshipService.updateUnregisteredRelationshipType'
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

    const RequestUrl = this.getCompanyUnregisteredRelationshipsPath( companyAccountname ) + relationshipID + '/';

    const headers = {
      ...this.baseHeader,
      Authorization: `${this.authPrefix} ${accessToken}`,
    };

    const RelationshipData = {
      type: relationshipType,
    };

    return this.patch( RequestUrl, headers, RelationshipData );
  }

  deleteUnregisteredRelationship(companyAccountname, relationshipID, accessToken) {
    if (!companyAccountname)
      throw new Error(
        'companyAccountname is required in UnregisteredRelationshipService.deleteUnregisteredRelationship'
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
      ...this.baseHeader,
      Authorization: `${this.authPrefix} ${accessToken}`,
    };

    return this.delete(
      this.getCompanyUnregisteredRelationshipsPath(companyAccountname) + '/' + relationshipID,
      headers
    );
  }
}
