import RequestService from "../requests/request.service.js";

export default class RelationshipService extends RequestService{

    constructor(){
        super();
    }

    getUserRelationshipsPath( userID ){
        return `/users/${userID}/relationships/`;
    }

    getUserRelationships( userID ){
        if( !userID )
            throw new Error("User ID is required in RelationshipService.getUserRelationships");

        return this.get( this.getUserRelationshipsPath(userID), {'Content-Type': 'application/json'}, null );
    }

    getUserRelationship( userID, relationshipID ){
        if( !userID )
            throw new Error("User ID is required in RelationshipService.getUserRelationshipByIdandUserId");
        
        if( !relationshipID )
            throw new Error("Relationship ID is required in RelationshipService.getUserRelationshipByIdandUserId");

        const RequestUrl = this.getUserRelationshipsPath(userID) + relationshipID + "/";

        return this.get( RequestUrl, {'Content-Type': 'application/json'}, null );
    }

    getUserRelationshipByAddressedUser( userID, addressedUserID ){
        if( !userID )
            throw new Error("User ID is required in RelationshipService.getUserRelationshipByAddressedUser");
    
        if( !addressedUserID )
            throw new Error("Addressed User ID is required in RelationshipService.getUserRelationshipByAddressedUser");

        return this.get( this.getUserRelationshipsPath(userID), 
            {'Content-Type': 'application/json'}, {'addressed_id': addressedUserID} );
    }

    createUserRelationship( userID, relationshipData, accessToken ){
        if( !userID )
            throw new Error("User ID is required in RelationshipService.createUserRelationship");

        if( !accessToken )
            throw new Error("accessToken is required in RelationshipService.createUserRelationship");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        return this.post( this.getUserRelationshipsPath(userID), headers, relationshipData );
    }

    updateUserRelationship( userID, relationshipID, relationshipData, accessToken ){
        if( !userID )
            throw new Error("User ID is required in RelationshipService.updateUserRelationship");

        if( !relationshipID )
            throw new Error("Relationship ID is required in RelationshipService.updateUserRelationship");

        if( !accessToken )
            throw new Error("accessToken is required in RelationshipService.updateUserRelationship");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const RequestUrl = this.getUserRelationshipsPath(userID) + relationshipID + "/";

        return this.patch( RequestUrl, headers, relationshipData );
    }

    deleteUserRelationship(){
        
    }

}