import RequestService from "../requests/request.service.js";

export default class RelationshipService extends RequestService{

    constructor(){
        super();
    }

    getCompanyRelationshipsPath( accountname ){
        return `/companies/${accountname}/relationships/`;
    }

    getCompanyRelationships( accountname ){
        if( !accountname )
            throw new Error("accountname is required in RelationshipService.getCompanyRelationships");

        return this.get( this.getCompanyRelationshipsPath(accountname), {'Content-Type': 'application/json'}, null );
    }

    getCompanyRelationship( accountname, relationshipID ){
        if( !accountname )
            throw new Error("accountname is required in RelationshipService.getCompanyRelationship");
        
        if( !relationshipID )
            throw new Error("Relationship ID is required in RelationshipService.getCompanyRelationship");

        const RequestUrl = this.getCompanyRelationshipsPath(accountname) + relationshipID + "/";

        return this.get( RequestUrl, {'Content-Type': 'application/json'}, null );
    }

    getCompanyRelationshipFilteredByAddressedCompany( accountname, addressedCompanyID ){
        if( !accountname )
            throw new Error("accountname is required in RelationshipService.getCompanyRelationshipFilteredByAddressedCompany");
    
        if( !addressedCompanyID )
            throw new Error("addressedCompanyID is required in RelationshipService.getCompanyRelationshipFilteredByAddressedCompany");

        return this.get( this.getCompanyRelationshipsPath(accountname), 
            {'Content-Type': 'application/json'}, {'addressed_id': addressedCompanyID} );
    }

    updateCompanyRelationship( accountname, relationshipID, relationshipData, accessToken ){
        if( !accountname )
            throw new Error("accountname is required in RelationshipService.updateCompanyRelationship");

        if( !relationshipID )
            throw new Error("Relationship ID is required in RelationshipService.updateCompanyRelationship");

        if( !accessToken )
            throw new Error("accessToken is required in RelationshipService.updateCompanyRelationship");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const RequestUrl = this.getCompanyRelationshipsPath(accountname) + relationshipID + "/";

        return this.patch( RequestUrl, headers, relationshipData );
    }

    deleteCompanyRelationship( accountname, relationshipID, accessToken ){
        if( !accountname )
            throw new Error("accountname is required in RelationshipService.updateCompanyRelationship");

        if( !relationshipID )
            throw new Error("relationshipID is required in RelationshipService.updateCompanyRelationship");
        
        if( !accessToken )
            throw new Error("accessToken is required in RelationshipService.updateCompanyRelationship");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const RequestUrl = this.getCompanyRelationshipsPath(accountname) + relationshipID + "/";

        return this.delete( RequestUrl, headers );
    }

}