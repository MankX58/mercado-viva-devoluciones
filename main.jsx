import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import Page from "./app/page";
import "./app/globals.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Page />
    {import.meta.env.PROD && <Analytics />}
  </StrictMode>,
);
