<script lang="ts">
  import { Router } from "svelte-router-spa";
  import { routes } from "./routes";
</script>

<svelte:head>
  <style lang="scss">
    @import "./styles/toolkit";
  </style>
</svelte:head>

<Router {routes} />
