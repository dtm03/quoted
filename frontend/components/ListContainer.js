import React from "react";
import { View, FlatList, Dimensions } from "react-native";
import QuoteCard from "./QuoteCard";
import styles from "../config/styles";
import {deleteQuote} from "../api/api";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SLIDER_WIDTH * 0.9;

const ListContainer = ({ quotes, deleteQuote }) => {
    return (
        <View style={styles.listContainer}>
            <FlatList
                data={quotes}
                renderItem={({ item }) => (
                    <View style={{ width: ITEM_WIDTH, padding: 10 }}>
                        <QuoteCard quote={item} deleteQuote={deleteQuote} />
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ alignItems: "center" }}
            />
        </View>
    );
};

export default ListContainer;