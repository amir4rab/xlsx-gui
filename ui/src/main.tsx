import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./base.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <main className="prose dark:prose-invert py-12 mx-auto">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </main>
);
