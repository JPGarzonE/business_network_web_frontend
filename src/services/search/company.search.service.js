import SearchService from "./search.service.js";

export default class CompanySearchService extends SearchService {

    constructor(){
        super();
    }

    get searchPath(){
        return super.searchPath + "companies/";
    }

    get companiesSearchPath(){
        return "/companies/";
    }

    get unregisteredCompaniesSearchPath(){
        return this.searchPath + "unregistered/";
    }

    getCompanyByName( name ){
        return this.customSearch( this.companiesSearchPath, {name: name} );
    }

    getCompanyByNIT( nit ){
        return this.customSearch( this.companiesSearchPath, {nit: nit} );
    }

    searchCompanies( query, params ){
        if( !query )
            throw new Error("Query is required in CompanySearchService.searchCompanies");

        const QueryParams = Object.assign({
            q: query
        }, params);

        return this.customSearch(this.searchPath, QueryParams );
    }

    searchUnregisteredCompanies( query, params ){
        if( !query )
            throw new Error("Query is required in CompanySearchService.searchUnregisteredCompanies");

        const QueryParams = Object.assign({
            q: query
        }, params);

        return this.customSearch(this.unregisteredCompaniesSearchPath, QueryParams );
    }

}