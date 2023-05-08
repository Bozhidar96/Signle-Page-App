import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { SearchApp } from "../src/components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ErrorBoundary fallback={<div>"Something went wrong"</div>}>
    <React.StrictMode>
      <SearchApp />
    </React.StrictMode>
  </ErrorBoundary>
);
