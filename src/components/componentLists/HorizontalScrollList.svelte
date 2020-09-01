<script>
  export let beginningItemsNumber = 0;
  export let id;
  let scrollList;
  const handleListScroll = (event) => {
    const HorizontalScrollList = event.target;

    if (beginningItemsNumber) {
      const ListNextIcon = document.getElementById(`${id}-next`);
      const ListPreviousIcon = document.getElementById(`${id}-previous`);

      HorizontalScrollList.addEventListener('scroll', () => {
        if (HorizontalScrollList.scrollLeft <= 0) {
          ListPreviousIcon.style.display = 'none';
        } else {
          ListPreviousIcon.style.display = 'flex';
        }

        if (
          HorizontalScrollList.scrollLeft + scrollList.offsetWidth >=
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
  const scrollLeft = () =>
    scrollList.scrollTo({
      left: scrollList.scrollLeft - 150,
      behavior: 'smooth',
    });
</script>

<style>
  .HorizontalScrollList {
    scroll-behavior: smooth;
    width: auto;
    height: auto;
    display: flex;
    flex-direction: row;
    padding: 10px 0px 0px;
    overflow-y: hidden;
    overflow-x: auto;
  }
  .HorizontalScrollList-wrapper {
    position: relative;
  }
  /* Hide scrollbar for Chrome, Safari and Opera */
  .HorizontalScrollList::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  .HorizontalScrollList {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .HorizontalScrollList-next,
  .HorizontalScrollList-previous {
    position: absolute;
    z-index: 7;
    height: 100%;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 10px;
  }

  .HorizontalScrollList-next i,
  .HorizontalScrollList-previous i {
    width: 35px;
    height: 35px;
    margin: 0px;
  }

  .HorizontalScrollList-next {
    right: -5px;
  }

  .HorizontalScrollList-previous {
    left: -5px;
  }
</style>

<div class="HorizontalScrollList-wrapper">
  {#if beginningItemsNumber > 0}
    <span
      on:click={scrollLeft}
      class="HorizontalScrollList-previous"
      id="{id}-previous"
      style="display:none;">
      <i class="icon-previous" />
    </span>
  {/if}
  <div
    class="HorizontalScrollList"
    on:scroll={handleListScroll}
    bind:this={scrollList}>
    <slot />
  </div>
  {#if beginningItemsNumber > 0}
    <span
      on:click={scrollRight}
      class="HorizontalScrollList-next"
      id="{id}-next">
      <i class="icon-next" />
    </span>
  {/if}
</div>
