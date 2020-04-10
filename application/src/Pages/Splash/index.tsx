import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";

import { useCredentialsContext } from "../../Context/CredentialProvider";
import { Redirect } from "react-router-native";

import { styles } from "./styles";

const logo = require("../../assets/enjoypass-app.gif");

const SplashPage = () => {
    const credentialsContext = useCredentialsContext();
    const [redirect, setRedirect] = useState("");

    useEffect(() => {
        credentialsContext
            .getPublicKey()
            .then((publicKey: string) => {
                setTimeout(() => {
                    setRedirect(`/home/${publicKey}`);
                }, 1000);
            })
            .catch((err) => {
                setRedirect("/generate-credentials");
            });
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
            <Image source={logo} style={styles.logo} />
        </View>
    );
};

export default SplashPage;
