import React from "react";

import { CredentialsProvider } from "./src/Context/CredentialProvider";
import { EthereumProvider } from "./src/Context/EthereumProvider";
import { SocketProvider } from "./src/Context/SocketProvider";
import AppContainer from "./src/AppContainer";

console.disableYellowBox = true;
console.ignoredYellowBox = ["Warning: Each", "Warning: Failed", "Setting a timer"];

const App = () => {
    return (
        <SocketProvider>
            <CredentialsProvider>
                <EthereumProvider>
                    <AppContainer />
                </EthereumProvider>
            </CredentialsProvider>
        </SocketProvider>
    );
};

export default App;
