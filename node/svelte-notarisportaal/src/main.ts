import App from "./App.svelte";
import { KeycloakProxy } from "./keycloak";

new KeycloakProxy();

const app = new App({
  target: document.body,
});
export { app };
