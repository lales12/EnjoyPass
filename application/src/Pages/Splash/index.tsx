import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";

import { useCredentialsContext } from "../../Context/CredentialProvider";
import { Redirect } from "react-router-native";

import { styles } from "./styles";

import Button from "apsl-react-native-button";

const moveLogo = require("../../assets/enjoypass-app.gif");
const staticLogo = require("../../assets/logo.png");

const SplashPage = () => {
    const credentialsContext = useCredentialsContext();
    const [redirect, setRedirect] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            credentialsContext
                .getPublicKey()
                .then((publicKey: string) => {
                    setRedirect(`/home/${publicKey}`);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, 1000);
    }, []);

    if (redirect) {
        return (
            <Redirect
                to={{
                    pathname: redirect,
                }}
            />
        );
    }
    return (
        <View style={styles.container}>
            {loading ? <Image source={moveLogo} style={styles.logo} /> : <Image source={staticLogo} style={styles.logo} />}
            {!loading ? (
                <View style={styles.actionsContainer}>
                    <Button
                        onPress={() => setRedirect("/generate-credentials")}
                        style={{ ...styles.baseButton, ...styles.whiteButton }}
                        textStyle={styles.transparentButtonText}
                    >
                        Crear una cuenta
                    </Button>
                    <Button
                        onPress={() => setRedirect("/import-credentials")}
                        style={{ ...styles.baseButton }}
                        textStyle={styles.whiteButtonText}
                    >
                        Importar una cuenta
                    </Button>
                </View>
            ) : null}
        </View>
    );
};

export default SplashPage;
