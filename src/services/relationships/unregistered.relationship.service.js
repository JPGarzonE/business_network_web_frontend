import RequestService from "../requests/request.service.js";

export default class UnregisteredRelationshipService extends RequestService {

    constructor(){
        super();
    }

    getCompanyUnregisteredRelationshipsPath( username ){
        return `/companies/${username}/relationships/unregistered/`;
    }

    get unregisteredRelationshipsPath(){
        return "/relationships/unregistered/";
    }

    get unregisteredCompaniesPath(){
        return "/companies/unregistered/";
    }

    getCompanyUnregisteredRelationships( username ){
        if( !username )
            throw new Error("username is required in UnregisteredRelationshipService.getCompanyUnregisteredRelationships");

        return this.get( this.getCompanyUnregisteredRelationshipsPath(username), {'Content-Type': 'application/json'}, null );
    }

    getUnregisteredRelationshipByID( unregisteredRelationshipID ){
        if( !unregisteredRelationshipID )
            throw new Error("unregisteredRelationshipID is required in UnregisteredRelationshipService.getUnregisteredRelationshipByID");

        const RequestUrl = this.unregisteredRelationshipsPath + unregisteredRelationshipID + "/";

        return this.get( RequestUrl, {'Content-Type': 'application/json'}, null );
    }

    createUnregisteredRelationship( accessToken, unregisteredCompanyID, relationshipType ){
        if( !accessToken )
            throw new Error("accessToken is required in UnregisteredRelationshipService.createUnregisteredRelationship");

        if( !unregisteredCompanyID )
            throw new Error("unregisteredCompanyID is required in UnregisteredRelationshipService.createUnregisteredRelationship");

        if( !relationshipType )
            throw new Error("relationshipType is required in UnregisteredRelationshipService.createUnregisteredRelationship");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const RelationshipData = {
            unregistered_id: unregisteredCompanyID,
            type: relationshipType
        }

        return this.post( this.unregisteredRelationshipsPath, headers, RelationshipData );
    }

    async createUnregisteredRelationshipWithNestedCompany( accessToken, unregisteredCompanyData, relationshipType ){

        if( !accessToken )
            throw new Error("accessToken is required in UnregisteredRelationshipService.createUnregisteredRelationshipWithNestedCompany");

        if( !unregisteredCompanyData )
            throw new Error("unregisteredCompanyData is required in UnregisteredRelationshipService.createUnregisteredRelationshipWithNestedCompany");

        if( !relationshipType )
            throw new Error("relationshipType is required in UnregisteredRelationshipService.createUnregisteredRelationshipWithNestedCompany");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const UnregisteredCompany = await this.post( this.unregisteredCompaniesPath, headers, unregisteredCompanyData );

        return this.createUnregisteredRelationship( accessToken, UnregisteredCompany.id, relationshipType );
    }

    updateUnregisteredRelationshipType( accessToken, unregisteredRelationshipID, relationshipType ){
        if( !accessToken )
            throw new Error("accessToken is required in UnregisteredRelationshipService.updateUnregisteredRelationshipType");

        if( !unregisteredRelationshipID )
            throw new Error("unregisteredRelationshipID is required in UnregisteredRelationshipService.updateUnregisteredRelationshipType");

        if( !relationshipType )
            throw new Error("relationshipType is required in UnregisteredRelationshipService.updateUnregisteredRelationshipType");

        const RequestUrl = this.unregisteredRelationshipsPath + unregisteredRelationshipID + "/";

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const RelationshipData = {
            type: relationshipType
        }

        return this.patch( RequestUrl, headers, RelationshipData );
    }

    deleteUnregisteredRelationship(){

    }

}