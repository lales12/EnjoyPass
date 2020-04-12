import React, { ReactElement, FC, useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { useParams } from "react-router-native";

import QRCode from "react-native-qrcode-svg";

import Button from "apsl-react-native-button";

import { useEthereumContext } from "../../Context/EthereumProvider";
import { Layout } from "../../Components/Layout";
import { EOptions } from "../../Components/OptionsMenu";

import { styles } from "./styles";

const eyeImage = require("../../assets/eye.png");

interface IParams {
    address: string;
}
const HomePage: FC = (): ReactElement => {
    const [viewAddress, setViewAddress] = useState(false);
    const [validDays, setValidDays] = useState(0);

    const ethereumContext = useEthereumContext();
    const params = useParams<IParams>();

    const menuOptions = [EOptions.Export, EOptions.DeleteAccount];

    useEffect(() => {
        ethereumContext.getAddressValidity(params.address).then((days) => {
            setValidDays(days);
        });
    }, [params.address]);

    const toggleViewAddress = () => {
        setViewAddress(!viewAddress);
    };

    return (
        <Layout address={params.address} options={menuOptions}>
            <View style={styles.qrContainer}>
                <QRCode value={params.address} logoBorderRadius={10} size={250} color="black" backgroundColor="white" />
            </View>

            {viewAddress ? (
                <View>
                    <Text style={styles.textAddress}>{params.address}</Text>
                </View>
            ) : null}

            <View style={styles.buttonContainer}>
                <Button style={styles.button} textStyle={styles.buttonText} onPress={toggleViewAddress}>
                    <Image source={eyeImage} style={styles.eyeImage} />
                    {!viewAddress ? "Ver código" : "Ocultar código"}
                </Button>
            </View>

            <View style={styles.rememberContainer}>
                {validDays ? (
                    <View>
                        <Text style={styles.rememberMessage}>Tu código expirará en</Text>
                        <Text style={styles.remainDays}>{validDays} días</Text>
                    </View>
                ) : (
                    <Text style={styles.rememberMessage}>Recuerda que tienes que validar el código con tu médico.</Text>
                )}
            </View>
        </Layout>
    );
};

export default HomePage;
