import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";

import SplashPage from "./src/Pages/Splash";
import { HomePage } from "./src/Pages/Home";
import GenerateCredentialsPage from "./src/Pages/GenerateCredentials";
import { ExportPage } from "./src/Pages/Export";

import { $backgroundColor } from "./src/Styles/variables";
import { CredentialsProvider } from "./src/Context/CredentialProvider";
import { EthereumProvider } from "./src/Context/EthereumProvider";
import { DeleteCredentialsPage } from "./src/Pages/DeleteCredentials";

const App = () => (
    <CredentialsProvider>
        <EthereumProvider>
            <NativeRouter>
                <View style={styles.container}>
                    <Route exact path="/" component={SplashPage} />
                    <Route exact path="/generate-credentials" component={GenerateCredentialsPage} />
                    <Route exact path="/home/:address" component={HomePage} />
                    <Route exact path="/export-account/:address" component={ExportPage} />
                    <Route exact path="/delete-account/:address" component={DeleteCredentialsPage} />
                </View>
            </NativeRouter>
        </EthereumProvider>
    </CredentialsProvider>
);

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: $backgroundColor,
        alignItems: "center",
        justifyContent: "center",
    },
});
