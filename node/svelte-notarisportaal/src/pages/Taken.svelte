<script lang="ts">
  import { RepertoriumregelControllerApi } from "generated/apis/RepertoriumregelControllerApi";
  import type { PartijModel, AkteModel } from "generated/models";
  import { KeycloakProxy } from "src/keycloak";
  import { navigateTo } from "svelte-router-spa";
  import Button from "../components/Button.svelte";
  import { protocolStore } from "src/stores/protocolstore";

  const req = new RepertoriumregelControllerApi(
    KeycloakProxy.getApiConfiguration()
  ).getRegelsOpenstaand({ protocolnummer: $protocolStore });

  function getSoortAkte(akte?: AkteModel): string {
    const akteSoorten =
      akte?.soortenAkten?.map((soortAkte) => soortAkte.waarde).join(", ") ?? "";
    const akteSoortenVrijeKeuze =
      akte?.soortenAktenVrijeKeuzeOmschrijving?.join(", ") ?? "";

    return `${akteSoorten}${
      akteSoorten.length > 0 && akteSoortenVrijeKeuze.length > 0 ? ", " : ""
    }${akteSoortenVrijeKeuze}`;
  }

  function getPartij(partijen?: PartijModel[]): string {
    return (partijen ?? [])
      .map((p: PartijModel): string => {
        return `${p.type}`;
      })
      .join("; ");
  }

  function formatDate(date: Date): string {
    return `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
  }
</script>

<div style="display: flex;justify-content:space-between;">
  <h1 class="heading--1">Openstaande taken</h1>
  <Button on:click={() => navigateTo(`/aanmaken`)} label="Aanmaken regel" />
</div>

{#await req}
  <p>...waiting</p>
{:then regels}
  <table class="table table--bordered">
    <thead class="table__header">
      <tr>
        <th class="table__cell" width="105">Rep. nr.</th>
        <th class="table__cell" width="120">Dagtekening</th>
        <th class="table__cell">Soort akte</th>
        <th class="table__cell">Partij</th>
      </tr>
    </thead>
    <tbody class="table__body">
      {#each regels as regel}
        <tr class="table__row">
          <td class="table__cell pointer">
            {regel.repertoriumnummer}
          </td>
          <td class="table__cell pointer">
            {formatDate(regel.dagtekeningAkte)}
          </td>
          <td class="table__cell table__cell--truncate pointer">
            {getSoortAkte(regel.akte)}
          </td>
          <td class="table__cell table__cell--truncate pointer">
            {getPartij(regel.partijen)}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{:catch error}
  <p>{error}</p>
{/await}
