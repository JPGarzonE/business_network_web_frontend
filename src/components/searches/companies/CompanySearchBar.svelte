<script>
    import CompanySearchService from "../../../services/search/company.search.service.js";
    import { stores } from "@sapper/app";
    import { getContext } from 'svelte';

    const { session } = stores();
    const isSessionUserProfile = getContext("isSessionUserProfile");
    const companySearchService = new CompanySearchService();

    let searchQuery;
    let companiesSearchResults = [];
    let unregisteredCompaniesSearchResults = [];

    $: {
        if( searchQuery.length > 2 )
            search( searchQuery );
    }

    async function search( query ) {
        companiesSearchResults = await companySearchService.searchCompanies( searchQuery );
        unregisteredCompaniesSearchResults = await companySearchService.searchUnregisteredCompanies( searchQuery );
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