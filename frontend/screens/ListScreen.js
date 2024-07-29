// screens/ListScreen.js
import React, { useState, useCallback } from "react";
import { Text, SafeAreaView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import styles from "../config/styles";
import colors from "../config/colors";
import * as api from "../api/api";
import GradientBackground from "../components/GradientBackground";
import ListContainer from "../components/ListContainer";

const ListScreen = ({ navigation }) => {
  const [quotes, setQuotes] = useState([]);
  const [user, setUser] = useState(null);

  const initializeUserAndQuotes = async () => {
    try {
      let userId = await AsyncStorage.getItem("userId");
      const allUsers = await api.fetchAllUsers();
      if (!userId || allUsers.length === 0) {
        const userData = await api.createUser();
        userId = userData.userId.toString();
        await AsyncStorage.setItem("userId", userId);
        setUser(userData);
      } else {
        const userData = { userId: parseInt(userId, 10) };
        setUser(userData);
      }
      const quotesData = await api.fetchQuotes(userId);
      setQuotes(quotesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteQuote = async (userId, quoteId) => {
    try {
      await api.deleteQuote(userId, quoteId);
      const updatedQuotes = await api.fetchQuotes(userId);
      setQuotes(updatedQuotes);
    } catch (error) {
      console.error("Error deleting quote:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      initializeUserAndQuotes();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground color1={colors.secondary} color2={colors.primary} />
      <ListContainer quotes={quotes} deleteQuote={deleteQuote} />
      <TouchableOpacity onPress={() => navigation.navigate("AddQuote")}>
        <Text style={styles.text}>{"add quote"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ListScreen;