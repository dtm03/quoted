// components/QuoteCard.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../config/styles";
import colors from "../config/colors";

const QuoteCard = ({ quote, deleteQuote }) => {
  const formattedDate = new Date(quote.creationDate).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  return (
    <View style={styles.card}>
      <Text style={styles.quote}>{quote.quote}</Text>
      <Text style={styles.author}>{quote.author}</Text>
      <Text style={styles.date}>{formattedDate}</Text>
      <TouchableOpacity style={{ paddingTop: 20 }} onPress={() => deleteQuote(quote.user.userId, quote.quoteId)}>
        <Ionicons name="trash" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default QuoteCard;