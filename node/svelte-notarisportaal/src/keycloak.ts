import Keycloak from "keycloak-js";
import type { KeycloakInstance } from "keycloak-js";
import { Configuration } from "generated/runtime";

export class KeycloakProxy {
  private static instance: KeycloakInstance;

  constructor() {
    KeycloakProxy.instance = Keycloak({
      url: "url",
      realm: "",
      clientId: "test-client",
    });

    KeycloakProxy.instance
      .init({ onLoad: "login-required", checkLoginIframe: false })
      .then()
      .catch();
  }

  public static getApiConfiguration(): Configuration {
    return new Configuration({
      headers: { Authorization: `Bearer ` },
    });
  }

  public static getInstance(): KeycloakInstance {
    if (!KeycloakProxy.instance) {
      new KeycloakProxy();
    }
    return this.instance;
  }
}
