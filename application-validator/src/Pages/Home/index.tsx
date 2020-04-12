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
        console.log(data);

        setChallenge(data.challenge);

        await ethereumContext.validateSignature(challenge, loadedAddress);
        return setModalStatus(EStates.Validated);
    };

    const handleError = (data: any) => {
        setModalStatus(EStates.NoValidated);
        setLoadedAddress("");
    };
    const onScanAgain = () => {
        setInvalidCredentials(false);
        setLoadedAddress("");
    };

    const onSendChallenge = async () => {
        setInvalidCredentials(false);
        setShowModal(true);
        setModalStatus(EStates.Validating);

        try {
            const eventChallenge = "Event challenge" + Math.random().toString;
            await socketContext.sendChallenge(loadedAddress, eventChallenge);
        } catch {
            return setModalStatus(EStates.NoValidated);
        }
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

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View>
            {showModal ? <VerificationModal modalState={modalStatus} onCloseModal={onCloseModal} /> : null}

            <LayoutRegister title="Escanea el QR para comprobar">
                <View style={styles.container}>
                    <View style={styles.qrContainer}>
                        <View style={styles.qrMask}>
                            <BarCodeScanner
                                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                                onBarCodeScanned={!!loadedAddress ? undefined : handleBarCodeScanned}
                                style={StyleSheet.absoluteFillObject}
                            />
                        </View>
                    </View>

                    {invalidCredentials ? <Text style={styles.textDanger}>Qr invalido</Text> : null}

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
            </LayoutRegister>
        </View>
    );
}
