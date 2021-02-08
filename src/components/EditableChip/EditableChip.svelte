<script>
    import Chip, {Icon, Text} from '@smui/chips';
    import { validateString } from '../../validators/formValidators';
    import Hoverable from '../Hoverable/Hoverable.svelte';
    import CloseCircle from 'svelte-material-icons/CloseCircle.svelte';
    import Close from 'svelte-material-icons/Close.svelte';
    import { _ } from 'svelte-i18n';

    export let key;
    export let value = '';
    export let afterUpdate = (key, value) => console.log(`${key}-${value} updated`);
    export let isEditable = true;
    export let validateItemValue = (value) => validateString(value);
    
    let editValue = value;
    let editableMode = false;
    let focusOnOver = true;

    $: valueValidation = validateItemValue(editValue);
    $: isValid = !isEditable || valueValidation.isValid;

    function deactivateEditableMode() {
        if( isEditable ) { 
            editableMode = false;

            if( value !== editValue ) {
                value = editValue;
                afterUpdate(key, value);
            }
        }
    }

    function activateEditableMode() {
        if( isEditable ) {
            editableMode = true;
            focusOnOver = true;
        }
    }

    function focusChipInput(event) {
        if( isEditable && focusOnOver ) {
            selectText( event );
            event.target.focus();
            focusOnOver = false;
        }
    }

    function updateChipEditValue( newValue ) {
        if( isEditable ) editValue = newValue;
    }

    function selectText(event) {
        let node = event.target;

        if (document.body.createTextRange) {
            const range = document.body.createTextRange();
            range.moveToElementText(node);
            range.select();
        } else if (window.getSelection) {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(node);
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            console.warn("Could not select text in node: Unsupported browser.");
        }
    }
</script>

{#if editableMode && isEditable}
    <span class="chip-input"     
        style="{isValid ? '' : 'border: 2px solid var(--error-color);'}"
    >
        <span class="chip-input-text" 
            style="{isValid ? '' : 'color: var(--error-color);'}"
            role="textbox" contenteditable
            data-content={$_("editableChip.inputPlaceholder")}
            on:blur={ () => deactivateEditableMode() } 
            on:mouseover={ (e) => focusChipInput(e) }
            on:input={ (e)=> updateChipEditValue(e.target.innerText) }
        >
            {editValue}
        </span>

        <Icon on:click={ () => deactivateEditableMode() }
            style="display:flex; cursor:pointer; {isValid ? '' : 'color: var(--error-color);'}"
        >
            <Close />
        </Icon>
    </span>
{/if}

<Chip style="max-width:100%;min-height:32px;height:fit-content;{editableMode ? 'display:none;' : ''}
    {isValid ? '' : 'color: var(--error-color);border: 2px solid var(--error-color);'}"
    on:click={() => activateEditableMode()}
>
    <Text style="word-break:break-word; white-space:break-spaces;">{value}</Text>
    <Icon style="display:flex; cursor:pointer; {isValid ? null : 'color: var(--error-color);'}">
        <slot name="cancel-icon">
            <CloseCircle />
        </slot>
    </Icon>

    {#if !isValid}
    <Hoverable textTop="-25px" textRight="" textLeft="-15px"
        message={valueValidation.message} 
    />
    {/if}
</Chip>


<style>
    .chip-input {
        min-height: 32px;
        height: fit-content;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 4px;
        padding: 5px 12px;
        border: 2px solid var(--principal-color);
        border-radius: 16px;
        font-family: inherit;
        font-size: 0.875rem;
        word-break: break-word;
        letter-spacing: 0.0178571429em;
        background-color: var(--lightest-gray);
        transition-delay: 0.5s;
    }

    .chip-input-text:empty::before {
        content: attr(data-content);
        color: var(--light-color);
    }
</style>