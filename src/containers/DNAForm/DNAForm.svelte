<script>
  import DNAService from '../../services/suppliers/dna.service.js';
  import { stores } from '@sapper/app';
  import { getContext } from 'svelte';

  export let afterSubmit;
  export let DNAElement; // Pass if is an update form
  const { session } = stores();
  const isEditableProfile = getContext('isEditableProfile');

  const fields = ['title', 'category', 'description'];
  const categories = [
    'Equipo',
    'Procesos',
    'Capacitaciones',
    'Logros',
    'Metodologías',
    'Certificaciones',
    'Otro',
  ];
  const OptionOther = categories[categories.length - 1];

  let title = DNAElement ? DNAElement.title : null;
  let category = DNAElement ? DNAElement.category : categories[0];
  let description = DNAElement ? DNAElement.description : null;
  let media = DNAElement ? DNAElement.media : null;
  let newMediaFile;

  let formErrorMessage = '';
  $: otherCategory = category !== OptionOther ? null : otherCategory;

  let titleFeedback;
  let otherCategoryFeedback;
  let descriptionFeedback;

  function validateTitle() {
    if (title && title.length >= 2) {
      if (title.length > 50) {
        titleFeedback = 'Máximo 50 caracteres';
        return false;
      }

      titleFeedback = '';
      return true;
    } else if (title && title.length > 0 && title.length < 2) {
      titleFeedback = 'Mínimo 2 caracteres';
      return false;
    } else {
      titleFeedback = 'El título es obligatorio';
      return false;
    }
  }

  function validateOtherCategory() {
    if (category === OptionOther) {
      if (otherCategory && otherCategory.length >= 3) {
        if (otherCategory.length > 50) {
          otherCategoryFeedback = 'Máximo 50 caracteres';
          return false;
        }

        otherCategoryFeedback = '';
        return true;
      } else if (
        otherCategory &&
        otherCategory.length > 0 &&
        otherCategory.length < 3
      ) {
        otherCategoryFeedback = 'Mínimo 3 caracteres';
        return false;
      } else {
        otherCategoryFeedback = 'La categoria es obligatoria';
        return false;
      }
    }

    otherCategoryFeedback = '';
    return true;
  }

  function validateDescription() {
    if (description && description.length >= 2) {
      if (description.length > 155) {
        descriptionFeedback = `${description.length} caracteres - Máximo 155`;
        return false;
      }
    } else if (
      description &&
      description.length > 0 &&
      description.length < 2
    ) {
      descriptionFeedback = 'Mínimo 2 caracteres';
      return false;
    }

    descriptionFeedback = '';
    return true;
  }

  function validateDNAForm() {
    if (!(validateTitle() && validateOtherCategory() && validateDescription())) {
      formErrorMessage = 'Los datos no son válidos';
      throw new Error();
    } else {
      formErrorMessage = '';
    }
  }

  async function submit(event) {
    let categoryToSubmit = otherCategory ? otherCategory : category;

    const Target = event.target;
    Target.style.opacity = 0.4;
    Target.style.cursor = 'not-allowed';

    try {
      if (isEditableProfile) {
        validateDNAForm();
        let dataToSubmit = {
          title: title,
          category: categoryToSubmit,
        };

        if (description) dataToSubmit.description = description;

        let dnaElement;
        if (DNAElement && DNAElement.id)
          dnaElement = await submitUpdate(dataToSubmit);
        else dnaElement = await submitCreate(dataToSubmit);

        afterSubmit(dnaElement);
      }
    } catch (e) {
      const error = e.message;
      fields.map((field) => {
        if (error[field]) {
          formErrorMessage += `${formErrorMessage ? '\n' : ''}${field}: ${
            error[field]
          }`;
        }
      });
    } finally {
      Target.style.opacity = 1;
      Target.style.cursor = 'pointer';
    }
  }

  async function submitCreate(dataToSubmit) {
    const dnaService = new DNAService();

    if (newMediaFile) {
      const DnaElementData = await dnaService.createSupplierDnaelementWithImage(
        $session.company_accountname,
        newMediaFile,
        dataToSubmit,
        $session.accessToken
      );

      return DnaElementData;
    } else {
      const DnaElementData = await dnaService.createSupplierDnaelement(
        $session.company_accountname,
        dataToSubmit,
        $session.accessToken
      );

      return DnaElementData;
    }
  }

  async function submitUpdate(dataToSubmit) {
    const dnaService = new DNAService();

    if (newMediaFile) {
      const DnaElementData = await dnaService.updateSupplierDnaelementWithImage(
        $session.company_accountname,
        DNAElement.id,
        newMediaFile,
        dataToSubmit,
        $session.accessToken
      );

      return DnaElementData;
    } else {
      const DnaElementData = await dnaService.updateSupplierDnaelement(
        $session.company_accountname,
        DNAElement.id,
        dataToSubmit,
        $session.accessToken
      );

      return DnaElementData;
    }
  }
</script>

