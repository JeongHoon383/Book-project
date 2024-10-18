import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import router from "./router";

const queryClient = new QueryClient();

const isDevEnvironment = import.meta.env.DEV;

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    {isDevEnvironment && <ReactQueryDevtools />}
    <RouterProvider router={router} />
  </QueryClientProvider>
);
