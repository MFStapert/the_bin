import type {
  RechtspersoonModel,
  UpsertRepertoriumregelModel,
} from "generated";

import { Builder } from "./builder";

export const UpsertRepertoriumregelModelBuilder = () =>
  Builder<UpsertRepertoriumregelModel>().withType(
    "upsertRepertoriumregelModel"
  );

export const PartijBuilder = () =>
  Builder<RechtspersoonModel>().withType("rechtspersoonModel");
