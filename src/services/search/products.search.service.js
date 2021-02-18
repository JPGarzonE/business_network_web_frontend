import SearchService from "./search.service.js";

export default class ProductsSearchService extends SearchService {

    constructor(){
        super();
    }

    get searchPath() {
        return super.searchPath + "products/";
    }

    searchProducts( query, params = {}, fields = [] ) {
        if( !query )
            throw new Error("query is required in ProductSearchService.searchProducts");

        let QueryParams = {
            ...params,
            q: query
        }

        if( fields && fields.length > 0 )
            QueryParams['query_fields'] = fields.toLocaleString();

        return this.customSearch(this.searchPath, QueryParams);
    }
}