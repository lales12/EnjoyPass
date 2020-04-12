import React, { FC, ReactElement, useState } from "react";
import { View, Text, Animated, TouchableWithoutFeedback } from "react-native";

import { styles } from "./styles";
import { Redirect } from "react-router-native";

const MENU_CLOSED = -100;
const MENU_OPENED = 0;

export enum EOptions {
    Home,
    Export,
    DeleteAccount,
}

interface IProps {
    address: string;
    options: EOptions[];
}

export const OptionsMenu: FC<IProps> = (props: IProps): ReactElement => {
    const [menuOpened, setMenuOpened] = useState(false);
    const [optionsBottomStyle, setOptionsBottomStyle] = useState(new Animated.Value(MENU_CLOSED));
    const [redirect, setRedirect] = useState("");
    const options = [];

    const onShowMenu = () => {
        setMenuOpened(!menuOpened);

        const bottomValue = menuOpened ? MENU_OPENED : MENU_CLOSED;

        Animated.timing(optionsBottomStyle, {
            toValue: bottomValue,
            duration: 400,
        }).start();
    };

    if (redirect) {
        console.log("Rdirect to", redirect);
        return <Redirect to={{ pathname: redirect }}></Redirect>;
    }

    if (props.options.includes(EOptions.Home)) {
        options.push(
            <TouchableWithoutFeedback key={EOptions.Home} onPress={() => setRedirect(`/home/${props.address}`)}>
                <View style={styles.optionRow}>
                    <Text style={styles.fontOptions}>Página principal</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    if (props.options.includes(EOptions.Export)) {
        options.push(
            <TouchableWithoutFeedback key={EOptions.Export} onPress={() => setRedirect(`/export-account/${props.address}`)}>
                <View style={styles.optionRow}>
                    <Text style={styles.fontOptions}>Exportar cuenta</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    if (props.options.includes(EOptions.DeleteAccount)) {
        options.push(
            <TouchableWithoutFeedback key={EOptions.DeleteAccount} onPress={() => setRedirect(`/delete-account/${props.address}`)}>
                <View style={styles.optionRow}>
                    <Text style={styles.fontOptions}>Eliminar cuenta</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    return (
        <Animated.View style={{ ...styles.options, bottom: optionsBottomStyle }}>
            <TouchableWithoutFeedback onPress={onShowMenu}>
                <View style={styles.optionRow}>
                    <Text style={styles.fontOptions}>Opciones</Text>
                    <Text style={styles.fontOptions}>+</Text>
                </View>
            </TouchableWithoutFeedback>

            {options}
        </Animated.View>
    );
};
