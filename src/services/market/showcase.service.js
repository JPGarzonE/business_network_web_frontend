import RequestService from "../requests/request.service";

export default class ShowcaseService extends RequestService {

    constructor() {
        super();
    }

    get showcasePath() {
        return '/market/showcase/';
    }

    getShowcase( session = {} ) {

        return this.get({
            endpoint: this.showcasePath,
            session
        });
    }
}