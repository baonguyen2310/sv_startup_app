import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Logo from '../components/Logo';
import HeaderButton from '../components/HeaderButton';
import {
    HomeScreen,
    LevelListScreen,
    SettingsScreen,
    GameScreen
} from "../screens/Main"
import {
    LandingScreen,
    LoginScreen,
    RegisterScreen,
    ResetPasswordScreen
} from "../screens/Auth"

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
                <AppStack.Screen name="Landing" component={LandingScreen} />
                <AppStack.Screen name="Home" component={HomeScreen} />
                <AppStack.Screen name="LevelList" component={LevelListScreen} />
                <AppStack.Screen name="Settings" component={SettingsScreen} />
                <AppStack.Screen name="Game" component={GameScreen} />
                <AppStack.Screen name="Login" component={LoginScreen} />
                <AppStack.Screen name="Register" component={RegisterScreen} />
                <AppStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}