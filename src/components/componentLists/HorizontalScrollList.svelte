<script>
    export let beginningItemsNumber = 0;
    export let id;

    function handleListScroll(event) {
        const HorizontalScrollList = event.target;

        if( beginningItemsNumber ){
            const ListNextIcon = document.getElementById(`${id}-next`);
            const ListPreviousIcon = document.getElementById(`${id}-previous`);

            HorizontalScrollList.addEventListener("scroll", ()=>{
                if( HorizontalScrollList.scrollLeft <= 0 ){
                    ListPreviousIcon.style.display = "none";
                }else{
                    ListPreviousIcon.style.display = "flex";
                }

                if( HorizontalScrollList.scrollLeft >= HorizontalScrollList.offsetWidth ){
                    ListNextIcon.style.display = "none";
                }
                else{
                    ListNextIcon.style.display = "flex"
                }
            });
            
            ListNextIcon.addEventListener("click", ()=>{
                HorizontalScrollList.scrollLeft = HorizontalScrollList.scrollLeft + 150;
            });

            ListPreviousIcon.addEventListener("click", ()=>{
                HorizontalScrollList.scrollLeft = HorizontalScrollList.scrollLeft - 150;
            });
        }
    }
</script>

<style>
    .HorizontalScrollList {
        width: auto;
        height: auto;
        display: flex;
        flex-direction: row;
        padding: 10px 0px 0px;
        white-space: wrap;
        overflow-y: hidden;
        overflow-x: auto;
    }

    .HorizontalScrollList::-webkit-scrollbar {
        display: none;
    }

    .HorizontalScrollList-next, .HorizontalScrollList-previous {
        position: sticky;
        z-index: 7;
        top: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px 10px;
        background: rgba(255,255,255,0.67);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ffffff', GradientType=1 );
    }

    .HorizontalScrollList-next i, .HorizontalScrollList-previous i{
        width: 35px;
        height: 35px;
        margin: 0px;
    }

    .HorizontalScrollList-next {
        right: -5px;
        background: -moz-linear-gradient(left, rgba(255,255,255,0.67) 28%, rgba(255,255,255,0.67) 69%, rgba(255,255,255,1) 89%, rgba(255,255,255,1) 100%);
        background: -webkit-gradient(left top, right top, color-stop(28%, rgba(255,255,255,0.67)), color-stop(69%, rgba(255,255,255,0.67)), color-stop(89%, rgba(255,255,255,1)), color-stop(100%, rgba(255,255,255,1)));
        background: -webkit-linear-gradient(left, rgba(255,255,255,0.67) 28%, rgba(255,255,255,0.67) 69%, rgba(255,255,255,1) 89%, rgba(255,255,255,1) 100%);
        background: -o-linear-gradient(left, rgba(255,255,255,0.67) 28%, rgba(255,255,255,0.67) 69%, rgba(255,255,255,1) 89%, rgba(255,255,255,1) 100%);
        background: -ms-linear-gradient(left, rgba(255,255,255,0.67) 28%, rgba(255,255,255,0.67) 69%, rgba(255,255,255,1) 89%, rgba(255,255,255,1) 100%);
        background: linear-gradient(to right, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.81) 65%, #ffffff 90%, white 100%);
    }

    .HorizontalScrollList-previous {
        left: -5px;
        background: -moz-linear-gradient(right rgba(255,255,255,0.67) 28%, rgba(255,255,255,0.67) 69%, rgba(255,255,255,1) 89%, rgba(255,255,255,1) 100%);
        background: -webkit-gradient(right top, left top, color-stop(28%, rgba(255,255,255,0.67)), color-stop(69%, rgba(255,255,255,0.67)), color-stop(89%, rgba(255,255,255,1)), color-stop(100%, rgba(255,255,255,1)));
        background: -webkit-linear-gradient(right, rgba(255,255,255,0.67) 28%, rgba(255,255,255,0.67) 69%, rgba(255,255,255,1) 89%, rgba(255,255,255,1) 100%);
        background: -o-linear-gradient(right, rgba(255,255,255,0.67) 28%, rgba(255,255,255,0.67) 69%, rgba(255,255,255,1) 89%, rgba(255,255,255,1) 100%);
        background: -ms-linear-gradient(right, rgba(255,255,255,0.67) 28%, rgba(255,255,255,0.67) 69%, rgba(255,255,255,1) 89%, rgba(255,255,255,1) 100%);
        background: linear-gradient(to left, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.81) 65%, #ffffff 90%, white 100%);
    }
</style>

<div class="HorizontalScrollList" on:scroll={handleListScroll}>
    {#if beginningItemsNumber > 0}
        <span class="HorizontalScrollList-previous" id="{id}-previous" style="display:none;">
            <i class="icon-previous"></i>
        </span>
    {/if}

    <slot />

    {#if beginningItemsNumber > 0}
        <span class="HorizontalScrollList-next" id="{id}-next">
            <i class="icon-next"></i>
        </span>
    {/if}
</div>