<style>
  @import '/styles/form.css';

  .DNAForm-headline {
    width: 100%;
    max-width: 400px;
  }

  .DNAForm-title {
    margin: 25px 0px 15px;
    font-size: 1.2em;
    font-weight: 400;
    font-family: var(--title-font);
    text-align: center;
    letter-spacing: 0.035em;
  }

  .DNAForm-subtitle {
    text-align: center;
    font-size: 0.95em;
    color: var(--secondary-text-color);
  }

  .DNAForm-preview {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 25px 0px 15px;
  }

  .DNAForm-preview-card {
    max-width: 300px;
    width: auto;
    height: auto;
    min-width: 250px;
    max-height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    border: 2px solid var(--principal-color);
    border-top: unset;
    border-radius: 10px;
    cursor: pointer;
  }

  .DNAForm-preview-card--without-image {
    border-top: 2px solid var(--principal-color);
  }

  .DNAForm-preview-media {
    position: relative;
    width: 101.5%;
    height: 66%;
    min-height: 130px;
    max-height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border-bottom: 1px solid var(--light-color);
    border-bottom-left-radius: unset;
    border-bottom-right-radius: unset;
  }

  .DNAForm-preview-title {
    width: 100%;
    margin: 15px 0px 10px 0px;
    font-size: 1em;
    padding: 0 5%;
    text-align: start;
    font-weight: 100;
    color: var(--principal-color);
    word-break: break-word;
  }

  .DNAForm-preview-bottom {
    width: 100%;
    min-height: 17px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 0 5%;
    font-size: 0.9em;
  }

  .DNAForm-preview-bottom p {
    color: var(--principal-text-color);
  }

  .DNAForm-preview-link {
    background: none;
    color: var(--principal-color);
    cursor: pointer;
    text-decoration: underline;
  }

  .form-group input,
  .form-group input::placeholder,
  .form-group textarea,
  .form-group textarea::placeholder,
  .form-group select {
    font-size: 13.5px;
    font-family: var(--body-font);
    color: var(--secondary-text-color);
    letter-spacing: 0.04em;
  }

  .DNAForm-title,
  .DNAForm-category,
  .DNAForm-category--other,
  .DNAForm-description {
    width: 100%;
    border: none;
    border-bottom: 1px solid var(--secondary-text-color);
  }

  .DNAForm-category--left {
    width: 40%;
  }

  .DNAForm-category--other {
    width: 70%;
    margin-left: 15px;
  }

  .DNAForm-description {
    max-height: 50px;
  }

  .DNAForm-button {
    margin-top: 3em;
  }

  @media screen and (min-width: 400px) {
    .DNAForm-headline {
      width: 400px;
    }
  }
</style>

<!-- DNAForm for both update or create a DNAElement -->
<div class="DNAForm ProfileForm">
  <button class="DNAForm-close-button ProfileForm-close-button" on:click>
    <span>X</span>
  </button>

  <div class="DNAForm-headline">
    <h3 class="DNAForm-title">
      {DNAElement ? 'Actualiza tu ADN' : 'Crea tu identidad'}
    </h3>

    {#if formErrorMessage}
      <div class="form-banner--invalid">
        <p>{formErrorMessage}</p>
      </div>
    {:else if !DNAElement}
      <p class="DNAForm-subtitle">
        ¿Qué te hace único? <br /> Aquí puedes mostrarle al mundo tu equipo, procesos,
        capacitaciones, logros, entre muchos otros.
      </p>
    {/if}
  </div>

  <div class="DNAForm-preview">
    <div
      class="DNAForm-preview-card {newMediaFile || (media && media.path) ? '' : 'DNAForm-preview-card--without-image'}">
      <div class="DNAForm-preview-media" />
      <h4 class="DNAForm-preview-title">{title ? title : 'Título'}</h4>
      <div class="DNAForm-preview-bottom">
        {#if category}
          {#if category === OptionOther}
            <p>{otherCategory ? otherCategory : 'Otro'}</p>
          {:else}
            <p>{category}</p>
          {/if}
        {:else}
          <p>Categoria</p>
        {/if}
        <span class="DNAForm-preview-link">Ver historia</span>
      </div>
    </div>
  </div>

  <form class="DNAForm-form ProfileForm-form">
    <div class="form-group">
      <input
        type="text"
        name="title"
        placeholder="Título"
        class="DNAForm-title"
        bind:value={title}
        on:input={validateTitle} />

      {#if titleFeedback}
        <p class="form-control-feedback form-control-feedback--invalid">
          {titleFeedback}
        </p>
      {:else}
        <p class="form-control-feedback">Máximo 50 caracteres</p>
      {/if}
    </div>

    <div class="form-group">
      <div class="ProfileForm-group">
        <select
          name="category"
          bind:value={category}
          class="DNAForm-category {category === OptionOther ? 'DNAForm-category--left' : ''}">
          {#each categories as cat}
            <option
              value={cat}
              selected={category.toLowerCase() == cat.toLowerCase()}>
              {cat}
            </option>
          {/each}
        </select>

        {#if category === OptionOther}
          <input
            type="text"
            name="other-category"
            placeholder="¿Cuál?"
            class="DNAForm-category--other"
            bind:value={otherCategory}
            on:input={validateOtherCategory} />
        {/if}
      </div>

      {#if otherCategoryFeedback}
        <p class="form-control-feedback form-control-feedback--invalid">
          {otherCategoryFeedback}
        </p>
      {:else if category === OptionOther}
        <p class="form-control-feedback">Máximo 50 caracteres</p>
      {/if}
    </div>
    <div class="form-group">
      <textarea
        name="description"
        placeholder="Historia - Descripción breve"
        rows="2"
        class="DNAForm-description"
        bind:value={description}
        on:input={validateDescription} />

      {#if descriptionFeedback}
        <p class="form-control-feedback form-control-feedback--invalid">
          {descriptionFeedback}
        </p>
      {:else}
        <p class="form-control-feedback">
          {#if description}
            {description.length} caracteres - Máximo 155
          {:else}Máximo 155 caracteres{/if}
        </p>
      {/if}
    </div>

    <button
      on:click|preventDefault={submit}
      class="DNAForm-button button button--principal">
      Aceptar y mostrar
    </button>
  </form>
</div>
