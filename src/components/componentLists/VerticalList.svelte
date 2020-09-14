<script>
    export let beginningItemsNumber = 0;
    export let id;
    let scrollList;
    const handleListScroll = (event) => {
      const VerticalList = event.target;
  
      if (beginningItemsNumber) {
        const ListNextIcon = document.getElementById(`${id}-next`);
        const ListPreviousIcon = document.getElementById(`${id}-previous`);
  
        VerticalList.addEventListener('scroll', () => {
          if (VerticalList.scrollLeft <= 0) {
            ListPreviousIcon.style.display = 'none';
          } else {
            ListPreviousIcon.style.display = 'flex';
          }
  
          if (
            VerticalList.scrollLeft + scrollList.offsetWidth >=
            scrollList.scrollWidth
          ) {
            ListNextIcon.style.display = 'none';
          } else {
            ListNextIcon.style.display = 'flex';
          }
        });
      }
    };
    const scrollRight = () => {
      scrollList.scrollTo({
        left: scrollList.scrollLeft + 150,
        behavior: 'smooth',
      });
    };
  </script>
  
  <style>
    .VerticalList-wrapper {
      position: relative;
    }
    .VerticalList{
      display:flex;
      
    }
    /* Hide scrollbar for Chrome, Safari and Opera */    
  </style>
<div class="VerticalList">
    <div class="VerticalList-wrapper">
      {#if beginningItemsNumber > 0}
      <span
      on:click={scrollRight}
      class="VerticalList-next"
      id="{id}-next">
    </span>
    {/if}
  </div>

</div>
  