<script>
    import UploadOutline from "svelte-material-icons/UploadOutline.svelte";

    export let name;
    export let message;
    export let primary;
    export let acceptFiles; // Array of Strings of the types of files
    export let value = null; // Actual file content of the input
    export let inputColor = "var(--principal-color)";

    const inputName = `${name}-input`;
    let valueName = value && value.name ? value.name : "";
    let validType = null;
    let fontColor = "";

    $: {
        if (validType === false) fontColor = "var(--error-color)";
        else if (value || primary) fontColor = "white";
        else fontColor = inputColor;
    }

    function setInputValue(event) {
        const FileUploadInput = event.target;
        value = FileUploadInput.files[0];
        if (isValidType(value.type)) {
            valueName = value.name;
            validType = true;
        } else {
            value = null;
            validType = false;
        }
    }

    function isValidType(fileType) {
        let isValid = true;

        acceptFiles.forEach((type) => {
            if (fileType.toLowerCase() === type.toLowerCase()) isValid = true;
        });

        return isValid;
    }
</script>

<style>
    .FileUploadInput {
        width: 100%;
    }

    .FileUploadInput-label {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 18px;
        border: 3px solid var(--principal-color);
        border-radius: 4px;
        font-size: 0.9em;
        font-weight: bold;
        letter-spacing: 0.22px;
        color: var(--principal-color);
        cursor: pointer;
    }
    .FileUploadInput-label.primary {
        background-color: var(--principal-color);
        color: var(--secondary-color);
        border-width: 0;
    }

    .FileUploadInput-icon-container {
        display: flex;
        margin-right: 4.5px;
    }

    .FileUploadInput-message {
        text-align: center;
    }

    .FileUploadInput-helper {
        margin-top: 0.3em;
        font-size: 0.9em;
        text-align: center;
        letter-spacing: 0.22px;
        color: var(--secondary-text-color);
    }
</style>

<div class="FileUploadInput">
    <label
        for={inputName}
        class="FileUploadInput-label {primary ? 'primary' : ''}"
        style="border-color:{fontColor}; background-color:{value && validType ? inputColor : 'none'}">
        <span class="FileUploadInput-icon-container">
            <UploadOutline size={25} color={fontColor} />
        </span>
        <span class="FileUploadInput-message" style="color:{fontColor};">
            {#if validType === false}
                Formato de archivo no válido
            {:else}{valueName ? valueName : message}{/if}
        </span>
    </label>
    <input
        type="file"
        id={inputName}
        name={inputName}
        accept={acceptFiles.join(',')}
        style="display:none;"
        on:change={setInputValue} />

    {#if validType === false}
        <p class="FileUploadInput-helper">
            Solo se admite:
            {acceptFiles.join(', ')}
        </p>
    {/if}
</div>
