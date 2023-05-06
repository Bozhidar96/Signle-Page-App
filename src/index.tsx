import React from "react";
import ReactDOM from "react-dom/client";
import SearchApp from "./components/SearchApp";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SearchApp />
  </React.StrictMode>
);
