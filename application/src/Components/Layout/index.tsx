import React, { FC, ReactElement, createContext, useContext } from "react";
import { View, Text, Image } from "react-native";

import { OptionsMenu, EOptions } from "../OptionsMenu";
import { styles } from "./styles";

const logo = require("../../assets/logo-solo.png");

interface IProps {
    children: ReactElement[] | ReactElement | null;
    address?: string;
    options?: EOptions[];
}

export const Layout: FC<IProps> = (props: IProps): ReactElement => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={logo} style={styles.logo} />

                <Text style={styles.title}>Tu{"\n"}enjoypass</Text>
            </View>

            <View>{props.children}</View>

            {props.address ? <OptionsMenu address={props.address} options={props.options} /> : null}
        </View>
    );
};
