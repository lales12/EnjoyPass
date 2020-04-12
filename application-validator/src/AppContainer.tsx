import React, { FC, ReactElement, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { NativeRouter, Route } from "react-router-native";
import { useFonts } from "@use-expo/font";

// Context

import { useEthereumContext } from "./Context/EthereumProvider";

//Pages
import SplashPage from "./Pages/Splash";
import HomePage from "./Pages/Home";
import GenerateCredentialsPage from "./Pages/GenerateCredentials";
import DeleteCredentialsPage from "./Pages/DeleteCredentials";
import ExportPage from "./Pages/Export";

import VerificationModal, { EStates } from "./Components/Modals/Verification";

import { $backgroundColor } from "./Styles/variables";
import ImportPage from "./Pages/Import";

const regularFont = require("./assets/fonts/regular.ttf");
const boldFont = require("./assets/fonts/bold.ttf");

const AppContainer: FC = (): ReactElement => {
    let [fontsLoaded] = useFonts({
        regular: regularFont,
        bold: boldFont,
    });

    if (!fontsLoaded) {
        return <View></View>;
    }

    return (
        <NativeRouter>
            <View style={styles.container}>
                <Route exact path="/" component={SplashPage} />
                <Route exact path="/generate-credentials" component={GenerateCredentialsPage} />
                <Route exact path="/import-credentials" component={ImportPage} />
                <Route exact path="/home/:address" component={HomePage} />
                <Route exact path="/export-account/:address" component={ExportPage} />
                <Route exact path="/delete-account/:address" component={DeleteCredentialsPage} />
            </View>
        </NativeRouter>
    );
};

export default AppContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: $backgroundColor,
        alignItems: "center",
        justifyContent: "center",
    },
});
