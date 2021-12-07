<script>
  import { Route } from "svelte-router-spa";
  import Button from "../components/Button.svelte";
  import { KeycloakProxy } from "../keycloak";
  import { protocolStore } from "src/stores/protocolstore";

  export let currentRoute;
  const params = {};

  $: userString = `Protocol ${$protocolStore}`;

  function logout() {
    KeycloakProxy.getInstance().logout();
  }
</script>

<div class="wrapper">
  <nav>
    <a href="/">Home</a>
    <a href="/protocol">Protocol selecteren</a>
    {#if !!$protocolStore}
      <a href="/taken/{$protocolStore}">Openstaande taken</a>
      <a href="/aanmaken">Aanmaken repertoriumregel</a>
    {/if}
  </nav>
  <header>
    <Button on:click={logout} label="Logout" buttonType="secondary" />
    {#if !!$protocolStore}
      <b>{userString}</b>
    {/if}
  </header>
  <main>
    <Route {currentRoute} {params} />
    <main />
  </main>
</div>

<style lang="scss">
  @import "../styles/utilities";
  .wrapper {
    display: grid;
    grid-template-areas:
      "nav header"
      "nav main"
      "nav main";
    grid-template-columns: 200px auto;
    padding: $layout-02;
  }
  nav {
    grid-area: nav;
    display: flex;
    flex-direction: column;
    padding-right: $layout-02;
    a {
      padding: $layout-01;
      text-decoration: none;
      color: $color-core-black;
      &:hover {
        background-color: $color-core-gray;
      }
    }
  }

  header {
    grid-area: header;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: baseline;

    a {
      text-decoration: none;
      color: $color-klant-purple;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  main {
    grid-area: main;
    width: 80%;
    margin: $layout-02 auto;
  }

  // Kun je geen styling toepassen op Componenten?
  :global(button) {
  }
</style>
