import {TailwindProvider} from "tailwindcss-react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";

import './declareGlobals'
import './mocks/server'

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
                <TailwindProvider>
                    <Stack.Navigator>
                        <Stack.Screen name="Home" component={HomeScreen}/>
                    </Stack.Navigator>
                </TailwindProvider>
        </NavigationContainer>
    );
}
