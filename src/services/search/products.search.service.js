import SearchService from "./search.service.js";

export default class ProductsSearchService extends SearchService {

    constructor(){
        super();
    }

    get searchPath() {
        return super.searchPath + "products/";
    }

    /* params must be an object with key: value */
    searchProducts( query, params ) {
        if( !query )
            throw new Error("query is required in ProductSearchService.searchProducts");

        const QueryParams = Object.assign({
            q: query
        }, params);

        return this.customSearch(this.searchPath, QueryParams);
    }
}