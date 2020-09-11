<script>
  import CompanySearchBar from '../../components/searches/companies/CompanySearchBar.svelte';

  export let displayCreateCompany;
</script>

<style>
  @import '/styles/form.css';

  .AddRelationship-headline {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2em;
  }

  .AddRelationship-title {
    margin: 25px 0px 15px;
    font-size: 1.2em;
    font-weight: 400;
    font-family: var(--title-font);
    text-align: center;
    letter-spacing: 0.035em;
  }

  .AddRelationship-subtitle {
    width: 80%;
    text-align: center;
    font-size: 0.9em;
    color: var(--secondary-text-color);
  }

  .AddRelationship-footer {
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .AddRelationship-footer-message {
    width: 80%;
    color: var(--secondary-text-color);
    font-size: 0.9em;
    text-align: center;
  }
</style>

<div class="AddRelationship ProfileForm">
  <button
    class="AddRelationship-close-button ProfileForm-close-button"
    on:click>
    <span>X</span>
  </button>

  <div class="AddRelationship-headline">
    <h3 class="AddRelationship-title">Busca una empresa</h3>

    <p class="AddRelationship-subtitle">
      Cuéntanos con que empresas has trabajado o que proveedores agregan valor a
      tus productos o servicios
    </p>
  </div>

  <div class="AddRelationship-search">
    <CompanySearchBar />
  </div>

  <div class="AddRelationship-footer">
    <p class="AddRelationship-footer-message">
      Si la empresa que estás buscando no aparece, creala acá
    </p>

    <button
      on:click={displayCreateCompany}
      class="AddRelationship-create-company-button button button--principal">
      Crea una empresa
    </button>
  </div>
</div>
