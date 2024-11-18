import RegisterForm from "./screen/RegisterForm";
import WelcomeScreen from "./screen/Welcome";
import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Register" component={RegisterForm}/>
                <Stack.Screen name="Welcome" component={WelcomeScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;