import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Logo from '../components/Logo';
import HeaderButton from '../components/HeaderButton';
import {
    HomeScreen,
    LevelListScreen,
    SettingsScreen,
    GameScreen
} from "../screens"

const AppStack = createNativeStackNavigator();

export default function AppNavigation() {
    return(
        <NavigationContainer>
            <AppStack.Navigator
                screenOptions={( {route, navigation} ) => ({
                    headerShown: true,
                    headerTitle: (props) => <Logo />,
                    headerTitleAlign: "left",
                    headerRight: () => <HeaderButton navigation={navigation} />
                })}
            >
                <AppStack.Screen name="Home" component={HomeScreen} />
                <AppStack.Screen name="LevelList" component={LevelListScreen} />
                <AppStack.Screen name="Settings" component={SettingsScreen} />
                <AppStack.Screen name="Game" component={GameScreen} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}