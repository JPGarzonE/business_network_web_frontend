<script>
  export let active = 0;
  export let numberOfButtons;
  export let changeStep;

  const handleClick = (e) => {
    active = e;
    changeStep(e);
  };
</script>

<style>
  .Container {
    display: flex;
    z-index: 35;
    list-style-type: none;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, -50%);
  }

  .Dot {
    cursor: pointer;
    margin: 0 5px;
    width: 16px;
    height: 16px;
    border: 1px solid white;
    border-radius: 50%;
    background-color: transparent;
  }
  .Active {
    background-color: white;
    cursor: default;
  }
</style>

<ul class="Container">
  {#each Array(numberOfButtons) as _, i}
    {#if active == i}
      <li class="Dot Active" number={i} />
    {:else}
      <li class="Dot" on:click={() => handleClick(i)} />
    {/if}
  {/each}
</ul>
