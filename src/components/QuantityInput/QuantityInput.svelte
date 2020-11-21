<script>
    import Textfield from '@smui/textfield';

    export let minimumQuantity = null;
    export let maximumQuantity = null;
    
    export let quantity = 0;
    quantity = minimumQuantity == null ? quantity : minimumQuantity;

    let invalid = false;
    let invalidFeedback = "";

    $: validateQuantity(quantity);

    function validateQuantity( newQuantity ) {
        if( minimumQuantity && newQuantity < minimumQuantity ) {
            invalid = true;
            invalidFeedback = "La cantidad no puede ser menor a la cantidad mínima";
            return false;
        }  
        else if( maximumQuantity && newQuantity > maximumQuantity ) {
            invalid = true;
            invalidFeedback = "La cantidad no puede ser mayor que la cantidad máxima";
            return false;
        }

        invalid = false;
        invalidFeedback = "";
        return true;
    }

    function updateQuantity( quantityToUpdate ) {
        let newQuantity = quantity + quantityToUpdate;

        if( validateQuantity(newQuantity) ) quantity = newQuantity;
    }
</script>

<style>
    .QuantityInput {
        width: 100%;
        height: 100%;
        display: flex;
    }
    .QuantityInput-input {
        width: 78%;
        display: flex;
        flex-direction: column;
        margin-right: 14px;
    }
    .QuantityInput-invalid-feedback {
        font-size: 14px;
        color: var(--error-color);
    }
    .QuantityInput-controllers {
        width: 10%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    .QuantityInput-add, .QuantityInput-substract {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .QuantityInput-add i, .QuantityInput-substract i {
        width: 19px;
        height: 19px;
        margin: 0px;
    }
    .QuantityInput-add, .QuantityInput-substract {
        cursor: pointer;
    }
    .QuantityInput-add {
        transform: rotate(-90deg);
    }
    .QuantityInput-substract {
        transform: rotate(90deg);
    }
</style>

<div class="QuantityInput">
    <div class="QuantityInput-input">
        <Textfield style="width:100%;height:100%;" variant="outlined" type="number" 
            bind:value={quantity} label="Cantidad"
            input$aria-controls="quantity" 
            input$aria-describedby="quantity"
            input$min={minimumQuantity ? minimumQuantity : ''}
            input$max={maximumQuantity ? maximumQuantity : ''}
            input$maxlength="50" input$step="any" {invalid} />

        {#if invalid}
        <p class="QuantityInput-invalid-feedback">{invalidFeedback}</p>
        {/if}
    </div>

    <div class="QuantityInput-controllers">
        <span on:click={()=>updateQuantity(10)} class="QuantityInput-add">
            <i class="icon-next" />
        </span>
        <span on:click={()=>updateQuantity(-10)} class="QuantityInput-substract">
            <i class="icon-next" />
        </span>
    </div>
</div>