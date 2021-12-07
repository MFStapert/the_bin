<script lang="ts">
  import Button from "../components/Button.svelte";
  import { VoorkeursinstellingenControllerApi } from "generated/apis/VoorkeursinstellingenControllerApi";
  import type { ProtocolhouderModel, ProtocolModel } from "generated/models/";
  import { KeycloakProxy } from "src/keycloak";
  import { protocolStore } from "src/stores/protocolstore";
  import { navigateTo } from "svelte-router-spa";

  let voorkeursInstellingenReq = new VoorkeursinstellingenControllerApi(
    KeycloakProxy.getApiConfiguration()
  ).getVoorkeursinstellingen();

  function selectProtocol(protocolNr: number): void {
    protocolStore.set(protocolNr);
    navigateTo(`/taken`);
  }

  function getProtocolTitle(protocol: ProtocolModel): string {
    const extra = !!protocol?.toegevoegdAan
      ? "(toegevoegd)"
      : !!protocol?.currentProtocolhouder?.indicatieWaarneming
      ? "(waarnemer)"
      : "";
    return `${protocol.protocolnummer} - ${getFullProtocolhouderName(
      protocol.currentProtocolhouder
    )} ${extra}`.trim();
  }

  function getFullProtocolhouderName(
    protocolhouder: ProtocolhouderModel | undefined
  ): string {
    if (!protocolhouder) {
      return "onbekend";
    }
    return (
      [
        protocolhouder.titelVoor,
        protocolhouder.voorletters,
        protocolhouder.voorvoegselGeslachtsnaam,
        protocolhouder.geslachtsnaam,
        protocolhouder.titelAchter,
      ]
        .reduce((acc, curr) => (curr ? `${acc} ${curr.trim()}` : acc), "")
        ?.trim() ?? "onbekend"
    );
  }
</script>

<h1 class="heading--1">Protocol selecteren</h1>

{#await voorkeursInstellingenReq}
  <p>...waiting</p>
{:then voorkeursInstellingen}
  {#each voorkeursInstellingen.protocollen as protocol}
    <div class="list">
      <b style="font-size:14px;">{getProtocolTitle(protocol)}</b>
      <Button
        on:click={() => selectProtocol(protocol.protocolnummer)}
        label="Selecteren"
        buttonType="text"
      />
    </div>
  {/each}
{:catch error}
  <p>{error}</p>
{/await}

<style lang="scss">
  @import "../styles/utilities";
  .list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: $layout-01;
    border: 1px solid $color-core-gray;
    width: 100%;
    height: 62px;
  }
</style>
