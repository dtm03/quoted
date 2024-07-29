import React, { useState } from "react";
import {
  TextInput,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../config/styles";
import colors from "../config/colors";
import GradientBackground from "../components/GradientBackground";
import * as api from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddQuoteScreen = ({ navigation }) => {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    const handleAddQuote = async () => {
        try {
            const userId = await AsyncStorage.getItem("userId");
            await api.createQuote(userId, quote, author);
            setQuote("");
            setAuthor("");
            navigation.navigate("Carousel");
        } catch (error) {
            console.error("Error adding quote:", error);
        }
    }

        return (
            <SafeAreaView style={styles.container}>
                <GradientBackground color1={colors.primary} color2={colors.secondary}/>
                <View style={[styles.card, {width: 300}]}>
                    <TextInput
                        style={[styles.quote, {textAlignVertical: "top"}]}
                        placeholder="Add your new quote right here..."
                        placeholderTextColor={colors.primary}
                        onChangeText={setQuote}
                        value={quote}
                        multiline={true}
                    />
                    <TextInput
                        style={styles.author}
                        placeholder="...and its author here"
                        placeholderTextColor={colors.primary}
                        onChangeText={setAuthor}
                        value={author}
                        multiline={true}
                    />
                </View>
                <TouchableOpacity onPress={handleAddQuote}>
                    <Text style={styles.text}>quoted</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
};

export default AddQuoteScreen;
