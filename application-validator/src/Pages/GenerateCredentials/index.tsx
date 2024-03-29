import React, { useState } from "react";
import { View, Text, ActivityIndicator, TextInput, NativeSyntheticEvent, NativeTouchEvent } from "react-native";
import { $primaryColor } from "../../Styles/variables";
import { useCredentialsContext } from "../../Context/CredentialProvider";

import Button from "apsl-react-native-button";

import { styles } from "./styles";
import LayoutRegister from "../../Components/LayoutRegister";
import { Redirect } from "react-router-native";
import { useSocketContext } from "../../Context/SocketProvider";

const GenerateCredentialsPage = () => {
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [textPasswordError, setTextPasswordError] = useState("");
    const [generatingCredentials, setGeneratingCredentials] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [redirect, setRedirect] = useState("");

    const socketContext = useSocketContext();
    const credentialsContext = useCredentialsContext();

    const onPress = async (ev: NativeSyntheticEvent<NativeTouchEvent>): Promise<void> => {
        setErrorPassword(false);

        if (password !== repeatPassword) {
            setErrorPassword(true);
            setTextPasswordError("Las contraseñas no coinciden");
            return;
        }
        if (password.length < 8) {
            setErrorPassword(true);
            setTextPasswordError("La longitud ha de ser de 8 caracteres");
            return;
        }
        setGeneratingCredentials(true);

        try {
            const address = await credentialsContext.generateCredentials(password);
            socketContext.connect(address);
            setRedirect(`/home/${address}`);
        } finally {
            setGeneratingCredentials(false);
        }
    };

    if (redirect) {
        return <Redirect to={{ pathname: redirect }} />;
    }

    return (
        <LayoutRegister title="Crea tu cuenta EnjoyPass">
            {generatingCredentials ? (
                <View style={styles.loaderContainer}>
                    <Text style={styles.label}>Generando credenciales</Text>
                    <ActivityIndicator size="large" color={$primaryColor} />
                </View>
            ) : null}

            <View style={styles.formControl}>
                <Text style={styles.label}>Escribe tu contraseña</Text>
                <TextInput
                    editable={!generatingCredentials}
                    style={styles.input}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>

            <View style={styles.formControl}>
                <Text style={styles.label}>Repetir tu contraseña</Text>
                <TextInput
                    editable={!generatingCredentials}
                    style={styles.input}
                    value={repeatPassword}
                    onChangeText={(text) => setRepeatPassword(text)}
                />
                {errorPassword ? <Text style={styles.alertText}>{textPasswordError}</Text> : null}
            </View>

            <View style={styles.buttonContainer}>
                <Button disabled={generatingCredentials} style={styles.button} textStyle={styles.buttonText} onPress={onPress}>
                    Continuar
                </Button>
            </View>
        </LayoutRegister>
    );
};

export default GenerateCredentialsPage;
