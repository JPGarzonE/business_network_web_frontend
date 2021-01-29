<script>
  import { createEventDispatcher } from "svelte";
  export let value = "es";
  const dispatch = createEventDispatcher();
  function switchLocale(event) {
    event.preventDefault();
    dispatch("locale-changed", event.target.value);
  }
</script>

<div class="choose-locale">
  <!-- svelte-ignore a11y-no-onchange -->
  <div class="select">
    <select {value} on:change={switchLocale}>
      <option value="es">Espanol</option>
      <option value="en">English</option>
    </select>
  </div>
</div>

<style>
  .choose-locale {
    display: flex;
    justify-content: center;
  }
  .select {
    margin: 0 1rem 1rem;
  }
</style>
