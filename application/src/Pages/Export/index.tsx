import React, { ReactElement, FC, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useParams } from "react-router-native";

import QRCode from "react-native-qrcode-svg";

import { Layout } from "../../Components/Layout";
import { EOptions } from "../../Components/OptionsMenu";

import { styles } from "./styles";
import { useCredentialsContext } from "../../Context/CredentialProvider";

interface IParams {
    address: string;
}

const ExportPage: FC = (): ReactElement => {
    const [privateKey, setPrivateKey] = useState("");

    const credentialsContext = useCredentialsContext();
    const params = useParams<IParams>();

    const menuOptions = [EOptions.Home, EOptions.DeleteAccount];

    useEffect(() => {
        credentialsContext.getPrivateKey().then((key: string) => {
            setPrivateKey(key);
        });
    }, [params.address]);

    return (
        <Layout address={params.address} options={menuOptions}>
            <View style={styles.qrContainer}>
                {privateKey ? <QRCode value={privateKey} logoBorderRadius={10} size={250} color="black" backgroundColor="white" /> : null}
            </View>

            <View style={styles.rememberContainer}>
                <Text style={styles.rememberMessage}>Nunca enseñes a nadie este QRcode ni dejes que lo escaneen.</Text>
            </View>
        </Layout>
    );
};

export default ExportPage;
