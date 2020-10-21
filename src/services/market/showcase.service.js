import RequestService from "../requests/request.service";

export default class ShowcaseService extends RequestService {

    constructor() {
        super();
    }

    get showcasePath() {
        return '/market/showcase/';
    }

    getShowcase(accessToken) {
        if( !accessToken )
            throw new Error("Access token is required in get showcase");

        let headers = {
            "Content-type": "application/json",
            "Authorization": "Token " + accessToken
        }

        return this.get(this.showcasePath, headers, null);
    }
}