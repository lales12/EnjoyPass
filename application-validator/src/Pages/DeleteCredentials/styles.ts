import { StyleSheet } from "react-native";
import { $buttonEmpty, $buttonDelete } from "../../Styles/components";
import { $dangerColor } from "../../Styles/variables";

export const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        textAlign: "center",
    },
    description: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 20,
    },
    buttonContainer: {
        marginTop: 20,
    },
    deleteButton: {
        ...$buttonDelete,
        width: 150,
        alignSelf: "center",
    },
    deleteText: {
        color: $dangerColor,
    },
});
