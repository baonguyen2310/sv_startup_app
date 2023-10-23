import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LevelListScreen from '../screens/LevelListScreen';
import SettingsScreen from '../screens/SettingsScreen';

const AppStack = createNativeStackNavigator();

export default function AppNavigation() {
    return(
        <NavigationContainer>
            <AppStack.Navigator>
                <AppStack.Screen name="Home" component={HomeScreen} />
                <AppStack.Screen name="LevelList" component={LevelListScreen} />
                <AppStack.Screen name="Settings" component={SettingsScreen} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}