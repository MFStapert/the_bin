import Layout from "./components/Layout.svelte";
import Home from "./pages/Home.svelte";
import Aanmaken from "./pages/Aanmaken.svelte";
import Protocol from "./pages/Protocol.svelte";
import Taken from "./pages/Taken.svelte";
import { protocolStore } from "src/stores/protocolstore";

let currProtocol;

protocolStore.subscribe((protocol) => {
  currProtocol = protocol;
});

function protocolSelected() {
  return !!currProtocol;
}

const routes = [
  {
    name: "/",
    component: Home,
    layout: Layout,
  },
  {
    name: "protocol",
    component: Protocol,
    layout: Layout,
  },
  {
    name: "taken",
    layout: Layout,
    component: Taken,
    onlyIf: { guard: protocolSelected, redirect: "/protocol" },
  },
  {
    name: "aanmaken",
    component: Aanmaken,
    layout: Layout,
    onlyIf: { guard: protocolSelected, redirect: "/protocol" },
  },
];

export { routes };
