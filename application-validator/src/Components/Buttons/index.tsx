import React, { ReactElement } from "react";
import { StyleSheet, Text, Button as ReactButton, NativeSyntheticEvent, NativeTouchEvent } from "react-native";

interface IProps {
    basic: boolean;
    color: string;
    children: string;
    onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
}
export const Button = (props: IProps) => <ReactButton title={props.children} onPress={props.onPress} />;

const styles = StyleSheet.create({
    basic: {
        backgroundColor: "transparent",
    },
});
