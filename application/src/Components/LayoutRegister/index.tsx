import React, { ReactElement, useState } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";

import { styles } from "./styles";
import { FC } from "react";
import { Redirect } from "react-router-native";

interface Iprops {
    children: ReactElement | ReactElement[];
    title: string;
}
const LayoutRegister: FC<Iprops> = (props: Iprops): ReactElement => {
    const [redirect, setRedirect] = useState("");
    const onBack = (): void => {
        setRedirect("/");
    };

    if (redirect) {
        return <Redirect to={{ pathname: redirect }} />;
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback style={styles.backContainer} onPress={onBack}>
                <View style={styles.backButton}>
                    <Text style={styles.arrow}>&lt;</Text>
                    <Text style={styles.backText}>Volver</Text>
                </View>
            </TouchableWithoutFeedback>

            <Text style={styles.title}>{props.title}</Text>

            {props.children}
        </View>
    );
};

export default LayoutRegister;
