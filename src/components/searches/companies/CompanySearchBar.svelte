<script>
    import CompaniesSearchService from "../../../services/search/companies.search.service.js";
    import { stores } from "@sapper/app";

    const companiesSearchService = new CompaniesSearchService();

    let searchQuery = '';
    let companiesSearchResults = [];
    let unregisteredCompaniesSearchResults = [];

    $: {
        if( searchQuery.length > 2 )
            search( searchQuery );
    }

    async function search( query ) {
        companiesSearchResults = await companiesSearchService.searchCompanies( searchQuery );
        unregisteredCompaniesSearchResults = await companiesSearchService.searchUnregisteredCompanies( searchQuery );
    }
</script>

<style>

</style>

<div class="CompanySearchBar">
    
    <input type="text" name="companies-search" class="CompanySearchBar-input" 
        placeholder="Busca la empresa" bind:value={searchQuery} />

    <div class="CompanySearchBar-results">

    </div>
</div>