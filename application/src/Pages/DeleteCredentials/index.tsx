import React, { ReactElement, FC, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useParams } from "react-router-native";

import { Layout } from "../../Components/Layout";
import { EOptions } from "../../Components/OptionsMenu";

import { styles } from "./styles";
import { useCredentialsContext } from "../../Context/CredentialProvider";

import Button from "apsl-react-native-button";

interface IParams {
    address: string;
}
export const DeleteCredentialsPage: FC = (): ReactElement => {
    const credentialsContext = useCredentialsContext();
    const params = useParams<IParams>();

    const menuOptions = [EOptions.Home, EOptions.Export];

    const deleteAccount = (): void => {
        console.log("delete account");
    };

    return (
        <Layout address={params.address} options={menuOptions}>
            <View>
                <Text style={styles.title}>¿Estas seguro que quieres eliminar las credenciales?</Text>
                <Text style={styles.description}>Si las eliminas nunca mas podras recuperarlas y se perderan todos tus datos</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button style={styles.deleteButton} textStyle={styles.deleteText} onPress={deleteAccount}>
                    Eliminar cuenta
                </Button>
            </View>
        </Layout>
    );
};
