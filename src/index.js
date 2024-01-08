import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { HashRouter } from "react-router-dom";
import ChatProvider from "./context/ChatProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <ChatProvider>
  <HashRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
  </HashRouter>
    </ChatProvider>
  // </React.StrictMode>
);
