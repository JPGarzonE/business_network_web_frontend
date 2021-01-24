import SearchService from "./search.service.js";

export default class CompaniesSearchService extends SearchService {

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
        return super.searchPath + "unregistered-companies/";
    }

    getCompanyByName( name ){
        return this.customSearch( this.companiesSearchPath, {name: name} );
    }

    getCompanyByLegalIdentifier( legalIdentifier ){
        return this.customSearch( this.companiesSearchPath, 
            {legal_identifier: legalIdentifier} 
        );
    }

    /* params must be an object with key: value */
    searchCompanies( query, params ){
        if( !query )
            throw new Error("query is required in CompanySearchService.searchCompanies");

        const QueryParams = {
            ...params,
            q: query
        }

        return this.customSearch(this.searchPath, QueryParams );
    }

    /* params must be an object with key: value */
    searchUnregisteredCompanies( query, params ){
        if( !query )
            throw new Error("Query is required in CompanySearchService.searchUnregisteredCompanies");

        const QueryParams = {
            ...params,
            q: query
        }

        return this.customSearch(this.unregisteredCompaniesSearchPath, QueryParams );
    }

}