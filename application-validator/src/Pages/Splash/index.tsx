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
    const [creatingAccount, setCreatingAccount] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            credentialsContext
                .getPublicKey()
                .then((publicKey: string) => {
                    setRedirect(`/home/${publicKey}`);
                })
                .catch(async () => {
                    setLoading(false);
                });
        }, 1000);
    }, []);

    const onCreateAccount = () => {
        setCreatingAccount(true);

        setTimeout(async () => {
            try {
                const address = await credentialsContext.generateCredentials("");
                return setRedirect(`/home/${address}`);
            } finally {
                setCreatingAccount(false);
            }
        }, 200);
    };

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
            {!loading && !creatingAccount ? (
                <View style={styles.actionsContainer}>
                    <Button
                        onPress={onCreateAccount}
                        style={{ ...styles.baseButton, ...styles.whiteButton }}
                        textStyle={styles.whiteButtonText}
                    >
                        ¡Empecemos!
                    </Button>
                </View>
            ) : null}
        </View>
    );
};

export default SplashPage;
