import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// contexts
import { AuthContextProvider } from "./contexts/AuthContext";
import { GameContextProvider } from "./contexts/GameContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GameContextProvider>
        <App />
      </GameContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
