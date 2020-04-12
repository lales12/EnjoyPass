import { StyleSheet } from "react-native";
import { $primaryColor, $gray } from "../../../Styles/variables";
import { $buttonPrimary, $buttonText } from "../../../Styles/components";

export const styles = StyleSheet.create({
    container: {},
    image: {
        width: "100%",
        resizeMode: "contain",
        height: 140,
    },
    title: {
        fontSize: 24,
        marginTop: 20,
        color: $primaryColor,
        textAlign: "center",
    },
    content: {
        marginTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        color: $gray,
        textAlign: "center",
    },
    button: {
        ...$buttonPrimary,
        marginTop: 30,
    },
    textButton: $buttonText,
});
