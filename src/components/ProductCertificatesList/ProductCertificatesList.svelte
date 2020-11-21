<script>
    export let certificates = [];
</script>

<style>
    .ProductCertificatesList-title {
        font-size: 1em;
        color: var(--light-color);
        font-weight: normal;
        letter-spacing: 0.216px;
        margin-bottom: 10px;
    }
    .ProductCertificatesList-content {
        display: flex;
        flex-direction: column;
    }
    .ProductCertificatesList-content span {
        color: var(--light-color);
        font-size: 0.9em;
        letter-spacing: 0.216px;
    }
</style>

<div class="ProductCertificatesList">
    <h5 class="ProductCertificatesList-title">Certificados:</h5>

    <div class="ProductCertificatesList-content">
        {#each certificates as certificate}
        <span>{certificate.name}</span>
        {/each}
    </div>
</div>