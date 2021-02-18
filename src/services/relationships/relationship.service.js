import RequestService from "../requests/request.service.js";

export default class RelationshipService extends RequestService{

    constructor(){
        super();
    }

    getCompanyRelationshipsPath( accountname ){
        return `/companies/${accountname}/relationships/`;
    }

    getCompanyRelationships( accountname, {limit = null, offset = null} ){
        if( !accountname )
            throw new Error("accountname is required in RelationshipService.getCompanyRelationships");

        let params = {};

        if( limit ) params.limit = limit;
        if( offset ) params.offset = offset;

        return this.get({
            endpoint: this.getCompanyRelationshipsPath(accountname),
            params
        });
    }

    getCompanyRelationship( accountname, relationshipID ){
        if( !accountname )
            throw new Error("accountname is required in RelationshipService.getCompanyRelationship");
        
        if( !relationshipID )
            throw new Error("Relationship ID is required in RelationshipService.getCompanyRelationship");


        const endpoint = this.getCompanyRelationshipsPath(accountname) + relationshipID + "/";

        return this.get( { endpoint } );
    }

    getCompanyRelationshipFilteredByAddressedCompany( accountname, addressedCompanyID ){
        if( !accountname )
            throw new Error("accountname is required in RelationshipService.getCompanyRelationshipFilteredByAddressedCompany");
    
        if( !addressedCompanyID )
            throw new Error("addressedCompanyID is required in RelationshipService.getCompanyRelationshipFilteredByAddressedCompany");

        return this.get({
            endpoint: this.getCompanyRelationshipsPath(accountname),
            params: {
                addressed_id: addressedCompanyID
            }
        });
    }

    updateCompanyRelationship( accountname, relationshipID, relationshipData, session ){
        if( !accountname )
            throw new Error("accountname is required in RelationshipService.updateCompanyRelationship");

        if( !relationshipID )
            throw new Error("Relationship ID is required in RelationshipService.updateCompanyRelationship");

        if( !session )
            throw new Error("session is required in RelationshipService.updateCompanyRelationship");

        const endpoint = `${this.getCompanyRelationshipsPath(accountname)}${relationshipID}/`;

        return this.patch({
            endpoint,
            data: relationshipData,
            session
        });
    }

    deleteCompanyRelationship( accountname, relationshipID, session ){
        if( !accountname )
            throw new Error("accountname is required in RelationshipService.updateCompanyRelationship");

        if( !relationshipID )
            throw new Error("relationshipID is required in RelationshipService.updateCompanyRelationship");
        
        if( !session )
            throw new Error("session is required in RelationshipService.updateCompanyRelationship");

        const endpoint = `${this.getCompanyRelationshipsPath(accountname)}${relationshipID}/`;

        return this.delete({
            endpoint,
            session
        });
    }

}