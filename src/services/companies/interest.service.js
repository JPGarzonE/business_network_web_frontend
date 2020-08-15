import RequestService from "../requests/request.service.js";

export default class InterestService extends RequestService{

    constructor(){
        super();
    }

    getUserInterestsPath( username ){
        return `/companies/${username}/interests/`;
    }

    getUserInterests( username, accessToken ){
        if( !username )
            throw new Error("Username is required in InterestService.getUserInterests");

        if( !accessToken )
            throw new Error("accessToken is required in InterestService.getUserInterests");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        return this.get( this.getUserInterestsPath(username), headers, null );
    }

    getInterestByUsernameAndId( username, interestID, accessToken ){
        if( !username )
            throw new Error("Username is required in InterestService.getInterestByUsernameAndId");

        if( !accessToken )
            throw new Error("accessToken is required in InterestService.getInterestByUsernameAndId");

        if( !interestID )
            throw new Error("interestID is required in InterestService.getInterestByUsernameAndId");

        const RequestUrl = this.getUserInterestsPath(username) + interestID + "/";

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        return this.get( RequestUrl, headers, null );
    }

    createUserInterest( username, interestData, accessToken ){
        if( !username )
            throw new Error("Username is required in InterestService.createUserInterest");

        if( !accessToken )
            throw new Error("accessToken is required in InterestService.createUserInterest");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        return this.post(this.getUserInterestsPath(username), headers, interestData);
    }

    updateUserInterest( username, interestID, interestData, accessToken ){
        if( !username )
            throw new Error("Username is required in InterestService.updateUserInterest");

        if( !interestID )
            throw new Error("interestID is required in InterestService.updateUserInterest");

        if( !accessToken )
            throw new Error("accessToken is required in InterestService.updateUserInterest");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const RequestUrl = this.getUserInterestsPath(username) + interestID + "/";

        return this.patch(RequestUrl, headers, interestData );
    }

    deleteUserInterest(){
        
    }

}