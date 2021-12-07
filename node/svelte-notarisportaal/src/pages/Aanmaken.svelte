<script lang="ts">
  import Message from "../components/Message.svelte";
  import Button from "../components/Button.svelte";
  import Input from "../components/Input.svelte";
  import * as yup from "yup";
  import {
    PartijBuilder,
    UpsertRepertoriumregelModelBuilder,
  } from "src/utils/regel-builder";
  import { RepertoriumregelControllerApi } from "generated";
  import type {
    RechtspersoonModel,
    UpsertRepertoriumregelModel,
  } from "generated";
  import { protocolStore } from "src/stores/protocolstore";
  import { KeycloakProxy } from "src/keycloak";

  let schema = yup.object().shape({
    repertoriumnummer: yup.number().required().positive().integer(),
    dagtekeningAkte: yup
      .date()
      .default(function () {
        return new Date();
      })
      .required(),
    soortAkte: yup.string().required(),
    typeAkte: yup.string().required(),
    opmerking: yup.string().max(100),
    zaakReferentie: yup.string(),
    statutaireNaam: yup.string().required(),
    kvkNummer: yup.string(),
    woonplaats: yup.string().required(),
    land: yup.string().required(),
  });

  let formData: any = {};
  let errors: any = {};

  let response;

  async function submit(): Promise<void> {
    try {
      errors = {};
      const data = await schema.validate(formData, { abortEarly: false });
      send(build(data));
    } catch (error) {
      const extractErrors = ({ inner }) => {
        return inner.reduce((acc, err) => {
          return { ...acc, [err.path]: err.message };
        }, {});
      };
      errors = extractErrors(error);
    }
  }

  function send(model: UpsertRepertoriumregelModel): void {
    response = new RepertoriumregelControllerApi(
      KeycloakProxy.getApiConfiguration()
    )
      .registreerKladregel({ upsertRepertoriumregelModel: model })
      .then(console.log);
  }

  function build(data: any): UpsertRepertoriumregelModel {
    return UpsertRepertoriumregelModelBuilder()
      .withAangifteplichtOVB(false)
      .withDagtekeningAkte(data.dagtekeningAkte)
      .withIndicatieKoninklijkeFamilie(false)
      .withOpmerking(data.opmerking)
      .withPartijen(buildPartij(data))
      .withProtocolnummer($protocolStore)
      .withRepertoriumnummer(data.repertoriumnummer)
      .withSoortAkte(data.soortAkte)
      .withTypeAkte(data.typeAkte)
      .build();
  }

  function buildPartij(data: any): Set<RechtspersoonModel> {
    const set = new Set<RechtspersoonModel>();
    set.add(
      PartijBuilder()
        .withKvkNummer(data.kvkNummer)
        .withLand(data.land)
        .withStatutaireNaam(data.statutaireNaam)
        .withWoonplaats(data.woonplaats)
        .build()
    );
    return set;
  }
</script>

<h1 class="heading--1">Aanmaken repertoriumregel</h1>
{#if response}
  {#await response}
    <p>...waiting</p>
  {:then aangemaakt}
    <Message>Succes!</Message>
  {:catch error}
    <p>{error}</p>
  {/await}
{:else}
  <form on:submit|preventDefault={submit}>
    <div class="form-section">
      <Input label="Dagtekening akte" errors={errors.dagtekeningAkte}>
        <input
          placeholder="dd-mm-jjjj"
          type="date"
          class="field field--short"
          bind:value={formData.dagtekeningAkte}
        />
      </Input>
    </div>

    <div class="form-section form-section--row">
      <Input label="Repertoriumnummer" errors={errors.repertoriumnummer}>
        <input
          placeholder="0"
          type="number"
          class="field field--short"
          bind:value={formData.repertoriumnummer}
        />
      </Input>

      <Input label="Type akte" errors={errors.typeAkte}>
        <select class="field field--short" bind:value={formData.typeAkte}>
          <option value="IN_MINUUT">In minuut</option>
          <option value="IN_ORGINALI">In orginali</option>
        </select>
      </Input>
    </div>

    <div class="form-section">
      <Input label="Soort akte" errors={errors.soortAkte}>
        <select class="field" bind:value={formData.soortAkte}>
          <option />
          <option value="228">Testament</option>
        </select>
      </Input>
    </div>

    <div class="form-section">
      <Input
        label="Opmerking"
        helperText="Optioneel - Deze opmerking wordt rechtstreeks doorgestuurd aan de Belastingdienst en wordt niet door de klant gelezen."
        errors={errors.opmerking}
      >
        <textarea
          class="field notes__textarea"
          bind:value={formData.opmerking}
        />
      </Input>
    </div>

    <div class="partij__wrapper">
      <div class="partij__header-wrapper">
        <h3 class="heading--3">Rechtspersoon toevoegen</h3>
      </div>

      <div class="form-section">
        <Input label="Statutaire naam" errors={errors.statutaireNaam}>
          <input
            type="text"
            class="field"
            bind:value={formData.statutaireNaam}
          />
        </Input>
      </div>

      <div class="form-section">
        <Input label="Vestigingsplaats" errors={errors.woonplaats}>
          <input type="text" class="field" bind:value={formData.woonplaats} />
        </Input>
      </div>

      <div class="form-section">
        <Input label="Land" errors={errors.land}>
          <select class="field" bind:value={formData.land}>
            <option>Nederland</option>
          </select>
        </Input>
      </div>

      <div class="form-section">
        <Input
          label="KVK-Nummer"
          helperText="Optioneel"
          errors={errors.kvkNummer}
        >
          <input
            type="text"
            class="field field--short"
            bind:value={formData.kvkNummer}
          />
        </Input>
      </div>
    </div>

    <footer>
      <Button type="submit" label="Toevoegen aan verzendlijst" />
    </footer>
  </form>
{/if}

<style lang="scss">
  @import "../styles/utilities";
  .field--short {
    width: 16rem !important;
    margin-right: $layout-01;
  }

  .form-section {
    display: flex;
    flex-direction: column;
    margin-bottom: $layout-01;
  }

  .form-section--row {
    flex-direction: row;
  }

  .notes__textarea {
    min-height: rem(104px, $rem-base);
  }

  .partij__wrapper {
    border: solid rem(1px, $rem-base) $color-core-gray;
    padding: $layout-02;
    border-radius: 4px;
  }

  .partij__header-wrapper {
    display: flex;
    justify-content: space-between;
  }

  footer {
    position: fixed;
    width: 100%;
    max-height: 72px;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
    padding: $layout-01 $layout-02;
    border-top: 1px solid $color-core-gray;
    background-color: white;
  }
</style>
