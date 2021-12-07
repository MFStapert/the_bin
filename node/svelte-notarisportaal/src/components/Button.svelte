<script lang="ts">
  export let label: string;
  export let buttonType: "primary" | "secondary" | "text" = "primary";
  export let type: string = "button";
</script>

<button
  on:click
  class="button button--default button--label button--{buttonType}"
  {type}
>
  <span class="button__label">{label}</span>
</button>
