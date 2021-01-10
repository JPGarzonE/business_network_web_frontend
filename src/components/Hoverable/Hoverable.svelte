<script>
    export let message;

</script>
<style>

    .hoverText{
        color: #6e7072;
        font-size: 8px;
        background-color: #efefef;
        height: 20px;
        width: fit-content;
        min-width: 80px;
        position: absolute;
        top: -125%;
        right: 85%;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px 5px;
	}
    .arrow-down {
        width: 0; 
        height: 0; 
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        position: absolute;
        top: -29%;
        left: 3%;
        border-top: 10px solid  #efefef;
}
</style>
<div>
<div class="hoverText">{message}</div>
<div class="arrow-down"/>
</div>