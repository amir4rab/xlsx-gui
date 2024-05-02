import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./base.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <main className="prose dark:prose-invert max-w-3xl p-8 pb-36 md:px-0 md:py-12 mx-auto">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </main>
);
