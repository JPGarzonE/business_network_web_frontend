import RequestService from '../requests/request.service.js';

export default class UnregisteredRelationshipService extends RequestService {
  
  constructor() {
    super();
  }

  getCompanyUnregisteredRelationshipsPath(accountname) {
    return `/companies/${accountname}/unregistered-relationships/`;
  }

  getCompanyUnregisteredRelationships( accountname, {limit = null, offset = null} ) {
    if ( !accountname )
      throw new Error(
        'accountname is required in UnregisteredRelationshipService.getCompanyUnregisteredRelationships'
      );

    let params = {};

    if( limit ) params.limit = limit;
    if( offset ) params.offset = offset;

    return this.get({
      endpoint: this.getCompanyUnregisteredRelationshipsPath(accountname),
      params
    });
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

    const endpoint = this.getCompanyUnregisteredRelationshipsPath( accountname ) 
      + unregisteredRelationshipID + '/';

    return this.get( { endpoint } );
  }

  createUnregisteredRelationship( companyAccountname, session, unregisteredCompanyData, relationshipType ) {

    if (!companyAccountname)
      throw new Error(
        'companyAccountname is required in UnregisteredRelationshipService.createUnregisteredRelationship'
      );

    if (!session)
      throw new Error(
        'session is required in UnregisteredRelationshipService.createUnregisteredRelationship'
      );

    if (!unregisteredCompanyData.name)
      throw new Error(
        'unregisteredCompanyData name is required in UnregisteredRelationshipService.createUnregisteredRelationship'
      );

    if (!relationshipType)
      throw new Error(
        'relationshipType is required in UnregisteredRelationshipService.createUnregisteredRelationship'
      );

    const RelationshipData = {
      unregistered: {
        ...unregisteredCompanyData,
      },
      type: relationshipType
    };

    return this.post({
      endpoint: this.getCompanyUnregisteredRelationshipsPath( companyAccountname ),
      data: RelationshipData,
      session
    });
  }

  updateUnregisteredRelationshipType(
    companyAccountname,
    session,
    relationshipID,
    relationshipType
  ) {
    if (!companyAccountname)
      throw new Error(
        'companyAccountname is required in UnregisteredRelationshipService.updateUnregisteredRelationshipType'
      );

    if (!session)
      throw new Error(
        'session is required in UnregisteredRelationshipService.updateUnregisteredRelationshipType'
      );

    if (!relationshipID)
      throw new Error(
        'relationshipID is required in UnregisteredRelationshipService.updateUnregisteredRelationshipType'
      );

    if (!relationshipType)
      throw new Error(
        'relationshipType is required in UnregisteredRelationshipService.updateUnregisteredRelationshipType'
      );

    const endpoint = this.getCompanyUnregisteredRelationshipsPath( companyAccountname ) + relationshipID + '/';

    const RelationshipData = {
      type: relationshipType,
    };

    return this.patch({
      endpoint,
      data: RelationshipData,
      session
    });
  }

  deleteUnregisteredRelationship(companyAccountname, relationshipID, session) {
    if (!companyAccountname)
      throw new Error(
        'companyAccountname is required in UnregisteredRelationshipService.deleteUnregisteredRelationship'
      );
    
    if (!relationshipID)
      throw new Error(
        'relationshipID is required in UnregisteredRelationshipService.deleteUnregisteredRelationship'
      );

    if (!session)
      throw new Error(
        'session is required in UnregisteredRelationshipService.deleteUnregisteredRelationship'
      );

    const endpoint = this.getCompanyUnregisteredRelationshipsPath(companyAccountname) 
      + relationshipID + '/';

    return this.delete({
      endpoint,
      session
    });
  }
}
