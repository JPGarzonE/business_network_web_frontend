<script>
  export let message;
  export let textTop = '-25px';
  export let textRight = '60%';
  export let textLeft = '';
  export let textBottom = '';
</script>

<div>
  <div class="hoverText"
    style="{textTop ? `top:${textTop}` : ''};
      {textRight ? `right:${textRight}` : ''};
      {textLeft ? `left:${textLeft}` : ''};
      {textBottom ? `bottom:${textBottom}` : ''};"
  >
    {message}
  </div>
  <div class="arrow-down" />
</div>

<style>
  .hoverText {
    color: #6e7072;
    font-size: 10px;
    background-color: #efefef;
    height: 20px;
    width: max-content;
    min-width: 80px;
    position: absolute;
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
    top: -6px;
    left: 3%;
    border-top: 10px solid #efefef;
  }
</style>
