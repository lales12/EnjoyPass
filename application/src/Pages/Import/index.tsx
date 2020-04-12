import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Redirect } from "react-router-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import { styles } from "./styles";
import Button from "apsl-react-native-button";

import LayoutRegister from "../../Components/LayoutRegister";

import { useCredentialsContext } from "../../Context/CredentialProvider";
import { useSocketContext } from "../../Context/SocketProvider";

export default function ImportPage() {
    const [hasPermission, setHasPermission] = useState(null);
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const [importedAddress, setImportedAddress] = useState("");
    const [redirect, setRedirect] = useState("");

    const socketContext = useSocketContext();
    const credentialsContext = useCredentialsContext();

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();

            setHasPermission(status === "granted");
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setImportedAddress(data);
    };

    if (hasPermission === null) {
        return <Text></Text>;
    }
    if (hasPermission === false) {
        return <Text style={styles.noCameraText}>Necesitamos acceso a la camara</Text>;
    }

    const onScanAgain = () => {
        setInvalidCredentials(false);
        setImportedAddress("");
    };

    const onImportCredentials = async () => {
        setInvalidCredentials(false);

        try {
            const address = await credentialsContext.importCredentials(importedAddress);
            socketContext.connect(address);

            setRedirect(`/home/${address}`);
        } catch {
            setInvalidCredentials(true);
        }
    };

    if (redirect) {
        return <Redirect to={{ pathname: redirect }} />;
    }
    return (
        <LayoutRegister title="Escanea el QR para importar">
            <View style={styles.container}>
                <View style={styles.qrContainer}>
                    <View style={styles.qrMask}>
                        <BarCodeScanner
                            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                            onBarCodeScanned={!!importedAddress ? undefined : handleBarCodeScanned}
                            style={StyleSheet.absoluteFillObject}
                        />
                    </View>
                </View>

                {invalidCredentials ? <Text style={styles.textDanger}>Qr invalido</Text> : null}

                <View style={styles.actionsContainer}>
                    {!!importedAddress && (
                        <Button onPress={onImportCredentials} style={styles.button} textStyle={styles.textButton}>
                            Importar
                        </Button>
                    )}
                    {!!importedAddress && (
                        <Button style={styles.buttonEmpty} textStyle={styles.textButtonEmpty} onPress={onScanAgain}>
                            Escanear otra vez
                        </Button>
                    )}
                </View>
            </View>
        </LayoutRegister>
    );
}
