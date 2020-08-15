import RequestService from "../requests/request.service.js";

export default class ContactService extends RequestService{

    constructor(){
        super();
    }

    getUserContactsPath( username ){
        return `/companies/${username}/contacts/`;
    }

    getUserContacts( username, accessToken ){
        if( !username )
            throw new Error("Username is required in ContactService.getUserContacts");

        if( !accessToken )
            throw new Error("accessToken is required in ContactService.getUserContacts");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        return this.get( this.getUserContactsPath(username), headers, null );
    }

    getUserPrincipalContact( username, accessToken ){
        if( !username )
            throw new Error("Username is required in ContactService.getUserPrincipalContact");

        if( !accessToken )
            throw new Error("accessToken is required in ContactService.getUserPrincipalContact");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        return this.get( this.getUserContactsPath(username), headers, {principal: true} );
    }

    getContactByUsernameAndId( username, contactID, accessToken ){
        if( !username )
            throw new Error("Username is required in ContactService.getContactByUsernameAndId");

        if( !accessToken )
            throw new Error("accessToken is required in ContactService.getContactByUsernameAndId");

        if( !contactID )
            throw new Error("contactID is required in ContactService.getContactByUsernameAndId");

        const RequestUrl = this.getUserContactsPath(username) + contactID + "/";

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        return this.get( RequestUrl, headers, null );
    }

    createUserContact( username, contactData, accessToken ){
        if( !username )
            throw new Error("Username is required in ProductService.createUserContact");

        if( !accessToken )
            throw new Error("accessToken is required in ProductService.createUserContact");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        return this.post(this.getUserContactsPath(username), headers, contactData);
    }

    updateUserContact( username, contactID, contactData, accessToken ){
        if( !username )
            throw new Error("Username is required in ProductService.updateUserContact");

        if( !contactID )
            throw new Error("contactID is required in ProductService.updateUserContact");

        if( !accessToken )
            throw new Error("accessToken is required in ProductService.updateUserContact");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + accessToken
        }

        const RequestUrl = this.getUserContactsPath(username) + contactID + "/";

        return this.patch(RequestUrl, headers, contactData );
    }

    deletUserContact(){

    }

}