import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import App from "./App";
import { queryClient } from "./lib/queryClient";
import { asyncPersister } from "./lib/persister";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Elemento #root não encontrado no index.html");
}

const ONE_DAY = 1000 * 60 * 60 * 24;

createRoot(container).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: asyncPersister,
        maxAge: ONE_DAY,
        buster: "v1",
      }}
    >
      <App />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </PersistQueryClientProvider>
  </StrictMode>,
);
