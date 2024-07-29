import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {
    CardStyleInterpolators,
    createStackNavigator,
} from "@react-navigation/stack";
import AddQuoteScreen from "./screens/AddQuoteScreen";
import ListScreen from "./screens/ListScreen";

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Carousel"
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    gestureDirection: "vertical",
                    cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
                }}
            >
                <Stack.Screen name="Carousel" component={ListScreen}/>
                <Stack.Screen name="AddQuote" component={AddQuoteScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;