import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Redirect } from "react-router-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import { styles } from "./styles";
import Button from "apsl-react-native-button";

import LayoutRegister from "../../Components/LayoutRegister";

import { useCredentialsContext } from "../../Context/CredentialProvider";
import { useSocketContext } from "../../Context/SocketProvider";
import { useEthereumContext } from "../../Context/EthereumProvider";
import VerificationModal, { EStates } from "../../Components/Modals/Verification";
import { Layout } from "../../Components/Layout";

let eventChallenge: string;

export default function Home() {
    const [hasPermission, setHasPermission] = useState(null);
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalStatus, setModalStatus] = useState(EStates.NoValidated);
    const [challenge, setChallenge] = useState("");
    const [loadedAddress, setLoadedAddress] = useState("");

    const socketContext = useSocketContext();
    const credentialsContext = useCredentialsContext();
    const ethereumContext = useEthereumContext();

    const handleBarCodeScanned = ({ type, data }) => {
        setLoadedAddress(data);
    };

    const handleConnection = (address: string): void => {
        console.log("tu address es:", address);
        socketContext.connect(address);
    };

    const handleChallengeResolve = async (data: any) => {
        console.log("-------------------- te han enviado una respuesta");
        console.log("el callenge to validate", eventChallenge);

        //setChallenge(data.challenge);
        console.log(data);
        try {
            await ethereumContext.validateSignature(eventChallenge, data.challenge);
            return setModalStatus(EStates.Validated);
        } catch {
            setModalStatus(EStates.NoValidated);
        } finally {
            setLoadedAddress("");
        }
    };

    const handleError = (data: any) => {
        setModalStatus(EStates.NoValidated);
        setLoadedAddress("");
    };
    const onScanAgain = () => {
        setInvalidCredentials(false);
        setLoadedAddress("");
    };

    const onSendChallenge = () => {
        eventChallenge = "Event challenge" + Math.random().toString();

        setInvalidCredentials(false);
        setShowModal(true);
        setModalStatus(EStates.Validating);
        console.log("------------- Envias el challenge", eventChallenge);

        socketContext.sendChallenge(loadedAddress, eventChallenge).catch(() => {
            setModalStatus(EStates.NoValidated);
        });
    };

    const onCloseModal = () => {
        setShowModal(false);
        setModalStatus(EStates.NoValidated);
    };

    useEffect(() => {
        credentialsContext.getPublicKey().then(handleConnection);
        socketContext.addListener(handleChallengeResolve);
        socketContext.addListenerError(handleError);

        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();

            setHasPermission(status === "granted");
        })();
    }, []);

    // if (hasPermission === null) {
    //     return <View style={styles.container}></View>;
    // }
    // if (hasPermission === false) {
    //     return <Text style={styles.noCameraText}>Necesitamos acceder a la camera</Text>;
    // }

    return (
        <View style={styles.container}>
            {showModal ? <VerificationModal modalState={modalStatus} onCloseModal={onCloseModal} /> : null}

            <Layout title="Escanea el QR para comprobar">
                <View>
                    <View style={styles.qrContainer}>
                        <View style={styles.qrMask}>
                            <BarCodeScanner
                                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                                onBarCodeScanned={!!loadedAddress ? undefined : handleBarCodeScanned}
                                style={StyleSheet.absoluteFillObject}
                            />
                        </View>
                    </View>
                    <View style={styles.textContainer}>
                        {!loadedAddress ? <Text style={styles.scanText}>Escanea enjoypass del asistente para validar</Text> : null}
                        {invalidCredentials ? <Text style={styles.textDanger}>Qr invalido</Text> : null}
                    </View>

                    <View style={styles.actionsContainer}>
                        {!!loadedAddress && (
                            <Button onPress={onSendChallenge} style={styles.button} textStyle={styles.textButton}>
                                Validar Usuario
                            </Button>
                        )}
                        {!!loadedAddress && (
                            <Button style={styles.buttonEmpty} textStyle={styles.textButtonEmpty} onPress={onScanAgain}>
                                Escanear otra vez
                            </Button>
                        )}
                    </View>
                </View>
            </Layout>
        </View>
    );
}
