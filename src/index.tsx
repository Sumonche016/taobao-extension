import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

// console.log("React injected from index.tsx");

root.render(
  <React.StrictMode>
    <>
      <h1>Content from index.tsx</h1>
    </>
  </React.StrictMode>
);
