import { StyleSheet } from "react-native";
import { $buttonEmpty, $buttonDelete } from "../../Styles/components";
import { $dangerColor, $primaryColor } from "../../Styles/variables";

export const styles = StyleSheet.create({
    container: {
        marginTop: 100,
    },
    title: {
        fontSize: 26,
        color: $primaryColor,
        fontFamily: "regular",
        textAlign: "center",
    },
    description: {
        fontSize: 18,
        fontFamily: "regular",
        textAlign: "center",
        marginTop: 20,
    },
    buttonContainer: {
        marginTop: 20,
    },
    deleteButton: {
        ...$buttonDelete,
        width: 200,
        alignSelf: "center",
    },
    deleteText: {
        color: $dangerColor,
    },
});
