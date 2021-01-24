import RequestService from "../requests/request.service.js";

export default class RelationshipService extends RequestService{

    constructor(){
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

    getCompanyRelationshipsPath( accountname ){
        return `/companies/${accountname}/relationships/`;
    }

    getCompanyRelationships( accountname ){
        if( !accountname )
            throw new Error("accountname is required in RelationshipService.getCompanyRelationships");

        const Headers = {...this.baseHeader};

        return this.get( this.getCompanyRelationshipsPath(accountname), Headers, null );
    }

    getCompanyRelationship( accountname, relationshipID ){
        if( !accountname )
            throw new Error("accountname is required in RelationshipService.getCompanyRelationship");
        
        if( !relationshipID )
            throw new Error("Relationship ID is required in RelationshipService.getCompanyRelationship");

        const Headers = {...this.baseHeader};

        const RequestUrl = this.getCompanyRelationshipsPath(accountname) + relationshipID + "/";

        return this.get( RequestUrl, Headers, null );
    }

    getCompanyRelationshipFilteredByAddressedCompany( accountname, addressedCompanyID ){
        if( !accountname )
            throw new Error("accountname is required in RelationshipService.getCompanyRelationshipFilteredByAddressedCompany");
    
        if( !addressedCompanyID )
            throw new Error("addressedCompanyID is required in RelationshipService.getCompanyRelationshipFilteredByAddressedCompany");

        const Headers = {...this.baseHeader};

        return this.get( 
            this.getCompanyRelationshipsPath(accountname), 
            Headers, 
            {'addressed_id': addressedCompanyID} 
        );
    }

    updateCompanyRelationship( accountname, relationshipID, relationshipData, accessToken ){
        if( !accountname )
            throw new Error("accountname is required in RelationshipService.updateCompanyRelationship");

        if( !relationshipID )
            throw new Error("Relationship ID is required in RelationshipService.updateCompanyRelationship");

        if( !accessToken )
            throw new Error("accessToken is required in RelationshipService.updateCompanyRelationship");

        const Headers = {
            ...this.baseHeader,
            'Authorization': `${this.authPrefix} ${accessToken}`
        }

        const RequestUrl = `${this.getCompanyRelationshipsPath(accountname)}${relationshipID}/`;

        return this.patch( RequestUrl, Headers, relationshipData );
    }

    deleteCompanyRelationship( accountname, relationshipID, accessToken ){
        if( !accountname )
            throw new Error("accountname is required in RelationshipService.updateCompanyRelationship");

        if( !relationshipID )
            throw new Error("relationshipID is required in RelationshipService.updateCompanyRelationship");
        
        if( !accessToken )
            throw new Error("accessToken is required in RelationshipService.updateCompanyRelationship");

        const headers = {
            ...this.baseHeader,
            'Authorization': `${this.authPrefix} ${accessToken}`
        }

        const RequestUrl = `${this.getCompanyRelationshipsPath(accountname)}${relationshipID}/`;

        return this.delete( RequestUrl, headers );
    }

}