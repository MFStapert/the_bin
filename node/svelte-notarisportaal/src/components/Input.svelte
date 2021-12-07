<script lang="ts">
  export let label = "";
  export let helperText = "";
  export let errors = "";
</script>

<label for="" class="input">
  <span class="input__label field-label">
    {label}
  </span>
  <div class="input__field">
    <slot />
  </div>
  <div class="input__helper-text helper-text">
    {helperText}
  </div>
  {#if errors}
    <div class="input__errors">
      {errors}
    </div>
  {/if}
</label>
