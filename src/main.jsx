import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { menuTheme } from "./chakra/Menu";
import { modalTheme } from "./chakra/Modal";
import { drawerTheme } from "./chakra/Drawer";

const theme = extendTheme({
  components: {
    Menu: menuTheme,
    Modal: modalTheme,
    Drawer: drawerTheme,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="378612703638-29q2csb7rh6l334jtn104bnebm4k0ki3.apps.googleusercontent.com">
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
