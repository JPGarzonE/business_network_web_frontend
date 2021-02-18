<script>
    import {Set} from '@smui/chips';
    import EditableChip from '../EditableChip/EditableChip.svelte';
    import CreateButton from '../CreateButton/CreateButton.svelte';
    import Textfield from '@smui/textfield';
    import HelperText from '@smui/textfield/helper-text';
    import TrashCanOutline from 'svelte-material-icons/TrashCanOutline.svelte';
    import { validateString } from '../../validators/formValidators';

    export let items = [];
    export let placeholder = '';
    export let fromItemToText = (item) => item;
    export let fromTextToItem = (text) => text;
    export let validateItemValue = (value) => validateString(value);
    export let itemsAreEditable = true;
    export let onDeleteItem = (item) => console.log('Delete item ->' + item);
    
    let newItemText = '';
    let textFieldIsFocused = false;
    $: itemValidation = validateItemValue(newItemText);

    for( let i = 0; i < items.length; i++ ) {
        items[i] = {key: i+1, ...items[i]};
    }

    function addItem(e) {
        if( !itemValidation.isValid ) return;
        
        // Identify if add was executed by an enter on correct the text field
        if( e.clientX === 0 && e.clientY === 0 && !textFieldIsFocused )
            return;

        const key = items.length ? 
            items[items.length - 1].key + 1 
            :
            0;

        items.push(
            {
                key: key,
                ...fromTextToItem(newItemText) 
            }
        );

        items = items;
        newItemText = '';
    }

    function updateItem( key, textValue ) {
        for( let i = 0; i < items.length; i++ ) {
            let item = items[i];

            if( item.key === key ) {
                items[i] = {
                    ...item,
                    ...fromTextToItem(textValue)
                };
                break;
            }
        }
    }
</script>

<div class="ChipListInput">
    <div class="ChipListInput-entry">
        <slot name='input-icon'></slot>

        <div class="ChipListInput-entry-textfield">
            <Textfield style="width:100%; height:50px" 
                variant="outlined"
                bind:value={newItemText} 
                on:focus={() => textFieldIsFocused = true}
                on:blur={() => textFieldIsFocused = false}
                label={placeholder}
                invalid={newItemText && !itemValidation.isValid}
            >
                
            </Textfield>
            <!-- Persistent -->
            <HelperText persistent={newItemText && !itemValidation.isValid}>
                {itemValidation.message}
            </HelperText>
        </div>

        <div class="AddButton-container">
            <CreateButton color="var(--principal-color)" 
                size=20 id="AddExportCountry" 
                on:click={addItem} disabled={!itemValidation.isValid}
            />
        </div>
    </div>

    <Set bind:chips={items} let:chip key={(chip) => chip.key || chip.id} input>
        <EditableChip {validateItemValue} 
            isEditable={itemsAreEditable}
            key={chip.key}
            value={fromItemToText(chip)}
            afterUpdate={updateItem}
        >
            <span slot="cancel-icon" on:click={() => onDeleteItem(chip)}>
                <TrashCanOutline />
            </span>
        </EditableChip>
    </Set>
</div>

<style>
    .ChipListInput, .ChipListInput-entry, .ChipListInput-entry-textfield {
        width: 100%;
    }

    .ChipListInput-entry {
        display: flex;
    }

    .ChipListInput-entry-textfield {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .AddButton-container {
        height:50px;
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 10px;
    }
</style>