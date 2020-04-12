import React, { FC, ReactElement, useEffect, useState } from "react";
import { useFonts } from "@use-expo/font";
import { StyleSheet, View } from "react-native";
import { NativeRouter, Route } from "react-router-native";

// Context
import { useCredentialsContext } from "./Context/CredentialProvider";
import { useSocketContext } from "./Context/SocketProvider";

//Pages
import SplashPage from "./Pages/Splash";
import HomePage from "./Pages/Home";
import GenerateCredentialsPage from "./Pages/GenerateCredentials";
import DeleteCredentialsPage from "./Pages/DeleteCredentials";
import ExportPage from "./Pages/Export";

import VerificationModal, { EStates } from "./Components/Modals/Verification";

import { $backgroundColor } from "./Styles/variables";
import ImportPage from "./Pages/Import";
import { useEthereumContext } from "./Context/EthereumProvider";

const regularFont = require("./assets/fonts/regular.ttf");
const boldFont = require("./assets/fonts/bold.ttf");

const AppContainer: FC = (): ReactElement => {
    const [showModal, setShowModal] = useState(false);
    const [challengerAddress, setChallengerAddress] = useState("");
    const [challenge, setChallenge] = useState("");
    const [modalStatus, setModalStatus] = useState(EStates.NoValidated);

    const credentialsContext = useCredentialsContext();
    const ethereumContext = useEthereumContext();
    const socketContext = useSocketContext();

    let [fontsLoaded] = useFonts({
        regular: regularFont,
        bold: boldFont,
    });

    const handleConnection = (address: string): void => {
        socketContext.connect(address);
    };

    const handleChallenge = (data: any) => {
        setChallenge(data.challenge);
        setChallengerAddress(data.address);

        setShowModal(true);
    };

    const onCloseModal = () => {
        setShowModal(false);
        setModalStatus(EStates.NoValidated);
    };

    const onSignChallenge = async () => {
        setModalStatus(EStates.Validating);

        try {
            const message = await credentialsContext.signChallenge(challenge);

            await socketContext.resolve(challengerAddress, message);
            await ethereumContext.validateSignature(challenge, message);

            setModalStatus(EStates.Validated);
        } catch (error) {
            setModalStatus(EStates.Error);
        }
    };

    useEffect(() => {
        credentialsContext.getPublicKey().then(handleConnection);
        socketContext.addListener(handleChallenge);
    }, []);

    if (!fontsLoaded) {
        return <View></View>;
    }
    return (
        <NativeRouter>
            <View style={styles.container}>
                {showModal ? (
                    <VerificationModal modalState={modalStatus} onSignChallenge={onSignChallenge} onCloseModal={onCloseModal} />
                ) : null}

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
        fontFamily: "regular",
        backgroundColor: $backgroundColor,
        alignItems: "center",
        justifyContent: "center",
    },
});
