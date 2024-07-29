import {StyleSheet} from "react-native";
import colors from "./colors";

const styles = StyleSheet.create({
    addAuthor: {
        color: colors.primary,
        fontSize: 24,
        paddingTop: 20,
        justifyContent: "flex-end",
    },
    author: {
        color: colors.primary,
        fontSize: 24,
        paddingTop: 20,
    },
    date: {
        color: colors.primary,
        fontSize: 18,
        paddingTop: 10,
    },
    card: {
        backgroundColor: colors.tertiary,
        borderRadius: 16,
        padding: 30,
        opacity: 0.8,
    },
    listContainer: {
        height: "80%",
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    quote: {
        color: colors.primary,
        fontSize: 30,
        fontWeight: "bold",
    },
    text: {
        color: colors.tertiary,
        fontSize: 30,
        opacity: 0.8,
    },
});

export default styles;
